import MainWrap from '@/components/wrappers/MainWrap'
import { useEffect, useState } from 'react'
import Breadcrumb from '@/components/common/Breadcrumb'
import { styled } from 'styled-components'
import { useRouter } from 'next/router'
import { Button } from '@nextui-org/react'
import { useLazyQuery } from '@apollo/client'
import Layout from '@/pages/students/layout'
import LectureInfo from '@/components/layout/infoCard/LectureInfo'
import EmploymentTabs from '@/components/layout/tab/EmploymentTabs'
import RecordInfoForm from '@/components/form/RecordInfoForm'
import FormTopInfo from '@/components/common/FormTopInfo'
import { SEARCH_STUDENT_RECORD_QUERY } from '@/graphql/queries'

const ConArea = styled.div`
  width: 100%;
  max-width: 1400px;
`
const DetailBox = styled.div`
  margin-top: 2rem;
  background: #fff;
  border-radius: 0.5rem;
  padding: 1.5rem;
`
const DetailDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  @media (max-width: 768px) {
    gap: 1rem;
  }
`
const FlexChipBox = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`

const AreaTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  h4 {
    font-size: 1.2rem;
    font-weight: 600;
  }
`
const AreaTitleFilter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  h4 {
    font-size: 1.2rem;
    font-weight: 600;
  }
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`
const BtnBox = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: center;
`

export default function EmploymentDetail() {
  const router = useRouter()
  const paymentId = typeof router.query.id === 'string' ? router.query.id : null
  const [searchRecord] = useLazyQuery(SEARCH_STUDENT_RECORD_QUERY)
  const [subjectData, setSubjectData] = useState(null)
  const [paymentData, setPaymentData] = useState(null)

  const fetchData = async () => {
    try {
      await searchRecord({
        variables: {
          searchAcademyRecordId: parseInt(paymentId),
        },
        onCompleted: resData => {
          if (resData.searchAcademyRecord.ok) {
            setPaymentData(resData.searchAcademyRecord.result[0])
            setSubjectData(resData.searchAcademyRecord.result[0].subject)
          }
        },
      })
    } catch (error) {
      console.error('Error fetching data: ', error)
    }
  }

  useEffect(() => {
    if (!paymentId) return
    fetchData()
  }, [router])

  return (
    <>
      {paymentData && subjectData && (
        <MainWrap>
          <ConArea>
            <Breadcrumb isFilter={false} isWrite={false} rightArea={false} />
            <DetailBox>
              <FormTopInfo
                item={subjectData?.lectures}
                noti={false}
                time={true}
              />
              <DetailDiv>
                <AreaTitle>
                  <h4>기본 정보</h4>
                  <Button
                    size="sm"
                    radius="sm"
                    variant="solid"
                    color="primary"
                    className="text-white"
                    onClick={() => {
                      {
                        router.push(
                          `/lecture/detail/${subjectData?.lectures?.id}`,
                        )
                      }
                    }}
                  >
                    수정
                  </Button>
                </AreaTitle>
                <LectureInfo
                  lectureData={subjectData?.lectures}
                  attendance={false}
                  students={null}
                />
              </DetailDiv>
            </DetailBox>
            <DetailBox>
              <DetailDiv>
                <AreaTitle>
                  <h4>학생정보</h4>
                </AreaTitle>
                <RecordInfoForm
                  paymentData={paymentData}
                  fetchData={fetchData}
                />
              </DetailDiv>
            </DetailBox>
            <EmploymentTabs
              paymentId={parseInt(paymentId)}
              subjectId={paymentData.subjectId}
            />
            <DetailBox>
              <BtnBox>
                <Button
                  size="md"
                  radius="md"
                  variant="bordered"
                  color="primary"
                  className="lg:w-[50%] w-full"
                  onClick={() => {
                    router.back()
                  }}
                >
                  이전으로
                </Button>
              </BtnBox>
            </DetailBox>
          </ConArea>
        </MainWrap>
      )}
    </>
  )
}
EmploymentDetail.getLayout = page => <Layout>{page}</Layout>
