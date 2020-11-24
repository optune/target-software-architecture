// Npm
import slug from 'slugify'
import styled from 'styled-components'
// React
import React, { Fragment, useState, useEffect, useCallback } from 'react'
import { useTranslation } from 'react-i18next'

// React Components
import { Row, Column } from '@optune/react-base-components'

// Atoms
import { Input } from '../../atoms/forms/Input'
import { UpgradeButton } from '../../atoms/buttons/UpgradeButton'
import { SubTitle } from '../../atoms/text/SubTitle'

// Color
import {
  ColorHarlequin,
  ColorLightHarlequin,
  ColorSecondary40,
  ColorSecondary90,
  BackgroundColor,
  ForegroundColor,
  ColorWhite,
} from '../../../styles/color'

//Styles
import { MediaSmall } from '@optune/onescreener-base-components'

const ContentInput = styled.div`
  align-items: center;
  justify-content: center;
  display: flex;
  align-self: center;
  margin: 36px 0 23px;
`
const StyledInput = styled(Input)`
  max-width: 300px;
  height: 40px;
  border-right: none;
`

const StyledInfoText = styled(SubTitle)`
  color: ${ColorSecondary40};
`

const StyledButton = styled(UpgradeButton)`
  height: 40px;
  background-color: ${ColorHarlequin};
  color: ${ColorWhite};
  border-radius: 0 2px 2px 0;
  font-size: 14px;
  margin: 0 auto;

  @media ${MediaSmall} {
    background-color: ${ColorLightHarlequin};
  }
`

const parseDomain = (value) =>
  value > ''
    ? value
        .split('.')
        .slice(-2)
        .map((domainPart) => domainPart.replace(/[^a-zA-Z0-9-_]/g, ''))
        .join('.')
    : ''

const initialRegistrationStatus = {
  available: undefined,
  error: undefined,
  tldAvailable: false,
  tldExists: false,
  valid: false,
  validated: false,
}

export const DomainChecker = ({
  artistName,
  domainName,
  hasPremiumPlan,
  mutate,
  onChecking,
  onDomainCheckChanged,
  onDomainNameChanged,
  onUpdatePlan,
  setIsDomainNameValid,
  setShowSuggestions,
  textReference,
  isValid,
}) => {
  const { t } = useTranslation()

  /*
   * Set new domain name as value
   */

  const [initialValue, setInitialValue] = useState(
    parseDomain(domainName || `${slug(artistName).toLowerCase()}.com`)
  )
  // const [value, setValue] = useState(initialValue)
  const [value, setValue] = useState('')
  const [isAvailable, setIsAvailable] = useState(true)
  const [resetCheck, setResetCheck] = useState(true)
  const onFocus = useCallback(() => setResetCheck(true))
  const onBlur = () => setValue(parseDomain(value))
  const onChange = useCallback(
    (event) => {
      setValue(event.target.value)
      if (event.target.value > '' && event.target.value.split('.').length > 1) {
        setIsDomainNameValid && setIsDomainNameValid(true)
      } else {
        setIsDomainNameValid && setIsDomainNameValid(false)
      }
      if (resetCheck) {
        setResetCheck(false)
        onDomainCheckChanged(initialRegistrationStatus)
        if (typeof setShowSuggestions === 'function') {
          setShowSuggestions(false)
        }
      }
    },
    [resetCheck]
  )

  /*
   * Check initial domain name if it is set
   */

  const onCheckDomain = useCallback((value) => {
    //TODO: Modify to accept brazilian domains in future. ie: wwwmy-webpage.com.brace-level-10
    if (value.split('.').length === 2) {
      onChecking(true)
      mutate({ domainName: value })
        .then((result) => {
          const { checkDomain } = result.data
          onDomainNameChanged(value)
          setInitialValue(value)
          onChecking(false)
          if (typeof setShowSuggestions === 'function') {
            if (checkDomain.available) {
              setShowSuggestions(false)
            } else {
              setShowSuggestions(true)
              setIsAvailable(false)
            }
          }
          onDomainCheckChanged({
            ...checkDomain,
            validated: true,
          })
        })
        .catch((error) => {
          onChecking(false)
          onDomainCheckChanged({
            ...initialRegistrationStatus,
            error: error.message,
            validated: true,
          })
        })
    } else {
      onDomainCheckChanged({
        ...initialRegistrationStatus,
        valid: false,
        validated: true,
      })
    }
  }, [])

  useEffect(() => {
    if (domainName > '') {
      setValue(domainName)
    }
  }, [domainName])

  // Reset registration status
  const dirty = value > '' && value.split('.').length > 1

  return (
    <Fragment>
      <ContentInput center marginBottom={hasPremiumPlan}>
        <StyledInfoText>www.</StyledInfoText>
        <StyledInput
          dataCyInput="domain"
          value={value}
          placeholder={'your domain'}
          onBlur={onBlur}
          onChange={onChange}
          onFocus={onFocus}
          small
        />
        <StyledButton
          data-cy="domain-check"
          // disabled={!dirty}
          onClick={() => (isValid ? onUpdatePlan() : onCheckDomain(value))}
        >
          {t(`${textReference}.buttonText`)}
        </StyledButton>
      </ContentInput>

      <Row center marginBottom>
        <Column twoThird center>
          {textReference.indexOf('upgrade') === -1 && (
            <StyledInfoText>{isAvailable && t(`${textReference}.info`)}</StyledInfoText>
          )}
        </Column>
      </Row>
    </Fragment>
  )
}
