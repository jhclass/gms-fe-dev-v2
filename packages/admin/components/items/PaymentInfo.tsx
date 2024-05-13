import { styled } from 'styled-components'
import {
  Radio,
  RadioGroup,
  CheckboxGroup,
  Checkbox,
  Textarea,
} from '@nextui-org/react'
import { Suspense } from 'react'
import PaymentInfoManager from '@/components/items/PaymentInfoManager'

const DetailBox = styled.div`
  margin-top: 2rem;
  background: #fff;
  border-radius: 0.5rem;
  padding: 1.5rem;
`

const LodingDiv = styled.div`
  padding: 1.5rem;
  width: 100%;
  min-width: 20rem;
  position: relative;
  background: white;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
const AreaSmallBox2 = styled.div`
  display: flex;
  gap: 1rem;
  @media (max-width: 768px) {
    width: 100% !important;
  }
`
const FlexCon = styled.div`
  display: flex;
  width: 100%;
  align-items: center;

  label {
    span {
      margin-right: 0;
      margin-top: 0.25rem;
    }
  }
`

const RadioBox = styled.div`
  display: flex;
  width: 100%;
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

const BtnBox4 = styled.div<{ $isPayment: boolean }>`
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  @media (max-width: 768px) {
    ${props => props.$isPayment && 'flex-wrap:wrap;'}
    button {
      ${props => props.$isPayment && ' width: calc(50% - 0.5rem);'}
    }
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

export default function PaymentInfo({
  studentSubjectData,
  studentPaymentData,
}) {
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

  const feeFormet = fee => {
    const result = fee
      .toString()
      .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')
    return result
  }

  return (
    <>
      <FlexBox>
        <AreaSmallBox style={{ minWidth: '20%' }}>
          <div>
            <FilterLabel>과정코드</FilterLabel>
            <LineBox>{studentSubjectData?.subjectCode}</LineBox>
          </div>
        </AreaSmallBox>
        <AreaBox>
          <div>
            <Textarea
              label="과정명"
              isDisabled={true}
              isReadOnly={true}
              labelPlacement="outside"
              defaultValue={studentSubjectData?.subjectName}
              minRows={1}
              variant="underlined"
              size="md"
              radius="sm"
              classNames={{
                base: 'opacity-1',
              }}
            ></Textarea>
          </div>
        </AreaBox>
        <AreaSmallBox2>
          <div>
            <FlexCon>
              <CheckboxGroup
                isReadOnly={true}
                label={<FilterLabel>주말</FilterLabel>}
                defaultValue={[studentPaymentData?.isWeekend]}
                classNames={{ wrapper: 'items-center' }}
              >
                <Checkbox value="Y"></Checkbox>
              </CheckboxGroup>
            </FlexCon>
          </div>
          <div>
            <RadioBox>
              <RadioGroup
                isReadOnly
                label={
                  <FilterLabel>
                    교육상황보고여부<span>*</span>
                  </FilterLabel>
                }
                defaultValue={
                  studentPaymentData?.situationReport ? '동의' : '비동의'
                }
                orientation="horizontal"
                className="gap-[0.65rem]"
              >
                <Radio key={'동의'} value={'동의'}>
                  동의
                </Radio>
                <Radio key={'비동의'} value={'비동의'}>
                  비동의
                </Radio>
              </RadioGroup>
            </RadioBox>
          </div>
        </AreaSmallBox2>
      </FlexBox>
      <FlexBox>
        <AreaBox>
          <div>
            <FilterLabel>
              선발평가점수
              {studentSubjectData?.subDiv === '국가기간' && <span>*</span>}
            </FilterLabel>
            <LineBox>{studentPaymentData?.seScore || 0}</LineBox>
          </div>
        </AreaBox>
        <AreaBox>
          <div>
            <FilterLabel>수강 구분</FilterLabel>
            <LineBox>{studentPaymentData?.subDiv}</LineBox>
          </div>
        </AreaBox>
        <AreaBox>
          <div>
            <FilterLabel>수강예정일</FilterLabel>
            <LineBox>
              {studentPaymentData?.dueDate === null
                ? ''
                : formatDate(studentPaymentData?.dueDate, false)}
            </LineBox>
          </div>
        </AreaBox>
      </FlexBox>
      <FlexBox>
        <AreaBox>
          <div>
            <FilterLabel>수강료</FilterLabel>
            <LineBox>
              {studentPaymentData?.tuitionFee
                ? feeFormet(studentPaymentData?.tuitionFee)
                : '0'}
            </LineBox>
          </div>
        </AreaBox>
        <AreaBox>
          <div>
            <FilterLabel>할인금액</FilterLabel>
            <LineBox>
              {studentPaymentData?.discountAmount
                ? studentPaymentData?.discountAmount
                : '0'}
            </LineBox>
          </div>
        </AreaBox>
        <AreaBox>
          <div>
            <FilterLabel>
              <b>실 수강료</b>
            </FilterLabel>
            <LineBox>
              {studentPaymentData?.actualAmount
                ? feeFormet(studentPaymentData?.actualAmount)
                : '0'}
            </LineBox>
          </div>
        </AreaBox>
      </FlexBox>
      <FlexBox>
        <AreaBox>
          <div>
            <FilterLabel>수납액</FilterLabel>
            <LineBox>
              {studentPaymentData?.amountReceived
                ? feeFormet(studentPaymentData?.amountReceived)
                : '0'}
            </LineBox>
          </div>
        </AreaBox>
        <AreaBox>
          <div>
            <FilterLabel>
              <b>미 수납액</b>
            </FilterLabel>
            <LineBox>
              {studentPaymentData?.unCollectedAmount
                ? feeFormet(studentPaymentData?.unCollectedAmount)
                : '0'}
            </LineBox>
          </div>
        </AreaBox>
        <AreaBox>
          <div>
            <FilterLabel>영업담당자</FilterLabel>
            <Suspense
              fallback={
                <LodingDiv>
                  <i className="xi-spinner-2" />
                </LodingDiv>
              }
            >
              <PaymentInfoManager studentPaymentData={studentPaymentData} />
            </Suspense>
          </div>
        </AreaBox>
      </FlexBox>
    </>
  )
}
