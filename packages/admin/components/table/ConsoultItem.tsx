import { useState } from 'react'
import { styled } from 'styled-components'
import { useMutation } from '@apollo/client'
import { useRecoilValue } from 'recoil'
import { progressStatusState } from '@/lib/recoilAtoms'
import { UPDATE_FAVORITE_MUTATION } from '@/graphql/mutations'
import router from 'next/router'

type ConsoultItemProps = {
  tableData: {
    id: number
    stName: string
    phoneNum1: string
    progress: number
    subDiv: string
    stVisit: string
    expEnrollDate: string
    createdAt: string
    favorite: boolean
    receiptDiv: string
    pic: string
  }
  itemIndex: number
  currentPage: number
  limit?: number
  total?: number
}

const TableRow = styled.div`
  position: relative;
  display: table-row;
  width: 100%;
  min-width: fit-content;
  text-align: center;
`

const TableItem = styled.div`
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
const Tfavorite = styled.div`
  position: relative;
  display: table-cell;
  width: 2%;
  font-size: inherit;
  color: inherit;
  min-width: 30px;
  padding: 1rem 1rem 1rem 2rem;
`
const TfavoriteLabel = styled.label`
  cursor: pointer;
`
const Tflag = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  width: 0.5rem;
  height: 100%;
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
  min-width: 50px;
`
const TreceiptDiv = styled.div`
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 9%;
  padding: 1rem;
  font-size: inherit;
  color: inherit;
  min-width: 100px;
`
const TsubDiv = styled.div`
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 9%;
  padding: 1rem;
  font-size: inherit;
  color: inherit;
  min-width: 100px;
`
const Tname = styled.div`
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 11%;
  padding: 1rem;
  font-size: inherit;
  color: inherit;
  min-width: 100px;
`
const Tphone = styled.div`
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 11%;
  padding: 1rem;
  font-size: inherit;
  color: inherit;
  min-width: 120px;
`
const TcreatedAt = styled.div`
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 12%;
  padding: 1rem;
  font-size: inherit;
  color: inherit;
  min-width: 120px;
`
const Tmanager = styled.div`
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 10%;
  padding: 1rem;
  font-size: inherit;
  color: inherit;
  min-width: 100px;
`
const TstVisit = styled.div`
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 12%;
  padding: 1rem;
  font-size: inherit;
  color: inherit;
  min-width: 120px;
`
const TexpEnrollDate = styled.div`
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 12%;
  padding: 1rem;
  font-size: inherit;
  color: inherit;
  min-width: 120px;
`
const Tprogress = styled.div`
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 10%;
  padding: 1rem;
  font-size: inherit;
  color: inherit;
  min-width: 90px;
  border-radius: 0 0.5rem 0.5rem 0;
`

const EllipsisBox = styled.p`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

export default function ConsolutItem(props: ConsoultItemProps) {
  const favoritTotal = props.total || 0
  const conLimit = props.limit || 0
  const conIndex = props.itemIndex
  const student = props.tableData
  const progressStatus = useRecoilValue(progressStatusState)
  const [toggleFavo, setToggleFavo] = useState<boolean>(student.favorite)
  const [updateFavo, { loading }] = useMutation(UPDATE_FAVORITE_MUTATION)

  const ListClick = id => {
    router.push(`/consult/detail/${id}`)
  }
  const isDisplayFlag = (date: string): string => {
    const currentDate = new Date()
    const targetDate = new Date(date)
    const differenceInDays = Math.floor(
      (currentDate.getTime() - targetDate.getTime()) / (1000 * 60 * 60 * 24),
    )

    if (differenceInDays >= 0 && differenceInDays < 3) {
      return 'new'
    } else if (differenceInDays >= 3 && differenceInDays < 5) {
      return 'unprocessed'
    }

    return ''
  }
  const favoClick = () => {
    setToggleFavo(!toggleFavo)
    updateFavo({
      variables: {
        updateFavoriteId: props.tableData.id,
        favorite: !toggleFavo,
      },
    })
  }
  const getDate = (DataDate: string): string => {
    const LocalDdate = new Date(parseInt(DataDate)).toLocaleDateString()
    return LocalDdate
  }

  return (
    <>
      <TableItem>
        <TableRow>
          <Tfavorite>
            <Tflag
              style={{
                background:
                  isDisplayFlag(getDate(student.createdAt)) === 'new'
                    ? '#007de9'
                    : isDisplayFlag(getDate(student.createdAt)) ===
                      'unprocessed'
                    ? '#FF5900'
                    : '',
              }}
            ></Tflag>
            <TfavoriteLabel
              htmlFor={`check${student.id}`}
              style={{
                color: toggleFavo ? '#FFC600' : '',
              }}
            >
              <i className={toggleFavo ? 'xi-star' : 'xi-star-o'} />
              <input
                id={`check${student.id}`}
                type="checkbox"
                onClick={() => {
                  favoClick()
                }}
                hidden
              />
            </TfavoriteLabel>
          </Tfavorite>
          <ClickBox onClick={() => ListClick(student.id)}>
            <Tnum>
              <EllipsisBox>
                {(props.currentPage - 1) * conLimit +
                  (conIndex + favoritTotal + 1)}
              </EllipsisBox>
            </Tnum>
            <Tprogress
              style={{ color: progressStatus[student.progress].color }}
            >
              <EllipsisBox>{progressStatus[student.progress].name}</EllipsisBox>
            </Tprogress>
            <TreceiptDiv>
              <EllipsisBox>{student.receiptDiv}</EllipsisBox>
            </TreceiptDiv>
            <TsubDiv>
              <EllipsisBox>{student.subDiv}</EllipsisBox>
            </TsubDiv>
            <Tname>
              <EllipsisBox>{student.stName}</EllipsisBox>
            </Tname>
            <Tphone>
              <EllipsisBox>{student.phoneNum1}</EllipsisBox>
            </Tphone>
            <TcreatedAt>
              <EllipsisBox>
                {student.createdAt ? getDate(student.createdAt) : '-'}
              </EllipsisBox>
            </TcreatedAt>
            <Tmanager>
              <EllipsisBox>{student.pic ? student.pic : '-'}</EllipsisBox>
            </Tmanager>
            <TstVisit>
              <EllipsisBox>
                {student.stVisit ? getDate(student.stVisit) : '-'}
              </EllipsisBox>
            </TstVisit>
            <TexpEnrollDate>
              <EllipsisBox>
                {student.expEnrollDate ? getDate(student.expEnrollDate) : '-'}
              </EllipsisBox>
            </TexpEnrollDate>
          </ClickBox>
        </TableRow>
      </TableItem>
    </>
  )
}
