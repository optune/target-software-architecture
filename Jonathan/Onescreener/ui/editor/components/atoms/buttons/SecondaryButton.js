import styled from 'styled-components'

// Styles
import {
  BackgroundColor,
  ForegroundColor,
  ColorSecondary10,
  ColorSecondary150,
} from '../../../styles/color'

export const SecondaryButton = styled.button`
  font-size: 16px;
  font-weight: 600;
  color: ${ColorSecondary10};
  background-color: ${ColorSecondary150};
  border-radius: 2px;

  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};
  text-align: center;
  padding: 14px 2rem;
  border-radius: 2px;
  transition: color 0.35s, background-color 0.35s;
  margin: 14px auto;

  &:hover {
    text-decoration: none;
    background-color: ${BackgroundColor.hover};
    color: ${ForegroundColor.hover};
  }
`
