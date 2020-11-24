// React
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import ModalVideo from 'react-modal-video'
import styled from 'styled-components'

// Atoms
import { InfoPlayerButton } from '../../atoms/buttons/InfoPlayerButton'
import { VideoPlayerIcon } from '../../atoms/icons/info/VideoPlayer'

const Icon = styled(VideoPlayerIcon)`
  min-width: 14px;
  min-height: 14px;
  max-width: 14px;
  max-height: 14px;
  width: auto;
  height: auto;
  margin-right: 0.5rem;
`

export const InfoPlayer = ({ video }) => {
  const [isOpen, setOpen] = useState(false)
  const { t } = useTranslation()
  return (
    <React.Fragment>
      <ModalVideo
        channel="youtube"
        autoplay
        isOpen={isOpen}
        videoId={video}
        onClose={() => setOpen(false)}
      />
      <InfoPlayerButton onClick={() => setOpen(true)}>
        <Icon />
        <p>{t('btnInfo')}</p>
      </InfoPlayerButton>
    </React.Fragment>
  )
}
