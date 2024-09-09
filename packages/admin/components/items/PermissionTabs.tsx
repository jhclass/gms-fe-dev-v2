import { Tab, Tabs } from '@nextui-org/react'
import { styled } from 'styled-components'
import { Suspense, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import PermissionTabItem from '@/components/items/PermissionTabItem'

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

export default function PermissionTabs() {
  const router = useRouter()
  const { typeTab } = router.query
  const [selected, setSelected] = useState('consult')

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
        <Tab key="consult" title="상담관리">
          <Suspense
            fallback={
              <LodingDiv>
                <i className="xi-spinner-2" />
              </LodingDiv>
            }
          >
            <PermissionTabItem topicName={'상담관리'} />
          </Suspense>
        </Tab>
        <Tab key="subjects" title="과정관리">
          <Suspense
            fallback={
              <LodingDiv>
                <i className="xi-spinner-2" />
              </LodingDiv>
            }
          >
            <PermissionTabItem topicName={'과정관리'} />
          </Suspense>
        </Tab>
        <Tab key="students" title="수강생관리">
          <Suspense
            fallback={
              <LodingDiv>
                <i className="xi-spinner-2" />
              </LodingDiv>
            }
          >
            <PermissionTabItem topicName={'수강생관리'} />
          </Suspense>
        </Tab>
        <Tab key="lecture" title="강의관리">
          <Suspense
            fallback={
              <LodingDiv>
                <i className="xi-spinner-2" />
              </LodingDiv>
            }
          >
            <PermissionTabItem topicName={'강의관리'} />
          </Suspense>
        </Tab>
        <Tab key="accounting" title="회계관리">
          <Suspense
            fallback={
              <LodingDiv>
                <i className="xi-spinner-2" />
              </LodingDiv>
            }
          >
            <PermissionTabItem topicName={'회계관리'} />
          </Suspense>
        </Tab>
        <Tab key="hr" title="인사관리">
          <Suspense
            fallback={
              <LodingDiv>
                <i className="xi-spinner-2" />
              </LodingDiv>
            }
          >
            <PermissionTabItem topicName={'인사관리'} />
          </Suspense>
        </Tab>
      </Tabs>
    </>
  )
}
