import styled from 'styled-components'
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Radio,
  RadioGroup,
  ScrollShadow,
  Textarea,
} from '@nextui-org/react'
import { useEffect, useRef, useState } from 'react'
import { EDIT_WORKLOGS_MUTATION } from '@/graphql/mutations'
import { useLazyQuery, useMutation } from '@apollo/client'
import { Controller, useForm } from 'react-hook-form'
import WorksSchedule from '@/components/table/WorksSchedule'
import WorksTime from '@/components/table/WorksTime'
import WorksRemark from '@/components/table/WorksRemark'
import {
  SEARCH_WORKLOGS_QUERY,
  SEE_ATTENDANCE_QUERY,
  SIGN_WORKLOGS_QUERY,
} from '@/graphql/queries'
import useMmeQuery from '@/utils/mMe'
import { useReactToPrint } from 'react-to-print'
import useUserLogsMutation from '@/utils/userLogs'
import { useRecoilValue } from 'recoil'
import {
  assignmentState,
  completionStatus,
  gradeState,
} from '@/lib/recoilAtoms'
import WorksLogs from './WorksLogs'

const Title = styled.h2`
  position: relative;
  font-size: 1.2rem;
  font-weight: 600;
  padding-left: 1rem;

  &:after {
    content: '';
    width: 0.3rem;
    height: 100%;
    background: ${({ theme }) => theme.colors.secondary};
    position: absolute;
    top: 0;
    left: 0;
    border-radius: 0.3rem;
  }
`
const SubText = styled.span`
  font-size: 0.875rem;
  padding-left: 0.5rem;
  font-weight: 400;

  > span {
    color: red;
  }
`

const DatailBody = styled.div`
  @media (max-width: 768px) {
    /* overflow-y: auto; */
    overflow-x: hidden;
    height: 60vh;
  }
`

const DetailDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  @media (max-width: 768px) {
    gap: 1rem;
  }
  @media print {
    gap: 1.5rem !important;
  }

  &.scroll {
    margin-top: 1rem;
    height: 40vh;
    overflow-x: hidden;
  }
`
const FlexBox = styled.div`
  display: flex;
  gap: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
  }
  @media print {
    flex-direction: row !important;
  }

  &.reverse {
    @media (max-width: 768px) {
      flex-direction: column-reverse;
    }
  }
`

const FlexBoxNum = styled.div`
  display: flex;
  gap: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
  }

  @media print {
    flex-direction: column !important;
  }

  &.reverse {
    @media (max-width: 768px) {
      flex-direction: column-reverse;
    }
  }
`

const AreaTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  h4 {
    font-size: 1rem;
    font-weight: 600;
  }
`
const AreaSection = styled.div`
  flex: 1;
  width: 100%;
  margin-top: 1.5rem;

  &.last {
    padding-bottom: 1rem;
  }
`

const AreaBox = styled.div`
  flex: 1;
  width: 100%;
`

const FlexAreaBox = styled.div`
  width: 100%;
  display: flex;
  gap: 1rem;

  > div {
    flex: 1;
  }
`
const FlexColBox = styled.div`
  width: 100%;
  display: flex;
  gap: 1rem;
  flex-direction: column;

  > div {
    flex: 1;
  }
`

const LineBox = styled.div`
  padding-left: 0.25rem;
  padding-right: 0.25rem;
  border-bottom: 2px solid hsl(240 6% 90%);
  height: 40px;
  line-height: 40px;
  font-size: 0.875rem;
`

const StempBox = styled.div`
  display: flex;
  padding: 0.6rem 0;
  height: 5.1rem;
  border: 2px solid hsl(240 6% 90%);
  border-radius: 0.5rem;
  justify-content: center;
  align-items: center;

  > img {
    height: 100%;
  }
`
const BtnBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  line-height: 40px;
  font-size: 0.875rem;
`

const FilterLabel = styled.label`
  font-weight: 500;
  font-size: 0.875rem;
  line-height: 1.25rem;
  color: ${({ theme }) => theme.colors.black};
  display: block;
  padding-bottom: 0.375rem;
  span {
    color: red;
  }

  &.color {
    color: inherit;
  }
`

const CheckLabel = styled.p`
  font-weight: 500;
  color: ${({ theme }) => theme.colors.black};
  position: relative;
  &:after {
    content: '';
    width: 0.5rem;
    height: 0.5rem;
    background: ${({ theme }) => theme.colors.primary};
    position: absolute;
    top: 0.6rem;
    left: -1rem;
    transform: translateY(-50%);
  }
`

const TopInfo = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  font-size: 0.8rem;
  @media (max-width: 768px) {
    align-items: flex-end;
    flex-direction: column-reverse;
  }
`
const UpdateTime = styled.div`
  display: flex;
  gap: 0.3rem;

  @media (max-width: 768px) {
    align-items: flex-end;
  }
`
const UpdateCon = styled.p`
  > span {
    color: #555;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0;
    align-items: flex-end;
  }
`

export default function WorksLogsModal({
  isOpen,
  onClose,
  lectureId,
  workLogeDate,
  teachers,
}) {
  const [seeAttendance] = useLazyQuery(SEE_ATTENDANCE_QUERY)
  const [searchWorkLog] = useLazyQuery(SEARCH_WORKLOGS_QUERY)
  const [workLogData, setWorkLogData] = useState(null)
  const [attendanceData, setAttendanceData] = useState(null)

  const fetchWorkLogData = async (date, id) => {
    const { data } = await searchWorkLog({
      variables: {
        workLogsDate: date,
        lecturesId: id,
      },
    })
    return data?.searchWorkLogs?.data[0] || []
  }
  const fetchWorkLog = async (date, id) => {
    try {
      const data = await fetchWorkLogData(date, id)
      setWorkLogData(data)
    } catch (error) {
      console.error('작업 로그 데이터를 가져오는 중 오류 발생:', error)
    }
  }
  const fetchAttendanceForDate = async (date, id) => {
    const { data } = await seeAttendance({
      variables: {
        attendanceDate: date,
        lecturesId: id,
      },
    })
    return data?.seeAttendance || []
  }

  const fetchAttendance = async (date, id) => {
    try {
      const data = await fetchAttendanceForDate(date, id)
      setAttendanceData(data)
    } catch (error) {
      console.error('작업 로그 데이터를 가져오는 중 오류 발생:', error)
    }
  }

  useEffect(() => {
    if (isOpen && lectureId && workLogeDate) {
      fetchWorkLog(workLogeDate, lectureId)
      fetchAttendance(workLogeDate, lectureId)
    }
  }, [workLogeDate, lectureId])

  return (
    <>
      <WorksLogs
        isOpen={isOpen}
        onClose={onClose}
        lectureId={lectureId}
        workLogeDate={workLogeDate}
        workLogData={workLogData}
        attendanceData={attendanceData}
        teachers={teachers}
      />
    </>
  )
}
