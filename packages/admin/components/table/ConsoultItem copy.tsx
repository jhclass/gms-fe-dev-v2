import { useState } from 'react'
import { styled } from 'styled-components'

type ConsoultItemProps = {
  tableData: {
    id: number
    campus: string
    stName: string
    phoneNum1: string
    currentManager: string
    progress: number
    subDiv: string
    stVisit: string
    expEnrollDate: string
    createdAt: string
    favorite: boolean
    receiptDiv: string
  }
  itemIndex: number
}

const TableItem = styled.div`
  position: relative;
  z-index: 1;
  width: 100%;
  min-width: fit-content;
  display: flex;
  flex-wrap: nowrap;
  row-gap: 0.5rem;
  background-color: #fff;
  border-bottom: 1px solid #e4e4e7;
  color: #71717a;
  font-size: 0.875rem;
  border-radius: 0.5rem;
  min-width: 1200px;

  &:hover {
    cursor: pointer;
    background: rgba(255, 255, 255, 0.8);
  }
`
const Tfavorite = styled.div`
  position: relative;
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2%;
  font-size: inherit;
  color: inherit;
  min-width: 30px;
  padding: 1rem 1rem 1rem 2rem;
  min-width: 30px;
`
const ClickBox = styled.div`
  display: flex;
  width: 98%;
`
const Tnum = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 6%;
  font-size: inherit;
  color: inherit;
  min-width: 110px;
  padding: 1rem;
`
const TfavoriteLabel = styled.label`
  cursor: pointer;
`
const TreceiptDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 7%;
  font-size: inherit;
  color: inherit;
  padding: 1rem;
  min-width: 117px;
`
const TsubDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 7%;
  padding: 1rem;
  font-size: inherit;
  color: inherit;
  min-width: 117px;
`
const Tname = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 7%;
  width: auto;
  padding: 1rem;
  font-size: inherit;
  color: inherit;
  min-width: 100px;
`
const Tphone = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 10%;
  min-width: 9%;
  padding: 1rem;
  font-size: inherit;
  color: inherit;
  min-width: 150px;
`
const TcreatedAt = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 8%;
  padding: 1rem;
  font-size: inherit;
  color: inherit;
  min-width: 130px;
`
const Tmanager = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 10%;
  padding: 1rem;
  font-size: inherit;
  color: inherit;
  min-width: 114px;
`
const TstVisit = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: %
  min-width: 8%;
  padding: 1rem;
  font-size: inherit;
  color: inherit;
  min-width: 130px;
`
const TexpEnrollDate = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 10%
  min-width: 8%;
  padding: 1rem;
  font-size: inherit;
  color: inherit;
  min-width: 130px;
`
const Tprogress = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 8%;
  min-width: 8%;
  padding: 1rem;
  font-size: inherit;
  color: inherit;
  min-width: 130px;
`

const EllipsisBox = styled.p`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

export default function ConsolutItem(props: ConsoultItemProps) {
  const conIndex = props.itemIndex
  const student = props.tableData
  const [checkedItems, setCheckedItems] = useState<boolean[]>([])

  const handleCheckboxChange = (index: number) => {
    setCheckedItems(prevCheckedItems => {
      const updatedCheckedItems = [...prevCheckedItems]
      updatedCheckedItems[index] = !updatedCheckedItems[index]
      return updatedCheckedItems
    })
  }

  const testClick = () => {
    alert('a')
  }

  const getDate = (DataDate: string): string => {
    const LocalDdate = new Date(parseInt(DataDate)).toLocaleDateString()
    return LocalDdate
  }

  const getProgressText = (progress: number): string => {
    switch (progress) {
      case 1:
        return '상담예정'
      case 2:
        return '방문예정'
      case 3:
        return '상담완료'
      case 4:
        return '등록예정'
      case 5:
        return '등록완료'
      case 6:
        return '재전화요망'
      case 7:
        return '부재중'
      case 8:
        return '내용확인'
      case 9:
        return '가배정'
      case 10:
        return '수강생'
      case 11:
        return '오류/거부'
      default:
        return '접수대기'
    }
  }

  return (
    <>
      <TableItem>
        <Tfavorite>
          <TfavoriteLabel
            htmlFor={`check${student.id}`}
            className={checkedItems[student.id] ? 'text-yellow-300' : ''}
          >
            <i className={checkedItems[student.id] ? 'xi-star' : 'xi-star-o'} />
            <input
              id={`check${student.id}`}
              type="checkbox"
              onChange={() => handleCheckboxChange(student.id)}
              hidden
            />
          </TfavoriteLabel>
        </Tfavorite>
        <ClickBox onClick={testClick}>
          <Tnum>
            <EllipsisBox>{conIndex + 1}asdfasdfasdfasdfasdf</EllipsisBox>
          </Tnum>
          <TreceiptDiv>
            <EllipsisBox>{student.receiptDiv}asdfasdfasdfasdf</EllipsisBox>
          </TreceiptDiv>
          <TsubDiv>
            <EllipsisBox>{student.subDiv}asdfasdfasdfasdf</EllipsisBox>
          </TsubDiv>
          <Tname>
            <EllipsisBox>{student.stName}asdfasdfasdfasdf</EllipsisBox>
          </Tname>
          <Tphone>
            <EllipsisBox>{student.phoneNum1}asdfasdfasdfasdf</EllipsisBox>
          </Tphone>
          <TcreatedAt>
            <EllipsisBox>
              {student.createdAt
                ? getDate(student.createdAt)
                : '-asdfasdfasdfasdfasdf'}
            </EllipsisBox>
          </TcreatedAt>
          <Tmanager>
            <EllipsisBox>
              {student.currentManager
                ? student.currentManager
                : '-asdfasdfasdfasdfasdf'}
            </EllipsisBox>
          </Tmanager>
          <TstVisit>
            <EllipsisBox>
              {student.stVisit
                ? getDate(student.stVisit)
                : '-asdfasdfasdfasdfasdf'}
            </EllipsisBox>
          </TstVisit>
          <TexpEnrollDate>
            <EllipsisBox>
              {student.expEnrollDate
                ? getDate(student.expEnrollDate)
                : '-asdfasdfasdfasdfasdf'}
            </EllipsisBox>
          </TexpEnrollDate>
          <Tprogress>
            <EllipsisBox>
              {getProgressText(student.progress)}asdfasdfasdfasdfasdf
            </EllipsisBox>
          </Tprogress>
        </ClickBox>
      </TableItem>
    </>
  )
}
