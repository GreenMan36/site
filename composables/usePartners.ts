// Shared query keys: the same keys are read by the composable below and pre-resolved
// by `prefetchPartners()` in page setup. Keeping one definition avoids drift.
export const partnerQueries = {
  mainPartner: () => queryCollection('partners').where('tier', '=', 'main').first(),
  premiumPartners: () =>
    queryCollection('partners').where('tier', '=', 'premium').order('order', 'ASC').all(),
  regularPartners: () =>
    queryCollection('partners').where('tier', '=', 'regular').order('order', 'ASC').all(),
} as const;

/**
 * Ref-based partner data for components.
 *
 * Deliberately *not* awaited: components rendered by MDC (the `::home-partners` block)
 * lose the Nuxt instance across an await, so awaiting here throws NUXT_E1001. Pages that
 * need the data in the prerendered HTML call `prefetchPartners()` first — `useAsyncData`
 * caches by key, so these calls then resolve from that cache.
 */
export const usePartners = () => {
  const { data: mainPartner } = useAsyncData('mainPartner', partnerQueries.mainPartner);
  const { data: premiumPartners } = useAsyncData('premiumPartners', partnerQueries.premiumPartners);
  const { data: regularPartners } = useAsyncData('regularPartners', partnerQueries.regularPartners);

  return { mainPartner, premiumPartners, regularPartners };
};

/** Await the partner queries in page setup so their content is server-rendered. */
export const prefetchPartners = async () => {
  await Promise.all([
    useAsyncData('mainPartner', partnerQueries.mainPartner),
    useAsyncData('premiumPartners', partnerQueries.premiumPartners),
    useAsyncData('regularPartners', partnerQueries.regularPartners),
  ]);
};
