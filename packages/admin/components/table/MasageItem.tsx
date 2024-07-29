import { styled } from 'styled-components'
import Link from 'next/link'
import { useDisclosure } from '@nextui-org/react'
import SeeRequestMessage from '@/components/modal/SeeRequestMessage'

const TableItem = styled.div`
  position: relative;
  width: 100%;
  min-width: fit-content;
  border-bottom: 1px solid #e4e4e7;
  color: ${({ theme }) => theme.colors.gray};
  font-size: 0.875rem;
  border-radius: 0.5rem;
  overflow: hidden;
  background: #fff;
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
const Tname = styled.div`
  position: relative;
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 12%;
  padding: 1rem;
  font-size: inherit;
  min-width: ${1200 * 0.12}px;
  font-weight: 600;
`
const Tcon = styled.div`
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 58%;
  padding: 1rem;
  font-size: inherit;
  color: inherit;
  min-width: ${1200 * 0.58}px;
`
const TDate = styled.div`
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 12%;
  padding: 1rem;
  font-size: inherit;
  color: inherit;
  min-width: ${1200 * 0.12}px;
`
const EllipsisBox = styled.p`
  display: -webkit-box;
  word-wrap: break-word;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`

export default function ConsolutItem(props) {
  const conLimit = props.limit || 0
  const conIndex = props.itemIndex
  const managerData = props.tableData

  const { isOpen, onOpen, onClose } = useDisclosure()

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

  return (
    <>
      <TableItem>
        <TableRow>
          <Link href={`#`} onClick={onOpen}>
            <ClickBox>
              <Tnum>{conIndex + 1}</Tnum>
              <Tname>
                <EllipsisBox>{managerData.mUsername}</EllipsisBox>
              </Tname>
              <Tcon>
                <EllipsisBox>
                  요청
                  내용내용내용내용내내용내용내용내용내내용내용내용내용내내용내용내용내용내내용내용내용내용내내용내용내용내용내내용내용내용내용내내용내용내용내용내내용내용내용내용내내용내용내용내용내내용내용내용내용내내용내용내용내용내내용내용내용내용내내용내용내용내용내내용내용내용내용내내용내용내용내용내내용내용내용내용내내용내용내용내용내내용내용내용내용내내용내용내용내용내내용내용내용내용내내용내용내용내용내내용내용내용내용내내용내용내용내용내내용내용내용내용내용내용
                </EllipsisBox>
              </Tcon>
              <TDate>
                <EllipsisBox>
                  {managerData.mJoiningDate
                    ? formatDate(managerData.mJoiningDate, false)
                    : '-'}
                </EllipsisBox>
              </TDate>
              <TDate>
                <EllipsisBox>
                  {managerData.mJoiningDate
                    ? formatDate(managerData.mJoiningDate, false)
                    : '-'}
                </EllipsisBox>
              </TDate>
            </ClickBox>
          </Link>
        </TableRow>
      </TableItem>
      <SeeRequestMessage isOpen={isOpen} onClose={onClose} />
    </>
  )
}
