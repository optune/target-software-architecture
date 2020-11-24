/* eslint-disable react/prop-types */
import React from 'react'
import styled from 'styled-components'

import { ForegroundColor } from '../../../styles/color'
import { SelectShadow } from '../../../styles/shadow'

const ContentContainer = styled.div`
  position: relative;
  width: 100%;
  margin-top: 0.5rem;
  margin-bottom: 0.4rem;
  padding: 1rem 2rem;
  background: ${({ colorBackground }) => colorBackground};
  border-radius: 0.2rem;
  border: 1px solid ${ForegroundColor.light};
  box-shadow: ${SelectShadow};
  transition: color 0.3s ease-out, background-color 0.3s ease-out;
`

const ContentText = styled.h3`
  color: ${({ color }) => color};
  transition: color 0.3s ease-out, background-color 0.3s ease-out;
`

const ContentLinkText = styled.h3`
  color: ${({ colorAccent }) => colorAccent};
  transition: color 0.3s ease-out, background-color 0.3s ease-out;
`

export const ContentPreviewContainer = ({
  contentColors: { color, colorAccent, colorBackground },
  previewText = 'Sample text',
  previewLink = 'Sample active text',
}) => {
  return (
    <ContentContainer colorBackground={colorBackground}>
      <ContentText color={color}>{previewText}</ContentText>
      <ContentLinkText color={color} colorAccent={colorAccent}>
        {previewLink}
      </ContentLinkText>
    </ContentContainer>
  )
}
