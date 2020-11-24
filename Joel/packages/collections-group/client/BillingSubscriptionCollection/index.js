// Meteor imports
import { Mongo } from 'meteor/mongo'

// Schemas
import BillingSubscription from '../../schemas/transformations/BillingSubscription'

// Collection
// ----------

export const BillingSubscriptions = new Mongo.Collection('BillingSubscriptions')

// BillingSubscriptions.attachSchema(BillingSubscription)

// Security Policy (no direct insert on client side)
BillingSubscriptions.deny({
  insert() {
    return true
  },
  update() {
    return true
  },
  remove() {
    return true
  },
})
