import { Card, CardBody, Link, Tab, Tabs } from '@nextui-org/react'
import { styled } from 'styled-components'
import CreateAdviceType from '@/components/form/CreateAdviceType'
import { Suspense, useEffect, useState } from 'react'
import useMmeQuery from '@/utils/mMe'
import { useRecoilValue } from 'recoil'
import { gradeState } from '@/lib/recoilAtoms'
import { useRouter } from 'next/router'

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
  const [selected, setSelected] = useState('adviceType')

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
          <Tab key="adviceType" title="상담분야">
            {mGrade < grade.general ? (
              <Suspense
                fallback={
                  <LodingDiv>
                    <i className="xi-spinner-2" />
                  </LodingDiv>
                }
              >
                <CreateAdviceType isActive={true} category={'상담분야'} />
              </Suspense>
            ) : (
              <Card radius="sm">
                <CardBody>
                  <NotiText>
                    상담분야 설정 권한이 없습니다.
                    <br />
                    <b>Master</b>에게 요청하세요.
                  </NotiText>
                </CardBody>
              </Card>
            )}
          </Tab>
          <Tab key="subDiv" title="수강구분">
            {mGrade < grade.general || mPart.includes('영업팀') ? (
              <Suspense
                fallback={
                  <LodingDiv>
                    <i className="xi-spinner-2" />
                  </LodingDiv>
                }
              >
                <CreateAdviceType isActive={true} category={'수강구분'} />
              </Suspense>
            ) : (
              <Card radius="sm">
                <CardBody>
                  <NotiText>
                    수강구분 설정 권한이 없습니다.
                    <br />
                    <b>Master</b> 또는 영업팀에 요청하세요.
                  </NotiText>
                </CardBody>
              </Card>
            )}
          </Tab>
          <Tab key="teacherType" title="강의분야">
            {mGrade < grade.general || mPart.includes('교무팀') ? (
              <Suspense
                fallback={
                  <LodingDiv>
                    <i className="xi-spinner-2" />
                  </LodingDiv>
                }
              >
                <CreateAdviceType isActive={true} category={'강의분야'} />
              </Suspense>
            ) : (
              <Card radius="sm">
                <CardBody>
                  <NotiText>
                    강의분야 설정 권한이 없습니다.
                    <br />
                    <b>Master</b> 또는 교무팀에 요청하세요.
                  </NotiText>
                </CardBody>
              </Card>
            )}
          </Tab>
          <Tab key="employmentType" title="취업유형">
            {/* {mGrade < grade.general || mPart.includes('취업지원팀') ? ( */}
            {mGrade < 1 ? (
              <Suspense
                fallback={
                  <LodingDiv>
                    <i className="xi-spinner-2" />
                  </LodingDiv>
                }
              >
                <CreateAdviceType isActive={true} category={'취업유형'} />
              </Suspense>
            ) : (
              <Card radius="sm">
                <CardBody>
                  <NotiText>
                    취업유형 설정 권한이 없습니다.
                    <br />
                    <b>Master</b> 또는 교무팀에 요청하세요.
                  </NotiText>
                </CardBody>
              </Card>
            )}
          </Tab>
        </Tabs>
      </>
    )
  )
}
