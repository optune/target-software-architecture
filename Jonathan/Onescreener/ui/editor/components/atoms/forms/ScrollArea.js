/* eslint-disable react/prop-types */

// React
import React from 'react'

import styled from 'styled-components'

const Container = styled.div`
  position: relative;
  overflow-y: scroll;
  display: flex;
  width: 100%;
  height: 300px;
  transition: color 0.3s;
`

export const ScrollArea = ({ children }) => <Container>{children}</Container>
