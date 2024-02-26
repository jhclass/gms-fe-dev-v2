import { styled } from 'styled-components'
import Link from 'next/link'
import { useQuery } from '@apollo/client'
import { SEE_MANAGEUSER_QUERY } from '@/graphql/queries'

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
  display: table;
  width: 100%;
  min-width: fit-content;
  border-bottom: 1px solid #e4e4e7;
  color: #71717a;
  font-size: 0.875rem;
  border-radius: 0.5rem;
  background: #fff;
  overflow: hidden;
`

const FlexBox = styled.div`
  display: flex;
  gap: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`
const FilterLabel = styled.label`
  font-weight: 500;
  font-size: 0.875rem;
  line-height: 1.25rem;
  color: #11181c;
  display: block;
  padding-bottom: 0.375rem;
  span {
    color: red;
  }
`
const AreaBox = styled.div`
  flex: 1;
  width: 100%;
`
const AreaBoxS = styled.div`
  min-width: 5%;
  font-weight: bold;
  text-align: center;
  @media (max-width: 768px) {
    min-width: 100%;
    text-align: left;
  }
`
const FlatBox = styled.div`
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  background: hsl(240 5% 96%);
  height: 40px;
  line-height: 40px;
  border-radius: 0.5rem;
  font-size: 0.875rem;
`

export default function PerformanceTotal({
  ranking,
  managerId,
  totalAmount,
  totalCount,
}) {
  const {
    loading: managerLoading,
    error: managerError,
    data: managerData,
  } = useQuery(SEE_MANAGEUSER_QUERY)
  const managerList = managerData?.seeManageUser || []

  const feeFormet = fee => {
    const result = String(fee).replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')
    return result
  }
  return (
    <>
      <FlexBox>
        <AreaBoxS>
          <div>
            <FilterLabel>순위</FilterLabel>
            <FlatBox>{totalCount === 0 ? '-' : ranking + 1}</FlatBox>
          </div>
        </AreaBoxS>
        <AreaBox>
          <div>
            <FilterLabel>이름</FilterLabel>
            <FlatBox>
              {managerList.find(user => user.id === managerId).mUsername}
            </FlatBox>
          </div>
        </AreaBox>
        <AreaBox>
          <div>
            <FilterLabel>총 영업 건수</FilterLabel>
            <FlatBox>{totalCount}</FlatBox>
          </div>
        </AreaBox>
        <AreaBox>
          <div>
            <FilterLabel>총 금액</FilterLabel>
            <FlatBox>
              {totalAmount === undefined || totalAmount === null
                ? '0'
                : feeFormet(totalAmount)}
            </FlatBox>
          </div>
        </AreaBox>
      </FlexBox>
    </>
  )
}
