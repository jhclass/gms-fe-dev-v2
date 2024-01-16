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
  /* display: grid;
  width: 100%;
  grid-template-columns: 0.5rem 2% auto; */
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
  min-width: 60px;
`
const TreceiptDiv = styled.div`
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 9%;
  padding: 1rem;
  font-size: inherit;
  color: inherit;
  min-width: 90px;
`
const TsubDiv = styled.div`
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 9%;
  padding: 1rem;
  font-size: inherit;
  color: inherit;
  min-width: 90px;
`
const TadviceType = styled.div`
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 13%;
  padding: 1rem;
  font-size: inherit;
  color: inherit;
  min-width: 130px;
`
const Tname = styled.div`
  position: relative;
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 10%;
  padding: 1rem;
  font-size: inherit;
  min-width: 100px;
  font-weight: 600;
`
const Masking = styled.span`
  background: rgba(255, 255, 255, 0.8);
  -webkit-filter: blur(2.5px);
  -o-filter: blur(2.5px);
  backdrop-filter: blur(2.5px);
`
const Tphone = styled.div`
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 11%;
  padding: 1rem;
  font-size: inherit;
  color: inherit;
  min-width: 110px;
`
const TcreatedAt = styled.div`
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 11%;
  padding: 1rem;
  font-size: inherit;
  color: inherit;
  min-width: 110px;
`
const Tmanager = styled.div`
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 9%;
  padding: 1rem;
  font-size: inherit;
  color: inherit;
  min-width: 90px;
`
const TstVisit = styled.div`
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 15%;
  padding: 1rem;
  font-size: inherit;
  color: inherit;
  min-width: 150px;
  font-weight: 600;
`
const Tprogress = styled.div`
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 8%;
  padding: 1rem;
  font-size: inherit;
  color: inherit;
  min-width: 80px;
`

const EllipsisBox = styled.p`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const isDisplayFlag = (date: string, step: number): string => {
  const currentDate = new Date()
  const differenceInDays = Math.floor(
    (currentDate.getTime() - parseInt(date)) / (1000 * 60 * 60 * 24),
  )

  if (differenceInDays >= 0 && differenceInDays < 3) {
    return '#007de9'
  } else if (differenceInDays >= 3 && step === 999) {
    return '#FF5900'
  } else {
    return 'transparent'
  }
}

export default function ConsolutItem(props: ConsultItemProps) {
  const conLimit = props.limit || 0
  const conIndex = props.itemIndex
  const student = props.tableData
  const flagString = isDisplayFlag(student.createdAt, student.progress)
  const [updateFavo, { loading }] = useMutation(UPDATE_FAVORITE_MUTATION)
  const progressStatus = useRecoilValue(progressStatusState)
  const studentAdvice = student?.adviceTypes.map(item => item.type)

  const favoClick = () => {
    if (!props.favorite && props.favoTotal >= 5) {
      alert('즐겨찾기는 5개까지만 설정가능합니다.')
    } else {
      updateFavo({
        variables: {
          updateFavoriteId: props.tableData.id,
        },
        refetchQueries: [SEE_FAVORITESTATE_QUERY, 'SeeFavo'],
      })
    }
  }

  const fametDate = (data, isTime) => {
    const timestamp = parseInt(data, 10)
    const date = new Date(timestamp)
    if (isTime) {
      const formatted =
        `${date.getFullYear()}-` +
        `${(date.getMonth() + 1).toString().padStart(2, '0')}-` +
        `${date.getDate().toString().padStart(2, '0')} ` +
        `${date.getHours() >= 12 ? 'PM' : 'AM'} ` +
        `${(date.getHours() % 12 || 12).toString().padStart(2, '0')}:` +
        `${date.getMinutes().toString().padStart(2, '0')}`
      return formatted
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
          {!props.checkBtn ? (
            <>
              <Tflag
                style={{
                  background: flagString,
                }}
              ></Tflag>
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
                    onClick={() => {
                      favoClick()
                    }}
                    hidden
                  />
                </TfavoriteLabel>
              </Tfavorite>
            </>
          ) : (
            <>
              <Tflag
                style={{
                  background: 'transparent',
                }}
              ></Tflag>
              <Tfavorite>
                <Checkbox
                  isSelected={props.checkItem?.includes(student.id)}
                  onValueChange={() => {
                    rejectCheck(student.id)
                  }}
                ></Checkbox>
              </Tfavorite>
            </>
          )}

          <Link href={`/consult/detail/${student.id}`}>
            <ClickBox>
              <Tnum>
                <EllipsisBox>
                  {(props.currentPage - 1) * conLimit + (conIndex + 1)}
                </EllipsisBox>
              </Tnum>
              <TcreatedAt>
                <EllipsisBox>
                  {student.createdAt
                    ? fametDate(student.createdAt, false)
                    : '-'}
                </EllipsisBox>
              </TcreatedAt>
              <TreceiptDiv>
                <EllipsisBox>{student.receiptDiv}</EllipsisBox>
              </TreceiptDiv>
              <Tname>
                {student.progress === 110 ? (
                  <EllipsisBox>
                    <Masking>{student.stName}</Masking>
                  </EllipsisBox>
                ) : (
                  <EllipsisBox>{student.stName}</EllipsisBox>
                )}
              </Tname>
              <Tphone>
                <EllipsisBox>{student.phoneNum1}</EllipsisBox>
              </Tphone>
              <TsubDiv>
                <EllipsisBox>{student.subDiv}</EllipsisBox>
              </TsubDiv>
              <TadviceType>
                <EllipsisBox>{String(studentAdvice)}</EllipsisBox>
              </TadviceType>
              <Tprogress
                style={{ color: progressStatus[student.progress].color }}
              >
                <EllipsisBox>
                  {progressStatus[student.progress].name}
                </EllipsisBox>
              </Tprogress>
              <TstVisit>
                <EllipsisBox>
                  {student.stVisit ? fametDate(student.stVisit, true) : '-'}
                </EllipsisBox>
              </TstVisit>
              <Tmanager>
                <EllipsisBox>{student.pic ? student.pic : '-'}</EllipsisBox>
              </Tmanager>
            </ClickBox>
          </Link>
        </TableRow>
      </TableItem>
    </>
  )
}
