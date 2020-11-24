// Meteor imports
import { SimpleSchema } from 'meteor/aldeed:simple-schema'

// Constants
import { ConnectionType } from '../../constants/ConnectionType'

// Utils
import adjustUrl from '../../utils/adjustUrl'

/*
  A Connection holds the information about a connection of an internal object
  (primarily artist, but also venue, etc) to a entity on a remote site such as
  Facebook, Soundcloud, etc.
*/
const Connection = new SimpleSchema({
  // Mandatory fields
  foreignId: {
    type: String,
  },
  connectionType: {
    type: String,
    allowedValues: Object.values(ConnectionType),
  },

  // Optional fields
  /*
    "Data" caches all the data the we received from the remote site. F.e. Facebook
    sends: fan_count, hometown, emails, ...
  */
  data: {
    type: Object,
    optional: true,
    blackbox: true,
  },
  url: {
    type: String,
    regEx: SimpleSchema.RegEx.Url,
    autoValue() {
      return adjustUrl(this.value)
    },
    optional: true,
  },
})

export default Connection
