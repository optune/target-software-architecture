// React
import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

// Atoms
import { OptionButton } from '../../atoms/buttons/OptionButton'

const SizeContainer = styled.div`
  display: flex;
`
export const SelectSize = ({ size, options, onChange }) => (
  <SizeContainer>
    {size !== null &&
      options.map((sizeOption) => (
        <OptionButton
          key={sizeOption}
          round
          secondary
          selected={size === sizeOption}
          shadow
          onClick={() => onChange(sizeOption)}
        >
          {sizeOption}
        </OptionButton>
      ))}
  </SizeContainer>
)
