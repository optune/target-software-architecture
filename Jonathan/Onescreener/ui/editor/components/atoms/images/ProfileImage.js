import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

// React Components
import { getImageUrl } from '@optune/onescreener-base-components'

import { ButtonShadow } from '../../../styles/shadow'

const Image = styled.img`
  border-radius: 50%;
  width: 100%;
  height: 100%;
  box-shadow: ${ButtonShadow};
`

const defaultImage =
  'http://res.cloudinary.com/optune-me/image/upload/c_scale,w_500/v1506682349/optune/utils/placeholder-person.png'

const getUrl = getImageUrl(true)

export const ProfileImage = ({ image }) => (
  <Image
    src={image ? getUrl({ image, maxWidth: 90, maxHeight: 60 }) : defaultImage}
    alt="Profile Picture"
  />
)
