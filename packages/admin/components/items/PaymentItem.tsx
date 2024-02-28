import { Button, Link } from '@nextui-org/react'
import { useRouter } from 'next/router'
import { styled } from 'styled-components'
import Layout from '@/pages/students/layout'
import { useRecoilState } from 'recoil'
import {
  selectedPaymentDetailState,
  selectedPaymentState,
} from '@/lib/recoilAtoms'
import { useMutation, useQuery } from '@apollo/client'
import {
  REQ_REFUND_MUTATION,
  SEARCH_STUDENT_MUTATION,
} from '@/graphql/mutations'
import useUserLogsMutation from '@/utils/userLogs'
import { SEE_MANAGEUSER_QUERY } from '@/graphql/queries'

const FlexCardBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border: 2px solid hsl(240 6% 90%);
  padding: 1rem;
  border-radius: 0.5rem;
  cursor: pointer;
  color: #11181c;
  &:hover {
    cursor: pointer;
    border: 2px solid #007de9;
    background: rgba(255, 255, 255, 0.8);
  }
`
const FlexBox = styled.div`
  display: flex;
  gap: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`
const AreaBox = styled.div`
  flex: 1;
  width: 100%;
`
const AreaGroup = styled.div`
  display: flex;
  gap: 1rem;

  @media (max-width: 768px) {
    gap: 0.5rem;
    width: 100% !important;
  }
`

const AreaBoxS = styled.div`
  width: 20%;
`

const FilterLabel = styled.label`
  font-weight: 500;
  font-size: 0.875rem;
  line-height: 1.25rem;
  color: #11181c;
  display: block;
  padding-bottom: 0.375rem;
  cursor: inherit;
  span {
    color: red;
  }
`
const BtnBox = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: center;
`
const FlatBox = styled.div`
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  background: hsl(240 5% 96%);
  height: 40px;
  line-height: 40px;
  border-radius: 0.5rem;
  font-size: 0.875rem;
`

export default function StudentPaymentItem({ detailtData, index, studentId }) {
  const router = useRouter()
  const [selectedPayment, setSelectedPayment] =
    useRecoilState(selectedPaymentState)
  const {
    loading: managerLoading,
    error: managerError,
    data: managerData,
  } = useQuery(SEE_MANAGEUSER_QUERY)
  const managerList = managerData?.seeManageUser || []

  const Color1 = '#FF5900'
  const Color2 = '#0D9488'
  const Color3 = '#4f46e5'
  const formatDate = data => {
    const timestamp = parseInt(data, 10)
    const date = new Date(timestamp)
    const formatted =
      `${date.getFullYear()}-` +
      `${(date.getMonth() + 1).toString().padStart(2, '0')}-` +
      `${date.getDate().toString().padStart(2, '0')} `
    return formatted
  }

  const feeFormet = fee => {
    const result = fee
      .toString()
      .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')
    return result
  }

  const clickItem = item => {
    setSelectedPayment(item)
    // router.push(`/students/detail/course/${studentId}`)
    router.push(`/students/detail/course/${detailtData.id}`)
  }

  return (
    <>
      <FlexCardBox onClick={() => clickItem(index)}>
        <FlexBox>
          <AreaGroup style={{ width: '30%' }}>
            <AreaBoxS>
              <div>
                <FilterLabel>No.</FilterLabel>
                <FlatBox>{index + 1}</FlatBox>
              </div>
            </AreaBoxS>
            <AreaBox>
              <div>
                <FilterLabel>수강구분</FilterLabel>
                <FlatBox>{detailtData?.subDiv}</FlatBox>
              </div>
            </AreaBox>
          </AreaGroup>
          <AreaBox>
            <div>
              <FilterLabel>과정명</FilterLabel>
              <FlatBox>{detailtData?.subject.subjectName}</FlatBox>
            </div>
          </AreaBox>
        </FlexBox>
        <FlexBox>
          <AreaGroup style={{ width: '50%' }}>
            <AreaBox>
              <div>
                <FilterLabel>배정</FilterLabel>
                <FlatBox
                  style={{
                    color:
                      detailtData?.lectureAssignment === '배정'
                        ? Color2
                        : Color1,
                  }}
                >
                  {detailtData?.lectureAssignment === '배정'
                    ? '배정'
                    : '미배정'}
                </FlatBox>
              </div>
            </AreaBox>
            <AreaBox>
              <div>
                <FilterLabel>수료</FilterLabel>
                <FlatBox
                  style={{
                    color:
                      detailtData?.courseComplete === '수료'
                        ? Color2
                        : detailtData?.courseComplete === '미수료' ||
                          detailtData?.courseComplete === ''
                        ? Color1
                        : Color3,
                  }}
                >
                  {detailtData?.courseComplete === ''
                    ? '미수료'
                    : detailtData?.courseComplete}
                </FlatBox>
              </div>
            </AreaBox>
            <AreaBox>
              <div>
                <FilterLabel>취업</FilterLabel>
                <FlatBox
                  style={{
                    color: detailtData?.employment === '취업' ? Color2 : Color1,
                  }}
                >
                  {detailtData?.employment === '취업' ? '취업' : '미취업'}
                </FlatBox>
              </div>
            </AreaBox>
          </AreaGroup>
          <AreaBox>
            <div>
              <FilterLabel>수강담당자</FilterLabel>
              <FlatBox>
                {
                  managerList.find(
                    user => user.id === detailtData?.processingManagerId,
                  )?.mUsername
                }
              </FlatBox>
            </div>
          </AreaBox>
          <AreaBox>
            <div>
              <FilterLabel>등록일시</FilterLabel>
              <FlatBox>{formatDate(detailtData.createdAt)}</FlatBox>
            </div>
          </AreaBox>
        </FlexBox>
      </FlexCardBox>
    </>
  )
}
StudentPaymentItem.getLayout = page => <Layout>{page}</Layout>
