/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'

import { Button } from '../../atoms/buttons/Button'

import { ColorPicker } from './ColorPicker'

// GraphQL
import { CHANGE_LINKS_COLOR } from '../../../graphql/mutations'
import { withMutation } from '../../../mixins/withMutation'

const getColors = (t) => [
  {
    colorLinksType: 'colorLinks',
    // colorContentType: 'color',
    title: t('edit.colors.links.color'),
    shortTitle: t('edit.colors.links.colorShort'),
  },

  {
    colorLinksType: 'colorLinksBackground',
    // colorContentType: 'colorBackground',
    title: t('edit.colors.links.colorBackground'),
    shortTitle: t('edit.colors.links.colorBackgroundShort'),
  },
  {
    colorLinksType: 'colorLinksAccent',
    // colorContentType: 'colorAccent',
    title: t('edit.colors.links.colorAccent'),
    shortTitle: t('edit.colors.links.colorAccentShort'),
  },
  {
    colorLinksType: 'colorLinksBackgroundAccent',
    // colorContentType: 'colorBackgroundAccent',
    title: t('edit.colors.links.colorBackgroundAccent'),
    shortTitle: t('edit.colors.links.colorBackgroundAccentShort'),
  },
]

const ColorContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 0.8rem;
  margin-bottom: 0.7rem;
  color: black;
`

const ColorSelector = ({ colorType, color, linksColors, shortTitle, setLinksColors, ...other }) => (
  <ColorPicker
    color={color}
    light
    shortTitle={shortTitle}
    onSave={(color) => setLinksColors({ ...linksColors, [colorType]: color })}
    {...other}
  />
)

export const LinksColorPicker = ({ linksColors, setLinksColors }) => {
  const { t } = useTranslation()

  const [openState, setOpenState] = useState({ type: undefined, open: false })

  const colors = getColors(t)

  return (
    <ColorContainer>
      {colors.map(({ colorLinksType, title, shortTitle }) => (
        <ColorSelector
          key={colorLinksType}
          color={linksColors[colorLinksType]}
          colorType={colorLinksType}
          linksColors={linksColors}
          open={openState.type === colorLinksType && openState.open}
          title={title}
          setLinksColors={setLinksColors}
          setOpen={(isOpen) => setOpenState({ type: colorLinksType, open: isOpen })}
          shortTitle={shortTitle}
        />
      ))}
    </ColorContainer>
  )
}
