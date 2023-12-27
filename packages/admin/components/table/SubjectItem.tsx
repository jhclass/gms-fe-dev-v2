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
  }
}

const Tname = styled.div`
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 60%;
  padding: 1rem;
  font-size: inherit;
  color: inherit;
  min-width: 360px;
  font-size: 0.875rem;
  font-weight: 600;
  color: #71717a;
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
  font-size: 0.875rem;
  color: #71717a;
`

const EllipsisBox = styled.p`
  display: -webkit-box;
  word-wrap: break-word;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
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
      <Tname>
        <EllipsisBox>{subject.subjectName}</EllipsisBox>
      </Tname>
      <TsubDiv>{subject.subDiv}</TsubDiv>
      <Tfee>{feeFormet(subject.fee)}</Tfee>
    </>
  )
}
