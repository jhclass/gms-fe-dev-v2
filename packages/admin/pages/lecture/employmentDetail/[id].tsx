import MainWrap from '@/components/wrappers/MainWrap'
import { useEffect, useState } from 'react'
import Breadcrumb from '@/components/common/Breadcrumb'
import { styled } from 'styled-components'
import { useRouter } from 'next/router'
import { Button } from '@nextui-org/react'
import { useMutation } from '@apollo/client'
import Layout from '@/pages/students/layout'
import {
  SEARCH_LECTURES_MUTATION,
  SEARCH_PAYMENT_MUTATION,
} from '@/graphql/mutations'
import LectureInfo from '@/components/items/LectureInfo'
import EmploymentTabs from '@/components/items/EmploymentTabs'
import EmploymentInfoForm from '@/components/form/EmploymentInfoForm'
import FormTopInfo from '@/components/common/FormTopInfo'

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
  const [searchLectures] = useMutation(SEARCH_LECTURES_MUTATION)
  const [searchPayment] = useMutation(SEARCH_PAYMENT_MUTATION)
  const [lectureData, setLectureData] = useState(null)
  const [paymentData, setPaymentData] = useState(null)
  const [students, setStudents] = useState(null)

  const fetchData = async () => {
    try {
      const resData = await searchPayment({
        variables: {
          searchStudentPaymentId: parseInt(paymentId),
        },
      })

      if (resData.data.searchStudentPayment.ok) {
        const data = resData.data.searchStudentPayment.data
        if (data.length > 0) {
          setPaymentData(data[0])

          const result = await searchLectures({
            variables: {
              searchLecturesId: data[0].subject.lectures.id,
            },
          })

          if (result.data.searchLectures.ok) {
            const lectureData = result.data.searchLectures.data
            if (lectureData.length > 0) {
              setLectureData(lectureData[0])
            }
          }
        }
      }
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
      {paymentData && lectureData && (
        <MainWrap>
          <ConArea>
            <Breadcrumb isFilter={false} isWrite={false} rightArea={false} />
            <DetailBox>
              <FormTopInfo item={lectureData} noti={false} />
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
                        router.push(`/lecture/detail/${lectureData?.id}`)
                      }
                    }}
                  >
                    수정
                  </Button>
                </AreaTitle>
                <LectureInfo
                  lectureData={lectureData}
                  students={students}
                  attendance={false}
                />
              </DetailDiv>
            </DetailBox>
            <DetailBox>
              <DetailDiv>
                <AreaTitle>
                  <h4>학생정보</h4>
                </AreaTitle>
                <EmploymentInfoForm
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
