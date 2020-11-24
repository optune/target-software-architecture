/* eslint-disable react/prop-types */
import React from 'react'
import ReactPlayer from 'react-player'
import styled from 'styled-components'

import { renderHtml } from '@optune/onescreener-base-components'
import { SpotifyPlayer } from '@optune/onescreener-base-components'
import { ApplePlayer } from '@optune/onescreener-base-components'
import { DeezerPlayer } from '@optune/onescreener-base-components'

import { ContentType } from '/imports/api'

const ColoredTextContainer = styled.div`
  position: relative;
  overflow: hidden;
  width: 100%;
  max-height: 8vh;
  margin: 1rem 0;
  padding: 0.2rem 2rem;
  background-color: ${({ colorBackground }) => colorBackground || 'transparent'};

  & h1,
  h2,
  h3,
  h4,
  h5,
  a,
  li,
  p,
  span {
    font-size: 1rem;
    color: ${({ colorPrimary }) => colorPrimary};
    white-space: ${({ wordWrap }) => (wordWrap ? 'pre-wrap' : 'nowrap')};
    text-align: ${({ textAlign }) => textAlign || 'left'};
    transition: color 0.3s ease-out;
    line-height: 1.4;
    margin: ${({ textMargin }) => textMargin || '0.5rem 0 '};
    padding: 0;
  }

  & .separator-line {
    background: ${({ colorPrimary }) => colorPrimary};
    height: 0.1rem;
    min-height: 1px;
    margin 1rem 0;
    padding: 0;
  }

  & h1 {
    font-size: 1.8rem;
    font-weight: bold;
    margin: 1rem 0;
  }

  & h2 {
    font-size: 1.5rem;
    font-weight: bold;
  }

  & h3 {
    font-size: 1.2rem;
  }

  & h4 {
    font-size: 1rem;
  }

  & h5 {
    font-size: 0.8rem;
  }
`

const CoverImage = styled.img`
  max-width: 600px;
`

export const ContentBox = ({ content, isEdit }) => {
  const { type, color, colorBackground, cover, text, media, gigsAPI, wordWrap } = content

  let format, theme
  if (media?.deezer) {
    format = media.deezer.format
    theme = media.deezer.theme
  }

  let Content = null

  let Player = media?.url && ReactPlayer

  if (media?.url.indexOf('spotify') !== -1) {
    Player = SpotifyPlayer
  } else if (media?.url.indexOf('apple') !== -1) {
    Player = ApplePlayer
  } else if (media?.url.indexOf('deezer') !== -1) {
    Player = DeezerPlayer
  }

  if (type === ContentType.COVER && cover && cover?.image?.url > '') {
    const { url } = cover?.image
    Content = (
      <ColoredTextContainer
        colorPrimary={color}
        colorBackground={colorBackground}
        textAlign="center"
        textMargin="0 0 0.5rem"
        wordWrap={false}
      >
        <CoverImage src={url} alt="Cover Image" />
      </ColoredTextContainer>
    )
  } else if (type === ContentType.GIGS && gigsAPI) {
    const { api, provider, title, limit, includePast } = gigsAPI
    Content = (
      <ColoredTextContainer
        colorPrimary={color}
        colorBackground={colorBackground}
        textAlign="center"
        textMargin="0 0 0.5rem"
        wordWrap={false}
      >
        <h2>{title}</h2>
        <p>
          {includePast
            ? `${limit} gigs from ${provider}`
            : `${limit} upcoming gigs from ${provider}`}
        </p>
      </ColoredTextContainer>
    )
  } else if (type === ContentType.MEDIA && !!media && media.url > '') {
    Content = (
      <ColoredTextContainer colorPrimary={color} colorBackground={colorBackground}>
        {!!media && media.url > '' && (
          <Player url={media.url} playing={false} format={format} theme={theme} />
        )}
      </ColoredTextContainer>
    )
  } else if (type === ContentType.TEXT) {
    Content = (
      <ColoredTextContainer
        colorPrimary={color}
        colorBackground={colorBackground}
        wordWrap={wordWrap}
      >
        {renderHtml(text)}
      </ColoredTextContainer>
    )
  }

  return Content
}
