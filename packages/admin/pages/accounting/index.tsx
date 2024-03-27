import MainWrap from '@/components/wrappers/MainWrap'
import Breadcrumb from '@/components/common/Breadcrumb'
import Layout from '@/pages/accounting/layout'
import { styled } from 'styled-components'
import { useRecoilState } from 'recoil'
import {
  paymentDetailFilterActiveState,
  paymentDetailFilterState,
  paymentDetailPageState,
  paymentDetailSearchState,
} from '@/lib/recoilAtoms'
import PaymentDetailTable from '@/components/table/PaymentDetailList'
import PaymentDetailFilter from '@/components/filter/PaymentDetailFilter'
import { Suspense } from 'react'
import PaymentDetailFilterTable from '@/components/table/PaymentDetailListFilter'

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

export default function Accounting() {
  const [filterActive, setFilterActive] = useRecoilState(
    paymentDetailFilterActiveState,
  )
  const [filterSearch, setFilterSearch] = useRecoilState(
    paymentDetailFilterState,
  )
  const [studentFilter, setStudentFilter] = useRecoilState(
    paymentDetailSearchState,
  )
  const [currentPage, setCurrentPage] = useRecoilState(paymentDetailPageState)

  return (
    <>
      <MainWrap>
        <Breadcrumb
          onFilterToggle={setFilterActive}
          isActive={filterActive}
          rightArea={true}
        />
        <PaymentDetailFilter
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
              <PaymentDetailFilterTable studentFilter={studentFilter} />
            ) : (
              <PaymentDetailTable
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              />
            )}
          </Suspense>
        </ConBox>
      </MainWrap>
    </>
  )
}
Accounting.getLayout = page => <Layout>{page}</Layout>
