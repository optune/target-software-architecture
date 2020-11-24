/* eslint-disable react/prop-types */
import React from 'react'
import styled from 'styled-components'

import { ForegroundColor } from '../../../styles/color'
import { SelectShadow } from '../../../styles/shadow'

import { Links } from '@optune/onescreener-base-components'

import { Size } from '/imports/api'

const ContentContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 0.5rem;
  margin-bottom: 0.4rem;
  background: repeating-linear-gradient(45deg, transparent, transparent 10px, #ccc 10px, #ccc 20px),
    linear-gradient(to bottom, #eee, #999);
  border-radius: 0.2rem;
  border: 1px solid ${ForegroundColor.light};
  box-shadow: ${SelectShadow};
  max-width: 800px;
`

export const LinksPreviewContainer = ({ links, linksColorState, mediaQuery }) => (
  <ContentContainer>
    {Links({
      links: {
        ...links,
        list: links.list.map((link) => ({ ...link, url: undefined })), // Avoid navigation to external platforms on overview
        size:
          ['mobile', 'small'].includes(mediaQuery) && links.size === Size.L ? Size.M : links.size,
      },
      linksColorState,
    })}
  </ContentContainer>
)
