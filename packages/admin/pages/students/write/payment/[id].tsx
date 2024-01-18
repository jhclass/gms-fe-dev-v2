import MainWrap from '@/components/wrappers/MainWrap'
import { useEffect, useState } from 'react'
import Breadcrumb from '@/components/common/Breadcrumb'
import { styled } from 'styled-components'
import { useRouter } from 'next/router'
import DatePicker, { registerLocale } from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import ko from 'date-fns/locale/ko'
registerLocale('ko', ko)
import {
  Checkbox,
  CheckboxGroup,
  Input,
  Radio,
  RadioGroup,
  Select,
  SelectItem,
  Button,
} from '@nextui-org/react'
import { useMutation, useQuery } from '@apollo/client'
import { Controller, useForm } from 'react-hook-form'
import { SEE_MANAGEUSER_QUERY } from '@/graphql/queries'
import useUserLogsMutation from '@/utils/userLogs'
import Layout from '@/pages/students/layout'
import { useRecoilValue } from 'recoil'
import { ReceiptState } from '@/lib/recoilAtoms'
import {
  CREATE_PAYMENT_DETAIL_MUTATION,
  SEARCH_STUDENT_PAYMENT_MUTATION,
} from '@/graphql/mutations'

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
  @media (max-width: 768px) {
    align-items: flex-start;
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
  width: 2rem;
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

export default function StudentsWritePayment() {
  const router = useRouter()
  const { userLogs } = useUserLogsMutation()
  const studentId = typeof router.query.id === 'string' ? router.query.id : null
  const [searchStudentBasic] = useMutation(SEARCH_STUDENT_PAYMENT_MUTATION)
  const [createPaymentDetail] = useMutation(CREATE_PAYMENT_DETAIL_MUTATION)
  const {
    loading: managerLoading,
    error: managerError,
    data: managerData,
  } = useQuery(SEE_MANAGEUSER_QUERY)
  const managerList = managerData?.seeManageUser || []
  const Receipt = useRecoilValue(ReceiptState)
  const { register, control, setValue, handleSubmit, formState } = useForm()
  const { errors } = formState
  const [studentData, setStudentData] = useState(null)
  const [studentSubjectData, setStudentSubjectData] = useState(null)
  const [studentPaymentData, setStudentPaymentData] = useState(null)
  const [receiptSelected, setReceiptSelected] = useState([])
  const [paymentType, setPaymentType] = useState('카드')
  const [cardName, setCardName] = useState('카드사 선택')
  const [bankName, setBankName] = useState('은행 선택')
  const [cardPaymentDate, setCardPaymentDate] = useState(null)
  const [cashDepositDate, setCashDepositDate] = useState(null)

  useEffect(() => {
    searchStudentBasic({
      variables: {
        searchStudentId: parseInt(studentId),
      },
      onCompleted: data => {
        setStudentData(data.searchStudent?.student[0])
        setStudentSubjectData(data.searchStudent?.student[0].subject[0])
        setStudentPaymentData(data.searchStudent?.student[0].studentPayment[0])
      },
    })
  }, [router])

  // console.log(studentData)
  // console.log(studentSubjectData)
  // console.log(studentPaymentData)

  const fametDate = (data, isTime) => {
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

  const onPaymentDetailSubmit = data => {
    console.log(data)
    if (paymentType === '카드') {
      createPaymentDetail({
        variables: {
          cashOrCard: '카드',
          studentPaymentId: parseInt(studentPaymentData?.id),
          cardCompany: data.cardCompany,
          cardNum: data.cardNum.trim(),
          installment:
            data.installment === '' ? null : parseInt(data.installment),
          approvalNum: data.approvalNum === '' ? null : data.approvalNum.trim(),
          amountPayment: parseInt(data.amountPayment),
          paymentDate: data.paymentDate === undefined ? null : data.paymentDate,
          bankName: null,
          depositorName: null,
          depositAmount: null,
          depositDate: null,
        },
        onCompleted: data => {
          console.log(data)
        },
      })
      // userLogs(`${studentName} 카드 결재 `)
    } else {
      createPaymentDetail({
        variables: {
          cashOrCard: '현금',
          studentPaymentId: parseInt(studentPaymentData?.id),
          cardCompany: null,
          cardNum: null,
          installment: null,
          approvalNum: null,
          amountPayment: null,
          paymentDate: null,
          bankName: data.bankName,
          depositorName: data.depositorName.trim(),
          depositAmount: parseInt(data.depositAmount),
          depositDate: data.depositDate === undefined ? null : data.depositDate,
        },
        onCompleted: data => {
          console.log(data)
        },
      })
      // userLogs(`${studentName} 현금 결재 `)
    }
  }
  const handleReceiptChange = (value: string[]) => {
    setValue('receiptClassification', value)
    setReceiptSelected(value)
  }

  const handleCardChange = e => {
    setCardName(e.target.value)
  }
  const handleBankChange = e => {
    setBankName(e.target.value)
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
                {fametDate(studentData?.updatedAt, true)}
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
                    <LineBox>{fametDate(studentData?.birthday, false)}</LineBox>
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
            </DetailDiv>
          </DetailBox>
          <DetailBox>
            <DetailDiv>
              <AreaTitle>
                <h4>수강 정보</h4>
              </AreaTitle>
              <FlexBox>
                <AreaSmallBox style={{ minWidth: '20%' }}>
                  <div>
                    <FilterLabel>수강 구분</FilterLabel>
                    <LineBox>{studentSubjectData?.subDiv}</LineBox>
                  </div>
                </AreaSmallBox>
                <AreaBox>
                  <div>
                    <FilterLabel>과정명</FilterLabel>
                    <LineBox>{studentSubjectData?.subjectName}</LineBox>
                  </div>
                </AreaBox>
                <AreaSmallBox style={{ width: '20%' }}>
                  <div>
                    <FilterLabel>수강당담자</FilterLabel>
                    <LineBox>
                      {
                        managerList.find(
                          user =>
                            user.id === studentPaymentData?.processingManagerId,
                        )?.mUsername
                      }
                    </LineBox>
                  </div>
                </AreaSmallBox>
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
                        ? feeFormet(studentPaymentData?.discountAmount)
                        : '0'}
                    </LineBox>
                  </div>
                </AreaBox>
                <AreaBox>
                  <div>
                    <FilterLabel>실 수강료</FilterLabel>
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
                    <FilterLabel>미 수납액</FilterLabel>
                    <LineBox>
                      {studentPaymentData?.unCollectedAmount
                        ? feeFormet(studentPaymentData?.unCollectedAmount)
                        : '0'}
                    </LineBox>
                  </div>
                </AreaBox>
              </FlexBox>
            </DetailDiv>
          </DetailBox>
          <form onSubmit={handleSubmit(onPaymentDetailSubmit)}>
            <DetailBox>
              <DetailDiv>
                <AreaTitle>
                  <h4>결제 정보</h4>
                </AreaTitle>
                <FlexBox>
                  <AreaBox>
                    <div>
                      <FilterLabel>카드 결제액</FilterLabel>
                      <LineBox>
                        {studentPaymentData?.unCollectedAmount
                          ? feeFormet(studentPaymentData?.unCollectedAmount)
                          : '0'}
                      </LineBox>
                    </div>
                  </AreaBox>
                  <AreaBox>
                    <div>
                      <FilterLabel>현금 결제액</FilterLabel>
                      <LineBox>
                        {studentPaymentData?.unCollectedAmount
                          ? feeFormet(studentPaymentData?.unCollectedAmount)
                          : '0'}
                      </LineBox>
                    </div>
                  </AreaBox>
                </FlexBox>
                <FlexBox>
                  <AreaBox>
                    <RadioBox>
                      <Controller
                        control={control}
                        name="receiptClassification"
                        render={({ field, fieldState }) => (
                          <CheckboxGroup
                            label={<FilterLabel>영수구분</FilterLabel>}
                            orientation="horizontal"
                            className="gap-[0.65rem]"
                            value={receiptSelected}
                            onValueChange={handleReceiptChange}
                          >
                            {Object.entries(Receipt).map(([key, item]) => (
                              <Checkbox key={key} value={item}>
                                {item}
                              </Checkbox>
                            ))}
                          </CheckboxGroup>
                        )}
                      />
                    </RadioBox>
                  </AreaBox>
                </FlexBox>
              </DetailDiv>
              <DetailDiv style={{ marginTop: '2rem' }}>
                <AreaTitle>
                  <h4>결제 상세 정보</h4>
                  <Button
                    type="submit"
                    size="sm"
                    radius="sm"
                    variant="solid"
                    className="text-white bg-flag1"
                  >
                    추가
                  </Button>
                </AreaTitle>
                <FlexBox>
                  <RadioBox>
                    <Controller
                      control={control}
                      name="cashOrCard"
                      render={({ field }) => (
                        <RadioGroup
                          label={<FilterLabel>결제 방식</FilterLabel>}
                          orientation="horizontal"
                          className="gap-[0.65rem]"
                          value={paymentType}
                          onValueChange={value => {
                            field.onChange(value)
                            setPaymentType(value)
                          }}
                        >
                          <Radio key={'카드'} value={'카드'}>
                            카드
                          </Radio>
                          <Radio key={'현금'} value={'현금'}>
                            현금
                          </Radio>
                        </RadioGroup>
                      )}
                    />
                  </RadioBox>
                </FlexBox>
                {paymentType === '카드' && (
                  <>
                    <FlexBox>
                      <AreaBox>
                        <Controller
                          control={control}
                          name="cardCompany"
                          render={({ field, fieldState }) => (
                            <Select
                              labelPlacement="outside"
                              label="카드사"
                              placeholder=" "
                              className="w-full"
                              variant="bordered"
                              selectedKeys={[cardName]}
                              onChange={value => {
                                field.onChange(value)
                                handleCardChange(value)
                              }}
                            >
                              <SelectItem
                                key={'카드사 선택'}
                                value={'카드사 선택'}
                              >
                                {'카드사 선택'}
                              </SelectItem>
                              <SelectItem key={'현대카드'} value={'현대카드'}>
                                {'현대카드'}
                              </SelectItem>
                              <SelectItem key={'KB카드'} value={'KB카드'}>
                                {'KB카드'}
                              </SelectItem>
                            </Select>
                          )}
                        />
                      </AreaBox>
                      <AreaBox>
                        <Input
                          labelPlacement="outside"
                          placeholder="카드번호"
                          variant="bordered"
                          radius="md"
                          type="text"
                          label="카드번호"
                          {...register('cardNum')}
                        />
                      </AreaBox>
                      <AreaSmallBox>
                        <Input
                          labelPlacement="outside"
                          placeholder="할부기간"
                          variant="bordered"
                          radius="md"
                          type="text"
                          label="할부기간"
                          endContent={<InputText>개월</InputText>}
                          {...register('installment')}
                        />
                      </AreaSmallBox>
                      <AreaBox>
                        <Input
                          labelPlacement="outside"
                          placeholder="결제금액"
                          variant="bordered"
                          radius="md"
                          type="text"
                          label="결제금액"
                          {...register('amountPayment')}
                        />
                      </AreaBox>
                    </FlexBox>
                    <FlexBox>
                      <AreaBox>
                        <Input
                          labelPlacement="outside"
                          placeholder="승인번호"
                          variant="bordered"
                          radius="md"
                          type="text"
                          label="승인번호"
                          {...register('approvalNum')}
                        />
                      </AreaBox>
                      <AreaBox>
                        <DatePickerBox>
                          <Controller
                            control={control}
                            name="paymentDate"
                            render={({ field }) => (
                              <DatePicker
                                locale="ko"
                                showYearDropdown
                                selected={
                                  cardPaymentDate === null
                                    ? null
                                    : new Date(cardPaymentDate)
                                }
                                placeholderText="날짜를 선택해주세요."
                                isClearable
                                onChange={date => {
                                  field.onChange(date)
                                  setCardPaymentDate(date)
                                }}
                                ref={field.ref}
                                dateFormat="yyyy/MM/dd"
                                customInput={
                                  <Input
                                    label={<FilterLabel>결제일자</FilterLabel>}
                                    labelPlacement="outside"
                                    type="text"
                                    variant="bordered"
                                    id="date"
                                    startContent={<i className="xi-calendar" />}
                                  />
                                }
                              />
                            )}
                          />
                        </DatePickerBox>
                      </AreaBox>
                    </FlexBox>
                  </>
                )}
                {paymentType === '현금' && (
                  <FlexBox>
                    <AreaBox>
                      <Controller
                        control={control}
                        name="bankName"
                        render={({ field, fieldState }) => (
                          <Select
                            labelPlacement="outside"
                            label="은행명"
                            placeholder=" "
                            className="w-full"
                            variant="bordered"
                            selectedKeys={[bankName]}
                            onChange={value => {
                              field.onChange(value)
                              handleBankChange(value)
                            }}
                          >
                            <SelectItem key={'은행 선택'} value={'은행 선택'}>
                              {'은행 선택'}
                            </SelectItem>
                            <SelectItem key={'우리은행'} value={'우리은행'}>
                              {'우리은행'}
                            </SelectItem>
                            <SelectItem key={'KB은행'} value={'KB은행'}>
                              {'KB은행'}
                            </SelectItem>
                          </Select>
                        )}
                      />
                    </AreaBox>
                    <AreaBox>
                      <Input
                        labelPlacement="outside"
                        placeholder="입금자명"
                        variant="bordered"
                        radius="md"
                        type="text"
                        label="입금자명"
                        {...register('depositorName')}
                      />
                    </AreaBox>
                    <AreaBox>
                      <Input
                        labelPlacement="outside"
                        placeholder="입금금액"
                        variant="bordered"
                        radius="md"
                        type="text"
                        label="입금금액"
                        {...register('depositAmount')}
                      />
                    </AreaBox>
                    <AreaBox>
                      <DatePickerBox>
                        <Controller
                          control={control}
                          name="depositDate"
                          render={({ field }) => (
                            <DatePicker
                              locale="ko"
                              showYearDropdown
                              selected={
                                cashDepositDate === null
                                  ? null
                                  : new Date(cashDepositDate)
                              }
                              placeholderText="날짜를 선택해주세요."
                              isClearable
                              onChange={date => {
                                field.onChange(date)
                                setCashDepositDate(date)
                              }}
                              ref={field.ref}
                              dateFormat="yyyy/MM/dd"
                              customInput={
                                <Input
                                  label={<FilterLabel>입금일자</FilterLabel>}
                                  labelPlacement="outside"
                                  type="text"
                                  variant="bordered"
                                  id="date"
                                  startContent={<i className="xi-calendar" />}
                                />
                              }
                            />
                          )}
                        />
                      </DatePickerBox>
                    </AreaBox>
                  </FlexBox>
                )}
              </DetailDiv>
            </DetailBox>
          </form>
        </ConArea>
      </MainWrap>
    </>
  )
}
StudentsWritePayment.getLayout = page => <Layout>{page}</Layout>
