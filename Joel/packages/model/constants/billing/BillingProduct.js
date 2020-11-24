/*
 * Billing products of Optune and Onescreener services
 */

export const BillingProduct = {
  TRIAL: 'trial', // DEPRECATED

  /*
   * ARTIST
   */

  // Optune products
  ARTIST_OPTUNE_STARTER: 'artist optune starter',
  ARTIST_OPTUNE_PROFESSIONAL: 'artist optune professional',

  // Onescreener: DEPRECATED products
  ARTIST_ONESCREENER_TRIAL: 'artist onescreener trial',
  ARTIST_ONESCREENER_LEGACY: 'artist onescreener legacy',
  ARTIST_ONESCREENER_PROFESSIONAL: 'artist onescreener professional',

  // Onescreener: New products
  ARTIST_ONESCREENER_FREE_PLAN: 'artist onescreener free plan',
  ARTIST_ONESCREENER_PRO_PLAN: 'artist onescreener pro plan',
  ARTIST_ONESCREENER_PREMIUM_PLAN: 'artist onescreener premium plan',

  /*
   * AGENCY
   */

  AGENCY_OPTUNE_TRIAL: 'agency optune trial',
  AGENCY_OPTUNE_STARTER: 'agency optune starter',
  AGENCY_OPTUNE_PROFESSIONAL: 'agency optune professional',
}

/*
 * Agency products
 */

export const AgencyBillingProducts = [
  // Legacy trial product
  BillingProduct.TRIAL,
  // Current products
  BillingProduct.AGENCY_OPTUNE_TRIAL,
  BillingProduct.AGENCY_OPTUNE_STARTER,
  BillingProduct.AGENCY_OPTUNE_PROFESSIONAL,
]

/*
 * Artist products
 */

export const ArtistBillingProducts = [
  BillingProduct.ARTIST_OPTUNE_STARTER,
  BillingProduct.ARTIST_OPTUNE_PROFESSIONAL,
  // Onescreener legacy products
  BillingProduct.ARTIST_ONESCREENER_TRIAL,
  BillingProduct.ARTIST_ONESCREENER_PROFESSIONAL,
  // Onescreenre new products
  BillingProduct.ARTIST_ONESCREENER_FREE_PLAN,
  BillingProduct.ARTIST_ONESCREENER_PRO_PLAN,
  BillingProduct.ARTIST_ONESCREENER_PREMIUM_PLAN,
]

export const ArtistOnescreenerProducts = [
  // Onescreener legacy products
  BillingProduct.ARTIST_ONESCREENER_TRIAL,
  BillingProduct.ARTIST_ONESCREENER_PROFESSIONAL,
  // Onescreenre new products
  BillingProduct.ARTIST_ONESCREENER_FREE_PLAN,
  BillingProduct.ARTIST_ONESCREENER_PRO_PLAN,
  BillingProduct.ARTIST_ONESCREENER_PREMIUM_PLAN,
]
export const ArtistOnescreenerProfessionalProducts = [
  BillingProduct.ARTIST_ONESCREENER_PROFESSIONAL,
  BillingProduct.ARTIST_ONESCREENER_PRO_PLAN,
  BillingProduct.ARTIST_ONESCREENER_PREMIUM_PLAN,
]

export const ArtistOptuneProducts = [
  BillingProduct.ARTIST_OPTUNE_STARTER,
  BillingProduct.ARTIST_OPTUNE_PROFESSIONAL,
]
