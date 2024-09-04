import { Tab, Tabs } from '@nextui-org/react'
import { styled } from 'styled-components'
import { Suspense, useEffect, useState } from 'react'
import useMmeQuery from '@/utils/mMe'
import { useRecoilValue } from 'recoil'
import { gradeState } from '@/lib/recoilAtoms'
import { useRouter } from 'next/router'
import PermissionCate from '@/components/form/PermissionCate'

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
const NotiText = styled.p`
  text-align: center;
  font-size: 0.875rem;
`

export default function PermissionTabs() {
  const router = useRouter()
  const { typeTab } = router.query
  const [selected, setSelected] = useState('category')

  useEffect(() => {
    if (typeTab) {
      setSelected(String(typeTab))
    }
  }, [typeTab])

  return (
    <>
      <Tabs
        variant="underlined"
        aria-label="Options"
        color="primary"
        classNames={{
          tabList: 'flex-wrap',
          tab: 'w-auto',
        }}
        selectedKey={selected}
        onSelectionChange={e => setSelected(String(e))}
      >
        <Tab key="category" title="카테고리">
          <Suspense
            fallback={
              <LodingDiv>
                <i className="xi-spinner-2" />
              </LodingDiv>
            }
          >
            <PermissionCate isActive={true} permissionName={'상담관리'} />
          </Suspense>

          <Suspense
            fallback={
              <LodingDiv>
                <i className="xi-spinner-2" />
              </LodingDiv>
            }
          >
            <PermissionCate isActive={true} permissionName={'과정관리'} />
          </Suspense>

          <Suspense
            fallback={
              <LodingDiv>
                <i className="xi-spinner-2" />
              </LodingDiv>
            }
          >
            <PermissionCate isActive={true} permissionName={'수강생관리'} />
          </Suspense>

          <Suspense
            fallback={
              <LodingDiv>
                <i className="xi-spinner-2" />
              </LodingDiv>
            }
          >
            <PermissionCate isActive={true} permissionName={'강의관리'} />
          </Suspense>

          <Suspense
            fallback={
              <LodingDiv>
                <i className="xi-spinner-2" />
              </LodingDiv>
            }
          >
            <PermissionCate isActive={true} permissionName={'회계관리'} />
          </Suspense>

          <Suspense
            fallback={
              <LodingDiv>
                <i className="xi-spinner-2" />
              </LodingDiv>
            }
          >
            <PermissionCate
              isActive={true}
              permissionName={'통계 > 영업성과'}
            />
          </Suspense>

          <Suspense
            fallback={
              <LodingDiv>
                <i className="xi-spinner-2" />
              </LodingDiv>
            }
          >
            <PermissionCate isActive={true} permissionName={'인사관리'} />
          </Suspense>

          <Suspense
            fallback={
              <LodingDiv>
                <i className="xi-spinner-2" />
              </LodingDiv>
            }
          >
            <PermissionCate isActive={true} permissionName={'메시지'} />
          </Suspense>

          <Suspense
            fallback={
              <LodingDiv>
                <i className="xi-spinner-2" />
              </LodingDiv>
            }
          >
            <PermissionCate
              isActive={true}
              permissionName={'환경설정 > 분야관리'}
            />
          </Suspense>
        </Tab>
      </Tabs>
    </>
  )
}
