// Meteor
import { Meteor } from 'meteor/meteor'
import { Mongo } from 'meteor/mongo'

// Schemas
import { DocumentHistory } from '../../schemas/DocumentHistory'

// Collection
// ----------
export const DocumentHistories = new Mongo.Collection('DocumentHistories')
DocumentHistories.attachSchema(DocumentHistory)

if (Meteor.isServer) {
  // DocumentHistories ensure booking id index
  DocumentHistories._ensureIndex(
    {
      documentId: 1,
      versionNr: 1,
    },
    {
      name: 'document-index',
    }
  )
}

// Security Policy (no direct insert on client side)
DocumentHistories.allow({
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

DocumentHistories.deny({
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
