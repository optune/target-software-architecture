import React from 'react'

import { ShareableLinks } from '/imports/api'

import { FacebookIcon } from '../../icons/shareLinks/Facebook'
import { TelegramIcon } from '../../icons/shareLinks/Telegram'
import { TwitterIcon } from '../../icons/shareLinks/Twitter'
import { WhatsappIcon } from '../../icons/shareLinks/Whatsapp'
import { CopyLinkIcon } from '../../icons/shareLinks/CopyLink'

const icons = {
  [ShareableLinks.FACEBOOK]: <FacebookIcon />,
  [ShareableLinks.TELEGRAM]: <TelegramIcon />,
  [ShareableLinks.TWITTER]: <TwitterIcon />,
  [ShareableLinks.WHATSAPP]: <WhatsappIcon />,
  [ShareableLinks.COPY_LINK]: <CopyLinkIcon />,
}

export const createIcon = (name) => icons[name] || null
