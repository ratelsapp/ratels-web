import React, { useState, useEffect } from 'react'
import Detail from 'components/Detail'
import './_style.scss'
import Empty from 'components/Empty'
import { ReactComponent as DownloadIcon } from 'assets/svgs/download.svg'
import { exportExcel } from 'utils/excel'
import { getTime } from 'utils'
import Progress from 'components/Progress'

interface Props {
  searchLoaded: boolean,
  list: any[]
  tabIndex: number
}

const header = [
  { title: 'ID', dataIndex: 'id', key: 'id', className: 'text-monospace' },
  { title: 'Account ID', dataIndex: 'account', key: 'account' },
  { title: 'Principal ID', dataIndex: 'principalId', key: 'principalId' },
  { title: 'Twitter', dataIndex: 'twitter', key: 'twitter' },
  { title: 'Twitter verification time', dataIndex: 'twitterTime', key: 'twitterTime' },
  { title: 'Discord', dataIndex: 'discord', key: 'discord' },
  { title: 'Discord verification time', dataIndex: 'discordTime', key: 'discordTime' },
  { title: 'Github', dataIndex: 'github', key: 'github' },
  { title: 'Github verification time', dataIndex: 'githubTime', key: 'githubTime' },
]

const List: React.FC<Props> = ({tabIndex, searchLoaded, list }) => {
  const [excelList, setExcelList] = useState<any[]>([])

  useEffect(() => {
    if (list.length) {
      const arr = list.map((item, index) => {
        return {
          id: index + 1,
          account: item.account || '--',
          principalId: item.principalId || '--',
          twitter: item.twitter[0] || '--',
          twitterTime: getTime(item.twitterTime[0]),
          discord: item.discord[0] || '--',
          discordTime: getTime(item.discordTime[0]),
          github: item.github[0] || '--',
          githubTime: getTime(item.githubTime[0]),
        }
      })
      setExcelList(arr)
    } else {
      setExcelList([])
    }
  }, [list])

  const handleDownload = () => {
    exportExcel(header, excelList)
  }

  return (
    <div className='resultList'>
      {searchLoaded && list.length === 0 && tabIndex === 3 && <Empty />}
      {
        list.length > 0 &&
        <div className='downloadWrap'>
          <div className='downloadWrap_iconWrap'>
            <DownloadIcon width={12} height={12} />
          </div>
          <div className='downloadWrap_text' onClick={handleDownload}>Download</div>
        </div>
      }
      {list.map(item => <Detail data={item} key={item.account} />)}
    </div>
  )
}

export default List
