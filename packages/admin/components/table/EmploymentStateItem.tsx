import { styled } from 'styled-components'

const TableRow = styled.div`
  position: relative;
  display: table-row;
  width: 100%;
  min-width: fit-content;
  text-align: center;
  z-index: 1;
  /* display: grid;
  width: 100%;
  grid-template-columns: 0.5rem 2% auto; */
`
const ClickBox = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
`
const Tphone = styled.div`
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 10%;
  font-size: inherit;
  color: inherit;
  min-width: ${1200 * 0.1}px;
`
const Tnum = styled.div`
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 8%;
  font-size: inherit;
  color: inherit;
  min-width: ${1200 * 0.08}px;
`
const Tname = styled.div`
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 20%;
  font-size: inherit;
  color: inherit;
  min-width: ${1200 * 0.2}px;
`
const Tdate = styled.div`
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 10%;
  font-size: inherit;
  color: inherit;
  min-width: ${1200 * 0.1}px;
`
const EllipsisBox = styled.p`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

export default function EmploymentStateItem({ student }) {
  const formatDate = data => {
    const timestamp = parseInt(data, 10)
    const date = new Date(timestamp)
    const formatted =
      `${date.getFullYear()}-` +
      `${(date.getMonth() + 1).toString().padStart(2, '0')}-` +
      `${date.getDate().toString().padStart(2, '0')} `
    return formatted
  }
  return (
    <>
      <TableRow>
        <ClickBox>
          <Tphone>
            <EllipsisBox>{student.student.phoneNum1}</EllipsisBox>
          </Tphone>
          <Tnum>
            <EllipsisBox>{student.subject.lectures.sessionNum}</EllipsisBox>
          </Tnum>
          <Tdate>
            <EllipsisBox>
              {student.EmploymentStatus.length > 0
                ? formatDate(student.EmploymentStatus[0].dateOfEmployment)
                : '-'}
            </EllipsisBox>
          </Tdate>
          <Tname>
            <EllipsisBox>
              {student.EmploymentStatus.length > 0
                ? student.EmploymentStatus[0].companyName
                : '-'}
            </EllipsisBox>
          </Tname>
          <Tdate>
            <EllipsisBox>
              {student.StudentConsultation.length > 0
                ? formatDate(
                    student.StudentConsultation[
                      student.StudentConsultation.length - 1
                    ].createdAt,
                  )
                : '-'}
            </EllipsisBox>
          </Tdate>
        </ClickBox>
      </TableRow>
    </>
  )
}
