import React, { useState, useEffect, Fragment } from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'

// Styles
import { ColorWhite, ColorSecondary150 } from '../../../styles/color'

// Components
import { ComponentLoading } from '@optune/react-base-components'
import { renderHtml } from '@optune/onescreener-base-components'

// Atoms
import { InfoText } from '../../atoms/text/InfoText'
import { MediumText } from '../../atoms/text/MediumText'

// TLDs
import { Tlds } from './DomainDictionary'

// Mutations
import { CHECK_DOMAIN } from '../../../graphql/mutations'

// Mixins
import { withMutation } from '../../../mixins/withMutation'

const DomainRow = styled.div`
  display: flex;
  padding: 12px 16px;
  justify-content: center;
  align-items: center;
  width: 100%;
  cursor: pointer;
  border-radius: 0.2rem;
  background: ${ColorWhite};

  box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.05), 0px 1px 2px rgba(0, 0, 0, 0.1);
  border-radius: 2px;
  margin-bottom: 5px;

  & > h3 {
    margin: 0;
  }

  &:hover {
    background-color: ${ColorSecondary150};
  }
`

const DomainTable = styled.div`
  width: 100%;
  padding-top: 1rem;
`

const getDomain = (domain) => domain.split('.').slice(0, 1).join('.')

const reduceArrayLengthToMaxNumber = (arr, max) => {
  while (arr.length > max) {
    arr.splice([Math.floor(Math.random() * arr.length)], 1)
  }
}

const isDomainExistent = (response) => response.data.checkDomainStatus

const removeUndefined = (arrayPromises) =>
  Promise.all(arrayPromises).then((arr) => arr.filter((value) => value !== undefined && value))

const removeExistingValues = (arr, str) => arr.filter((value) => str.indexOf(value) === -1 && value)

const removeHtmlTag = (str) => str.replace('<strong>', '').replace('</strong>', '')

const Suggestion = ({ mutate, setRegistration, setChecking, setDomainName, domain }) => {
  const { t } = useTranslation()

  const handleDomainClick = (domain) => {
    setDomainName(domain)
    setChecking(true)
    setRegistration({
      available: true,
    })
    mutate({ domainName: domain })
      .then((result) => {
        const { checkDomain } = result.data
        setChecking(false)
        setRegistration({
          ...checkDomain,
          validated: true,
        })
      })
      .catch((error) => {
        setChecking(false)
        setRegistration({
          available: false,
          error: error.message,
          tldAvailable: false,
          tldExists: false,
          valid: false,
          validated: true,
        })
      })
  }

  return (
    <DomainRow
      onClick={() => {
        handleDomainClick(removeHtmlTag(domain))
      }}
    >
      <MediumText headline>{renderHtml(domain)}</MediumText>
    </DomainRow>
  )
}

const DomainSuggestion = withMutation(CHECK_DOMAIN)(Suggestion)

export const DomainSuggest = ({
  domainAvailable,
  domainName = 'domain',
  setRegistration,
  setChecking,
  setDomainName,
  setSuggestionsAvailable,
  mutate,
}) => {
  const { t } = useTranslation()

  const [arrayTlds, setArrayTlds] = useState([])
  const [domainTldsLoading, setDomainTldsLoading] = useState(false)

  const MAX_DOMAIN_SUGGESTIONS = 5

  useEffect(() => {
    let finalizedSuggestions

    const createSuggestions = async () => {
      let allowedTlds = removeExistingValues(Tlds, domainName)
      reduceArrayLengthToMaxNumber(allowedTlds, MAX_DOMAIN_SUGGESTIONS)

      const domain = getDomain(domainName)

      const suggestions = allowedTlds.map(async (tld) => {
        const response = await mutate({ domainName: `${domain}.${tld}` })
        return !isDomainExistent(response) ? `${domain}.<strong>${tld}</strong>` : undefined
      })

      finalizedSuggestions = await removeUndefined(suggestions)
      setArrayTlds(finalizedSuggestions)
      setSuggestionsAvailable(finalizedSuggestions.length > 0)
      setDomainTldsLoading(false)
    }

    if (!domainAvailable) {
      setDomainTldsLoading(true)
      createSuggestions()
    }
  }, [])

  const renderDomainSuggestions = (array) =>
    array.map((domain) => (
      <DomainSuggestion
        key={domain}
        domain={domain}
        setRegistration={setRegistration}
        setChecking={setChecking}
        setDomainName={setDomainName}
      />
    ))

  return !domainTldsLoading ? (
    <DomainTable>
      {arrayTlds.length === 0 && <InfoText>{t('domain.register.suggestions.notFound')}</InfoText>}

      {renderDomainSuggestions(arrayTlds)}
    </DomainTable>
  ) : (
    <ComponentLoading />
  )
}
