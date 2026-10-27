import { getCollection } from 'astro:content';

export type RankingCategory = 'Junioren' | 'Vrouwen' | 'Mannen';

// Punten per plek (index 0 = 1e plaats); 8e plaats en lager krijgt het laatste getal.
export const POINTS = [10, 8, 6, 5, 4, 3, 2, 1];
export const NK_WINNER_MULTIPLIER = 2;
export const RANKING_ARCHIVE_YEARS = 3;

/** Jaren met een eigen rankingpagina: huidige jaar en de twee daarvoor. */
export function rankingYears(now = new Date()): number[] {
  return Array.from({ length: RANKING_ARCHIVE_YEARS }, (_, i) => now.getFullYear() - i);
}

export interface RankingEntry {
  contest: string;
  contestId: string;
  date: Date;
  unknownDate: boolean;
  place: number;
  points: number;
}

export interface RankedSkater {
  id: number;
  rank: number;
  total: number;
  entries: RankingEntry[];
}

/** Vertaalt een contest-categorie naar een rankingcategorie; null = telt niet mee. */
export function mapCategory(name: string): RankingCategory | null {
  const n = name.toLowerCase();
  if (n.includes('junior')) return 'Junioren';
  if (n.includes('women') || n.includes('vrouwen') || n.includes('girls')) return 'Vrouwen';
  if (n.includes('mannen') || n.includes('men') || n.includes('18+') || n.includes('senior') || n.includes('amateur') || n === 'pro' || n === 'am') return 'Mannen';
  return null;
}

export function pointsFor(place: number, isNk: boolean): number {
  const base = POINTS[Math.min(place, POINTS.length) - 1];
  return isNk && place === 1 ? base * NK_WINNER_MULTIPLIER : base;
}

export async function getRanking(year = new Date().getFullYear()): Promise<Record<RankingCategory, RankedSkater[]>> {
  const posts = await getCollection('uitslagen');
  const data = await getCollection('uitslagenData');
  // Alleen uitslagen van het gevraagde kalenderjaar.
  const start = new Date(year, 0, 1);
  const end = new Date(year + 1, 0, 1);

  const per: Record<RankingCategory, Map<number, RankingEntry[]>> = {
    Junioren: new Map(), Vrouwen: new Map(), Mannen: new Map(),
  };

  for (const post of posts) {
    const unknownDate = !!post.data.unknownDate;
    // Onbekende datum: reken met het einde van dat jaar.
    const date = unknownDate ? new Date(post.data.date.getFullYear(), 11, 31) : post.data.date;
    if (date < start || date >= end) continue;
    const entry = data.find((d) => d.id === post.id);
    const finales = (entry?.data as Record<string, Record<string, { id: number }[]>> | undefined)?.Finales;
    if (!finales) continue;
    const isNk = post.data.ranking === 'nk';

    for (const [catName, participants] of Object.entries(finales)) {
      const cat = mapCategory(catName);
      if (!cat) continue;
      participants.forEach((p, idx) => {
        if (!p.id) return; // onbekende skater
        const list = per[cat].get(p.id) ?? [];
        list.push({
          contest: post.data.title, contestId: post.id, date, unknownDate,
          place: idx + 1, points: pointsFor(idx + 1, isNk),
        });
        per[cat].set(p.id, list);
      });
    }
  }

  const result = {} as Record<RankingCategory, RankedSkater[]>;
  for (const cat of Object.keys(per) as RankingCategory[]) {
    const rows = [...per[cat]].map(([id, entries]) => ({
      id, entries: entries.sort((a, b) => b.date.getTime() - a.date.getTime()),
      total: entries.reduce((s, e) => s + e.points, 0), rank: 0,
    }));
    rows.sort((a, b) => b.total - a.total || a.id - b.id);
    rows.forEach((r, i) => { r.rank = i > 0 && r.total === rows[i - 1].total ? rows[i - 1].rank : i + 1; });
    result[cat] = rows;
  }
  return result;
}
