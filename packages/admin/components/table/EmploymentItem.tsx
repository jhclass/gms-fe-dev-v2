import { styled } from 'styled-components'
import { useRecoilValue } from 'recoil'
import { progressStatusState } from '@/lib/recoilAtoms'
import { Button } from '@nextui-org/react'
import { useState } from 'react'
import { useRouter } from 'next/router'
import EmploymentStateList from '@/components/table/EmploymentStateList'

const TableItem = styled.div`
  position: relative;
  width: 100%;
  min-width: fit-content;
  border-bottom: 1px solid ${({ theme }) => theme.colors.lightGray};
  color: ${({ theme }) => theme.colors.gray};
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
  display: table;
  width: 100%;
  min-width: fit-content;
  text-align: center;
  z-index: 1;
  /* display: grid;
  width: 100%;
  grid-template-columns: 0.5rem 2% auto; */
`
const ClickBox = styled.div`
  width: 100%;
  display: table-cell;
  /* display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center; */
  > div {
    display: flex;
    width: 100%;
    align-items: center;
  }

  .subDiv {
    background: ${({ theme }) => theme.colors.offWhite};
  }
`
const Tnum = styled.div`
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 6%;
  padding: 1rem;
  font-size: inherit;
  color: inherit;
  min-width: ${1200 * 0.06}px;
`
const TlecturName = styled.div`
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 32%;
  padding: 1rem;
  font-size: inherit;
  color: inherit;
  min-width: ${1200 * 0.32}px;
`
const Tperiod = styled.div`
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 16%;
  padding: 1rem;
  font-size: inherit;
  color: inherit;
  min-width: ${1200 * 0.16}px;
`
const Ttimes = styled.div`
  position: relative;
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 10%;
  padding: 1rem;
  font-size: inherit;
  min-width: ${1200 * 0.1}px;
`

const Tteacher = styled.div`
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
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 10%;
  padding: 1rem;
  font-size: inherit;
  color: inherit;
  min-width: ${1200 * 0.1}px;
`
const Tcheck = styled.div`
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 8%;
  padding: 1rem;
  font-size: inherit;
  color: inherit;
  min-width: ${1200 * 0.08}px;
`
const Tbtn = styled.div`
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 8%;
  padding: 1rem;
  font-size: inherit;
  color: inherit;
  min-width: ${1200 * 0.08}px;
`
const BtnBox = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 0.5rem;
`
const Tdiv = styled.div<{ $isOpen: boolean }>`
  display: ${props => (props.$isOpen ? 'block' : 'none')};
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 0.5rem 1rem;
  font-size: inherit;
  color: inherit;
  min-width: ${1200 * 0.09}px;
  border-top: 1px solid ${({ theme }) => theme.colors.lightGray};
`

const EllipsisBox = styled.p`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

export default function EmploymentItem(props) {
  const router = useRouter()
  const conLimit = props.limit || 0
  const conIndex = props.itemIndex
  const student = props.tableData
  const [isOpen, setIsOpen] = useState(false)

  const formatDate = data => {
    const timestamp = parseInt(data, 10)
    const date = new Date(timestamp)
    const formatted =
      `${date.getFullYear()}-` +
      `${(date.getMonth() + 1).toString().padStart(2, '0')}-` +
      `${date.getDate().toString().padStart(2, '0')} `
    return formatted
  }

  const formatUsernames = data => {
    return data.map(item => item.mUsername).join(', ')
  }

  return (
    <>
      <TableItem>
        <TableRow>
          <ClickBox onClick={() => setIsOpen(!isOpen)}>
            <div>
              <Tnum>
                <EllipsisBox>
                  {(props.currentPage - 1) * conLimit + (conIndex + 1)}
                </EllipsisBox>
              </Tnum>
              <TlecturName>
                <EllipsisBox>
                  {student?.subject?.lectures?.temporaryName}
                </EllipsisBox>
              </TlecturName>
              <Tperiod>
                <EllipsisBox>
                  {formatDate(student?.subject?.lectures?.lecturePeriodStart) +
                    ' - ' +
                    formatDate(student?.subject?.lectures?.lecturePeriodEnd)}
                </EllipsisBox>
              </Tperiod>
              <Ttimes>
                <EllipsisBox>
                  {/* {extractTimeRange(lecture.lectureTime)} */}
                </EllipsisBox>
              </Ttimes>
              <Tteacher>
                <EllipsisBox>
                  {formatUsernames(student?.subject?.lectures?.teachers)}
                </EllipsisBox>
              </Tteacher>
              <Tname>
                <EllipsisBox>{student?.student?.name}</EllipsisBox>
              </Tname>
              <Tcheck>
                <EllipsisBox>
                  {student?.EmploymentStatus.length > 0
                    ? student?.EmploymentStatus[0].employmentType
                    : '미취업'}
                </EllipsisBox>
              </Tcheck>
              <Tbtn>
                <BtnBox>
                  {/* {(mGrade < grade.general || mPart.includes('교무팀')) && (
                    <Button
                      size="sm"
                      variant="solid"
                      color="primary"
                      className="w-full text-white"
                      onClick={e => {
                        e.preventDefault()
                        router.push(`/lecture/detail/${lecture.id}`)
                      }}
                    >
                      강의 수정
                    </Button>
                  )} */}
                  <Button
                    size="sm"
                    variant="bordered"
                    color="primary"
                    className="w-full"
                    onClick={e => {
                      e.preventDefault()
                      // router.push(`/lecture/attendance/${lecture.id}`)
                    }}
                  >
                    수정
                  </Button>
                </BtnBox>
              </Tbtn>
            </div>
            <div>
              <Tdiv $isOpen={isOpen}>
                <EmploymentStateList student={student} />
              </Tdiv>
            </div>
          </ClickBox>
        </TableRow>
      </TableItem>
    </>
  )
}
