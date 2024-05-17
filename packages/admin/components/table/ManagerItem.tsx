import { styled } from 'styled-components'
import { useMutation } from '@apollo/client'
import { useRecoilValue } from 'recoil'
import { gradeState, progressStatusState } from '@/lib/recoilAtoms'
import { UPDATE_FAVORITE_MUTATION } from '@/graphql/mutations'
import { SEE_FAVORITESTATE_QUERY } from '@/graphql/queries'
import Link from 'next/link'
import { Checkbox } from '@nextui-org/react'
import useMmeQuery from '@/utils/mMe'

const TableItem = styled.div<{ $resign: string }>`
  position: relative;
  width: 100%;
  min-width: fit-content;
  border-bottom: 1px solid #e4e4e7;
  color: #71717a;
  font-size: 0.875rem;
  border-radius: 0.5rem;
  overflow: hidden;
  background: ${props => (props.$resign === 'Y' ? '#e4e4e7' : '#fff')};

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
  display: flex;
  width: 100%;
  align-items: center;
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
const AvatarBox = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  align-items: center;
  /* @media (max-width: 768px) {
    flex-direction: column;
  } */
`
const AvatarF = styled.div`
  position: relative;
  border-radius: 100%;
  overflow: hidden;
  width: 2rem;
  height: 2rem;
  background-color: #4f46e5;
  background-position: center;
  background-size: 100%;
  font-size: 1rem;
  text-align: center;
  color: #fff;
  font-weight: 700;
  line-height: 2rem;
`
const Tid = styled.div`
  position: relative;
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 10%;
  padding: 1rem;
  font-size: inherit;
  color: #07bbae;
  min-width: ${1200 * 0.1}px;
  font-weight: 600;
`
const Tname = styled.div`
  position: relative;
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 10%;
  padding: 1rem;
  font-size: inherit;
  color: #007de9;
  min-width: ${1200 * 0.1}px;
  font-weight: 600;
`
const Tpart = styled.div`
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 14%;
  padding: 1rem;
  font-size: inherit;
  color: inherit;
  min-width: ${1200 * 0.14}px;
`
const Trank = styled.div`
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 8%;
  padding: 1rem;
  font-size: inherit;
  color: inherit;
  min-width: ${1200 * 0.08}px;
`
const Tphone = styled.div`
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 10%;
  padding: 1rem;
  font-size: inherit;
  color: inherit;
  min-width: ${1200 * 0.1}px;
`
const Temail = styled.div`
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 15%;
  padding: 1rem;
  font-size: inherit;
  color: inherit;
  min-width: ${1200 * 0.15}px;
`
const TjoiningDate = styled.div`
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 10%;
  padding: 1rem;
  font-size: inherit;
  color: inherit;
  min-width: ${1200 * 0.1}px;
`
const Tdate = styled.div`
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 7%;
  padding: 1rem;
  font-size: inherit;
  color: inherit;
  min-width: ${1200 * 0.07}px;
  font-weight: 600;
`
const ResignTag = styled.span`
  display: inline-block;
  background: #ff5900;
  border-radius: 0.5rem;
  color: #fff;
  font-size: 0.8rem;
  padding: 0.1rem 0.5rem;
  vertical-align: middle;
`
const DateTag = styled.span`
  display: inline-block;
  background: #007de9;
  border-radius: 0.5rem;
  color: #fff;
  font-size: 0.8rem;
  padding: 0.1rem 0.5rem;
  vertical-align: middle;
`
const EllipsisBox = styled.p`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

export default function ManagerItem(props) {
  const grade = useRecoilValue(gradeState)
  const { useMme } = useMmeQuery()
  const mGrade = useMme('mGrade')
  const conLimit = props.limit || 0
  const conIndex = props.itemIndex
  const managerData = props.tableData
  const gradeStr = data => {
    if (data == null) {
      return 'A'
    } else {
      const idF = data?.charAt(0).toUpperCase()
      return idF
    }
  }

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

  const calculateDday = date => {
    const timestamp = parseInt(date, 10)
    const joiningDate = new Date(timestamp)
    const today = new Date()
    const timeDiff = today.getTime() - joiningDate.getTime()
    const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24))
    return '+' + daysDiff
  }
  console.log(managerData)
  return (
    <>
      <TableItem $resign={managerData.resign}>
        <TableRow>
          <Link
            href={mGrade < grade.general ? `/hr/detail/${managerData.id}` : '#'}
          >
            <ClickBox>
              <Tnum>{conIndex + 1}</Tnum>
              <Tid>
                <AvatarBox>
                  {managerData?.mAvatar?.imageUrl ? (
                    <AvatarF
                      style={{
                        backgroundImage: `url('${managerData?.mAvatar?.imageUrl}')`,
                      }}
                    ></AvatarF>
                  ) : (
                    <AvatarF>{gradeStr(managerData?.mUserId)}</AvatarF>
                  )}
                  <EllipsisBox>{managerData.mUserId}</EllipsisBox>
                </AvatarBox>
              </Tid>
              <Tname>
                <EllipsisBox>{managerData.mUsername}</EllipsisBox>
              </Tname>
              <Tpart>
                <EllipsisBox>{managerData.mPart.join(',')}</EllipsisBox>
              </Tpart>
              <Trank>
                <EllipsisBox>{managerData.mRank}</EllipsisBox>
              </Trank>
              <Tphone>
                <EllipsisBox>
                  {managerData.mPhoneNumCompany
                    ? managerData.mPhoneNumCompany
                    : '-'}
                </EllipsisBox>
              </Tphone>
              <Tphone>
                <EllipsisBox>
                  {managerData.mPhoneNum ? managerData.mPhoneNum : '-'}
                </EllipsisBox>
              </Tphone>
              <Temail>
                <EllipsisBox>
                  {managerData.email ? managerData.email : '-'}
                </EllipsisBox>
              </Temail>
              <TjoiningDate>
                <EllipsisBox>
                  {managerData.mJoiningDate
                    ? formatDate(managerData.mJoiningDate, false)
                    : '-'}
                </EllipsisBox>
              </TjoiningDate>
              {managerData.resign === 'Y' ? (
                <Tdate>
                  <ResignTag>퇴사</ResignTag>
                </Tdate>
              ) : (
                <Tdate>
                  <DateTag>
                    {managerData.mJoiningDate
                      ? calculateDday(managerData.mJoiningDate)
                      : '-'}
                  </DateTag>
                </Tdate>
              )}
            </ClickBox>
          </Link>
        </TableRow>
      </TableItem>
    </>
  )
}
