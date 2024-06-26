import { Textarea } from '@nextui-org/react'
import { useRouter } from 'next/router'
import { styled } from 'styled-components'
import Layout from '@/pages/students/layout'
import { useSuspenseQuery } from '@apollo/client'
import { SEARCH_MANAGEUSER_QUERY } from '@/graphql/queries'
import { SearchManageUserResult } from '@/src/generated/graphql'
import {
  assignmentState,
  completionStatus,
  employmentStatus,
} from '@/lib/recoilAtoms'
import { useRecoilValue } from 'recoil'

const FlexCardBox = styled.div<{ $lectureAssignment: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border: ${props =>
    props.$lectureAssignment
      ? '2px solid #4f46e5;'
      : '2px solid hsl(240 6% 90%);'};
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
type searchManageUserQuery = {
  searchManageUser: SearchManageUserResult
}
export default function StudentPaymentItem({ detailtData, index, studentId }) {
  const router = useRouter()
  const assignment = useRecoilValue(assignmentState)
  const completion = useRecoilValue(completionStatus)
  const employment = useRecoilValue(employmentStatus)
  const { data: managerData, error } = useSuspenseQuery<searchManageUserQuery>(
    SEARCH_MANAGEUSER_QUERY,
    {
      variables: {
        mPart: '영업팀',
        resign: 'N',
      },
    },
  )
  const managerList = managerData?.searchManageUser.data

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
    router.push(`/students/detail/course/${detailtData.id}`)
  }

  if (error) {
    console.log(error)
  }

  return (
    <>
      <FlexCardBox
        onClick={() => clickItem(index)}
        $lectureAssignment={
          detailtData?.lectureAssignment === assignment.withdrawal
        }
      >
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
              <Textarea
                label="과정명"
                isDisabled={true}
                isReadOnly={true}
                labelPlacement="outside"
                defaultValue={detailtData?.subject.subjectName}
                minRows={1}
                variant="flat"
                size="md"
                radius="sm"
                classNames={{
                  base: 'opacity-1',
                }}
              ></Textarea>
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
                      detailtData?.lectureAssignment === assignment.assignment
                        ? Color2
                        : detailtData?.lectureAssignment ===
                          assignment.unassigned
                        ? Color1
                        : Color3,
                  }}
                >
                  {detailtData?.lectureAssignment}
                </FlatBox>
              </div>
            </AreaBox>
            <AreaBox>
              <div>
                <FilterLabel>수료</FilterLabel>
                <FlatBox
                  style={{
                    color:
                      detailtData?.courseComplete === completion.completed ||
                      detailtData?.courseComplete === completion.inTraining
                        ? Color2
                        : detailtData?.courseComplete === completion.notAttended
                        ? Color1
                        : Color3,
                  }}
                >
                  {detailtData?.courseComplete}
                </FlatBox>
              </div>
            </AreaBox>
            <AreaBox>
              <div>
                <FilterLabel>취업</FilterLabel>
                <FlatBox
                  style={{
                    color:
                      detailtData?.employment === employment.employed
                        ? Color2
                        : Color1,
                  }}
                >
                  {detailtData?.employment}
                </FlatBox>
              </div>
            </AreaBox>
          </AreaGroup>
          <AreaBox>
            <div>
              <FilterLabel>영업담당자</FilterLabel>
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
