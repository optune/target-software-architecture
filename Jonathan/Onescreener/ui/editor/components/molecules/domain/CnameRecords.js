// React
import React, { Fragment } from 'react'
import { useTranslation } from 'react-i18next'
import styled, { css } from 'styled-components'

// React Components
import { MediaSmall } from '@optune/onescreener-base-components'

// Atoms
import { InfoText } from '../../atoms/text/InfoText'

// Styles
import { ForegroundColor, BackgroundColor } from '../../../styles/color'
import { ButtonShadow } from '../../../styles/shadow'

const RecordText = styled.div`
  margin-top: ${({ header }) => (header ? 2 : 1)}rem;
  padding: 1rem 1.5rem;
  display: flex;
  width: 100%;
  justify-content: space-between;

  ${({ header }) =>
    !header &&
    css`
      background: ${BackgroundColor.secondary};
      border-radius: 0.2rem;
      box-shadow: ${ButtonShadow};
    `}

  & p, h3 {
    width: 30%;
    font-size: 1rem;
    text-align: left;
    word-break: break-word;

    &.cname-type {
      width: 15%;

      & span {
        line-height: 1.2;
      }
    }
  }

  @media ${MediaSmall} {
    display: block;
    text-align: left;

    & p,
    h3 {
      width: 100%;
    }
  }
`

const TypeText = {
  CNAME: {
    label: 'CNAME',
  },
  TLS: {
    label: 'CNAME',
    hint: 'tls',
  },
  ALIAS: {
    label: 'ALIAS',
    hint: 'optional',
  },
}

const RecordTypeText = ({ type }) => {
  const { t } = useTranslation()
  const text = TypeText[type]

  return (
    <p className="cname-type font-medium-bold">
      {text.label}
      <br />
      {!!text.hint && (
        <span className="font-tiny-regular text-light">
          {t(`domain.add.registered.record.${text.hint}`)}
        </span>
      )}
    </p>
  )
}

export const CnameRecords = ({ cnames, domainName }) => {
  const { t } = useTranslation()

  let cleanDomain = domainName

  if (domainName.startsWith('www.')) {
    cleanDomain = domainName.slice(4)
  }

  const subDomains = ['www', '', '*']

  return (
    <Fragment>
      <InfoText>{t('domain.add.registered.cnameInfo')}</InfoText>

      <RecordText header>
        <h3 className="cname-type text-light">{t('domain.add.registered.record.type')}</h3>
        <h3 className="text-light">{t('domain.add.registered.record.name')}</h3>
        <h3 className="text-light">{t('domain.add.registered.record.host')}</h3>
        <h3 className="text-light">{t('domain.add.registered.record.content')}</h3>
      </RecordText>

      {cnames.map((cname, index) => (
        <RecordText key={cname.name}>
          <RecordTypeText type={cname.type} />
          <p className="font-medium-bold">{cleanDomain}</p>
          <p className="font-medium-bold">{subDomains[index]}</p>
          <p className="font-medium-bold">{cname.content}</p>
        </RecordText>
      ))}
    </Fragment>
  )
}
