import React from 'react'
import { toSquidInkIcon, defaultStrokeFill } from '../mixins/toSquidInkIcon'

export const VideoPlayerIcon = toSquidInkIcon(
  () => (
    <g id="video-player">
      <path
        d="M15.5 6V14.5C15.5 15.0523 15.0523 15.5 14.5 15.5H1.5V15.5C0.947715 15.5 0.5 15.0523 0.5 14.5V6"
        {...defaultStrokeFill}
      />
      <path
        d="M15.5 4H0.5V1.5V1.5C0.5 0.947715 0.947715 0.5 1.5 0.5H14.5V0.5C15.0523 0.5 15.5 0.947715 15.5 1.5V4Z"
        {...defaultStrokeFill}
      />
      <path d="M5 4L6 0.5" {...defaultStrokeFill} />
      <path d="M10 4L11 0.5" {...defaultStrokeFill} />
      <path
        d="M6.32534 12.44V12.44C6.04329 12.5807 5.70063 12.4661 5.55998 12.184C5.52054 12.1049 5.5 12.0177 5.5 11.9294V8.0707V8.07073C5.5 7.75556 5.7555 7.50006 6.07067 7.50006C6.15905 7.50006 6.24622 7.52059 6.32531 7.56003L10.1846 9.49003V9.49003C10.4663 9.63061 10.5807 9.97292 10.4401 10.2546C10.3849 10.3652 10.2952 10.4548 10.1846 10.51L6.32534 12.44Z"
        {...defaultStrokeFill}
      />
    </g>
  ),
  '0 0 16 16'
)
