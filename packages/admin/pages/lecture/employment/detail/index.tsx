import MainWrap from '@/components/wrappers/MainWrap'
import { useEffect, useState } from 'react'
import Breadcrumb from '@/components/common/Breadcrumb'
import { styled } from 'styled-components'
import { useRouter } from 'next/router'
import { Button, Chip, Link, Select, SelectItem } from '@nextui-org/react'
import { useMutation } from '@apollo/client'
import Layout from '@/pages/students/layout'
import {
  SEARCH_LECTURES_MUTATION,
  SEARCH_STUDENT_MUTATION,
} from '@/graphql/mutations'
import LectureInfo from '@/components/items/LectureInfo'
import AbsentList from '@/components/table/AbsentList'
import AropoutList from '@/components/table/AropoutList'
import AropoutStateList from '@/components/table/AropoutStateList'
import AcquisitionList from '@/components/table/AcquisitionList'
import EmploymentList from '@/components/table/EmploymentList'
import EvaluationList from '@/components/table/EvaluationList'
import Attendance from '@/components/table/Attendance'
import AttendanceFilter from '@/components/filter/AttendanceFilter'
import AttendanceFilterList from '@/components/table/AttendanceFilterList'
import AttendanceCountFilter from '@/components/filter/AttendanceCountFilter'
import AbsentFilterList from '@/components/table/AbsentFilterList'
import { useRecoilValue } from 'recoil'
import { assignmentState, completionStatus } from '@/lib/recoilAtoms'
import StudentInfo from '@/components/items/StudentInfo'
import Address from '@/components/common/Address'
import EducationalHistory from '@/components/table/EducationalHistory'
import CareerHistory from '@/components/table/CareerHistory'
import EmploymentTabs from '@/components/items/EmploymentTabs'

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
  color: #11181c;
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
  const [searchStudentMutation] = useMutation(SEARCH_STUDENT_MUTATION)
  const [studentData, setStudentData] = useState(null)

  const [selectValue, setSelectValue] = useState('유형선택')

  const handleSelectChange = e => {
    setSelectValue(e.target.value)
  }

  const naturalCompare = (a, b) => {
    return a.localeCompare(b, undefined, {
      numeric: true,
      sensitivity: 'base',
    })
  }

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
    searchStudentMutation({
      variables: {
        searchStudentId: 267,
      },
      onCompleted: data => {
        if (data.searchStudent.ok) {
          setStudentData(data.searchStudent?.student[0])
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

  const handleClick = event => {
    if (lectureData?.timetableAttached === null) {
      event.preventDefault()
      alert('등록된 시간표가 없습니다.')
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
              <StudentInfo
                studentData={studentData}
                detailAll={false}
                record={true}
              />
              <FlexConBox>
                <AreaBox>
                  <div>
                    <FilterLabel>나이</FilterLabel>
                    <LineBox>30세</LineBox>
                  </div>
                </AreaBox>
                <AreaBox>
                  <div>
                    <FilterLabel>선발평가 점수</FilterLabel>
                    <LineBox>89점</LineBox>
                  </div>
                </AreaBox>
                <AreaBox>
                  <div>
                    <FilterLabel>유형</FilterLabel>
                    <Select
                      labelPlacement="outside"
                      className="w-full"
                      variant="bordered"
                      selectedKeys={[selectValue]}
                      onChange={e => handleSelectChange(e)}
                      classNames={{
                        label: 'w-[4rem] pr-0',
                      }}
                    >
                      <SelectItem value={'유형선택'} key={'유형선택'}>
                        유형선택
                      </SelectItem>
                      <SelectItem value={'1유형'} key={'1유형'}>
                        1유형
                      </SelectItem>
                      <SelectItem value={'2유형'} key={'2유형'}>
                        2유형
                      </SelectItem>
                    </Select>
                  </div>
                </AreaBox>
              </FlexConBox>
              <Address
                valueName={'mAddresses'}
                setValue={null}
                defaultPostcode={'0101010'}
                defaultAddress={'주소를 입력해주세요.'}
                defaultDetails={'상세주소주소'}
              />
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
