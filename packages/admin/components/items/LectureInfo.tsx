import { styled } from 'styled-components'
import { Textarea } from '@nextui-org/react'

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

export default function PaymentInfo({}) {
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
            {/* <LineBox>{studentSubjectData?.subjectCode}</LineBox> */}
            <LineBox>1029384</LineBox>
          </div>
        </AreaSmallBox>
        <AreaBox>
          <div>
            <Textarea
              label="강의명"
              isDisabled={true}
              isReadOnly={true}
              labelPlacement="outside"
              // defaultValue={studentSubjectData?.subjectName}
              defaultValue={'광고홍보 영상콘텐츠제작(프리미어,에펙,포토,일러)'}
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
        <AreaSmallBox style={{ minWidth: '20%' }}>
          <div>
            <FilterLabel>강의장</FilterLabel>
            {/* <LineBox>{studentSubjectData?.subjectCode}</LineBox> */}
            <LineBox>204호</LineBox>
          </div>
        </AreaSmallBox>
      </FlexBox>
      <FlexBox>
        <AreaSmallBox style={{ minWidth: '20%' }}>
          <div>
            <FilterLabel>수강 구분</FilterLabel>
            {/* <LineBox>{studentPaymentData?.subDiv}</LineBox> */}
            <LineBox>근로자</LineBox>
          </div>
        </AreaSmallBox>
        <AreaBox>
          <div>
            <FilterLabel>
              훈련기간<span>*</span>
            </FilterLabel>
            {/* <LineBox>{studentPaymentData?.seScore || 0}</LineBox> */}
            <LineBox>2024-01-03 ~ 2024-05-04</LineBox>
          </div>
        </AreaBox>
        <AreaSmallBox style={{ minWidth: '20%' }}>
          <div>
            <FilterLabel>
              훈련시간<span>*</span>
            </FilterLabel>
            {/* <LineBox>{studentPaymentData?.seScore || 0}</LineBox> */}
            <LineBox>09:30 ~ 18:30</LineBox>
          </div>
        </AreaSmallBox>
        <AreaSmallBox style={{ minWidth: '20%' }}>
          <div>
            <FilterLabel>
              강사명<span>*</span>
            </FilterLabel>
            {/* <LineBox>{studentPaymentData?.seScore || 0}</LineBox> */}
            <LineBox>김강사</LineBox>
          </div>
        </AreaSmallBox>
      </FlexBox>
      <FlexBox>
        <AreaBox>
          <div>
            <FilterLabel>승인 인원</FilterLabel>
            {/* <LineBox>{studentSubjectData?.subjectCode}</LineBox> */}
            <LineBox>20</LineBox>
          </div>
        </AreaBox>
        <AreaBox>
          <div>
            <FilterLabel>확정 인원</FilterLabel>
            {/* <LineBox>{studentSubjectData?.subjectCode}</LineBox> */}
            <LineBox>20</LineBox>
          </div>
        </AreaBox>
        <AreaBox>
          <div>
            <FilterLabel>수강포기</FilterLabel>
            {/* <LineBox>{studentSubjectData?.subjectCode}</LineBox> */}
            <LineBox>0</LineBox>
          </div>
        </AreaBox>
        <AreaBox>
          <div>
            <FilterLabel>미수료</FilterLabel>
            {/* <LineBox>{studentSubjectData?.subjectCode}</LineBox> */}
            <LineBox>0</LineBox>
          </div>
        </AreaBox>
        <AreaBox>
          <div>
            <FilterLabel>조기취업 가입</FilterLabel>
            {/* <LineBox>{studentSubjectData?.subjectCode}</LineBox> */}
            <LineBox>0</LineBox>
          </div>
        </AreaBox>
        <AreaBox>
          <div>
            <FilterLabel>조기취업 미가입</FilterLabel>
            {/* <LineBox>{studentSubjectData?.subjectCode}</LineBox> */}
            <LineBox>0</LineBox>
          </div>
        </AreaBox>
        <AreaBox>
          <div>
            <FilterLabel>훈련 인원</FilterLabel>
            {/* <LineBox>{studentSubjectData?.subjectCode}</LineBox> */}
            <LineBox>7</LineBox>
          </div>
        </AreaBox>
      </FlexBox>
      <FlexBox>
        <AreaBox>
          <div>
            <FilterLabel>수료 인원</FilterLabel>
            {/* <LineBox>{studentSubjectData?.subjectCode}</LineBox> */}
            <LineBox>0</LineBox>
          </div>
        </AreaBox>
        <AreaBox>
          <div>
            <FilterLabel>수료취업 가입</FilterLabel>
            {/* <LineBox>{studentSubjectData?.subjectCode}</LineBox> */}
            <LineBox>0</LineBox>
          </div>
        </AreaBox>
        <AreaBox>
          <div>
            <FilterLabel>수료취업 미가입</FilterLabel>
            {/* <LineBox>{studentSubjectData?.subjectCode}</LineBox> */}
            <LineBox>0</LineBox>
          </div>
        </AreaBox>
        <AreaBox>
          <div>
            <FilterLabel>중도탈락율</FilterLabel>
            {/* <LineBox>{studentSubjectData?.subjectCode}</LineBox> */}
            <LineBox>0</LineBox>
          </div>
        </AreaBox>
        <AreaBox>
          <div>
            <FilterLabel>수료율</FilterLabel>
            {/* <LineBox>{studentSubjectData?.subjectCode}</LineBox> */}
            <LineBox>0</LineBox>
          </div>
        </AreaBox>
        <AreaBox>
          <div>
            <FilterLabel>재직증명확보예정</FilterLabel>
            {/* <LineBox>{studentSubjectData?.subjectCode}</LineBox> */}
            <LineBox>0</LineBox>
          </div>
        </AreaBox>
      </FlexBox>
    </>
  )
}
