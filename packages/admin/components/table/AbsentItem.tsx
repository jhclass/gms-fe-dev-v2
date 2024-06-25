import { styled } from 'styled-components'
import { useSuspenseQuery } from '@apollo/client'
import { SEARCH_ATTENDANCE_QUERY } from '@/graphql/queries'
import { SearchAttendanceResult } from '@/src/generated/graphql'

const ClickBox = styled.div`
  display: flex;
  width: 100%;
`
const Tname = styled.div`
  position: relative;
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 12%;
  padding: 0.5rem;
  font-size: inherit;
  min-width: ${1200 * 0.12}px;
`
const Tnum = styled.div`
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 8%;
  padding: 0.5rem;
  font-size: inherit;
  color: inherit;
  min-width: ${1200 * 0.08}px;

  span {
    &.attendance {
      color: #007de9;
    }
    &.absent {
      color: #ff5900;
    }
    &.count {
      color: #07bbae;
    }
    &.bold {
      font-weight: 700;
    }
  }
`
const TableItem = styled.div`
  position: relative;
  width: 100%;
  min-width: fit-content;
  border-bottom: 1px solid #e4e4e7;
  color: #71717a;
  font-size: 0.875rem;
  border-radius: 0.5rem;
  background: #fff;
  overflow: hidden;

  &:hover {
    cursor: pointer;
    background: rgba(255, 255, 255, 0.8);
  }
`

const TableRow = styled.div`
  position: relative;
  width: 100%;
  min-width: fit-content;
  text-align: center;
  z-index: 1;
  /* display: grid;
  width: 100%;
  grid-template-columns: 0.5rem 2% auto; */
`
type searchAttendanceQuery = {
  searchAttendance: SearchAttendanceResult
}

export default function AbsentItem({ lectureId, lectureDates, sortStudents }) {
  const { error, data, refetch } = useSuspenseQuery<searchAttendanceQuery>(
    SEARCH_ATTENDANCE_QUERY,
    {
      variables: {
        lecturesId: lectureId,
        attendanceDate: lectureDates,
      },
    },
  )

  const countAttendance = (student, attendance) => {
    const result = data.searchAttendance.data.filter(
      item =>
        item.student.name === student && item.attendanceState === attendance,
    ).length
    return result
  }
  const getRate = (count, total) => {
    let rate = (count / total) * 100
    rate = Math.round(rate * 100) / 100
    return rate
  }

  return (
    <>
      {sortStudents.map((student, index) => (
        <TableItem key={index}>
          <TableRow>
            <ClickBox>
              <Tname>{student.student.name}</Tname>
              <Tnum>
                <span>{lectureDates.length}</span>일
              </Tnum>
              <Tnum>
                <span className="attendance">
                  {countAttendance(student.student.name, '출석')}
                </span>
                회
              </Tnum>
              <Tnum>
                <span
                  className={
                    countAttendance(student.student.name, '지각') > 1
                      ? 'count bold'
                      : ''
                  }
                >
                  {countAttendance(student.student.name, '지각')}
                </span>
                회
              </Tnum>
              <Tnum>
                <span
                  className={
                    countAttendance(student.student.name, '외출') > 1
                      ? 'count bold'
                      : ''
                  }
                >
                  {countAttendance(student.student.name, '외출')}
                </span>
                회
              </Tnum>
              <Tnum>
                <span
                  className={
                    countAttendance(student.student.name, '조퇴') > 1
                      ? 'count bold'
                      : ''
                  }
                >
                  {countAttendance(student.student.name, '조퇴')}
                </span>
                회
              </Tnum>
              <Tnum>
                <span
                  className={
                    countAttendance(student.student.name, '결석') > 1
                      ? 'absent bold'
                      : ''
                  }
                >
                  {countAttendance(student.student.name, '결석')}
                </span>
                회
              </Tnum>
              <Tnum>
                <span>
                  {getRate(
                    countAttendance(student.student.name, '출석'),
                    lectureDates.length,
                  )}
                </span>
                &#37;
              </Tnum>
              <Tnum>
                <span>
                  {getRate(
                    countAttendance(student.student.name, '지각'),
                    lectureDates.length,
                  )}
                </span>
                &#37;
              </Tnum>
              <Tnum>
                <span>
                  {getRate(
                    countAttendance(student.student.name, '외출'),
                    lectureDates.length,
                  )}
                </span>
                &#37;
              </Tnum>
              <Tnum>
                <span>
                  {getRate(
                    countAttendance(student.student.name, '조퇴'),
                    lectureDates.length,
                  )}
                </span>
                &#37;
              </Tnum>
              <Tnum>
                <span>
                  {getRate(
                    countAttendance(student.student.name, '결석'),
                    lectureDates.length,
                  )}
                </span>
                &#37;
              </Tnum>
            </ClickBox>
          </TableRow>
        </TableItem>
      ))}
    </>
  )
}
