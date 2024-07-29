import { styled } from 'styled-components'
import { useMutation } from '@apollo/client'
import { useRecoilValue } from 'recoil'
import { progressStatusState } from '@/lib/recoilAtoms'
import { UPDATE_FAVORITE_MUTATION } from '@/graphql/mutations'
import { SEE_FAVORITESTATE_QUERY } from '@/graphql/queries'
import Link from 'next/link'
import { Button, Checkbox } from '@nextui-org/react'
import { useState } from 'react'
import LectureReportList from './LectureReportList'
import { useRouter } from 'next/router'

const TableItem = styled.div`
  position: relative;
  display: table;
  width: 100%;
  min-width: fit-content;
  border-bottom: 1px solid #e4e4e7;
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
`

const Tnum = styled.div`
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 5%;
  padding: 1rem;
  font-size: inherit;
  color: inherit;
  min-width: ${1200 * 0.05}px;
`

const TlecturName = styled.div`
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 18%;
  padding: 1rem;
  font-size: inherit;
  color: inherit;
  min-width: ${1200 * 0.18}px;
`
const Tperiod = styled.div`
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 12%;
  padding: 1rem;
  font-size: inherit;
  color: inherit;
  min-width: ${1200 * 0.12}px;
`
const Tteacher = styled.div`
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 8%;
  padding: 1rem;
  font-size: inherit;
  color: inherit;
  min-width: ${1200 * 0.08}px;
`

const Tname = styled.div`
  position: relative;
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 8%;
  padding: 1rem;
  font-size: inherit;
  min-width: ${1200 * 0.08}px;
`

const Tphone = styled.div`
  position: relative;
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 8%;
  padding: 1rem;
  font-size: inherit;
  min-width: ${1200 * 0.08}px;
`

const Tcheck = styled.div`
  position: relative;
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 6%;
  padding: 1rem;
  font-size: inherit;
  min-width: ${1200 * 0.06}px;
`

const Tcompany = styled.div`
  position: relative;
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 11%;
  padding: 1rem;
  font-size: inherit;
  min-width: ${1200 * 0.11}px;
`
const Tdates = styled.div`
  position: relative;
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 8%;
  padding: 1rem;
  font-size: inherit;
  min-width: ${1200 * 0.08}px;
`

const EllipsisBox = styled.p`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
`

export default function ConsolutItem(props) {
  const router = useRouter()
  const conLimit = props.limit || 0
  const conIndex = props.itemIndex
  const student = props.tableData
  const progressStatus = useRecoilValue(progressStatusState)
  const studentAdvice = student?.adviceTypes.map(item => item.type) || []
  const [isOpen, setIsOpen] = useState(false)

  const formatDate = (data, isTime) => {
    const timestamp = parseInt(data, 10)
    const date = new Date(timestamp)
    if (isTime) {
      if (date.getHours() === 0 && date.getMinutes() === 0) {
        const formatted =
          `${date.getFullYear()}-` +
          `${(date.getMonth() + 1).toString().padStart(2, '0')}-` +
          `${date.getDate().toString().padStart(2, '0')} ` +
          `미정`
        return formatted
      } else {
        const formatted =
          `${date.getFullYear()}-` +
          `${(date.getMonth() + 1).toString().padStart(2, '0')}-` +
          `${date.getDate().toString().padStart(2, '0')} ` +
          `${date.getHours().toString().padStart(2, '0')}:` +
          `${date.getMinutes().toString().padStart(2, '0')}`
        return formatted
      }
    } else {
      const formatted =
        `${date.getFullYear()}-` +
        `${(date.getMonth() + 1).toString().padStart(2, '0')}-` +
        `${date.getDate().toString().padStart(2, '0')} `
      return formatted
    }
  }

  const rejectCheck = (clickCheck: number): void => {
    if (props.checkItem !== undefined) {
      const isItemSelected: boolean = props.checkItem?.includes(clickCheck)
      const newSelectedItems = isItemSelected
        ? props.checkItem?.filter(item => item !== clickCheck)
        : [...props?.checkItem, clickCheck]
      props.setCheckItem(newSelectedItems)
    }
  }

  return (
    <>
      <TableItem>
        <TableRow>
          <Link href={`/lecture/employmentDetail`}>
            <ClickBox>
              <Tnum>
                <EllipsisBox>
                  {/* {(props.currentPage - 1) * conLimit + (conIndex + 1)} */}1
                </EllipsisBox>
              </Tnum>
              <TlecturName>
                <EllipsisBox>
                  [1회차] 웹툰콘텐츠제작 Part2
                  (원화,캐릭터,채색,배경,포토샵,클립스튜디오) B
                </EllipsisBox>
              </TlecturName>
              <Tperiod>
                <EllipsisBox>2024-01-01 ~ 2024-03-15</EllipsisBox>
              </Tperiod>
              <Tdates>
                <EllipsisBox>2024-05-03</EllipsisBox>
              </Tdates>
              <Tteacher>
                <EllipsisBox>김강사</EllipsisBox>
              </Tteacher>
              <Tname>
                <EllipsisBox>김나라 &#91;30세&#93;</EllipsisBox>
              </Tname>
              <Tphone>
                <EllipsisBox>01023459876</EllipsisBox>
              </Tphone>
              <Tcheck>
                <EllipsisBox>미취업</EllipsisBox>
              </Tcheck>
              <Tdates>
                <EllipsisBox>2024-05-03</EllipsisBox>
              </Tdates>
              <Tcompany>
                <EllipsisBox>주식회사 크로니즈시스템</EllipsisBox>
              </Tcompany>
              <Tdates>
                <EllipsisBox>2024-05-03</EllipsisBox>
              </Tdates>
            </ClickBox>
          </Link>
        </TableRow>
      </TableItem>
    </>
  )
}
