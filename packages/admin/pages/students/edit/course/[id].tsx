import MainWrap from '@/components/wrappers/MainWrap'
import { useEffect, useState } from 'react'
import Breadcrumb from '@/components/common/Breadcrumb'
import { styled } from 'styled-components'
import { useRouter } from 'next/router'
import { registerLocale } from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import ko from 'date-fns/locale/ko'
registerLocale('ko', ko)
import { useMutation, useQuery } from '@apollo/client'
import { SEE_MANAGEUSER_QUERY } from '@/graphql/queries'
import useUserLogsMutation from '@/utils/userLogs'
import Layout from '@/pages/students/layout'
import {
  SEARCH_STUDENT_PAYMENT_MUTATION,
  SEARCH_SUBJECT_MUTATION,
} from '@/graphql/mutations'
import StudentPayment from '@/components/form/StudentPayment'
import { useRecoilState } from 'recoil'
import { selectedPaymentState } from '@/lib/recoilAtoms'

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
const FlexBox = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
  }
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
const AreaBox = styled.div`
  flex: 1;
  width: 100%;
`
const AreaSmallBox = styled.div`
  @media (max-width: 768px) {
    width: 100% !important;
  }
`
const DatePickerBox = styled.div`
  width: 100%;
  .react-datepicker-wrapper {
    display: inline;
    width: 100%;
  }
  .react-datepicker__input-container {
    display: inline;
  }
  .react-datepicker__close-icon {
    height: 2.5rem;
    top: auto;
    bottom: 0;
  }
`
const SelectBox = styled.select`
  padding: 0 0.2rem;
  font-size: 0.825rem;
  height: 100%;

  option {
    font-size: 0.825rem;
  }
`
const RadioBox = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
`
const FilterLabel = styled.p`
  font-weight: 500;
  font-size: 0.875rem;
  color: #11181c;

  span {
    color: red;
  }
`
const InputText = styled.span`
  display: inline-block;
  font-size: 0.75rem;
  width: 2.5rem;
`
const BtnBox = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  align-items: center;
`
const LineBox = styled.div`
  padding-left: 0.25rem;
  padding-right: 0.25rem;
  border-bottom: 2px solid hsl(240 6% 90%);
  height: 40px;
  line-height: 40px;
  font-size: 0.875rem;
`

export default function StudentsWriteCourse() {
  const router = useRouter()
  const { userLogs } = useUserLogsMutation()
  const studentId = typeof router.query.id === 'string' ? router.query.id : null
  const [selectedPayment, setSelectedPayment] =
    useRecoilState(selectedPaymentState)
  const [searchStudentPayment] = useMutation(SEARCH_STUDENT_PAYMENT_MUTATION)
  const [searchSubject] = useMutation(SEARCH_SUBJECT_MUTATION)
  const {
    loading: managerLoading,
    error: managerError,
    data: managerData,
  } = useQuery(SEE_MANAGEUSER_QUERY)
  const managerList = managerData?.seeManageUser || []
  const [studentData, setStudentData] = useState(null)
  const [studentSubjectData, setStudentSubjectData] = useState(null)
  const [studentPaymentData, setStudentPaymentData] = useState(null)

  useEffect(() => {
    searchStudentPayment({
      variables: {
        searchStudentId: parseInt(studentId),
      },
      onCompleted: data => {
        setStudentData(data.searchStudent?.student[0])
        setStudentPaymentData(
          data.searchStudent?.student[0].studentPayment[selectedPayment],
        )
      },
    })
  }, [router])

  useEffect(() => {
    searchSubject({
      variables: {
        searchSubjectId: studentPaymentData?.subjectId,
      },
      onCompleted: resData => {
        const { result } = resData.searchSubject || {}
        setStudentSubjectData(result[0])
      },
    })
  }, [studentPaymentData])

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
          <Breadcrumb rightArea={false} />
          <DetailBox>
            <TopInfo>
              <Noti>
                <span>*</span> 는 필수입력입니다.
              </Noti>
              <UpdateTime>
                <span>최근 업데이트 일시 :</span>
                {formatDate(studentData?.updatedAt, true)}
              </UpdateTime>
            </TopInfo>
            <DetailDiv>
              <AreaTitle>
                <h4>기본정보</h4>
              </AreaTitle>
              <FlexBox>
                <AreaBox>
                  <div>
                    <FilterLabel>
                      이름<span>*</span>
                    </FilterLabel>
                    <LineBox>{studentData?.name}</LineBox>
                  </div>
                </AreaBox>
                <AreaBox>
                  <div>
                    <FilterLabel>
                      생년월일<span>*</span>
                    </FilterLabel>
                    <LineBox>
                      {formatDate(studentData?.birthday, false)}
                    </LineBox>
                  </div>
                </AreaBox>
                <AreaBox>
                  <div>
                    <FilterLabel>
                      연락처<span>*</span>
                    </FilterLabel>
                    <LineBox>{studentData?.phoneNum1}</LineBox>
                  </div>
                </AreaBox>
              </FlexBox>
              <FlexBox>
                <AreaBox>
                  <div>
                    <FilterLabel>담당자</FilterLabel>
                    <LineBox>{studentData?.writer}</LineBox>
                  </div>
                </AreaBox>
                <AreaBox>
                  <div>
                    <FilterLabel>등록일시</FilterLabel>
                    <LineBox>
                      {formatDate(studentData?.createdAt, true)}
                    </LineBox>
                  </div>
                </AreaBox>
              </FlexBox>
            </DetailDiv>
          </DetailBox>

          <StudentPayment
            studentData={studentData}
            managerList={managerList}
            studentSubjectData={studentSubjectData}
            studentPaymentData={studentPaymentData}
          />
        </ConArea>
      </MainWrap>
    </>
  )
}
StudentsWriteCourse.getLayout = page => <Layout>{page}</Layout>
