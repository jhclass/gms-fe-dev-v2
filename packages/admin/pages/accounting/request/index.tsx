import MainWrap from '@/components/wrappers/MainWrap'
import Breadcrumb from '@/components/common/Breadcrumb'
import Layout from '@/pages/accounting/layout'
import { styled } from 'styled-components'
import ReqRefundTable from '@/components/table/ReqRefundList'
import ReqRefundFilter from '@/components/filter/ReqRefundFilter'
import { useRecoilState } from 'recoil'
import {
  reqRefundFilterActiveState,
  reqRefundFilterState,
  reqRefundSearchState,
} from '@/lib/recoilAtoms'
import ReqRefundFilterTable from '@/components/table/ReqRefundListFilter'

const ConBox = styled.div`
  margin: 2rem 0;
`

export default function RequestRefund() {
  const [filterActive, setFilterActive] = useRecoilState(
    reqRefundFilterActiveState,
  )
  const [filterSearch, setFilterSearch] = useRecoilState(reqRefundFilterState)
  const [studentFilter, setStudentFilter] = useRecoilState(reqRefundSearchState)

  return (
    <>
      <MainWrap>
        <Breadcrumb
          onFilterToggle={setFilterActive}
          isActive={filterActive}
          isFilter={true}
          isWrite={false}
          rightArea={true}
        />
        <ReqRefundFilter
          isActive={filterActive}
          onFilterSearch={setFilterSearch}
          setStudentFilter={setStudentFilter}
        />
        <ConBox>
          {filterSearch ? (
            <ReqRefundFilterTable studentFilter={studentFilter} />
          ) : (
            <ReqRefundTable />
          )}
        </ConBox>
      </MainWrap>
    </>
  )
}
RequestRefund.getLayout = page => <Layout>{page}</Layout>
