/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'

import { Button } from '../../atoms/buttons/Button'

import { ColorPicker } from './ColorPicker'

// GraphQL
import { CHANGE_CONTENT_COLOR } from '../../../graphql/mutations'
import { withMutation } from '../../../mixins/withMutation'

const getColors = (t) => [
  {
    colorType: 'color',
    title: t('edit.colors.content.color'),
    shortTitle: t('edit.colors.content.colorShort'),
  },
  {
    colorType: 'colorAccent',
    title: t('edit.colors.content.colorAccent'),
    shortTitle: t('edit.colors.content.colorAccentShort'),
  },
  {
    colorType: 'colorBackground',
    title: t('edit.colors.content.colorBackground'),
    shortTitle: t('edit.colors.content.colorBackgroundShort'),
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

const ColorSelector = ({
  color,
  colorType,
  contentColors,
  setContentColors,
  shortTitle,
  ...other
}) => (
  <ColorPicker
    color={color}
    colorType={colorType}
    light
    shortTitle={shortTitle}
    onSave={(color) => setContentColors({ ...contentColors, [colorType]: color })}
    {...other}
  />
)

export const ContentColorPicker = ({ contentColors, setContentColors }) => {
  const { t } = useTranslation()

  const [openState, setOpenState] = useState({ type: undefined, open: false })

  const colors = getColors(t)

  return (
    <ColorContainer>
      {colors.map(({ colorType, title, shortTitle }) => (
        <ColorSelector
          key={colorType}
          open={openState.type === colorType && openState.open}
          setOpen={(isOpen) => setOpenState({ type: colorType, open: isOpen })}
          color={contentColors[colorType]}
          colorType={colorType}
          contentColors={contentColors}
          setContentColors={setContentColors}
          shortTitle={shortTitle}
          title={title}
        />
      ))}
    </ColorContainer>
  )
}
