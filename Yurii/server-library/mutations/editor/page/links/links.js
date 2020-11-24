import gql from 'graphql-tag'

export const LINKS = gql`
  query fetchLinks {
    page {
      links {
        list {
          label
          platform
          sequenceNr
          text
          name
          type
          url
          username
        }
        border
        circle
        position
        square
        shape
        size
        colorLinks
        colorLinksAccent
        colorLinksBackground
        colorLinksBackgroundAccent
      }
    }
  }
`
