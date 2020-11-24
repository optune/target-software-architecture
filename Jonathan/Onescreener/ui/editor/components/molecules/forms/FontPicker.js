import React from 'react'

// Package FontPicker
import { default as PackageFontPicker } from 'font-picker-react'

export const FontPicker = ({ activeFontFamily, onFontChange, limit }) => {
  let fontApiKey = Meteor.settings.public.FONT_PICKER_API_KEY

  return (
    <PackageFontPicker
      apiKey={fontApiKey}
      activeFontFamily={activeFontFamily}
      onChange={onFontChange}
      filter={(font) => !font.id.toLowerCase().startsWith('Cera')}
      limit={limit}
    />
  )
}
