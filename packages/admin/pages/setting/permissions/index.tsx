import { styled } from 'styled-components'
import Layout from '@/pages/setting/permissions/layout'
import MainWrap from '@/components/wrappers/MainWrap'
import Breadcrumb from '@/components/common/Breadcrumb'
import PermissionTabs from '@/components/items/PermissionTabs'

const ConBox = styled.div`
  margin: 2rem 0;
  z-index: 0;
  position: relative;
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

export default function SettingPermissions() {
  return (
    <>
      <MainWrap>
        <Breadcrumb
          onFilterToggle={false}
          isActive={false}
          isFilter={false}
          isWrite={false}
          rightArea={false}
        />
        <ConBox>
          <PermissionTabs />
        </ConBox>
      </MainWrap>
    </>
  )
}
SettingPermissions.getLayout = page => <Layout>{page}</Layout>
