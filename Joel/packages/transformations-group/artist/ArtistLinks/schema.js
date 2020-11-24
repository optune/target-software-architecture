// Meteor
import { SimpleSchema } from 'meteor/aldeed:simple-schema'

// Utils
import adjustUrl from '../../../utils/adjustUrl'

export const schema = new SimpleSchema({
  facebook: {
    type: String,
    optional: true,
    regEx: SimpleSchema.RegEx.Url,
    autoValue() {
      return adjustUrl(this.value)
    },
  },
  instagram: {
    type: String,
    optional: true,
    regEx: SimpleSchema.RegEx.Url,
    autoValue() {
      return adjustUrl(this.value)
    },
  },
  soundcloud: {
    type: String,
    optional: true,
    regEx: SimpleSchema.RegEx.Url,
    autoValue() {
      return adjustUrl(this.value)
    },
  },
  spotify: {
    type: String,
    optional: true,
    regEx: SimpleSchema.RegEx.Url,
    autoValue() {
      return adjustUrl(this.value)
    },
  },
  itunes: {
    type: String,
    optional: true,
    regEx: SimpleSchema.RegEx.Url,
    autoValue() {
      return adjustUrl(this.value)
    },
  },
  soundLink: {
    type: String,
    optional: true,
    regEx: SimpleSchema.RegEx.Url,
    autoValue() {
      return adjustUrl(this.value)
    },
  },
  website: {
    type: String,
    optional: true,
    regEx: SimpleSchema.RegEx.Url,
    autoValue() {
      return adjustUrl(this.value)
    },
  },
  otherLink: {
    type: String,
    optional: true,
    regEx: SimpleSchema.RegEx.Url,
    autoValue() {
      return adjustUrl(this.value)
    },
  },
})
