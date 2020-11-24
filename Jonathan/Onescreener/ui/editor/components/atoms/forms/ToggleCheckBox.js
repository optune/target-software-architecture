import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

// Utils
import { renderHtml, MediaSmall } from '@optune/onescreener-base-components'

// Buttons
import { ToggleButton } from '../buttons/ToggleButton'

// Style
import { ForegroundColor } from '../../../styles/color'

const CheckBoxField = styled.div`
  margin: 20px 4px;
`

const TextBox = styled.div`
  margin-right: 15px;

  & a.underlined {
    border-bottom: 1px solid ${ForegroundColor.light};
  }
`

const StyledText = styled.p`
  font-size: 12px;

  @media ${MediaSmall} {
    font-size: 10px;
  }
`

export const ToggleCheckBox = ({ text, label, onBlur, value, name }) => {
  return (
    <CheckBoxField className="flex-middle">
      <TextBox>
        {text && <StyledText className="font-small-regular">{renderHtml(text)}</StyledText>}
      </TextBox>

      <ToggleButton
        action={onBlur}
        active={value === '' ? false : value}
        big
        green
        name={name}
        text={label}
      />
    </CheckBoxField>
  )
}

ToggleCheckBox.propTypes = {
  text: PropTypes.string,
  label: PropTypes.string,
  onBlur: PropTypes.func,
  value: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  name: PropTypes.string,
}
