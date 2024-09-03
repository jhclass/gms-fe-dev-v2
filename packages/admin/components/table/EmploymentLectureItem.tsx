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
  width: 26%;
  padding: 1rem;
  font-size: inherit;
  color: inherit;
  min-width: ${1200 * 0.26}px;
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

export default function EmploymentLectureItem(props) {
  const router = useRouter()
  const conLimit = props.limit || 0
  const conIndex = props.itemIndex
  const lecture = props.tableData
  const [isOpen, setIsOpen] = useState(props.itemIndex === 0 ? true : false)

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

  const addSixMonths = dateString => {
    const timestamp = parseInt(dateString, 10)
    const date = new Date(timestamp)
    date.setMonth(date.getMonth() + 6)

    return formatDate(date.getTime())
  }
  const handleClick = id => {
    router.push({
      pathname: `/lecture/employmentDetail/${id}`,
      query: { typeTab: 'employmentState' },
    })
  }

  return (
    <>
      {lecture?.subject?.StudentPayment?.length > 0 &&
        lecture?.subject?.StudentPayment.map((item, index) => (
          <TableItem key={index}>
            <TableRow>
              <ClickBox onClick={() => setIsOpen(!isOpen)}>
                <div>
                  <Tnum>
                    <EllipsisBox>
                      {(props.currentPage - 1) * conLimit + (conIndex + 1)}
                    </EllipsisBox>
                  </Tnum>
                  <TlecturName>
                    <EllipsisBox>{lecture?.temporaryName}</EllipsisBox>
                  </TlecturName>
                  <Tnum>
                    <EllipsisBox>{lecture?.sessionNum}</EllipsisBox>
                  </Tnum>
                  <Tperiod>
                    <EllipsisBox>
                      {formatDate(lecture?.lecturePeriodStart) +
                        ' - ' +
                        formatDate(lecture?.lecturePeriodEnd)}
                    </EllipsisBox>
                  </Tperiod>
                  <Ttimes>
                    <EllipsisBox>
                      {addSixMonths(lecture?.lecturePeriodEnd)}
                    </EllipsisBox>
                  </Ttimes>
                  <Tteacher>
                    <EllipsisBox>
                      {formatUsernames(lecture?.teachers)}
                    </EllipsisBox>
                  </Tteacher>
                  <Tname>
                    <EllipsisBox>{item?.student?.name}</EllipsisBox>
                  </Tname>
                  <Tcheck>
                    <EllipsisBox>{item?.employment}</EllipsisBox>
                  </Tcheck>
                  <Tbtn>
                    <BtnBox>
                      <Button
                        size="sm"
                        variant="bordered"
                        color="primary"
                        className="w-full"
                        onClick={() => {
                          handleClick(item.id)
                        }}
                      >
                        수정
                      </Button>
                    </BtnBox>
                  </Tbtn>
                </div>
                <div>
                  <Tdiv $isOpen={isOpen}>
                    {/* <EmploymentStateList student={item} /> */}
                  </Tdiv>
                </div>
              </ClickBox>
            </TableRow>
          </TableItem>
        ))}
    </>
  )
}
