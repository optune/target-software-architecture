/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'

import { Button } from '../../atoms/buttons/Button'

import { ColorPicker } from '../forms/ColorPicker'

// GraphQL
import { CHANGE_CONTENT_COLOR } from '../../../graphql/mutations'
import { CONTENT } from '../../../graphql/queries'
import { withMutation } from '../../../mixins/withMutation'

const getColors = (t) => [
  {
    colorType: 'color',
    title: t('edit.colors.text.longText'),
    shortTitle: t('edit.colors.text.shortText'),
  },
  {
    colorType: 'colorBackground',
    title: t('edit.colors.background.longText'),
    shortTitle: t('edit.colors.text.shortText'),
  },
  {
    colorType: 'colorAccent',
    title: t('edit.colors.textActive.longText'),
    shortTitle: t('edit.colors.text.shortText'),
  },
  {
    colorType: 'colorBackgroundAccent',
    title: t('edit.colors.backgroundActive.longText'),
    shortTitle: t('edit.colors.text.shortText'),
  },
]

const ColorContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 0.8rem;
  margin-bottom: 0.7rem;
`

const ColorSelector = ({ colorType, color, mutate, refetch, ...other }) => (
  <ColorPicker
    color={color}
    colorType={colorType}
    onSave={(color) => mutate({ colorType, color }).then(() => refetch())}
    {...other}
  />
)

export const ColorBox = withMutation(CHANGE_CONTENT_COLOR)(({ content, mutate, refetch }) => {
  const { t } = useTranslation()

  const [openState, setOpenState] = useState({ type: undefined, open: false })

  const colors = getColors(t)

  return (
    <ColorContainer>
      {colors.map(({ colorType, title }) => (
        <ColorSelector
          key={colorType}
          open={openState.type === colorType && openState.open}
          setOpen={(isOpen) => setOpenState({ type: colorType, open: isOpen })}
          color={content[colorType]}
          colorType={colorType}
          mutate={mutate}
          refetch={refetch}
          title={title}
        />
      ))}
    </ColorContainer>
  )
})
