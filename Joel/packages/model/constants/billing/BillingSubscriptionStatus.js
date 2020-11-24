export const BillingSubscriptionStatus = {
  TRIALING: 'trialing', // Trial period
  NEW: 'new', // New subscription before intial payment intent
  ACTIVE: 'active', // Active subscription charged automatically
  INCOMPLETE: 'incomplete', // The initial invoice for the new subscription could not be charged
  PAST_DUE: 'past_due', // Subscription that is in retry mode to charge fee
  UNPAID: 'unpaid', // The latest invoice could not be charged (user settings decide if subscription is unpaid or canceled)
  CANCELED: 'canceled', // The latest invoice could not be charged (user settings decide if subscription is unpaid or canceled)
}
