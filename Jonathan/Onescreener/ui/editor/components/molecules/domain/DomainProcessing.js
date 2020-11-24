// React
import React, { Fragment } from 'react'
import styled from 'styled-components'

// React Components
import {
  CheckIcon,
  SearchIcon,
  Row,
  Column,
  ComponentLoading,
  FontSizeXLarge,
  renderHTML,
} from '@optune/react-base-components'

// Atoms
import { RegisteringIcon } from '../../atoms/icons/domain/Registering'
import { ForegroundColor } from '../../../styles/color'

const ProcessingColumn = styled(Column)`
  min-height: 80px;
  margin-bottom: 1rem;
  justify-content: flex-start;
`

const ProcessingInfo = styled.div`
  position: absolute;
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  opacity: ${({ show }) => (show ? 1 : 0)};
  transition: opacity 0.75s;
`

const ProcessingText = styled.p`
  max-width: 66%;
  color: ${ForegroundColor.secondary};
  margin: 0rem 2rem;
  text-align: center;
  font-size: 16px;

  & .mark {
    font-size: ${FontSizeXLarge};
    font-weight: bold;
  }
`

export const DomainProcessing = ({
  checking,
  registered,
  registerStatus,
  infoText,
  isOkay,
  Text,
  t,
}) => (
  <Row center>
    <ProcessingColumn fullwidth center>
      {(registered && (
        <Fragment>
          <ProcessingInfo show={registerStatus === 'ongoing'}>
            <RegisteringIcon className="big blue animated rotate" />
            <ProcessingText className="font-big-regular">
              {renderHTML(t(`domain.status.ongoing`))}
            </ProcessingText>
          </ProcessingInfo>
          <ProcessingInfo show={registerStatus === 'checking'}>
            <SearchIcon className="big blue" />
            <ProcessingText className="font-big-regular">
              {renderHTML(t(`domain.status.checking`))}
            </ProcessingText>
          </ProcessingInfo>
          <ProcessingInfo show={registerStatus === 'active'}>
            <CheckIcon className="big accent" />
            <ProcessingText className="font-big-regular">
              {renderHTML(t(`domain.status.active`))}
            </ProcessingText>
          </ProcessingInfo>
        </Fragment>
      )) ||
        (checking && <ComponentLoading />) ||
        Text ||
        (!!infoText && <ProcessingText>{infoText}</ProcessingText>) ||
        (isOkay && <CheckIcon className="big accent" />) || <SearchIcon className="big" />}
    </ProcessingColumn>
  </Row>
)
