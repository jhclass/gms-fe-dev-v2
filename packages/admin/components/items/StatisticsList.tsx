import PerformanceList from '@/components/table/PerformanceList'
import { SEARCH_MANAGEUSER_QUERY } from '@/graphql/queries'
import { useSuspenseQuery } from '@apollo/client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { SearchManageUserResult } from '@/src/generated/graphql'

type searchManageUserQuery = {
  searchManageUser: SearchManageUserResult
}

export default function StatisticsList({ performanceFilter, filterSearch }) {
  const router = useRouter()
  const { data, error } = useSuspenseQuery<searchManageUserQuery>(
    SEARCH_MANAGEUSER_QUERY,
    {
      variables: {
        mPart: '영업팀',
        resign: 'N',
      },
    },
  )
  const managerList = data?.searchManageUser.data
  const [ids, setIds] = useState(null)
  const [dateRange, setDateRange] = useState(null)

  useEffect(() => {
    if (performanceFilter === null) {
      const allIds = managerList?.map(user => user.id)
      const currentDate = new Date()
      const sixMonthsAgoDate = new Date()
      sixMonthsAgoDate.setMonth(currentDate.getMonth() - 6)
      setIds(allIds)
      setDateRange([sixMonthsAgoDate, currentDate])
    } else {
      setIds(performanceFilter.processingManagerId)
      setDateRange(performanceFilter.period)
    }
  }, [router, performanceFilter])

  if (error) {
    console.log(error)
  }
  // console.log('통계페이지 시작')
  return (
    ids &&
    dateRange && (
      <PerformanceList
        ids={ids}
        dateRange={dateRange}
        filterSearch={filterSearch}
      />
    )
  )
}
