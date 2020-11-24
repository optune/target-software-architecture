import React from 'react'
import { toSquidInkIcon, defaultStrokeFill } from '../mixins/toSquidInkIcon'

export const RegisteringIcon = toSquidInkIcon(() => (
  <g id="gothic-directer">
    <g>
      <polyline
        {...defaultStrokeFill}
        points="25.8711605,15.7776413 24,10.86938 22.1288395,15.7776413     "
      />

      <polyline
        {...defaultStrokeFill}
        points="22.1288395,32.2223587 24,37.130619 25.8711605,32.2223587     "
      />
    </g>

    <polygon {...defaultStrokeFill} points="31,24 41,7 24,17 7,7 17,24 7,41 24,31 41,41   " />

    <circle {...defaultStrokeFill} cx="24" cy="24" r="6.4807301" />
    <circle {...defaultStrokeFill} cx="24" cy="24" r="2.4302738" />

    <g>
      <polyline
        {...defaultStrokeFill}
        points="32.2223587,25.8711605 37.130619,24 32.2223587,22.1288395     "
      />

      <polyline
        {...defaultStrokeFill}
        points="15.7776413,22.1288395 10.86938,24 15.7776413,25.8711605     "
      />
    </g>

    <g>
      <path
        {...defaultStrokeFill}
        d="M41.8991699,37.6286011C44.7838135,33.8458862,46.5,29.1242676,46.5,24c0-5.1243286-1.7162476-9.8459473-4.6008301-13.6286621"
      />
      <path
        {...defaultStrokeFill}
        d="M37.6286621,6.100769C33.8459473,3.2161255,29.1243286,1.5,24,1.5s-9.8459473,1.7161255-13.6286621,4.600769"
      />
      <path
        {...defaultStrokeFill}
        d=" M6.1008301,10.3713379C3.2162476,14.1540527,1.5,18.8756714,1.5,24c0,5.1242676,1.7161865,9.8458862,4.6008301,13.6286011"
      />
      <path
        {...defaultStrokeFill}
        d="M10.3713989,41.8991699C14.1541138,44.7838135,18.8757324,46.5,24,46.5s9.8458862-1.7161865,13.6286011-4.6008301"
      />
    </g>
  </g>
))
