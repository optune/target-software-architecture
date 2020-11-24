// React
import React, { useState } from 'react'
import styled from 'styled-components'

// API
import { Position } from '/imports/api'

// Atoms
import { Button } from '../../atoms/buttons/Button'

// Icons
import { AlignLeftIcon } from '../../atoms/icons/control/AlignLeft'
import { AlignCenterIcon } from '../../atoms/icons/control/AlignCenter'
import { AlignRightIcon } from '../../atoms/icons/control/AlignRight'

const AlignHorizontalContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
`
const WordWrapContainer = styled.div`
  display: flex;
`

const OptionIcon = {
  [Position.CENTER_LEFT]: AlignLeftIcon,
  [Position.CENTER_CENTER]: AlignCenterIcon,
  [Position.CENTER_RIGHT]: AlignRightIcon,
}

const OptionButton = styled(Button)`
  margin: 0 0.5rem;
  padding: 1rem;
  width: auto;
`

export const AlignHorizontalSelector = ({ alignHorizontal, setAlignHorizontal }) => (
  <AlignHorizontalContainer>
    {alignHorizontal !== null &&
      [Position.CENTER_LEFT, Position.CENTER_CENTER, Position.CENTER_RIGHT].map(
        (positionOption) => (
          <OptionButton
            key={positionOption}
            round
            shadow
            secondary
            selected={alignHorizontal === positionOption}
            onClick={() => setAlignHorizontal(positionOption)}
          >
            {OptionIcon[positionOption]({})}
          </OptionButton>
        )
      )}
  </AlignHorizontalContainer>
)
