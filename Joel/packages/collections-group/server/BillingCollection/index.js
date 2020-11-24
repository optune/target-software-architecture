// Meteor imports
import { Meteor } from 'meteor/meteor'
import { Mongo } from 'meteor/mongo'

// Schemas
import Billing from '../../schemas/Billing'

// Collection
// ----------
export const Billings = new Mongo.Collection('Billings')
Billings.attachSchema(Billing)
Billings.attachBehaviour('timestampable')

if (Meteor.isServer) {
  // Add group index
  Billings._ensureIndex(
    {
      groupId: 1,
    },
    {
      name: 'group-index',
    }
  )

  // Add stripe customer index
  Billings._ensureIndex(
    {
      'services.stripe.customerId': 1,
    },
    {
      name: 'stripe-customer-index',
    }
  )
}

// Security Policy (no direct insert on client side)
Billings.allow({
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

Billings.deny({
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
