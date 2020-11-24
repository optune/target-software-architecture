import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import { Button } from './Button'

export const ConciergeButton = ({ buttonText, message = 'Hi Optune! ' }) => {
  const { t } = useTranslation()

  const handleClick = useCallback(() => {
    if (typeof window.Intercom === 'function') {
      window.Intercom('showNewMessage', message)
    }
  }, [message])

  return (
    <Button onClick={handleClick}>{buttonText || t('domain.add.registered.helpButtonText')}</Button>
  )
}
