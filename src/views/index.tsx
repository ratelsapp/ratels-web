import React, { useState } from 'react'
import Header from 'components/Header'
import Footer from 'components/Footer'
import List from 'components/List'
import Legalize from 'components/Legalize'
import Search from 'components/Search'
import { Stack, Button } from '@mui/material'
import classNames from 'classnames'
import './_style.scss'
import { ReactComponent as LogoIcon } from 'assets/svgs/logo.svg'
import { ReactComponent as LeftIcon } from 'assets/svgs/left.svg'
import { LINK } from 'config'
import { openInNewWindow } from 'utils'
import Progress from 'components/Progress'

const Index = () => {
  const [tabIndex, setTabIndex] = useState(1)
  const [searchLoaded, setSearchLoaded] = useState(false)
  const [list, setList] = useState<any[]>([])
  const [rate, setRate] = useState(0)
  const handleSearch = (list: any[]) => {
    setList(list)
  }

  const handleClickUse = () => {
    openInNewWindow(LINK.howtouse, 'howtouse')
  }

  return (
    <div className='index'>
      <Header />

      <div className='main'>
        <Stack direction='row' alignItems='center' justifyContent='space-between'>
          <LogoIcon className='logo' />
          <Button className='help_btn' onClick={handleClickUse}>How to use</Button>
        </Stack>
        <div className='content'>
          <div className='tab'>
            <div
              className={classNames('tab-item', { active: tabIndex === 1 || tabIndex === 2 })}
              onClick={() => {
                setTabIndex(1)
                setSearchLoaded(false)
                setList([])
              }}>
              Verify
            </div>
            <div
              className={classNames('tab-item', { active: tabIndex === 3 })}
              onClick={() => setTabIndex(3)}>
              Search
            </div>
            {
              tabIndex === 3 &&
              <div className='canister' onClick={() => openInNewWindow(LINK.icscan, 'canister')}>
                Canister
                <LeftIcon />
              </div>
            }
          </div>
          <div className='bottom'>
            {tabIndex === 1 ?
              <Legalize setTabIndex={setTabIndex} /> :
              <Search
                setList={setList}
                setRate={setRate}
                tabIndex={tabIndex}
                setSearchLoaded={setSearchLoaded}
                onSearch={handleSearch} />}
          </div>
        </div>

        {
          rate ?
          <Progress rate={rate} />: null
        }

        {
          tabIndex !== 1 &&
          <List tabIndex={tabIndex} list={list} searchLoaded={searchLoaded} />
        }
      </div>
      <Footer />
    </div>
  )
}

export default Index
