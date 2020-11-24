import React from 'react'
import styled from 'styled-components'

import { ForegroundColor } from '../../../styles/color'
import { SelectShadow } from '../../../styles/shadow'

const StyledPreviewText = styled.h2`
  color: ${({ color }) => color};
  width: 100%;
  background: repeating-linear-gradient(45deg, transparent, transparent 10px, #ccc 10px, #ccc 20px),
    linear-gradient(to bottom, #eee, #999);
  padding: 1rem;
  text-align: center;
  min-height: 74px;
  font-size: 2.5rem;
  border-radius: 0.2rem;
  border: 1px solid ${ForegroundColor.light};
  box-shadow: ${SelectShadow};
`

export const PreviewText = ({ children, color }) => (
  <StyledPreviewText className="apply-font" color={color}>
    {children}
  </StyledPreviewText>
)
