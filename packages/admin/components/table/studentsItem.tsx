import { styled } from 'styled-components'
import { useMutation } from '@apollo/client'
import { useRecoilValue } from 'recoil'
import { progressStatusState } from '@/lib/recoilAtoms'
import { UPDATE_FAVORITE_MUTATION } from '@/graphql/mutations'
import { SEE_FAVORITESTATE_QUERY } from '@/graphql/queries'
import Link from 'next/link'
import { Checkbox } from '@nextui-org/react'

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
`

const Tfavorite = styled.div`
  position: relative;
  display: table-cell;
  width: 2%;
  font-size: inherit;
  color: inherit;
  min-width: 30px;
  padding: 1rem 1rem 1rem 1.5rem;
`
const TfavoriteLabel = styled.label`
  cursor: pointer;
`
const Tflag = styled.div`
  display: table-cell;
  width: 0.5rem;
  height: 100%;

  p {
    width: 0.5rem;
  }
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
  vertical-align: middle;
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
  width: 32%;
  padding: 1rem;
  font-size: inherit;
  min-width: ${1200 * 0.32}px;
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
  width: 11%;
  padding: 1rem;
  font-size: inherit;
  color: inherit;
  min-width: ${1200 * 0.11}px;
`
const Tmanager = styled.div`
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 11%;
  padding: 1rem;
  font-size: inherit;
  color: inherit;
  min-width: ${1200 * 0.11}px;
`

const EllipsisBox = styled.p`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

export default function studentsItem(props) {
  const conLimit = props.limit || 0
  const conIndex = props.itemIndex
  const student = props.tableData
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
              background: 'transparent',
            }}
          >
            <p></p>
          </Tflag>
          <Tfavorite>
            <TfavoriteLabel
              htmlFor={`${props.forName}check${student.id}`}
              style={{
                color: props.favorite ? '#FFC600' : '',
              }}
            >
              <i className={props.favorite ? 'xi-star' : 'xi-star-o'} />
              <input
                id={`${props.forName}check${student.id}`}
                type="checkbox"
                hidden
              />
            </TfavoriteLabel>
          </Tfavorite>
          <Link href={`/students/detail`}>
            <ClickBox>
              <Tnum>
                <EllipsisBox>
                  {(props.currentPage - 1) * conLimit + (conIndex + 1)}
                </EllipsisBox>
              </Tnum>
              <TsubDiv>
                <EllipsisBox>{student.subDiv}</EllipsisBox>
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
                  {student.subject ? student.subject : '-'}
                </EllipsisBox>
              </Tsubject>
              <Tphone>
                <EllipsisBox>{student.phone}</EllipsisBox>
              </Tphone>
              <Tmanager>
                <EllipsisBox>
                  {student.createManager ? student.createManager : '-'}
                </EllipsisBox>
              </Tmanager>
              <TcreatedAt>
                <EllipsisBox>
                  {student.createAt ? getDate(student.createAt) : '-'}
                </EllipsisBox>
              </TcreatedAt>
            </ClickBox>
          </Link>
        </TableRow>
      </TableItem>
    </>
  )
}
