// Meteor imports
import { Meteor } from 'meteor/meteor'
import { Mongo } from 'meteor/mongo'

// Schemas
import { BillingStripePlan } from '../../schemas/BillingStripePlan'

// Collection
// ----------
export const BillingStripePlans = new Mongo.Collection('BillingStripePlans')
BillingStripePlans.attachSchema(BillingStripePlan)

// Security Policy (no direct insert on client side)
BillingStripePlans.allow({
  insert() {
    return false
  },
  update() {
    return false
  },
  remove() {
    return false
  },
})

BillingStripePlans.deny({
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
