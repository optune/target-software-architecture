import { ShareableLinks } from '/imports/api'

export const createLink = (name, domainUrl, mobileOrTablet) => {
  switch (name) {
    case ShareableLinks.EMAIL:
      return `mailto:?subject=your%20subject&amp;body=${domainUrl}%20body` // Doesn't really work properly on Chrome
    case ShareableLinks.FACEBOOK:
      return `https://www.facebook.com/sharer/sharer.php?u=${domainUrl}`
    case ShareableLinks.TWITTER:
      return `https://twitter.com/share?url=${domainUrl}`
    case ShareableLinks.TELEGRAM:
      return `https://telegram.me/share/url?url=${domainUrl}`
    case ShareableLinks.WHATSAPP:
      return `https://${mobileOrTablet ? 'api' : 'web'}.whatsapp.com/send?text=${domainUrl}`
    default:
      return '#'
  }
}
