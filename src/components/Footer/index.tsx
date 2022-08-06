import React from 'react'
import { LINK } from 'config'
import './_style.scss'

import { ReactComponent as TwitterIcon } from 'assets/svgs/twitter.svg'
import { ReactComponent as TelegramIcon } from 'assets/svgs/telegram.svg'
import { ReactComponent as DscvrIcon } from 'assets/svgs/dscvr.svg'
import { ReactComponent as DiscordIcon } from 'assets/svgs/discord.svg'
import { ReactComponent as GithubIcon } from 'assets/svgs/github.svg'

const Footer = () => {
  return (
    <div className='footer'>
      <a className='iconWrap' href={LINK.Twitter} target='_blank'>
        <TwitterIcon width={19} height={16} />
      </a>
      <a className='iconWrap' href={LINK.Telegram} target='_blank'>
        <TelegramIcon width={19} height={16} />
      </a>
      <a className='iconWrap' href={LINK.DSCVR} target='_blank'>
        <DscvrIcon width={23} height={23} />
      </a>
      <a className='iconWrap' href={LINK.Discord} target='_blank'>
        <DiscordIcon width={18} height={17} />
      </a>
      {/*<a className='iconWrap' href={LINK.Github} target='_blank'>*/}
      {/*  <GithubIcon width={20} height={20} />*/}
      {/*</a>*/}
    </div>)
}

export default Footer
