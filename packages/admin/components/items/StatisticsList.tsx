import PerformanceList from '@/components/table/PerformanceList'
import { SEE_MANAGEUSER_QUERY } from '@/graphql/queries'
import { useSuspenseQuery } from '@apollo/client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { ManageUser } from '@/src/generated/graphql'

type manageUser = {
  seeManageUser: ManageUser[]
}

export default function StatisticsList({ performanceFilter }) {
  const router = useRouter()
  const { data, error } = useSuspenseQuery<manageUser>(SEE_MANAGEUSER_QUERY)
  const managerList = data?.seeManageUser.filter(user =>
    user.mPart.includes('영업팀'),
  )
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
  }, [router, performanceFilter, data])

  if (error) {
    console.log(error)
  }

  return ids && dateRange && <PerformanceList ids={ids} dateRange={dateRange} />
}
