import MainWrap from '@/components/wrappers/MainWrap'
import Breadcrumb from '@/components/common/Breadcrumb'
import { styled } from 'styled-components'
import { useRecoilState, useRecoilValue } from 'recoil'
import {
  consultFilterActiveState,
  consultFilterState,
  consultSearchState,
  gradeState,
} from '@/lib/recoilAtoms'
import Layout from '@/pages/consult/layout'
import useMmeQuery from '@/utils/mMe'
import SuspenseBox from '@/components/wrappers/SuspenseWrap'
import Consult from '@/components/layout/Consult'

export default function ConsultIndex() {
  const grade = useRecoilValue(gradeState)
  const { useMme } = useMmeQuery()
  const mGrade = useMme('mGrade')
  const mId = useMme('id')
  const [filterActive, setFilterActive] = useRecoilState(
    consultFilterActiveState,
  )
  const [filterSearch, setFilterSearch] = useRecoilState(consultFilterState)
  const [studentFilter, setStudentFilter] = useRecoilState(consultSearchState)

  return (
    <>
      <MainWrap>
        <Breadcrumb
          onFilterToggle={setFilterActive}
          isActive={filterActive}
          rightArea={true}
          isFilter={true}
          write={{
            permissionName: null,
            link: '/consult/write',
          }}
          typeBtn={{
            typeLink: 'adviceType',
            permissionName: '상담분야',
          }}
          addRender={''}
        />
        <SuspenseBox>
          <Consult
            filterActive={filterActive}
            studentFilter={studentFilter}
            setFilterSearch={setFilterSearch}
            setStudentFilter={setStudentFilter}
            mGrade={mGrade}
            grade={grade}
            mId={mId}
            filterSearch={filterSearch}
          />
        </SuspenseBox>
      </MainWrap>
    </>
  )
}
ConsultIndex.getLayout = page => <Layout>{page}</Layout>
