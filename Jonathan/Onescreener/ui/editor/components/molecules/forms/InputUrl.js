// React
import React from 'react'
import { useTranslation } from 'react-i18next'

// Model
import { validateUrl } from '/imports/model'

// Atoms
import { Input } from '../../atoms/forms/Input'

export const InputUrl = ({ value, onChange, onError, onValidate, ...other }) => {
  const { t } = useTranslation()

  const handleUrlChange = (e) => {
    onChange(e)
    onValidate(false)
  }

  const handleBlur = (e) => {
    const isValidUrl = validateUrl(e.target.value)

    if (isValidUrl) {
      onError('')
      onValidate(true)
    } else {
      onError(t('edit.cover.url.error'))
      onValidate(false)
    }
  }

  return <Input value={value} onChange={handleUrlChange} onBlur={handleBlur} {...other} />
}
