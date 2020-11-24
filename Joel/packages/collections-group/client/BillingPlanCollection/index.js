// Meteor imports
import { Mongo } from 'meteor/mongo'

// Schemas
import BillingPlan from '../../schemas/transformations/BillingPlan'

// Collection
// ----------
export const BillingPlans = new Mongo.Collection('BillingPlans')

// BillingPlans.attachSchema(BillingPlan)

// Security Policy (no direct insert on client side)
BillingPlans.deny({
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
