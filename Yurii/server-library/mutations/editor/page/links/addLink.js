import { OptunePlatform } from '../../../constants/Platform'

import { PlatformLink } from '/imports/model'

import { getPage } from './utils/getPage'
import { updatePage } from './utils/updatePage'

import { mapPlatformLinks } from '../../utils/Page/mapPlatformLinks'

const array = (a) => (Array.isArray(a) ? a : [])

export const addLink = function (root, { input }, { userId }) {
  /*
   * Get page & input
   */

  const { page, artist, domain } = getPage({ userId, inclDomain: true })
  const { platform, url, name, username, text } = input

  let links = array(page.links.list).slice()

  /*
   * Add new link
   */
  if (!!OptunePlatform[platform]) {
    links.push({
      platform: PlatformLink[platform],
      username: artist.slug,
      sequenceNr: links.length,
    })
  } else if (url > '' || username > '' || text > '' || name > '') {
    links.push({
      platform: PlatformLink[platform],
      username: username > '' ? username : undefined,
      url: url > '' ? url : undefined,
      name: name > '' ? name : undefined,
      sequenceNr: links.length,
      text: text > '' ? text : undefined,
    })
  }

  /*
   * Set new links
   */

  const values = { links: { list: links } }

  /*
   * Update page
   */

  updatePage({ page, userId, values })

  const mappedPlatformLinks = mapPlatformLinks({ artist, domain, links, page })

  return mappedPlatformLinks
}
