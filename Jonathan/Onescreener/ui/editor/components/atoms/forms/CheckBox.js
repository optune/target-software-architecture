import React from 'react'
import styled from 'styled-components'

import { ForegroundColor, BackgroundColor } from '../../../styles/color'

/* Customize the label (the container) */
const CheckContainer = styled.label`
  display: block;
  position: relative;
  padding-left: 2.5rem;
  margin: ${({ margin }) => (margin !== undefined ? margin : 1.5)}rem 2rem;
  cursor: pointer;
  user-select: none;

  /* Hide the browser's default checkbox */
  & input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }

  /* On mouse-over, add a grey background color */
  &:hover input ~ .check-field {
    background-color: ${BackgroundColor.hover};

    &:after:not[checked] {
      border: solid ${ForegroundColor.hover};
      border-width: 0 3px 3px 0;
    }
  }

  /* When the checkbox is checked, add a blue background */
  & input:checked ~ .check-field {
    background: ${BackgroundColor.selectedGradient()};
    border: 1px solid transparent;
  }

  /* Create the check-field/indicator (hidden when not checked) */
  & .check-field:after {
    content: '';
    position: absolute;
    display: block;
  }

  /* Show the check-field when checked */
  & input:checked ~ .check-field:after {
    border: solid ${ForegroundColor.selected};
    border-width: 0 3px 3px 0;
  }
`

const Label = styled.h3`
  position: relative;
  color: ${ForegroundColor.secondary};
  padding-top: 5px;
  margin: 0.1rem 1rem;
`

/* Create a custom checkbox */
const Field = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  height: 28px;
  width: 28px;
  background-color: ${BackgroundColor.secondary};
  border: 1px solid ${ForegroundColor.secondary};
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.08), 0 1px 0 0 rgba(0, 0, 0, 0.05),
    0 0 0 1px rgba(0, 0, 0, 0.05);
  border-radius: 0.2rem;
  transition: background-color 0.3s, border 0.3s;

  /* Style the checkmark/indicator */
  &.check-field:after {
    left: 8px;
    top: 2px;
    width: 10px;
    height: 18px;
    border: solid ${ForegroundColor.selected};
    border-width: 0 3px 3px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
  }
`

export const CheckBox = ({ name, checked, setChecked, label, margin }) => (
  <CheckContainer margin={margin}>
    {label && <Label>{label}</Label>}
    <input type="checkbox" checked={checked} name={name} onChange={() => setChecked(!checked)} />
    <Field className="check-field" />
  </CheckContainer>
)
