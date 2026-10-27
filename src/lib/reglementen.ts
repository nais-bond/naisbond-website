import { getCollection, type CollectionEntry } from 'astro:content';

export type Reglement = CollectionEntry<'reglementen'>;

const semver = (v: string) => v.split('.').map(Number);

/** Newest version first. */
export function compareVersionsDesc(a: Reglement, b: Reglement) {
  const [a1, a2, a3] = semver(a.data.version);
  const [b1, b2, b3] = semver(b.data.version);
  return b1 - a1 || b2 - a2 || b3 - a3;
}

/** All published reglementen grouped by slug, each list sorted newest first. */
export async function getReglementen() {
  const all = await getCollection('reglementen', (r) => !r.data.draft);
  const grouped = new Map<string, Reglement[]>();
  for (const r of all) {
    const list = grouped.get(r.data.reglement) ?? [];
    list.push(r);
    grouped.set(r.data.reglement, list);
  }
  for (const list of grouped.values()) list.sort(compareVersionsDesc);
  return grouped;
}

export async function getLatestReglement(slug: string) {
  return (await getReglementen()).get(slug)?.[0];
}

export const formatReglementDate = (d: Date) =>
  d.toLocaleDateString('nl-NL', { day: 'numeric', month: 'long', year: 'numeric' });
