import MainWrap from '@/components/wrappers/MainWrap'
import { useEffect, useState } from 'react'
import Breadcrumb from '@/components/common/Breadcrumb'
import { styled } from 'styled-components'
import { useRouter } from 'next/router'
import { registerLocale } from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import ko from 'date-fns/locale/ko'
import { getYear } from 'date-fns'
registerLocale('ko', ko)
const _ = require('lodash')
import {
  Checkbox,
  CheckboxGroup,
  Input,
  Radio,
  RadioGroup,
  Select,
  SelectItem,
  Textarea,
} from '@nextui-org/react'
import { useMutation, useQuery } from '@apollo/client'
import { Controller, useForm } from 'react-hook-form'
import { SEE_MANAGEUSER_QUERY } from '@/graphql/queries'
import useUserLogsMutation from '@/utils/userLogs'
import { useRecoilState, useRecoilValue } from 'recoil'
import {
  bankNameState,
  cardNameState,
  selectedPaymentDetailState,
} from '@/lib/recoilAtoms'
import {
  SEARCH_PAYMENT_DETAIL_FILTER_MUTATION,
  SEARCH_PAYMENT_DETAIL_MUTATION,
  SEARCH_STUDENT_PAYMENT_MUTATION,
  UPDATE_PAYMENT_DETAIL_MUTATION,
  UPDATE_STUDENT_RECEIVED_MUTATION,
} from '@/graphql/mutations'
import Button2 from '@/components/common/Button'
import Layout from '@/pages/students/layout'
import PaymentInfo from '@/components/items/PaymentInfo'

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
  align-items: flex-start;

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
  const paymentDetailId =
    typeof router.query.id === 'string' ? router.query.id : null
  const [searchStudentPayment] = useMutation(SEARCH_STUDENT_PAYMENT_MUTATION)
  const [updatePaymentDetail] = useMutation(UPDATE_PAYMENT_DETAIL_MUTATION)
  const [updateReceived] = useMutation(UPDATE_STUDENT_RECEIVED_MUTATION)
  const [selectedPaymentDeta, setSelectedPaymentDeta] = useRecoilState(
    selectedPaymentDetailState,
  )

  const [searchPaymentDetailMutation] = useMutation(
    SEARCH_PAYMENT_DETAIL_MUTATION,
  )
  const {
    loading: managerLoading,
    error: managerError,
    data: managerData,
  } = useQuery(SEE_MANAGEUSER_QUERY)
  const managerList = managerData?.seeManageUser || []
  const {
    register,
    control,
    setValue,
    setFocus,
    setError,
    handleSubmit,
    formState: { isDirty, dirtyFields, errors },
  } = useForm()
  const [paymentDetailData, setPaymentDetailData] = useState(null)
  const [studentPaymentData, setStudentPaymentData] = useState(null)
  const [paymentType, setPaymentType] = useState('카드')
  const [cardName, setCardName] = useState('카드사 선택')
  const [bankName, setBankName] = useState('은행 선택')
  const [cashReceiptType, setCashReceiptType] = useState('휴대폰번호')
  const [cardPaymentDate, setCardPaymentDate] = useState(null)
  const [cashDepositDate, setCashDepositDate] = useState(null)
  const cardNames = useRecoilValue(cardNameState)
  const bankNames = useRecoilValue(bankNameState)
  const years = _.range(2000, getYear(new Date()) + 5, 1)

  useEffect(() => {
    searchPaymentDetailMutation({
      variables: {
        searchPaymentDetailId: parseInt(paymentDetailId),
      },
      onCompleted: data => {
        if (data.searchPaymentDetail.ok) {
          setPaymentDetailData(data.searchPaymentDetail.PaymentDetail[0])
          setStudentPaymentData(
            data.searchPaymentDetail.PaymentDetail[0].studentPayment,
          )
        }
      },
    })
  }, [router])

  useEffect(() => {
    if (paymentDetailData !== null) {
      setPaymentType(paymentDetailData.cashOrCard)
      setCashReceiptType(paymentDetailData?.cashReceipts[0])
      if (paymentDetailData.cashOrCard === '카드') {
        setCardName(paymentDetailData.cardCompany)
        const date = parseInt(paymentDetailData?.paymentDate)
        setCardPaymentDate(date)
        setValue('paymentDate', date)
      } else {
        setBankName(paymentDetailData.bankName)
        const date = parseInt(paymentDetailData?.depositDate)
        setCashDepositDate(date)
        setValue('depositDate', date)
      }
    }
  }, [paymentDetailData])

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

  const onPaymentDetailSubmit = data => {
    if (isDirty) {
      const isModify = confirm('변경사항이 있습니다. 수정하시겠습니까?')
      if (isModify) {
        if (paymentType === '카드') {
          updatePaymentDetail({
            variables: {
              editPaymentDetailId: paymentDetailData?.id,
              cashOrCard: '카드',
              studentPaymentId: paymentDetailData?.studentPaymentId,
              cardCompany: data.cardCompany,
              cardNum: data.cardNum.trim(),
              amountPayment: parseInt(data.amountPayment),
              installment: parseInt(data.installment),
              approvalNum: data.approvalNum.trim(),
              // paymentDate:
              //   data.paymentDate === null
              //     ? null
              //     : typeof data.paymentDate === 'string'
              //     ? new Date(parseInt(data.paymentDate))
              //     : new Date(data.paymentDate),
            },
            onCompleted: result => {
              if (!result.editPaymentDetail.ok) {
                setFocus('amountPayment')
                setError('amountPayment', {
                  type: 'custom',
                  message: '미 수납액보다 큽니다.',
                })
              } else {
                updateReceived({
                  variables: {
                    amountReceived:
                      studentPaymentData?.amountReceived -
                      paymentDetailData.amountPayment +
                      parseInt(data.amountPayment),
                    editStudentPaymentId: paymentDetailData?.studentPaymentId,
                    subjectId: studentPaymentData?.subject.id,
                    processingManagerId:
                      studentPaymentData?.processingManagerId,
                  },
                  onCompleted: result => {
                    if (result.editStudentPayment.ok) {
                      const dirtyFieldsArray = [...Object.keys(dirtyFields)]
                      userLogs(
                        `${paymentDetailData?.id} 카드 결제 수정`,
                        dirtyFieldsArray.join(', '),
                      )
                      router.back()
                    }
                  },
                })
              }
            },
          })
        } else {
          updatePaymentDetail({
            variables: {
              editPaymentDetailId: paymentDetailData?.id,
              cashOrCard: '현금',
              studentPaymentId: paymentDetailData?.studentPaymentId,
              bankName: data.bankName,
              depositorName: data.depositorName.trim(),
              depositAmount: parseInt(data.depositAmount),
              cashReceipts: [
                data.cashReceiptType,
                data.cashReceiptNum,
                data.cashReceiptApprovalNum,
              ],
              // depositDate: new Date(data.depositDate),
            },
            onCompleted: result => {
              if (!result.editPaymentDetail.ok) {
                setFocus('depositAmount')
                setError('depositAmount', {
                  type: 'custom',
                  message: '미 수납액보다 큽니다.',
                })
              } else {
                updateReceived({
                  variables: {
                    amountReceived:
                      studentPaymentData?.amountReceived -
                      paymentDetailData.depositAmount +
                      parseInt(data.depositAmount),
                    editStudentPaymentId: paymentDetailData?.studentPaymentId,
                    subjectId: studentPaymentData?.subject.id,
                    processingManagerId:
                      studentPaymentData?.processingManagerId,
                  },
                  onCompleted: result => {
                    if (result.editStudentPayment.ok) {
                      const dirtyFieldsArray = [...Object.keys(dirtyFields)]
                      userLogs(
                        `${paymentDetailData?.id} 현금 결제 수정 `,
                        dirtyFieldsArray.join(', '),
                      )
                      router.back()
                    }
                  },
                })
              }
            },
          })
        }
      }
    }
  }

  const handleCardChange = e => {
    setCardName(e.target.value)
  }
  const handleBankChange = e => {
    setBankName(e.target.value)
  }
  const handleCashReceiptTypeChange = value => {
    setCashReceiptType(value)
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
                {formatDate(studentPaymentData?.student?.updatedAt, true)}
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
                    <LineBox>{studentPaymentData?.student?.name}</LineBox>
                  </div>
                </AreaBox>
                <AreaBox>
                  <div>
                    <FilterLabel>
                      생년월일<span>*</span>
                    </FilterLabel>
                    <LineBox>
                      {formatDate(studentPaymentData?.student?.birthday, false)}
                    </LineBox>
                  </div>
                </AreaBox>
                <AreaBox>
                  <div>
                    <FilterLabel>
                      연락처<span>*</span>
                    </FilterLabel>
                    <LineBox>{studentPaymentData?.student?.phoneNum1}</LineBox>
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
              <PaymentInfo
                studentSubjectData={studentPaymentData?.subject}
                studentPaymentData={studentPaymentData}
              />
            </DetailDiv>
          </DetailBox>
          {paymentDetailData !== null && (
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
                          {studentPaymentData?.cardAmount
                            ? feeFormet(studentPaymentData?.cardAmount)
                            : '0'}
                        </LineBox>
                      </div>
                    </AreaBox>
                    <AreaBox>
                      <div>
                        <FilterLabel>현금 결제액</FilterLabel>
                        <LineBox>
                          {studentPaymentData?.cashAmount
                            ? feeFormet(studentPaymentData?.cashAmount)
                            : '0'}
                        </LineBox>
                      </div>
                    </AreaBox>
                  </FlexBox>
                </DetailDiv>
                <DetailDiv style={{ marginTop: '2rem' }}>
                  <AreaTitle>
                    <h4>결제 상세 정보</h4>
                  </AreaTitle>
                  <FlexBox>
                    <AreaBox>
                      <RadioBox>
                        <Controller
                          control={control}
                          name="cashOrCard"
                          render={({ field }) => (
                            <RadioGroup
                              isReadOnly
                              label={
                                <FilterLabel>
                                  결제 방식<span>*</span>
                                </FilterLabel>
                              }
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
                    </AreaBox>
                  </FlexBox>
                  {paymentDetailData.cashOrCard === '카드' && (
                    <>
                      <FlexBox>
                        <AreaBox>
                          <Controller
                            control={control}
                            name="cardCompany"
                            rules={{ required: '카드사를 선택해주세요.' }}
                            defaultValue={paymentDetailData.cardCompany}
                            render={({ field, fieldState }) => (
                              <Select
                                labelPlacement="outside"
                                label={
                                  <FilterLabel>
                                    카드사<span>*</span>
                                  </FilterLabel>
                                }
                                placeholder=" "
                                className="w-full"
                                variant="bordered"
                                defaultSelectedKeys={[
                                  paymentDetailData.cardCompany,
                                ]}
                                selectedKeys={[cardName]}
                                onChange={value => {
                                  if (value.target.value !== '') {
                                    field.onChange(value)
                                    handleCardChange(value)
                                  }
                                }}
                              >
                                {Object.entries(cardNames).map(
                                  ([key, name]) => (
                                    <SelectItem key={name} value={name}>
                                      {name}
                                    </SelectItem>
                                  ),
                                )}
                              </Select>
                            )}
                          />
                          {errors.cardCompany && (
                            <p className="px-2 pt-2 text-xs text-red-500">
                              {String(errors.cardCompany.message)}
                            </p>
                          )}
                        </AreaBox>
                        <AreaBox>
                          <Input
                            labelPlacement="outside"
                            placeholder="카드번호"
                            variant="bordered"
                            radius="md"
                            type="text"
                            label={
                              <FilterLabel>
                                카드번호<span>*</span>
                              </FilterLabel>
                            }
                            defaultValue={paymentDetailData.cardNum}
                            {...register('cardNum', {
                              required: '카드반호를 작성해주세요.',
                            })}
                          />
                          {errors.cardNum && (
                            <p className="px-2 pt-2 text-xs text-red-500">
                              {String(errors.cardNum.message)}
                            </p>
                          )}
                        </AreaBox>
                        <AreaSmallBox>
                          <Input
                            labelPlacement="outside"
                            placeholder="할부기간"
                            variant="bordered"
                            radius="md"
                            type="text"
                            label={
                              <FilterLabel>
                                할부기간<span>*</span>
                              </FilterLabel>
                            }
                            defaultValue={paymentDetailData.installment}
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
                            label={
                              <FilterLabel>
                                결제금액<span>*</span>
                              </FilterLabel>
                            }
                            defaultValue={paymentDetailData.amountPayment}
                            {...register('amountPayment', {
                              required: '결제금액을 작성해주세요.',
                            })}
                          />
                          {errors.amountPayment && (
                            <p className="px-2 pt-2 text-xs text-red-500">
                              {String(errors.amountPayment.message)}
                            </p>
                          )}
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
                            label={
                              <FilterLabel>
                                승인번호<span>*</span>
                              </FilterLabel>
                            }
                            defaultValue={paymentDetailData.ApprovalNum}
                            {...register('approvalNum', {
                              required: '승인번호를 작성해주세요.',
                            })}
                          />
                          {errors.approvalNum && (
                            <p className="px-2 pt-2 text-xs text-red-500">
                              {String(errors.approvalNum.message)}
                            </p>
                          )}
                        </AreaBox>
                        {/* <AreaBox>
                          <DatePickerBox>
                            <Controller
                              control={control}
                              name="paymentDate"
                              rules={{ required: '결제일자를 선택해주세요.' }}
                              render={({ field }) => (
                                <DatePicker
                                  renderCustomHeader={({
                                    date,
                                    changeYear,
                                    changeMonth,
                                    decreaseMonth,
                                    increaseMonth,
                                  }) => (
                                    <DatePickerHeader
                                      rangeYears={years}
                                      clickDate={date}
                                      changeYear={changeYear}
                                      changeMonth={changeMonth}
                                      decreaseMonth={decreaseMonth}
                                      increaseMonth={increaseMonth}
                                    />
                                  )}
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
                                  dateFormat="yyyy/MM/dd"
                                  onChangeRaw={e => e.preventDefault()}
                                  customInput={
                                    <Input
                                      ref={field.ref}
                                      label={
                                        <FilterLabel>결제일자<span>*</span></FilterLabel>
                                      }
                                      labelPlacement="outside"
                                      type="text"
                                      variant="bordered"
                                      id="date"
                                               classNames={{
                                input: 'caret-transparent',
                              }}
                                      startContent={
                                        <i className="xi-calendar" />
                                      }
                                    />
                                  }
                                />
                              )}
                            />
                          </DatePickerBox>
                          {errors.paymentDate && (
                            <p className="px-2 pt-2 text-xs text-red-500">
                              {String(errors.paymentDate.message)}
                            </p>
                          )}
                        </AreaBox> */}
                      </FlexBox>
                    </>
                  )}
                  {paymentDetailData.cashOrCard === '현금' && (
                    <>
                      <FlexBox>
                        <AreaBox>
                          <Controller
                            control={control}
                            name="bankName"
                            rules={{ required: '입금은행을 선택해주세요.' }}
                            defaultValue={paymentDetailData.bankName}
                            render={({ field, fieldState }) => (
                              <Select
                                labelPlacement="outside"
                                label={
                                  <FilterLabel>
                                    은행명<span>*</span>
                                  </FilterLabel>
                                }
                                placeholder=" "
                                className="w-full"
                                variant="bordered"
                                defaultSelectedKeys={[
                                  paymentDetailData.bankName,
                                ]}
                                selectedKeys={[bankName]}
                                onChange={value => {
                                  if (value.target.value !== '') {
                                    field.onChange(value)
                                    handleBankChange(value)
                                  }
                                }}
                              >
                                {Object.entries(bankNames).map(
                                  ([key, name]) => (
                                    <SelectItem key={name} value={name}>
                                      {name}
                                    </SelectItem>
                                  ),
                                )}
                              </Select>
                            )}
                          />
                          {errors.bankName && (
                            <p className="px-2 pt-2 text-xs text-red-500">
                              {String(errors.bankName.message)}
                            </p>
                          )}
                        </AreaBox>
                        <AreaBox>
                          <Input
                            labelPlacement="outside"
                            placeholder="입금자명"
                            variant="bordered"
                            radius="md"
                            type="text"
                            label={
                              <FilterLabel>
                                입금자명<span>*</span>
                              </FilterLabel>
                            }
                            defaultValue={paymentDetailData.depositorName}
                            {...register('depositorName', {
                              required: '입금자를 작성해주세요.',
                            })}
                          />
                          {errors.depositorName && (
                            <p className="px-2 pt-2 text-xs text-red-500">
                              {String(errors.depositorName.message)}
                            </p>
                          )}
                        </AreaBox>
                        <AreaBox>
                          <Input
                            labelPlacement="outside"
                            placeholder="입금금액"
                            variant="bordered"
                            radius="md"
                            type="text"
                            label={
                              <FilterLabel>
                                입금금액<span>*</span>
                              </FilterLabel>
                            }
                            defaultValue={paymentDetailData.depositAmount}
                            {...register('depositAmount', {
                              required: '입금 금액을 작성해주세요.',
                            })}
                          />
                          {errors.depositAmount && (
                            <p className="px-2 pt-2 text-xs text-red-500">
                              {String(errors.depositAmount.message)}
                            </p>
                          )}
                        </AreaBox>
                        {/* <AreaBox>
                        <DatePickerBox>
                          <Controller
                            control={control}
                            rules={{ required: '입금일자를 선택해주세요.' }}
                            name="depositDate"
                            render={({ field }) => (
                              <DatePicker
                                renderCustomHeader={({
                                  date,
                                  changeYear,
                                  changeMonth,
                                  decreaseMonth,
                                  increaseMonth,
                                }) => (
                                  <DatePickerHeader
                                    rangeYears={years}
                                    clickDate={date}
                                    changeYear={changeYear}
                                    changeMonth={changeMonth}
                                    decreaseMonth={decreaseMonth}
                                    increaseMonth={increaseMonth}
                                  />
                                )}
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
                                dateFormat="yyyy/MM/dd"
                                onChangeRaw={e => e.preventDefault()}
                                customInput={
                                  <Input
                                    ref={field.ref}
                                    label={<FilterLabel>입금일자<span>*</span></FilterLabel>}
                                    labelPlacement="outside"
                                    type="text"
                                    variant="bordered"
                                    id="date"
                                             classNames={{
                                input: 'caret-transparent',
                              }}
                                    startContent={<i className="xi-calendar" />}
                                  />
                                }
                              />
                            )}
                          />
                        </DatePickerBox>
                        {errors.depositDate && (
                          <p className="px-2 pt-2 text-xs text-red-500">
                            {String(errors.depositDate.message)}
                          </p>
                        )}
                      </AreaBox> */}
                      </FlexBox>
                      <FlexBox>
                        <AreaBox>
                          <RadioBox>
                            <Controller
                              control={control}
                              name="cashReceiptType"
                              rules={{
                                required: '현금영수증 타입을 선택해주세요.',
                              }}
                              defaultValue={paymentDetailData.cashReceipts[0]}
                              render={({ field }) => (
                                <RadioGroup
                                  label={
                                    <FilterLabel>
                                      현금영수증<span>*</span>
                                    </FilterLabel>
                                  }
                                  orientation="horizontal"
                                  className="gap-[0.65rem]"
                                  value={cashReceiptType}
                                  onValueChange={value => {
                                    field.onChange(value)
                                    handleCashReceiptTypeChange(value)
                                  }}
                                >
                                  <Radio
                                    key={'휴대폰번호'}
                                    value={'휴대폰번호'}
                                  >
                                    휴대폰번호
                                  </Radio>
                                  <Radio
                                    key={'주민등록번호'}
                                    value={'주민등록번호'}
                                  >
                                    주민등록번호
                                  </Radio>
                                </RadioGroup>
                              )}
                            />
                          </RadioBox>
                          {errors.cashReceiptType && (
                            <p className="px-2 pt-2 text-xs text-red-500">
                              {String(errors.cashReceiptType.message)}
                            </p>
                          )}
                        </AreaBox>
                        <AreaBox>
                          <Input
                            labelPlacement="outside"
                            placeholder="현금영수증번호"
                            variant="bordered"
                            radius="md"
                            type="text"
                            defaultValue={paymentDetailData.cashReceipts[1]}
                            label={
                              <FilterLabel>
                                현금영수증번호<span>*</span>
                              </FilterLabel>
                            }
                            {...register('cashReceiptNum', {
                              required: '현금영수증 번호를 작성해주세요.',
                              pattern: {
                                value: /^[0-9]+$/,
                                message: '숫자만 입력 가능합니다.',
                              },
                            })}
                          />
                          {errors.cashReceiptNum && (
                            <p className="px-2 pt-2 text-xs text-red-500">
                              {String(errors.cashReceiptNum.message)}
                            </p>
                          )}
                        </AreaBox>
                        <AreaBox>
                          <Input
                            labelPlacement="outside"
                            placeholder="현금영수증 승인번호"
                            variant="bordered"
                            radius="md"
                            type="text"
                            defaultValue={paymentDetailData.cashReceipts[2]}
                            label={
                              <FilterLabel>
                                현금영수증 승인번호<span>*</span>
                              </FilterLabel>
                            }
                            {...register('cashReceiptApprovalNum', {
                              required: '현금영수증 승인번호를 작성해주세요.',
                              pattern: {
                                value: /^[0-9]+$/,
                                message: '숫자만 입력 가능합니다.',
                              },
                            })}
                          />
                          {errors.cashReceiptApprovalNum && (
                            <p className="px-2 pt-2 text-xs text-red-500">
                              {String(errors.cashReceiptApprovalNum.message)}
                            </p>
                          )}
                        </AreaBox>
                      </FlexBox>
                    </>
                  )}
                  <BtnBox>
                    <Button2
                      buttonType="submit"
                      width="100%"
                      height="2.5rem"
                      typeBorder={true}
                      fontColor="#fff"
                      bgColor="#007de9"
                    >
                      결제 수정
                    </Button2>
                    <Button2
                      buttonType="button"
                      width="100%"
                      height="2.5rem"
                      fontColor="#007de9"
                      bgColor="#fff"
                      borderColor="#007de9"
                      typeBorder={true}
                      onClick={() => router.back()}
                    >
                      뒤로가기
                    </Button2>
                  </BtnBox>
                </DetailDiv>
              </DetailBox>
            </form>
          )}
        </ConArea>
      </MainWrap>
    </>
  )
}
StudentsWritePayment.getLayout = page => <Layout>{page}</Layout>
