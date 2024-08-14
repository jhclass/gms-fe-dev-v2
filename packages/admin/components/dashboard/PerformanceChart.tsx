import { styled } from 'styled-components'
import { useEffect } from 'react'
import PerformanceChartCon from '@/components/dashboard/PerformanceChartCon'
import { useSuspenseQuery } from '@apollo/client'
import { SEARCH_MANAGEUSER_QUERY } from '@/graphql/queries'
import { useRouter } from 'next/router'
import { SearchManageUserResult } from '@/src/generated/graphql'

const ConArea = styled.div`
  width: 100%;
`
const DetailBox = styled.div`
  margin-top: 2rem;
  background: #fff;
  border-radius: 0.5rem;
  padding: 1.5rem;
`
const DetailDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  @media (max-width: 768px) {
    gap: 1rem;
  }
`

type searchManageUserQuery = {
  searchManageUser: SearchManageUserResult
}

export default function PerformanceChart({
  managerIds,
  totalAmount,
  totalCount,
  totalRefundAmount,
}) {
  const router = useRouter()
  const {
    data: managerData,
    error,
    refetch,
  } = useSuspenseQuery<searchManageUserQuery>(SEARCH_MANAGEUSER_QUERY, {
    variables: {
      mPart: '영업팀',
      resign: 'N',
    },
  })

  const managerList = managerData?.searchManageUser.data

  const managerUsernames = managerIds.map(
    id => managerList.find(user => user.id === id)?.mUsername,
  )

  useEffect(() => {
    refetch({
      mPart: '영업팀',
      resign: 'N',
    })
  }, [router])

  if (error) {
    console.log(error)
  }

  return (
    <ConArea>
      <DetailBox>
        <DetailDiv>
          {managerUsernames.length > 0 && (
            <PerformanceChartCon
              managerUsernames={managerUsernames}
              totalAmount={totalAmount}
              totalCount={totalCount}
              totalRefundAmount={totalRefundAmount}
              chartHeight={350}
            />
          )}
        </DetailDiv>
      </DetailBox>
    </ConArea>
  )
}
