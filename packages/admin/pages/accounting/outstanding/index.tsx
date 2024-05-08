import MainWrap from '@/components/wrappers/MainWrap'
import Breadcrumb from '@/components/common/Breadcrumb'
import Layout from '@/pages/accounting/layout'
import { styled } from 'styled-components'
import PaymentTable from '@/components/table/PaymentList'
import PaymentFilter from '@/components/filter/PaymentFilter'
import { useRecoilState } from 'recoil'
import {
  paymentFilterActiveState,
  paymentFilterState,
  paymentSearchState,
} from '@/lib/recoilAtoms'
import PaymentFilterTable from '@/components/table/PaymentListFilter'
import { Suspense } from 'react'

const ConBox = styled.div`
  margin: 2rem 0;
`
const LodingDiv = styled.div`
  padding: 1.5rem;
  width: 100%;
  min-width: 20rem;
  position: relative;
  background: none;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export default function Outstanding() {
  const [filterActive, setFilterActive] = useRecoilState(
    paymentFilterActiveState,
  )
  const [filterSearch, setFilterSearch] = useRecoilState(paymentFilterState)
  const [studentFilter, setStudentFilter] = useRecoilState(paymentSearchState)

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
        <PaymentFilter
          isActive={filterActive}
          onFilterSearch={setFilterSearch}
          setStudentFilter={setStudentFilter}
          studentFilter={studentFilter}
        />
        <ConBox>
          <Suspense
            fallback={
              <LodingDiv>
                <i className="xi-spinner-2" />
              </LodingDiv>
            }
          >
            {filterSearch ? (
              <PaymentFilterTable studentFilter={studentFilter} />
            ) : (
              <PaymentTable />
            )}
          </Suspense>
        </ConBox>
      </MainWrap>
    </>
  )
}
Outstanding.getLayout = page => <Layout>{page}</Layout>
