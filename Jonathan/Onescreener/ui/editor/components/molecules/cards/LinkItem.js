// React
import React from 'react'
import styled from 'styled-components'

// API
import { Platform, PlatformLinkType } from '/imports/api'

// React Components
import { MediaSmall, NotMediaSmall, PlatformLink } from '@optune/onescreener-base-components'

// Icons
import { PreviewIcon } from '../../atoms/icons/navigation/Preview'

// Atoms
import { EditButton } from '../../atoms/buttons/EditButton'
import { DeleteButton } from '../../atoms/buttons/DeleteButton'

// Styles
import { ForegroundColor, BackgroundColor } from '../../../styles/color'
import { ButtonShadow } from '../../../styles/shadow'

const LinkItemCard = styled.li`
  position: relative;
  width: 100%;
  height: 44px;

  background: ${BackgroundColor.secondary};
  margin: 0 0 0.5rem;
  padding: 0 0.5rem 0 1rem;
  border-radius: 0.2rem;
  box-shadow: ${ButtonShadow};
  display: flex;
  align-items: center;
`

const LinkItemGrid = styled.div`
  display: grid;
  grid-template-columns: 15px ${({ platform }) => (platform ? '48px' : '10px')} auto 138px;
  grid-row-gap: 0;
  width: 100%;

  @media ${MediaSmall} {
    grid-template-columns: 15px ${({ platform }) => (platform ? '40px' : '5px')} auto 126px;
  }
`

const LinkIconColumn = styled(PlatformLink)`
  grid-column: 2/2;

  @media ${NotMediaSmall} {
    &:hover {
      color: ${ForegroundColor.hover};
      background-color: ${BackgroundColor.hover};
      font-weight: 600;

      & svg.icon {
        & * {
          fill: ${ForegroundColor.hover};
          stroke: ${ForegroundColor.hover};
          &[fill='none'] {
            fill: none;
          }
        }
      }
    }
  }
`

const LinkTextColumn = styled.div`
  grid-column: 3/3;
  align-self: center;
  overflow: hidden;
  cursor: pointer;

  p {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    padding-right: 15px;
  }
`

const PlatformText = styled.p`
  color: ${ForegroundColor.secondary};
`
const Text = styled.p`
  color: ${ForegroundColor.secondary};
  font-size: 0.8rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const LinkActionColumn = styled.div`
  grid-column: 4/4;
  justify-self: flex-end;
  align-self: center;
  display: flex;
`

const SortIndicator = styled.p`
  grid-column: 1/1;
  justify-self: center;
  align-self: center;

  color: ${ForegroundColor.secondary};
  transform: rotate(90deg);
  cursor: grab;
`

const mapUrl = (url) =>
  url > '' ? url.split('https://').pop().split('http://').pop().split('mailto:').pop() : null

export const LinkItem = ({
  label,
  onEditItem,
  onRemoveItem,
  onPreviewItem,
  platform,
  name,
  tooltip,
  text,
  type,
  url,
  username,
}) => {
  return (
    <LinkItemCard>
      <LinkItemGrid platform={platform}>
        <SortIndicator className="font-big-regular">…</SortIndicator>

        {platform && (
          <LinkIconColumn
            platform={platform}
            url={url}
            border={0}
            noShadow
            color={ForegroundColor.secondary}
            colorAccent={ForegroundColor.hover}
            size="3.6rem"
          />
        )}

        <LinkTextColumn onClick={onEditItem}>
          <PlatformText className="bold capitalize">
            {/* This code was needed in order to treat YouTube naming exception w/ capital leter in the middle */}
            {(label === 'YouTube' && 'YouTube') || (name || label || platform).toLowerCase()}
          </PlatformText>
          {type === PlatformLinkType.TEXT ? (
            <Text>{text}</Text>
          ) : type === PlatformLinkType.OPTUNE ? (
            <Text>from Onescreener Manager</Text>
          ) : (
            <Text>{mapUrl(url || username) || text}</Text>
          )}
        </LinkTextColumn>

        <LinkActionColumn>
          {type !== PlatformLinkType.TEXT && (
            <EditButton onEdit={onPreviewItem} Icon={PreviewIcon} title={tooltip.preview} />
          )}
          <EditButton
            className="EditButton"
            onEdit={onEditItem}
            title={
              [Platform.OPTUNEARTISTPROFILE, Platform.OPTUNEBOOKINGS].includes(platform)
                ? tooltip.editInOptune
                : tooltip.edit
            }
          />
          <DeleteButton onDelete={onRemoveItem} title={tooltip.remove} />
        </LinkActionColumn>
      </LinkItemGrid>
    </LinkItemCard>
  )
}
