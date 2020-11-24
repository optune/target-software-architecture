/* eslint-disable react/prop-types */

import React from 'react'
import styled from 'styled-components'

// React Components
import { getImageUrl } from '@optune/onescreener-base-components'

// API
import { LogoType } from '/imports/api'

// Styles
import { addFont } from '../../../styles/font'

const getUrl = getImageUrl(true)

const LogoImageSize = {
  XS: '1.8rem',
  S: '3.5rem',
  M: '7rem',
  L: '14rem',
  XL: '21rem',
}

const LogoTextSize = {
  XS: '1.2rem',
  S: '1.8rem',
  M: '3rem',
  L: '6rem',
  XL: '10rem',
}

const LogoImage = styled.img`
  display: block;
  object-fit: contain;
  height: ${({ size = 'M' }) => LogoImageSize[size]};
  margin: 1rem;
`

const LogoText = styled.p`
  display: block;
  text-align: center;
  font-size: ${({ size }) => LogoTextSize[size]};
  color: ${({ color = '#FFFFFF' }) => color};
  margin: 1rem;
  white-space: nowrap;
`

export const LogoBox = ({ logo }) => {
  const logoText = (logo.type === 'TEXT' && logo.text) || {}
  if (logoText.title > '' && logoText.font > '') {
    addFont({ font: logoText.font })
  }

  return (
    (logo.type === 'IMAGE' && <LogoImage src={getUrl(logo)} size={logo.size} />) ||
    (logoText.title > '' && (
      <LogoText color={logoText.color} size={logo.size} className="apply-font">
        {logoText.title}
      </LogoText>
    )) ||
    null
  )
}
