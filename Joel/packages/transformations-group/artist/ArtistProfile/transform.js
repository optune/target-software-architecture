import { schema } from './schema'

import { getLinks } from '../../../collections/utils/getLinks'
import getArtistSettings from '../../../collections/utils/artist/getArtistSettings'
import { getGenres } from '../../../collections/utils/artist/getGenres'
import getHospitalityRider from '../../../collections/utils/artist/getHospitalityRider'
import getManagerSettings from '../../../collections/utils/artist/getManagerSettings'
import getTechRider from '../../../collections/utils/artist/getTechRider'

export const transform = ({ artist }) =>
  schema.clean({
    ...getLinks(
      getGenres(
        getHospitalityRider(
          getTechRider({
            ...artist,
            attachments: Array.isArray(artist.attachments) ? artist.attachments : [],
          })
        )
      )
    ),
    ...getArtistSettings(artist),
    ...getManagerSettings(artist),
    types: artist.extendedTypes || [artist.type],
  })
