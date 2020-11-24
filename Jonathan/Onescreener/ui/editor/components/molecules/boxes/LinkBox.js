/* eslint-disable react/prop-types */
import React from 'react'
import styled from 'styled-components'
import { Link } from '@reach/router'

import { Links } from '@optune/onescreener-base-components'

import { Size } from '/imports/api'

const ContentContainer = styled(Link)`
  position: relative;
  display: flex;
  justify-content: space-evenly;
  width: 100%;
  margin-top: 0.5rem;
  margin-bottom: 0.4rem;
`

export const LinkBox = ({ content, links, mediaQuery }) => (
  <ContentContainer to="/edit/links">
    {Links({
      links: {
        ...links,
        list: links.list.map((link) => ({ ...link, url: undefined })), // Avoid navigation to external platforms on overview
        size:
          ['mobile', 'small'].includes(mediaQuery) && links.size === Size.L ? Size.M : links.size,
      },
      content,
    })}
  </ContentContainer>
)
