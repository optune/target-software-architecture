import React, { Fragment, useState } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

// Atoms
import { Text } from '../../atoms/text/InfoText'
import { ShareLink } from '../../atoms/links/ShareLink'
import { ShareButton } from '../../atoms/links/ShareButton'
import { ShareIcon } from '../../atoms/icons/shareLinks/Share'
import { CopyLinkIcon } from '../../atoms/icons/shareLinks/CopyLink'

// Styles
import {
  ColorWhite,
  ColorSecondary10,
  ColorSecondary30,
  ColorSecondary90,
  ColorHarlequin,
} from '../../../styles/color'
import { ZIndex1, ZIndex2 } from '@optune/react-base-components'

// API
import { ShareableLinks, mapToNewDomainFormat } from '/imports/api'

const Share = styled(ShareIcon)`
  width: 19px;
  height: 17px;

  & > g > path {
    fill: none;
    stroke: ${ColorSecondary10};
  }
`

const StyledText = styled(Text)`
  font-size: 16px;
  color: ${ColorSecondary30};
`

const ShareIconWrapper = styled.div`
  width: 32px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
  background-color: white;
  border-radius: 2px;

  &:hover {
    background-color: ${ColorSecondary90};
    cursor: pointer;
  }
`

const ShareContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: ${ZIndex2};
`

const ShareList = styled.div`
  position: absolute;
  bottom: 200%;
  left: 50%;
  transform: translate(-50%, 50%);
  opacity: ${({ open }) => (open ? '1' : '0')};
  pointer-events: ${({ open }) => (open ? 'auto' : 'none')};
  min-height: 50px;
  background-color: gray;
  border-radius: 2px;
  width: 180px;
  background: #ffffff;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.15);

  display: flex;
  flex-direction: column;
`

const ShareModalClose = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: ${ZIndex1};
`
const Spacing = styled.div`
  height: 100px;
  transition: height 0.3s ease-out;
`

const CopyAlertContainer = styled.div`
  @keyframes fade-out {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }

  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  bottom: 90px;
  width: 200px;
  background-color: ${ColorWhite};
  border: 1px solid ${ColorSecondary90};
  border-radius: 2px;
  height: 35px;
  height: 40px;
  animation-name: fade-out;
  animation-duration: 0.5s;
  animation-delay: 1.5s;
`

const CopyAlertText = styled(Text)`
  color: ${ColorHarlequin};
  font-size: 14px;
  font-weight: 500;
`

export const ShareComponent = ({ domain }) => {
  const { t } = useTranslation()

  const [isCopied, setIsCopied] = useState(false)
  const [isListOpen, setIsListOpen] = useState(false)

  let domainName = domain.isSubdomain ? mapToNewDomainFormat(domain.name) : domain.name
  if (domainName.startsWith('www.')) domainName = domainName.slice(4)

  return (
    <Fragment>
      {isListOpen && <ShareModalClose onClick={() => setIsListOpen(false)} />}
      <ShareContainer>
        <StyledText>
          <a href={domain.url} target="_blank" rel="noreferrer">
            www.{domainName}
          </a>
        </StyledText>
        <ShareIconWrapper onClick={() => setIsListOpen(!isListOpen)}>
          <Share />
        </ShareIconWrapper>
        {isCopied && (
          <CopyAlertContainer>
            <CopyAlertText>{t('edit.overview.copied')}</CopyAlertText>
          </CopyAlertContainer>
        )}
        <ShareList open={isListOpen}>
          {Object.values(ShareableLinks).map((socialName) => (
            <ShareLink
              key={socialName}
              name={socialName}
              url={name}
              domainUrl={domain.url}
              onClose={() => setIsListOpen(false)}
              onCopy={() => {
                setIsCopied(true)
                setTimeout(() => {
                  setIsCopied(false)
                }, 2000)
              }}
            />
          ))}
        </ShareList>
      </ShareContainer>
      <Spacing />
    </Fragment>
  )
}
