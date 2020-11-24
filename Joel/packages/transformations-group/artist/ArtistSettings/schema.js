// Meteor
import { SimpleSchema } from 'meteor/aldeed:simple-schema'

import { BookingStatus } from '../../../constants/BookingStatus'

export const schema = new SimpleSchema({
  settingsShowPrivateInfoToManager: {
    type: Boolean,
    optional: true,
    defaultValue: true,
    // should be false but due to compatibility issues with existing solution set to true.
  },
  settingsPublicProfile: {
    type: Boolean,
    optional: true,
    defaultValue: true,
  },
  settingsDefaultBookingStatus: {
    type: String,
    optional: true,
    defaultValue: BookingStatus.CONFIRMED,
    allowedValues: Object.values(BookingStatus),
  },
  settingsDefaultBookingIsPublished: {
    type: Boolean,
    optional: true,
    defaultValue: true,
  },
})
