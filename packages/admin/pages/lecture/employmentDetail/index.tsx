import MainWrap from '@/components/wrappers/MainWrap'
import { useEffect, useState } from 'react'
import Breadcrumb from '@/components/common/Breadcrumb'
import { styled } from 'styled-components'
import { useRouter } from 'next/router'
import { Button } from '@nextui-org/react'
import { useMutation } from '@apollo/client'
import Layout from '@/pages/students/layout'
import { SEARCH_LECTURES_MUTATION } from '@/graphql/mutations'
import LectureInfo from '@/components/items/LectureInfo'
import AcquisitionList from '@/components/table/AcquisitionList'
import EducationalHistory from '@/components/table/EducationalHistory'
import CareerHistory from '@/components/table/CareerHistory'
import EmploymentTabs from '@/components/items/EmploymentTabs'
import EmploymentInfoForm from '@/components/form/EmploymentInfoForm'

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
const FlexBox = styled.div`
  display: flex;
  justify-content: end;
  margin-top: 0.5rem;
  padding: 1.5rem;
`
const FlexConBox = styled.div`
  display: flex;
  gap: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`

const AreaBox = styled.div`
  flex: 1;
  width: 100%;
  display: flex;

  > div {
    width: 100%;
  }
`
const FilterLabel = styled.label`
  font-weight: 500;
  font-size: 0.875rem;
  line-height: 1.25rem;
  color: ${({ theme }) => theme.colors.black};
  display: block;
  padding-bottom: 0.375rem;
  span {
    color: red;
  }
`
const LineBox = styled.div`
  padding-left: 0.25rem;
  padding-right: 0.25rem;
  border-bottom: 2px solid hsl(240 6% 90%);
  height: 40px;
  line-height: 40px;
  font-size: 0.875rem;
`
const TopInfo = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  gap: 0.5rem;
  font-size: 0.8rem;
  @media (max-width: 768px) {
    align-items: flex-end;
    flex-direction: column-reverse;
  }
`
const Noti = styled.p`
  font-size: 0.8rem;
  span {
    color: red;
  }
`
const UpdateTime = styled.p`
  span {
    color: #555;
  }
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

export default function StudentsWrite() {
  const router = useRouter()
  const lectureId = typeof router.query.id === 'string' ? router.query.id : null
  const [searchLectures] = useMutation(SEARCH_LECTURES_MUTATION)
  const [lectureData, setLectureData] = useState(null)
  const [students, setStudents] = useState(null)

  useEffect(() => {
    // if (lectureId !== null) {
    //   searchLectures({
    //     variables: {
    //       searchLecturesId: 21,
    //     },
    //     onCompleted: result => {
    //       if (result.searchLectures.ok) {
    //         const { data } = result.searchLectures
    //         setLectureData(data[0])
    //       }
    //     },
    //   })
    // }
    searchLectures({
      variables: {
        searchLecturesId: 21,
      },
      onCompleted: result => {
        if (result.searchLectures.ok) {
          const { data } = result.searchLectures
          setLectureData(data[0])
        }
      },
    })
  }, [router])

  const formatDate = (data, isTime) => {
    const timestamp = parseInt(data, 10)
    const date = new Date(timestamp)
    if (isTime) {
      const formatted =
        `${date.getFullYear()}-` +
        `${(date.getMonth() + 1).toString().padStart(2, '0')}-` +
        `${date.getDate().toString().padStart(2, '0')} ` +
        `${date.getHours().toString().padStart(2, '0')}:` +
        `${date.getMinutes().toString().padStart(2, '0')}:` +
        `${date.getSeconds().toString().padStart(2, '0')}`
      return formatted
    } else {
      const formatted =
        `${date.getFullYear()}-` +
        `${(date.getMonth() + 1).toString().padStart(2, '0')}-` +
        `${date.getDate().toString().padStart(2, '0')} `
      return formatted
    }
  }

  return (
    <>
      <MainWrap>
        <ConArea>
          <Breadcrumb isFilter={false} isWrite={false} rightArea={false} />
          <DetailBox>
            <TopInfo>
              <Noti></Noti>
              <UpdateTime>
                <span>최근 업데이트 일시 :</span>
                {formatDate(lectureData?.updatedAt, true)}
              </UpdateTime>
            </TopInfo>
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
              <EmploymentInfoForm />
            </DetailDiv>
          </DetailBox>
          <DetailBox>
            <DetailDiv>
              <AreaTitle>
                <h4>학력사항</h4>
              </AreaTitle>
              <EducationalHistory />
            </DetailDiv>
          </DetailBox>
          <DetailBox>
            <DetailDiv>
              <AreaTitle>
                <h4>경력사항</h4>
              </AreaTitle>
              <CareerHistory />
            </DetailDiv>
          </DetailBox>
          <DetailBox>
            <DetailDiv>
              <AreaTitle>
                <h4>자격취득현황</h4>
              </AreaTitle>
              <AcquisitionList />
            </DetailDiv>
          </DetailBox>
          <EmploymentTabs />
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
    </>
  )
}
StudentsWrite.getLayout = page => <Layout>{page}</Layout>
