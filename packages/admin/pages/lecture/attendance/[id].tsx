import MainWrap from '@/components/wrappers/MainWrap'
import { useEffect, useState } from 'react'
import Breadcrumb from '@/components/common/Breadcrumb'
import { styled } from 'styled-components'
import { useRouter } from 'next/router'
import { Button, Chip, Link } from '@nextui-org/react'
import { useMutation } from '@apollo/client'
import Layout from '@/pages/students/layout'
import {
  SEARCH_LECTURES_MUTATION,
  SEARCH_PAYMENT_MUTATION,
} from '@/graphql/mutations'
import LectureInfo from '@/components/items/LectureInfo'
import AbsentList from '@/components/table/AbsentList'
import AropoutList from '@/components/table/AropoutList'
import AropoutStateList from '@/components/table/AropoutStateList'
import AcquisitionList from '@/components/table/AcquisitionList'
import EmploymentList from '@/components/table/EmploymentList'
import EvaluationList from '@/components/table/EvaluationList'
import Attendance from '@/components/table/Attendance'
import AropoutFilter from '@/components/filter/AropoutFilter'
import AttendanceFilter from '@/components/filter/AttendanceFilter'

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
  const [filterActive1, setFilterActive1] = useState(true)
  useEffect(() => {
    if (lectureId !== null) {
      searchLectures({
        variables: {
          searchLecturesId: parseInt(lectureId),
        },
        onCompleted: result => {
          if (result.searchLectures.ok) {
            const { data } = result.searchLectures
            setLectureData(data[0])
          }
        },
      })
    }
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
              <Noti>
                <span>*</span> 는 필수입력입니다.
              </Noti>
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
              <LectureInfo />
            </DetailDiv>
          </DetailBox>
          <DetailBox>
            <DetailDiv>
              <AreaTitle>
                <h4>학적부</h4>
              </AreaTitle>
              <Noti>
                <span>❗️</span>
                교육훈련대상 수강생이 아닌 경우 학적부 명단에 나타나지 않습니다.
              </Noti>
              <FlexChipBox>
                <Link href="">
                  <Chip color="primary">Primary</Chip>
                </Link>
                <Link href="">
                  <Chip color="primary">Primary</Chip>
                </Link>
                <Link href="">
                  <Chip color="primary">Primary</Chip>
                </Link>
                <Link href="">
                  <Chip color="primary">Primary</Chip>
                </Link>
                <Link href="">
                  <Chip color="primary">Primary</Chip>
                </Link>
                <Link href="">
                  <Chip color="primary">Primary</Chip>
                </Link>
                <Link href="">
                  <Chip color="primary">Primary</Chip>
                </Link>
                <Link href="">
                  <Chip color="primary">Primary</Chip>
                </Link>
                <Link href="">
                  <Chip color="primary">Primary</Chip>
                </Link>
                <Link href="">
                  <Chip color="primary">Primary</Chip>
                </Link>
              </FlexChipBox>
            </DetailDiv>
          </DetailBox>
          <DetailBox>
            <DetailDiv>
              <AreaTitleFilter>
                <h4>출석부</h4>
                <AttendanceFilter
                  isActive={filterActive1}
                  // onFilterSearch={undefined}
                  // studentFilter={undefined}
                  // setStudentFilter={undefined}
                />
              </AreaTitleFilter>
              <Attendance lectureData={lectureData} />
            </DetailDiv>
          </DetailBox>
          <DetailBox>
            <DetailDiv>
              <AreaTitleFilter>
                <h4>결석인원현황</h4>
                <AropoutFilter
                  isActive={filterActive1}
                  // onFilterSearch={undefined}
                  // studentFilter={undefined}
                  // setStudentFilter={undefined}
                />
              </AreaTitleFilter>
              <AbsentList />
            </DetailDiv>
          </DetailBox>
          <DetailBox>
            <DetailDiv>
              <AreaTitle>
                <h4>중도탈락현황</h4>
              </AreaTitle>
              <AropoutList />
            </DetailDiv>
          </DetailBox>
          <DetailBox>
            <DetailDiv>
              <AreaTitle>
                <h4>중도탈락 사전점검</h4>
              </AreaTitle>
              <AropoutStateList />
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
          <DetailBox>
            <DetailDiv>
              <AreaTitle>
                <h4>취업현황</h4>
              </AreaTitle>
              <EmploymentList />
            </DetailDiv>
          </DetailBox>
          <DetailBox>
            <DetailDiv>
              <AreaTitle>
                <h4>정기평가 내용설정</h4>
              </AreaTitle>
              <EvaluationList />
            </DetailDiv>
          </DetailBox>
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