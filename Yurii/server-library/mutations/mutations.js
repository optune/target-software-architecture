import gql from 'graphql-tag'

/*
 * Signup
 */

export const CHECK_EMAIL = gql`
  mutation CheckEmail($values: UserEmailInput!) {
    checkEmail(input: $values) {
      exists
    }
  }
`
export const SET_USER_PROFILE = gql`
  mutation SetUserProfile($values: UserProfileInput!) {
    setUserProfile(input: $values)
  }
`
export const SET_USER_DOMAIN = gql`
  mutation SetUserDomain($values: UserDomainInput!) {
    setUserDomain(input: $values)
  }
`
export const SET_ARTIST = gql`
  mutation SetArtist($values: ArtistInput!) {
    setArtist(input: $values)
  }
`

/*
 * Billing
 */

const SUBSCRIPTION_STATUS = `
  clientSecret
  currency
  interval
  isActionRequired
  isCardSetupAction
  paymentMethod
  price
  product
  success
`

export const ADD_SUBSCRIPTION = gql`
  mutation addSubscription($values: CreditCardInput!) {
    addSubscription(input: $values) {
      error
      errorWithTryAgain
      subscription {
        ${SUBSCRIPTION_STATUS}
      }
    }
  }
`
export const ADD_CREDIT_CARD = gql`
  mutation addCreditCard($values: CreditCardInput!) {
    addCreditCard(input: $values) {
      error
      errorWithTryAgain
      subscription {
        ${SUBSCRIPTION_STATUS}
      }
    }
  }
`

export const START_CHECKOUT = gql`
  mutation startCheckout($values: CheckoutInput!) {
    startCheckout(input: $values)
  }
`

export const UPDATE_LEGACY_SUBSCRIPTION = gql`
  mutation updateLegacySubscription($values: CreditCardInput!) {
    updateLegacySubscription(input: $values) {
      success
      error
    }
  }
`

/*
 * Domain handling
 */

export const ADD_DOMAIN = gql`
  mutation addDomain($values: DomainRegistrationInput!) {
    addDomain(input: $values) {
      available
      currency
      error
      errorWithTryAgain
      price
      registered
      valid
      subscription {
        ${SUBSCRIPTION_STATUS}
      }
    }
  }
`
export const CHECK_DOMAIN = gql`
  mutation checkDomain($values: DomainInput!) {
    checkDomain(input: $values) {
      available
      currency
      error
      price
      registered
      tldAvailable
      tldExists
      valid
    }
  }
`

export const CHECK_DOMAIN_STATUS = gql`
  mutation checkDomainStatus($values: DomainInput!) {
    checkDomainStatus(input: $values)
  }
`

export const CHANGE_DOMAIN_STATUS = gql`
  mutation changeDomainStatus($values: DomainStatusInput!) {
    changeDomainStatus(input: $values) {
      isPageLive
    }
  }
`

export const REGISTER_DOMAIN = gql`
  mutation registerDomain($values: DomainRegistrationInput!) {
    registerDomain(input: $values) {
      available
      currency
      error
      errorWithTryAgain
      price
      registered
      tldAvailable
      tldExists
      valid
      subscription {
        ${SUBSCRIPTION_STATUS}
      }
    }
  }
`

export const SET_DOMAIN_REGISTRATION_PAGE_VISITED = gql`
  mutation setDomainRegistrationPageVisited($values: DomainRegistrationPageInput!) {
    setDomainRegistrationPageVisited(input: $values)
  }
`

/*
 * Edit Onescreener Page
 */

export const ADD_LINK = gql`
  mutation addLink($values: LinkInput!) {
    addLink(input: $values) {
      label
      platform
      sequenceNr
      text
      name
      type
      url
      username
    }
  }
`

export const ADD_SMART_LINK = gql`
  mutation addSmartLink($values: [SmartLinkInput!]!) {
    addSmartLink(input: $values) {
      label
      platform
      sequenceNr
      text
      name
      type
      url
      username
    }
  }
`

export const ADD_TEASER_LINK = gql`
  mutation addTeaserLink($values: TeaserLinkInput!) {
    addTeaserLink(input: $values) {
      sequenceNr
      name
      url
    }
  }
`

export const CHANGE_ANALYTICS = gql`
  mutation changeAnalytics($values: AnalyticsInput!) {
    changeAnalytics(input: $values)
  }
`

export const CHANGE_BACKGROUND = gql`
  mutation changeBackground($values: BackgroundInput!) {
    changeBackground(input: $values)
  }
`

export const CHANGE_CONTENT = gql`
  mutation changeContent($values: ContentInput!) {
    changeContent(input: $values)
  }
`

export const CHANGE_COVER = gql`
  mutation changeCover($values: CoverInput!) {
    changeCover(input: $values)
  }
`

export const CHANGE_FAVICON = gql`
  mutation changeFavicon($values: FaviconInput!) {
    changeFavicon(input: $values)
  }
`

export const CHANGE_LINK_ORDER = gql`
  mutation changeLinkOrder($values: LinkOrderInput!) {
    changeLinkOrder(input: $values) {
      label
      platform
      sequenceNr
      type
      url
      username
    }
  }
`
export const CHANGE_LINKS = gql`
  mutation changeLinks($values: LinksInput!) {
    changeLinks(input: $values)
  }
`

export const CHANGE_LINK_BOOKING_REQUEST_SETTINGS = gql`
  mutation changeLinkBookingRequestSettings($values: LinkInputBookingRequest!) {
    changeLinkBookingRequestSettings(input: $values)
  }
`
export const CHANGE_LOGO = gql`
  mutation changeLogo($values: LogoInput!) {
    changeLogo(input: $values)
  }
`

export const CHANGE_PREVIEW_MODE = gql`
  mutation changePreviewMode($values: PreviewModeInput!) {
    changePreviewMode(input: $values)
  }
`

export const CHANGE_THEME_ID = gql`
  mutation changeThemeId($values: ThemeIdInput!) {
    changeThemeId(input: $values)
  }
`
export const CHANGE_THEME = gql`
  mutation changeTheme($values: ThemeInput!) {
    changeTheme(input: $values)
  }
`
export const REMOVE_LINK = gql`
  mutation removeLink($values: LinkInput!) {
    removeLink(input: $values)
  }
`

/*
 * Deploy Onescreener Page
 */

export const PUBLISH = gql`
  mutation publish($values: DomainInput!) {
    deployPage(input: $values) {
      success
      error
    }
  }
`
