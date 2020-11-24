// React
import styled from 'styled-components'

// Styles
import { ColorSecondary40 } from '../../../styles/color'

export const InfoPlayerButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  transition: box-shadow 0.3s;
  background-color: transparent;
  margin: 0 0 1.5rem 0;
  padding: 4px 12px;
  color: ${ColorSecondary40};
  line-height: 1;
  width: 200px;
  height: 30px;
  border-radius: 100px;
  border: 0.5px solid ${ColorSecondary40};

  &:hover {
    box-shadow: 0 0 11px rgba(33, 33, 33, 0.2);
  }
`
