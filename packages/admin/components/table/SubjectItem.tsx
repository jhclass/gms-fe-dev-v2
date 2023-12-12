import { styled } from 'styled-components'

type ConsoultItemProps = {
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
  width: 50%;
  padding: 1rem;
  font-size: inherit;
  color: inherit;
  min-width: 300px;
  font-size: 0.875rem;
`
const TsubDiv = styled.div`
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 25%;
  padding: 1rem;
  font-size: inherit;
  color: inherit;
  min-width: 150px;
  font-size: 0.875rem;
`
const Tfee = styled.div`
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 25%;
  padding: 1rem;
  font-size: inherit;
  color: inherit;
  min-width: 150px;
  font-size: 0.875rem;
`

const EllipsisBox = styled.p`
  display: -webkit-box;
  word-wrap: break-word;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`
export default function SubjectItem(props: ConsoultItemProps) {
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
