// React
import React, { useState, useEffect, Fragment } from 'react'
import { useTranslation } from 'react-i18next'

// Atoms
import { Input } from '../../atoms/forms/Input'
import { Button } from '../../atoms/buttons/Button'

const parseDomain = (value) =>
  value > ''
    ? value
        .split('.')
        .slice(-2)
        .join('.')
        .replace(/[^a-zA-Z0-9-_]/g, '')
    : ''

const onFocus = (e) => e.target.select()
const onKeyPress = (e) => {
  if (e.which === 13) {
    e.preventDefault()
    e.target.blur()
  }
}

export const DomainInput = ({
  disabled,
  domainName,
  mutate,
  onBlur,
  onChange,
  setChecking,
  setDomainName,
}) => {
  const { t } = useTranslation()

  /*
   * Set new domain name as value
   */

  const [value, setValue] = useState(parseDomain(domainName) || '')
  useEffect(() => {
    if (disabled && domainName > '') {
      setValue(domainName)
    }
  }, [])

  useEffect(() => {
    setValue(domainName)
  }, [disabled, domainName])

  /*
   * Check initial domain name if it is set
   */

  const [initialDomainName] = useState(domainName || '')
  useEffect(() => {
    if (!disabled && initialDomainName > '') {
      setChecking(true)
      mutate({ domainName: initialDomainName })
        .then((result) => {
          const { checkDomain } = result.data
          setChecking(false)
          onBlur({
            ...checkDomain,
            validated: true,
          })
        })
        .catch((error) => {
          setChecking(false)
          onBlur({
            available: false,
            error: error.message,
            tldAvailable: false,
            tldExists: false,
            valid: false,
            validated: true,
          })
        })
    }
  }, [disabled && initialDomainName])

  return (
    <Fragment>
      <Input
        disabled={disabled}
        valid
        onKeyPress={onKeyPress}
        onChange={(e) => setValue(e.target.value)}
        onBlur={(e) => {
          const newDomainName = parseDomain(e.target.value)
          console.log('ON BLUR', newDomainName, domainName)
          if (newDomainName !== domainName) {
            setDomainName(newDomainName)
            setChecking(true)
            mutate({ domainName: newDomainName })
              .then((result) => {
                const { checkDomain } = result.data
                setChecking(false)
                onBlur({
                  ...checkDomain,
                  validated: true,
                })
              })
              .catch((error) => {
                setChecking(false)
                onBlur({
                  available: false,
                  error: error.message,
                  tldAvailable: false,
                  tldExists: false,
                  valid: false,
                  validated: true,
                })
              })
          }
        }}
        onFocus={onFocus}
        value={value}
      />
      <Button
        onClick={(e) => {
          const newDomainName = parseDomain(value)

          setChecking(true)
          mutate({ domainName: newDomainName })
            .then((result) => {
              const { checkDomain } = result.data
              setChecking(false)
              onBlur({
                ...checkDomain,
                validated: true,
              })
            })
            .catch((error) => {
              setChecking(false)
              onBlur({
                available: false,
                error: error.message,
                tldAvailable: false,
                tldExists: false,
                valid: false,
                validated: true,
              })
            })
        }}
      >
        {t('domain.register.initial.buttonCheck')}
      </Button>
    </Fragment>
  )
}
