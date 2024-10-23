import { useEffect, useState } from 'react'
import { styled } from 'styled-components'
import { useMutation, useSuspenseQuery } from '@apollo/client'
import {
  SEARCH_ATTENDANCE_RECORD_ID_QUERY,
  SEARCH_ATTENDANCE_RECORD_TOTAL_QUERY,
} from '@/graphql/queries'
import { CREATE_ATTENDANCE_RECORD_MUTATION } from '@/graphql/mutations'
import useUserLogsMutation from '@/utils/userLogs'
import { useRouter } from 'next/router'
import { ResultSearchAttendanceRecord } from '@/src/generated/graphql'

const WorkBtn = styled.button`
  display: flex;
  align-items: center;
  position: relative;
  font-size: 2.2rem;
  justify-content: center;

  &:after {
    content: '';
    position: absolute;
    width: 1px;
    height: 1.5rem;
    top: 50%;
    right: -0.9rem;
    margin-top: -0.75rem;
    background: ${({ theme }) => theme.colors.lightGray};
    transition: 0.3s;
  }

  @media screen and (max-width: 1024px) {
    font-size: 2rem;
    &:after {
      right: -0.4rem;
    }
  }
`

type searchAttendanceRecord = {
  searchAttendanceRecord: ResultSearchAttendanceRecord
}

export default function HeaderWork({ mUserId, mUsername, todayTimes }) {
  const [isCheck, setIsCheck] = useState(false)
  const { error, data, refetch } = useSuspenseQuery<searchAttendanceRecord>(
    SEARCH_ATTENDANCE_RECORD_TOTAL_QUERY,
    {
      variables: {
        mUserId: mUserId,
        period: todayTimes,
      },
    },
  )
  const { userLogs } = useUserLogsMutation()
  const [createAttendanceRecord] = useMutation(
    CREATE_ATTENDANCE_RECORD_MUTATION,
  )

  useEffect(() => {
    if (data && data.searchAttendanceRecord.totalCount > 0) {
      setIsCheck(true)
    } else {
      setIsCheck(false)
    }
  }, [data])

  const refreshCheck = () => {
    refetch()
  }

  const workCheck = () => {
    const now = new Date()
    createAttendanceRecord({
      variables: {
        clockIn: now,
      },
      refetchQueries: [
        SEARCH_ATTENDANCE_RECORD_TOTAL_QUERY,
        SEARCH_ATTENDANCE_RECORD_ID_QUERY,
      ],
      onCompleted: result => {
        userLogs(
          `${mUsername} 출근 버튼 클릭`,
          `ok: ${result.createAttendanceRecord.ok}`,
        )
        if (result.createAttendanceRecord.ok) {
          setIsCheck(true)
          alert(`출근처리 되었습니다. ${now}`)
        }
      },
    })
  }

  return (
    <>
      {isCheck ? (
        <WorkBtn onClick={refreshCheck}>
          <i className="xi-refresh" />
        </WorkBtn>
      ) : (
        <WorkBtn onClick={workCheck}>
          <i className="xi-calendar-check" />
        </WorkBtn>
      )}
    </>
  )
}
