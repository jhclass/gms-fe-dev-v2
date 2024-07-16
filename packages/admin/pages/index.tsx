import Layout from '@/components/wrappers/MainWrap'
import styled from 'styled-components'
import NewConsultMonthNum from '@/components/dashboard/NewConsultMonthNum'
import NewConsultNum from '@/components/dashboard/NewConsultNum'
import ConsultNum from '@/components/dashboard/ConsultNum'
import AdviceType from '@/components/dashboard/AdviceType'
import ReceiptDiv from '@/components/dashboard/ReceiptDiv'
import { useAuthRedirect } from '@/utils/useAuthRedirect'
import { useEffect } from 'react'
import { useMutation } from '@apollo/client'
import {
  SEARCH_PAYMENT_FILTER_MUTATION,
  SEARCH_STUDENTSTATE_MUTATION,
  SEARCH_STUDENT_FILTER_MUTATION,
} from '@/graphql/mutations'

const HomeArea = styled.div`
  max-width: 1400px;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, minmax(320px, 1fr));
  gap: 1rem;

  @media screen and (max-width: 1140px) {
    grid-template-columns: repeat(2, minmax(320px, 1fr));
    grid-auto-rows: 0.5rem;
    div {
      @media screen and (max-width: 1140px) {
        grid-row-end: span 5;
      }
    }
  }
  @media screen and (max-width: 720px) {
    grid-template-columns: repeat(1, minmax(100%, 1fr));
    grid-auto-rows: unset;
    div {
      @media screen and (max-width: 1140px) {
        grid-row-end: unset;
      }
    }
  }
`

export default function Home() {
  const [searchStudentStateMutation] = useMutation(SEARCH_STUDENTSTATE_MUTATION)
  const [searchStudentFilterMutation] = useMutation(
    SEARCH_STUDENT_FILTER_MUTATION,
  )
  const [searchPaymentFilterMutation] = useMutation(
    SEARCH_PAYMENT_FILTER_MUTATION,
  )
  const isCheckingLogin = useAuthRedirect()
  const nowDate = new Date()
  const year = nowDate.getFullYear()
  const month = nowDate.getMonth() + 1
  const day = nowDate.getDate()
  const formattedDate = `${year}-${String(month).padStart(2, '0')}-${String(
    day,
  ).padStart(2, '0')}`
  const startOfDay = new Date(
    nowDate.getFullYear(),
    nowDate.getMonth(),
    nowDate.getDate(),
    0,
    0,
    0,
  )

  useEffect(() => {
    sessionStorage.setItem('today', formattedDate)
    searchStudentStateMutation({
      variables: {
        createdAt: [startOfDay, nowDate],
      },
      onCompleted: resData => {
        if (resData.searchStudentState.ok) {
          const { totalCount } = resData.searchStudentState || {}
          sessionStorage.setItem('newConsult', totalCount)
        }
      },
    })
    searchStudentFilterMutation({
      variables: {
        createdAt: [startOfDay, nowDate],
      },
      onCompleted: resData => {
        if (resData.searchStudent.ok) {
          const { totalCount } = resData.searchStudent || {}
          sessionStorage.setItem('todayStudentTotal', totalCount)
        }
      },
    })
    searchPaymentFilterMutation({
      variables: {
        createdPeriod: [startOfDay, nowDate],
      },
      onCompleted: resData => {
        if (resData.searchStudentPayment.ok) {
          const { totalCount } = resData.searchStudentPayment || {}
          sessionStorage.setItem('newAccounting', totalCount)
        }
      },
    })
  }, [])

  if (isCheckingLogin) {
    return null
  }

  return (
    <>
      <Layout>
        <HomeArea>
          <div>
            <NewConsultNum />
          </div>
          <div>
            <NewConsultMonthNum />
          </div>
          <div>
            <ConsultNum />
          </div>
          <div>
            <AdviceType />
          </div>
          <div>
            <ReceiptDiv />
          </div>
        </HomeArea>
      </Layout>
    </>
  )
}
