import { ScrollShadow } from '@nextui-org/react'
import { styled } from 'styled-components'

type subjectItemProps = {
  tableData: {
    id: number
    subDiv: string
    subjectName: string
    createdAt: string
    updatedAt: string
    fee: number
    startDate: string
    endDate: string
    roomNum: string
    exposure: boolean
    round: number
  }
}

const Tname = styled.div`
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 60%;
  padding: 0.5rem;
  font-size: inherit;
  color: inherit;
  min-width: 360px;
  font-size: 0.875rem;
  font-weight: 600;
  vertical-align: middle;
  text-align: left;
  color: #71717a;
  @media (max-width: 768px) {
    padding: 0.5rem;
  }
`
const TsubDiv = styled.div`
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 17%;
  padding: 1rem;
  font-size: inherit;
  color: inherit;
  min-width: 102px;
  font-size: 0.875rem;
  color: #71717a;
  vertical-align: middle;
  @media (max-width: 768px) {
    padding: 0.5rem;
  }
`
const Tfee = styled.div`
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 23%;
  padding: 1rem;
  font-size: inherit;
  color: inherit;
  min-width: 132px;
  vertical-align: middle;
  font-size: 0.875rem;
  color: #71717a;
  @media (max-width: 768px) {
    padding: 0.5rem;
  }
`

const EllipsisBox = styled.p`
  display: -webkit-box;
  word-wrap: break-word;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`

const ScrollBox = styled.div`
  /* overflow-x: auto; */
  width: 360px;
  white-space: nowrap;

  .scrollbar {
    padding: 0.5rem;
  }
`
export default function SubjectItem(props: subjectItemProps) {
  const subject = props.tableData
  const feeFormet = fee => {
    const result = fee
      .toString()
      .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')
    return result
  }

  return (
    <>
      <Tname>{`[${subject.round}회차] ${subject.subjectName}`}</Tname>
      <TsubDiv>{subject.subDiv}</TsubDiv>
      <Tfee>{feeFormet(subject.fee)}</Tfee>
    </>
  )
}
