import MainWrap from '@/components/wrappers/MainWrap'
import { useEffect, useState } from 'react'
import Breadcrumb from '@/components/common/Breadcrumb'
import { styled } from 'styled-components'
import { useRouter } from 'next/router'
import DatePicker, { registerLocale } from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import ko from 'date-fns/locale/ko'
import { getYear } from 'date-fns'
registerLocale('ko', ko)
const _ = require('lodash')
import { Input, Radio, RadioGroup, Select, SelectItem } from '@nextui-org/react'
import { useMutation, useQuery } from '@apollo/client'
import { Controller, useForm } from 'react-hook-form'
import { SEE_MANAGEUSER_QUERY } from '@/graphql/queries'
import useUserLogsMutation from '@/utils/userLogs'

import {
  CREATE_PAYMENT_DETAIL_MUTATION,
  SEARCH_STUDENT_PAYMENT_MUTATION,
  UPDATE_STUDENT_RECEIVED_MUTATION,
} from '@/graphql/mutations'
import DatePickerHeader from '@/components/common/DatePickerHeader'
import Button2 from '@/components/common/Button'

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
  const studentId = typeof router.query.id === 'string' ? router.query.id : null
  const [searchStudentPayment] = useMutation(SEARCH_STUDENT_PAYMENT_MUTATION)
  const [createPaymentDetail] = useMutation(CREATE_PAYMENT_DETAIL_MUTATION)
  const [updateReceived] = useMutation(UPDATE_STUDENT_RECEIVED_MUTATION)
  const {
    loading: managerLoading,
    error: managerError,
    data: managerData,
  } = useQuery(SEE_MANAGEUSER_QUERY)
  const managerList = managerData?.seeManageUser || []
  const {
    register,
    control,
    reset,
    setError,
    setFocus,
    clearErrors,
    handleSubmit,
    formState,
  } = useForm()
  const { errors } = formState
  const [studentData, setStudentData] = useState(null)
  const [studentSubjectData, setStudentSubjectData] = useState(null)
  const [studentPaymentData, setStudentPaymentData] = useState(null)
  const [paymentType, setPaymentType] = useState('카드')
  const [cardName, setCardName] = useState('카드사 선택')
  const [bankName, setBankName] = useState('은행 선택')
  const [cardPaymentDate, setCardPaymentDate] = useState(null)
  const [cashDepositDate, setCashDepositDate] = useState(null)

  useEffect(() => {
    searchStudentPayment({
      variables: {
        searchStudentId: parseInt(studentId),
      },
      onCompleted: data => {
        setStudentData(data.searchStudent?.student[0])
        setStudentPaymentData(data.searchStudent?.student[0].studentPayment[0])
        setStudentSubjectData(
          data.searchStudent?.student[0].studentPayment[0].subject,
        )
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

  const feeFormet = fee => {
    const result = fee
      .toString()
      .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')
    return result
  }

  const onPaymentDetailSubmit = data => {
    if (paymentType === '카드') {
      createPaymentDetail({
        variables: {
          cashOrCard: '카드',
          studentPaymentId: studentPaymentData?.id,
          cardCompany: data.cardCompany,
          cardNum: data.cardNum.trim(),
          amountPayment: parseInt(data.amountPayment),
          installment: data.installment === '' ? 0 : parseInt(data.installment),
          approvalNum: data.approvalNum === '' ? null : data.approvalNum.trim(),
          paymentDate: data.paymentDate === undefined ? null : data.paymentDate,
        },
        onCompleted: result => {
          if (!result.createPaymentDetail.ok) {
            setFocus('amountPayment')
            setError('amountPayment', {
              type: 'custom',
              message: '미 수납액보다 큽니다.',
            })
          } else {
            updateReceived({
              variables: {
                amountReceived:
                  studentPaymentData?.amountReceived +
                  parseInt(data.amountPayment),
                editStudentPaymentId: parseInt(studentPaymentData?.id),
                subjectId: studentSubjectData.id,
                processingManagerId: studentPaymentData?.processingManagerId,
              },
              onCompleted: () => {
                searchStudentPayment({
                  variables: {
                    searchStudentId: parseInt(studentId),
                  },
                  onCompleted: data => {
                    setStudentData(data.searchStudent?.student[0])
                    setStudentPaymentData(
                      data.searchStudent?.student[0].studentPayment[0],
                    )
                    setStudentSubjectData(
                      data.searchStudent?.student[0].studentPayment[0].subject,
                    )
                  },
                })
                userLogs(`${studentData?.name} 카드 결제 `)
                reset()
                clearErrors()
                setCardName('카드사 선택')
                setCardPaymentDate(null)
                setPaymentType(paymentType)
              },
            })
          }
        },
      })
    } else {
      createPaymentDetail({
        variables: {
          cashOrCard: '현금',
          studentPaymentId: parseInt(studentPaymentData?.id),
          bankName: data.bankName,
          depositorName: data.depositorName.trim(),
          depositAmount: parseInt(data.depositAmount),
          depositDate: data.depositDate === undefined ? null : data.depositDate,
        },
        onCompleted: result => {
          if (!result.createPaymentDetail.ok) {
            setFocus('depositAmount')
            setError('depositAmount', {
              type: 'custom',
              message: '미 수납액보다 큽니다.',
            })
          } else {
            updateReceived({
              variables: {
                amountReceived:
                  studentPaymentData?.amountReceived +
                  parseInt(data.depositAmount),
                editStudentPaymentId: parseInt(studentPaymentData?.id),
                subjectId: studentSubjectData.id,
                processingManagerId: studentPaymentData?.processingManagerId,
              },
              onCompleted: () => {
                searchStudentPayment({
                  variables: {
                    searchStudentId: parseInt(studentId),
                  },
                  onCompleted: data => {
                    setStudentData(data.searchStudent?.student[0])
                    setStudentPaymentData(
                      data.searchStudent?.student[0].studentPayment[0],
                    )
                    setStudentSubjectData(
                      data.searchStudent?.student[0].studentPayment[0].subject,
                    )
                  },
                })
                userLogs(`${studentData?.name} 현금 결제 `)
                reset()
                clearErrors()
                setBankName('은행 선택')
                setCashDepositDate(null)
                setPaymentType(paymentType)
              },
            })
          }
        },
      })
    }
  }

  const handleTypeChange = value => {
    setPaymentType(value)
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
            </DetailDiv>
          </DetailBox>
          {studentPaymentData !== null && (
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
                              user.id ===
                              studentPaymentData?.processingManagerId,
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
                        {/* {studentPaymentData?.actualAmount
                          ? received(
                              studentPaymentData?.actualAmount,
                              studentPaymentData?.unCollectedAmount,
                            )
                          : '0'} */}
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
                </FlexBox>
              </DetailDiv>
            </DetailBox>
          )}
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
                              handleTypeChange(value)
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
                {paymentType === '카드' && (
                  <>
                    <FlexBox>
                      <AreaBox>
                        <Controller
                          control={control}
                          name="cardCompany"
                          rules={{ required: '카드사를 선택해주세요.' }}
                          render={({ field, fieldState }) => (
                            <Select
                              ref={field.ref}
                              autoFocus={true}
                              labelPlacement="outside"
                              label={
                                <FilterLabel>
                                  카드사<span>*</span>
                                </FilterLabel>
                              }
                              placeholder=" "
                              className="w-full"
                              variant="bordered"
                              selectedKeys={[cardName]}
                              onChange={value => {
                                if (value.target.value !== '') {
                                  field.onChange(value)
                                  handleCardChange(value)
                                }
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
                      <AreaBox>
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
                          endContent={<InputText>개월</InputText>}
                          {...register('installment')}
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
                          label={
                            <FilterLabel>
                              승인번호<span>*</span>
                            </FilterLabel>
                          }
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
                      {/* <AreaBox>
                        <DatePickerBox>
                          <Controller
                            control={control}
                            name="paymentDate"
                            rules={{
                              required: '결제 요청 일자를 선택해주세요.',
                            }}
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
                                customInput={
                                  <Input
                                    ref={field.ref}
                                    label={<FilterLabel>결제일자<span>*</span></FilterLabel>}
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
                        {errors.paymentDate && (
                          <p className="px-2 pt-2 text-xs text-red-500">
                            {String(errors.paymentDate.message)}
                          </p>
                        )}
                      </AreaBox> */}
                    </FlexBox>
                  </>
                )}
                {paymentType === '현금' && (
                  <FlexBox>
                    <AreaBox>
                      <Controller
                        control={control}
                        name="bankName"
                        rules={{ required: '입금은행을 선택해주세요.' }}
                        render={({ field, fieldState }) => (
                          <Select
                            autoFocus={true}
                            ref={field.ref}
                            labelPlacement="outside"
                            label={
                              <FilterLabel>
                                은행명<span>*</span>
                              </FilterLabel>
                            }
                            placeholder=" "
                            className="w-full"
                            variant="bordered"
                            selectedKeys={[bankName]}
                            onChange={value => {
                              if (value.target.value !== '') {
                                field.onChange(value)
                                handleBankChange(value)
                              }
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
                          rules={{ required: '입금 요청 일자를 선택해주세요.' }}
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
                              customInput={
                                <Input
                                  ref={field.ref}
                                  label={<FilterLabel>입금일자<span>*</span></FilterLabel>}
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
                      {errors.depositDate && (
                        <p className="px-2 pt-2 text-xs text-red-500">
                          {String(errors.depositDate.message)}
                        </p>
                      )}
                    </AreaBox> */}
                  </FlexBox>
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
                    결제 추가
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
        </ConArea>
      </MainWrap>
    </>
  )
}
