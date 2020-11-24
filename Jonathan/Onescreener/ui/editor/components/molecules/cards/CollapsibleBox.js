// React
import React, { Fragment } from 'react'
import './CollapsibleBox.css'
import Collapsible from 'react-collapsible'
import styled from 'styled-components'

// Styles
import { ForegroundColor } from '../../../styles/color'

// Atoms
import { StylePalletIcon } from '../../atoms/icons/info/StylePallet'
import { LayoutIcon } from '../../atoms/icons/info/Layout'
import { ArrowDownIcon } from '../../atoms/icons/info/ArrowDown'

const Container = styled.div`
  display: grid;
  grid-template-columns: 24px auto 24px;
  grid-row-gap: 0px;

  width: 100%;
  height: 2rem;

  align-items: center;
`

const PalletIcon = styled(StylePalletIcon)`
  grid-column: 1/1;
  min-width: 20px;
  min-height: 20px;
  max-width: 20px;
  max-height: 20px;
  width: auto;
  height: auto;
  margin-right: 0.5rem;
`

const LayIcon = styled(LayoutIcon)`
  grid-column: 1/1;
  min-width: 20px;
  min-height: 20px;
  max-width: 20px;
  max-height: 20px;
  width: auto;
  height: auto;
  margin-right: 0.5rem;
`

const Arrow = styled(ArrowDownIcon)`
  min-width: 20px;
  min-height: 20px;
  max-width: 20px;
  max-height: 20px;
  width: auto;
  height: auto;
`

const ArrowContainer = styled.div`
  grid-column: 3/3;

  justify-self: flex-end;
  align-self: center;
  display: flex;
`

const Description = styled.p`
  grid-column: 2/2;
  align-self: center;

  color: ${ForegroundColor.secondary};
`

const SettingsTitle = ({ title, icon }) => {
  return (
    <Container>
      {icon}
      <Description>{title}</Description>
      <ArrowContainer>
        <Arrow />
      </ArrowContainer>
    </Container>
  )
}

export const CollapsibleBox = ({ layoutChildren, positionChildren }) => {
  return (
    <Fragment>
      {layoutChildren && (
        <Collapsible trigger={<SettingsTitle title="Layout" icon={<LayIcon />} />}>
          {layoutChildren}
        </Collapsible>
      )}

      {positionChildren && (
        <Collapsible trigger={<SettingsTitle title="Style" icon={<PalletIcon />} />}>
          {positionChildren}
        </Collapsible>
      )}
    </Fragment>
  )
}
