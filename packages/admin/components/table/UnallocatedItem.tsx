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
  grid-template-columns: 0.5rem 2% auto; */
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
  width: 6%;
  padding: 1rem;
  font-size: inherit;
  color: inherit;
  min-width: ${1200 * 0.06}px;
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
const TsubjectName = styled.div`
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 61%;
  padding: 1rem;
  font-size: inherit;
  color: inherit;
  min-width: ${1200 * 0.61}px;
`
const Tdate = styled.div`
  position: relative;
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 10%;
  padding: 1rem;
  font-size: inherit;
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
const Tbtn = styled.div`
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 15%;
  padding: 1rem;
  font-size: inherit;
  color: inherit;
  min-width: ${1200 * 0.15}px;
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
  border-top: 1px solid #e4e4e7;
`

const EllipsisBox = styled.p`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
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
          <Tflag
            style={{
              background: 'transparent',
            }}
          ></Tflag>

          <ClickBox onClick={() => setIsOpen(!isOpen)}>
            <Tnum>
              <EllipsisBox>
                {/* {(props.currentPage - 1) * conLimit + (conIndex + 1)} */}1
              </EllipsisBox>
            </Tnum>
            <Tdate>
              <EllipsisBox>24.05.01</EllipsisBox>
            </Tdate>
            <Tname>
              <EllipsisBox>
                {/* {student.stName} */}
                수강생
              </EllipsisBox>
            </Tname>
            <TsubDiv>
              <EllipsisBox>
                {/* {student.subDiv} */}
                근로자
              </EllipsisBox>
            </TsubDiv>
            <TsubjectName>
              <EllipsisBox>
                {/* {student.subDiv} */}
                귀여운이모티콘 제작하기 귀여운이모티콘 제작하기 귀여운이모티콘
                제작하기
              </EllipsisBox>
            </TsubjectName>
            <Tbtn>
              <BtnBox>
                <Button
                  size="sm"
                  variant="solid"
                  color="primary"
                  className="w-full text-white"
                  onClick={e => {
                    e.preventDefault()
                    router.push('/lecture/detail')
                  }}
                >
                  강의 배정
                </Button>
                <Button
                  size="sm"
                  variant="bordered"
                  color="primary"
                  className="w-full"
                  onClick={e => {
                    e.preventDefault()
                    router.push('/lecture/attendance')
                  }}
                >
                  학적부
                </Button>
              </BtnBox>
            </Tbtn>
          </ClickBox>
        </TableRow>
      </TableItem>
    </>
  )
}
