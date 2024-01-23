import { styled } from 'styled-components'
import { useRecoilValue } from 'recoil'
import { studentProgressStatusState } from '@/lib/recoilAtoms'
import Link from 'next/link'

type ConsultItemProps = {
  tableData: {
    adviceTypes: any
    id: number
    stName: string
    phoneNum1: string
    progress: number
    subDiv: string
    stVisit: string
    createdAt: string
    receiptDiv: string
    pic: string
  }
  forName?: string
  itemIndex: number
  currentPage: number
  limit?: number
  favorite?: boolean
  favoTotal?: number
  flagNum?: number
  checkBtn?: boolean
  checkItem?: number[]
  setCheckItem?: (newItems: number[]) => void
}

const TableItem = styled.div`
  position: relative;
  display: table;
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
  display: table-row;
  width: 100%;
  min-width: fit-content;
  text-align: center;
  z-index: 1;
  /* display: grid;
  width: 100%;
  grid-template-columns: 0.5rem auto; */
`

const Tflag = styled.div`
  display: table-cell;
  width: 0.5rem;
  height: 100%;
  min-width: 7px;
`
const ClickBox = styled.div`
  display: flex;
  width: 100%;
`
const Tnum = styled.div`
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 7%;
  padding: 1rem;
  font-size: inherit;
  color: inherit;
  min-width: ${1200 * 0.07}px;
`
const Tprogress = styled.div`
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 8%;
  padding: 1rem;
  font-size: inherit;
  color: inherit;
  min-width: ${1200 * 0.08}px;
`
const TsubDiv = styled.div`
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 8%;
  padding: 1rem;
  font-size: inherit;
  color: inherit;
  min-width: ${1200 * 0.08}px;
`
const Tbirthday = styled.div`
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 10%;
  padding: 1rem;
  font-size: inherit;
  color: inherit;
  min-width: ${1200 * 0.1}px;
`
const Tname = styled.div`
  position: relative;
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 10%;
  padding: 1rem;
  font-size: inherit;
  min-width: ${1200 * 0.1}px;
  font-weight: 600;
`
const Tsubject = styled.div`
  position: relative;
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 26%;
  padding: 1rem;
  font-size: inherit;
  min-width: ${1200 * 0.26}px;
  font-weight: 600;
`
const Tphone = styled.div`
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 11%;
  padding: 1rem;
  font-size: inherit;
  color: inherit;
  min-width: ${1200 * 0.11}px;
`
const TcreatedAt = styled.div`
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 10%;
  padding: 1rem;
  font-size: inherit;
  color: inherit;
  min-width: ${1200 * 0.1}px;
`
const Tmanager = styled.div`
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 10%;
  padding: 1rem;
  font-size: inherit;
  color: inherit;
  min-width: ${1200 * 0.1}px;
`
const EllipsisBox = styled.p`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
`

const isDisplayFlag = (date: string, step: boolean): string => {
  const currentDate = new Date()
  const differenceInDays = Math.floor(
    (currentDate.getTime() - parseInt(date)) / (1000 * 60 * 60 * 24),
  )
  if (differenceInDays >= 0 && differenceInDays < 3) {
    return '#007de9'
  } else if (differenceInDays >= 3 && !step) {
    return '#FF5900'
  } else {
    return 'transparent'
  }
}

const displayPprogress = (assignment, complete) => {
  if (assignment) {
    if (complete) {
      return 30
    } else {
      return 20
    }
  } else {
    return 10
  }
}

export default function StudentsItem(props) {
  const conLimit = props.limit || 0
  const conIndex = props.itemIndex
  const student = props.tableData
  const flagString = isDisplayFlag(student.createdAt, student.lectureAssignment)
  const progressNum = displayPprogress(
    student.lectureAssignment,
    student.courseComplete,
  )
  const progressStatus = useRecoilValue(studentProgressStatusState)
  const getDate = (DataDate: string): string => {
    const LocalDdate = new Date(parseInt(DataDate)).toLocaleDateString()
    return LocalDdate
  }
  return (
    <>
      <TableItem>
        <TableRow>
          <Tflag
            style={{
              background: flagString,
            }}
          ></Tflag>
          <Link href={`/students/detail/${student.id}`}>
            <ClickBox>
              <Tnum>
                <EllipsisBox>
                  {(props.currentPage - 1) * conLimit + (conIndex + 1)}
                </EllipsisBox>
              </Tnum>
              <Tprogress style={{ color: progressStatus[progressNum].color }}>
                <EllipsisBox>{progressStatus[progressNum].name}</EllipsisBox>
              </Tprogress>
              <TsubDiv>
                <EllipsisBox>
                  {student.subject[0].subDiv ? student.subject[0].subDiv : '-'}
                </EllipsisBox>
              </TsubDiv>
              <Tbirthday>
                <EllipsisBox>
                  {student.birthday ? getDate(student.birthday) : '-'}
                </EllipsisBox>
              </Tbirthday>
              <Tname>
                <EllipsisBox>{student.name}</EllipsisBox>
              </Tname>
              <Tsubject>
                <EllipsisBox>
                  {student.subject[0].subjectName
                    ? student.subject[0].subjectName
                    : '-'}
                </EllipsisBox>
              </Tsubject>
              <Tphone>
                <EllipsisBox>{student.phoneNum1}</EllipsisBox>
              </Tphone>
              <Tmanager>
                <EllipsisBox>
                  {student.writer ? student.writer : '-'}
                </EllipsisBox>
              </Tmanager>
              <TcreatedAt>
                <EllipsisBox>
                  {student.createdAt ? getDate(student.createdAt) : '-'}
                </EllipsisBox>
              </TcreatedAt>
            </ClickBox>
          </Link>
        </TableRow>
      </TableItem>
    </>
  )
}
