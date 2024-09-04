import { Card, CardBody, Link, Tab, Tabs } from '@nextui-org/react'
import { styled } from 'styled-components'
import { Suspense, useEffect, useState } from 'react'
import useMmeQuery from '@/utils/mMe'
import { useRecoilValue } from 'recoil'
import { gradeState } from '@/lib/recoilAtoms'
import { useRouter } from 'next/router'
import CreateAdviceType from '@/components/form/CreateAdviceType'
import CreateSmsSender from '@/components/form/CreateSmsSender'
import PermisstionCate from '../form/PermisstionCate'

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

export default function TypesTabs() {
  const router = useRouter()
  const { typeTab } = router.query
  const grade = useRecoilValue(gradeState)
  const { useMme } = useMmeQuery()
  const mGrade = useMme('mGrade')
  const mPart = useMme('mPart') || []
  const [selected, setSelected] = useState('category')

  useEffect(() => {
    if (typeTab) {
      setSelected(String(typeTab))
    }
  }, [typeTab])

  return (
    mPart &&
    grade && (
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
              <PermisstionCate isActive={true} category={'상담분야'} />
            </Suspense>
          </Tab>
        </Tabs>
      </>
    )
  )
}
