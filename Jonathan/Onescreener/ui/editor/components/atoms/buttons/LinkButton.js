import { Link } from '@reach/router'
import styled from 'styled-components'

// Styles
import {
  BackgroundColor,
  ForegroundColor,
  ColorSecondary10,
  ColorSecondary150,
} from '../../../styles/color'
import { MediaMobile } from '@optune/onescreener-base-components'

export const LinkButton = styled(Link)`
  display: block;
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

  @media ${MediaMobile} {
    width: 100%;
  }
`

export const HrefButton = styled.a`
  display: block;
  font-size: 16px;
  font-weight: 600;
  color: ${ColorSecondary10};
  background-color: transparent;
  border-radius: 2px;
  border: 1px solid ${ColorSecondary150};

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

  @media ${MediaMobile} {
    width: 100%;
  }
`
