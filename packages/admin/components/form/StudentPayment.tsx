import { useEffect, useState } from 'react'
import { styled } from 'styled-components'
import { useRouter } from 'next/router'
import DatePicker, { registerLocale } from 'react-datepicker'
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
  useDisclosure,
} from '@nextui-org/react'
import { useMutation } from '@apollo/client'
import { Controller, useForm, useWatch } from 'react-hook-form'
import Button2 from '@/components/common/Button'
import useUserLogsMutation from '@/utils/userLogs'
import Layout from '@/pages/students/layout'
import SubjectModal from '@/components/modal/SubjectModal'
import {
  UPDATE_STUDENT_DUEDATE_MUTATION,
  UPDATE_STUDENT_PAYMENT_MUTATION,
} from '@/graphql/mutations'
import DatePickerHeader from '../common/DatePickerHeader'
import { useRecoilValue } from 'recoil'
import { ReceiptState, subStatusState } from '@/lib/recoilAtoms'

const DetailBox = styled.div`
  margin-top: 2rem;
  background: #fff;
  border-radius: 0.5rem;
  padding: 1.5rem;
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
`
const AreaBox = styled.div`
  flex: 1;
  width: 100%;

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input[type='number'] {
    -moz-appearance: textfield;
  }
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
  width: 2.5rem;
`
const BtnBox = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  align-items: center;
`

const extractNumber = inputString => {
  const regex = /(\d+(\.\d+)?)([^\d]+)/
  const match = inputString.match(regex)
  if (match) {
    const number = parseFloat(match[1])
    return String(number)
  }
}
const extractUnit = inputString => {
  const regex = /(\d+(\.\d+)?)([^\d]+)/
  const match = inputString.match(regex)
  if (match) {
    const unit = match[3].trim()
    return unit
  }
}

export default function StudentPaymentForm({
  studentData,
  managerList,
  studentSubjectData,
  studentPaymentData,
}) {
  const router = useRouter()
  const { userLogs } = useUserLogsMutation()
  const [updateStudentPayment] = useMutation(UPDATE_STUDENT_PAYMENT_MUTATION)
  const [updateStudentDuedate] = useMutation(UPDATE_STUDENT_DUEDATE_MUTATION)
  const {
    register,
    setValue,
    getValues,
    control,
    setError,
    clearErrors,
    handleSubmit,
    formState: { isDirty, dirtyFields, errors },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      editStudentPaymentId: studentPaymentData?.id,
      seScore: studentPaymentData?.seScore,
      subject: studentSubjectData?.subjectName,
      tuitionFee: studentPaymentData?.tuitionFee,
      actualAmount: studentPaymentData?.actualAmount,
      unCollectedAmount: studentPaymentData?.unCollectedAmount,
      paymentDate: studentPaymentData?.paymentDate,
      processingManagerId: studentPaymentData?.processingManagerId,
      situationReport: studentPaymentData?.situationReport,
      subjectId: studentSubjectData?.id,
      amountReceived: studentPaymentData?.amountReceived,
      cashAmount: studentPaymentData?.cashAmount,
      cardAmount: studentPaymentData?.cardAmount,
      discountAmount: studentPaymentData?.discountAmount,
      dueDate: studentData?.dueDate,
      receiptClassification: studentPaymentData?.receiptClassification,
      subDiv: studentPaymentData?.subDiv,
      discount: studentPaymentData?.discountAmount,
      discountUnit: '%',
    },
  })
  const Receipt = useRecoilValue(ReceiptState)
  const subStatus = useRecoilValue(subStatusState)
  const [subjectSelectedData, setSubjectSelectedData] = useState(null)
  const [subjectSelected, setSubjectSelected] = useState(null)
  const [disCountType, setDisCountType] = useState('%')
  const [paymentDateSelect, setPaymentDateSelect] = useState(null)
  const [dueDateSelect, setDueDateSelect] = useState(null)
  const [sub, setSub] = useState('없음')
  const [subjectManager, setSubjectManager] = useState('담당자 지정필요')
  const [receiptSelected, setReceiptSelected] = useState([])
  const {
    isOpen: sbjIsOpen,
    onOpen: sbjOpen,
    onClose: sbjClose,
  } = useDisclosure()
  const years = _.range(2000, getYear(new Date()) + 5, 1)

  useEffect(() => {
    if (
      studentPaymentData?.processingManagerId === undefined ||
      studentPaymentData?.processingManagerId === null
    ) {
      setSubjectManager('담당자 지정필요')
    } else {
      setSubjectManager(String(studentPaymentData?.processingManagerId))
    }
    if (
      studentPaymentData?.subDiv === undefined ||
      studentPaymentData?.subDiv === null
    ) {
      setSub('없음')
    } else {
      setSub(studentPaymentData?.subDiv)
    }
    if (
      studentPaymentData?.paymentDate === null ||
      studentPaymentData?.paymentDate === undefined
    ) {
      setPaymentDateSelect(null)
    } else {
      const date = parseInt(studentPaymentData?.paymentDate)
      setPaymentDateSelect(date)
    }
    if (studentData?.dueDate === null || studentData?.dueDate === undefined) {
      setDueDateSelect(null)
    } else {
      const date = parseInt(studentData?.dueDate)
      setDueDateSelect(date)
    }
    if (
      studentPaymentData?.receiptClassification === null ||
      studentPaymentData?.receiptClassification === undefined
    ) {
      setReceiptSelected([])
    } else {
      setReceiptSelected(studentPaymentData.receiptClassification)
    }
    if (
      studentPaymentData?.discountAmount === null ||
      studentPaymentData?.discountAmount === undefined
    ) {
      setDisCountType('%')
    } else {
      const discoutUnit =
        extractUnit(studentPaymentData?.discountAmount) === undefined
          ? '%'
          : extractUnit(studentPaymentData?.discountAmount)
      setDisCountType(discoutUnit)
      setValue('discountUnit', discoutUnit)
    }
    setSubjectSelected(studentSubjectData?.id)
  }, [router, studentPaymentData, studentSubjectData])

  const disCountPrice = (disCountType, tuitionFee) => {
    const discount = getValues('discount')
    if (disCountType === '%') {
      const disCountP = (tuitionFee * (100 - discount)) / 100
      return disCountP
    } else {
      const disCountP = tuitionFee - discount
      return disCountP
    }
  }
  const disCounCalculator = fee => {
    const price = disCountPrice(getValues('discountUnit'), fee)
    const total = price - parseInt(studentPaymentData?.amountReceived)
    if (price < 0) {
      setError('actualAmount', {
        type: 'custom',
        message: '할인 금액이 너무 많습니다.',
      })
      setValue('actualAmount', price, { shouldDirty: true })
      setValue('unCollectedAmount', total, { shouldDirty: true })
    } else {
      clearErrors('actualAmount')
      setValue('actualAmount', price, { shouldDirty: true })
      setValue('unCollectedAmount', total, { shouldDirty: true })
    }
  }

  useEffect(() => {
    if (subjectSelectedData !== null) {
      disCounCalculator(subjectSelectedData?.fee)
      setSub(subjectSelectedData?.subDiv)
      setValue('subDiv', subjectSelectedData?.subDiv)
    }
  }, [subjectSelectedData])

  const onSubmit = data => {
    if (isDirty) {
      const isModify = confirm('변경사항이 있습니다. 수정하시겠습니까?')
      if (isModify) {
        if (data.actualAmount > 0) {
          updateStudentPayment({
            variables: {
              editStudentPaymentId: parseInt(studentPaymentData.id),
              subjectId:
                subjectSelected === null
                  ? parseInt(studentPaymentData.subject.id)
                  : parseInt(subjectSelected),
              seScore: parseInt(data.seScore),
              tuitionFee:
                subjectSelectedData === null
                  ? parseInt(data.tuitionFee.replace(/,/g, ''), 10)
                  : parseInt(subjectSelectedData.fee),
              processingManagerId: parseInt(subjectManager),
              situationReport: data.situationReport === '동의' ? true : false,
              paymentDate:
                data.paymentDate === null
                  ? null
                  : typeof data.paymentDate === 'string'
                  ? new Date(parseInt(data.paymentDate))
                  : new Date(data.paymentDate),
              actualAmount: parseInt(data.actualAmount),
              discountAmount:
                data.discount === null
                  ? studentPaymentData?.discountAmount
                  : data.discount === '0' || data.discount === ''
                  ? '0'
                  : data.discount + disCountType,
              unCollectedAmount:
                typeof data.unCollectedAmount === 'string'
                  ? parseInt(data.unCollectedAmount)
                  : data.unCollectedAmount,
              amountReceived: parseInt(data.amountReceived.replace(/,/g, '')),
              receiptClassification: receiptSelected,
              subDiv: data.subDiv,
            },
            onCompleted: () => {
              updateStudentDuedate({
                variables: {
                  editStudentId: parseInt(studentData.id),
                  dueDate:
                    data.dueDate === null
                      ? null
                      : typeof data.dueDate === 'string'
                      ? new Date(parseInt(data.dueDate))
                      : new Date(data.dueDate),
                },
                onCompleted: () => {
                  alert('수정되었습니다.')
                },
              })
            },
          })
          const dirtyFieldsArray = [...Object.keys(dirtyFields)]
          userLogs(
            `${studentData.name} 수강신청 수정`,
            dirtyFieldsArray.join(', '),
          )
        } else {
          setError(
            'actualAmount',
            {
              type: 'custom',
              message: '실 수강료가 0보다 작습니다.',
            },
            { shouldFocus: true },
          )
        }
      }
    }
  }

  const feeFormet = fee => {
    if (fee !== null && fee !== undefined) {
      const result = fee
        .toString()
        .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')
      return result
    }
  }

  const handleDisCountChange = e => {
    setDisCountType(e.target.value)
    if (subjectSelectedData !== null) {
      disCounCalculator(subjectSelectedData?.fee)
    } else {
      disCounCalculator(studentSubjectData?.fee)
    }
  }

  const discountChange = value => {
    if (value === '' || value < 0) {
      setValue('discount', 0)
    } else {
      setValue('discount', parseInt(value))
    }
    if (subjectSelectedData !== null) {
      disCounCalculator(subjectSelectedData?.fee)
    } else {
      disCounCalculator(studentSubjectData?.fee)
    }
  }

  const discountTotal = value => {
    if (subjectSelectedData !== null) {
      const discountPrice = subjectSelectedData?.fee - parseInt(value)
      setValue('discount', discountPrice)
      setDisCountType('원')
      setValue('discountUnit', '원')
      disCounCalculator(subjectSelectedData?.fee)
    } else {
      const discountPrice = studentSubjectData?.fee - parseInt(value)
      setValue('discount', discountPrice)
      setDisCountType('원')
      setValue('discountUnit', '원')
      disCounCalculator(studentSubjectData?.fee)
    }
  }

  const handleSubManagerChange = e => {
    setSubjectManager(e.target.value)
  }

  const handleReceiptChange = (value: string[]) => {
    setValue('receiptClassification', value, { shouldDirty: true })
    setReceiptSelected(value)
  }
  const clickSubject = () => {
    if (
      studentData.lectureAssignment ||
      studentPaymentData.paymentDetail.length > 0
    ) {
      alert('과정 변경이 불가능합니다.')
    } else {
      sbjOpen()
    }
  }
  const handleSubChange = e => {
    setSub(e.target.value)
    setValue('subDiv', e.target.value)
  }

  return (
    <>
      {studentPaymentData !== null && studentSubjectData !== null && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <DetailBox>
            <DetailDiv>
              <AreaTitle>
                <h4>수강료 정보</h4>
              </AreaTitle>
              <FlexBox>
                <AreaSmallBox style={{ minWidth: '20%' }}>
                  <Input
                    readOnly
                    labelPlacement="outside"
                    placeholder="과정코드"
                    value={
                      subjectSelectedData?.subjectCode !== undefined
                        ? String(subjectSelectedData?.subjectCode)
                        : studentSubjectData?.subjectCode !== null
                        ? studentSubjectData?.subjectCode
                        : ''
                    }
                    variant="faded"
                    radius="md"
                    type="text"
                    label="과정코드"
                    className="w-full"
                  />
                </AreaSmallBox>
                <AreaBox>
                  <Textarea
                    readOnly
                    value={
                      subjectSelectedData?.subjectName !== undefined
                        ? String(subjectSelectedData?.subjectName)
                        : studentSubjectData?.subjectName !== null
                        ? studentSubjectData?.subjectName
                        : ''
                    }
                    label={
                      <FilterLabel>
                        과정 선택<span>*</span>
                      </FilterLabel>
                    }
                    labelPlacement="outside"
                    className="max-w-full"
                    variant={
                      studentData.lectureAssignment ||
                      studentPaymentData.paymentDetail.length > 0
                        ? 'faded'
                        : 'bordered'
                    }
                    minRows={1}
                    onClick={() => clickSubject()}
                    {...register('subject', {
                      required: {
                        value: true,
                        message: '수강 과정을 선택해주세요.',
                      },
                    })}
                  />
                  {errors.subject && (
                    <p className="px-2 pt-2 text-xs text-red-500">
                      {String(errors.subject.message)}
                    </p>
                  )}
                </AreaBox>
                <AreaSmallBox>
                  <RadioBox>
                    <Controller
                      control={control}
                      name="situationReport"
                      render={({ field }) => (
                        <RadioGroup
                          label={<FilterLabel>교육상황보고여부</FilterLabel>}
                          orientation="horizontal"
                          className="gap-[0.65rem]"
                          defaultValue={
                            studentPaymentData?.situationReport === null
                              ? '비동의'
                              : studentPaymentData?.situationReport
                              ? '동의'
                              : '비동의'
                          }
                          onValueChange={value => {
                            field.onChange(value)
                          }}
                        >
                          <Radio key={'동의'} value={'동의'}>
                            동의
                          </Radio>
                          <Radio key={'비동의'} value={'비동의'}>
                            비동의
                          </Radio>
                        </RadioGroup>
                      )}
                    />
                  </RadioBox>
                </AreaSmallBox>
              </FlexBox>
              <FlexBox>
                <AreaBox>
                  <Input
                    labelPlacement="outside"
                    placeholder="선별테스트 점수"
                    variant="bordered"
                    radius="md"
                    type="number"
                    defaultValue={String(studentPaymentData?.seScore)}
                    endContent={<InputText>/ 100</InputText>}
                    label={
                      <FilterLabel>
                        선별테스트 점수<span>*</span>
                      </FilterLabel>
                    }
                    className="w-full"
                    {...register('seScore', {
                      required: {
                        value: true,
                        message: '선별테스트 점수를 작성해주세요.',
                      },
                      min: {
                        value: 0,
                        message: '0 이상의 숫자를 작성해주세요.',
                      },
                      max: {
                        value: 100,
                        message: '100 이하의 숫자를 작성해주세요.',
                      },
                    })}
                  />
                  {errors.seScore && (
                    <p className="px-2 pt-2 text-xs text-red-500">
                      {String(errors.seScore.message)}
                    </p>
                  )}
                </AreaBox>
                <AreaBox>
                  <Controller
                    control={control}
                    name="subDiv"
                    defaultValue={studentPaymentData?.subDiv}
                    render={({ field }) => (
                      <Select
                        labelPlacement="outside"
                        label={<FilterLabel>수강구분</FilterLabel>}
                        placeholder=" "
                        className="w-full"
                        variant="bordered"
                        selectedKeys={[sub]}
                        onChange={value => {
                          if (value.target.value !== '') {
                            field.onChange(value)
                            handleSubChange(value)
                          }
                        }}
                      >
                        {Object.entries(subStatus).map(([key, item]) => (
                          <SelectItem key={item} value={item}>
                            {item}
                          </SelectItem>
                        ))}
                      </Select>
                    )}
                  />
                </AreaBox>
                <AreaBox>
                  <Input
                    readOnly
                    labelPlacement="outside"
                    placeholder="수강료"
                    value={
                      subjectSelectedData?.fee !== undefined
                        ? feeFormet(subjectSelectedData?.fee)
                        : studentPaymentData?.tuitionFee !== null
                        ? feeFormet(studentPaymentData?.tuitionFee)
                        : ''
                    }
                    variant="faded"
                    radius="md"
                    type="text"
                    label="수강료"
                    className="w-full"
                    {...register('tuitionFee')}
                  />
                </AreaBox>
              </FlexBox>
              <FlexBox>
                <AreaBox>
                  <Input
                    isReadOnly={
                      studentData.lectureAssignment ||
                      studentPaymentData.paymentDetail.length > 0
                        ? true
                        : false
                    }
                    labelPlacement="outside"
                    placeholder="할인"
                    variant={
                      studentData.lectureAssignment ||
                      studentPaymentData.paymentDetail.length > 0
                        ? 'faded'
                        : 'bordered'
                    }
                    radius="md"
                    type="number"
                    label="할인"
                    defaultValue={
                      studentPaymentData?.discountAmount !== null
                        ? extractNumber(studentPaymentData?.discountAmount)
                        : ''
                    }
                    onValueChange={e => {
                      discountChange(e)
                    }}
                    {...register('discount')}
                    endContent={
                      <Controller
                        control={control}
                        name="discountUnit"
                        render={({ field, fieldState }) => (
                          <Select
                            isDisabled={
                              studentData.lectureAssignment ||
                              studentPaymentData.paymentDetail.length > 0
                                ? true
                                : false
                            }
                            labelPlacement="outside"
                            label={<span style={{ display: 'none' }}></span>}
                            placeholder=" "
                            variant={'underlined'}
                            defaultValue={extractUnit(
                              studentPaymentData?.discountAmount !== null
                                ? studentPaymentData?.discountAmount
                                : '%',
                            )}
                            selectedKeys={[disCountType]}
                            classNames={{
                              base: 'w-[6rem]',
                              label: 'hidden',
                              trigger: 'h-unit-8 min-h-unit-8',
                              value: 'text-center',
                            }}
                            onChange={value => {
                              if (value.target.value !== '') {
                                field.onChange(value)
                                handleDisCountChange(value)
                              }
                            }}
                          >
                            <SelectItem key={'%'} value={'%'}>
                              %
                            </SelectItem>
                            <SelectItem key={'원'} value={'원'}>
                              원
                            </SelectItem>
                          </Select>
                        )}
                      />
                    }
                  />
                </AreaBox>
                <AreaBox>
                  <Input
                    isReadOnly={
                      studentData.lectureAssignment ||
                      studentPaymentData.paymentDetail.length > 0
                        ? true
                        : false
                    }
                    labelPlacement="outside"
                    placeholder="할인된 수강료"
                    variant={
                      studentData.lectureAssignment ||
                      studentPaymentData.paymentDetail.length > 0
                        ? 'faded'
                        : 'bordered'
                    }
                    radius="md"
                    type="number"
                    label="할인된 수강료"
                    defaultValue={
                      studentPaymentData?.actualAmount !== undefined
                        ? studentPaymentData?.actualAmount
                        : ''
                    }
                    onValueChange={value => {
                      if (value !== '') {
                        discountTotal(value)
                      } else {
                        discountTotal(0)
                      }
                    }}
                    onChange={e => {
                      register('actualAmount').onChange(e)
                    }}
                    {...register('actualAmount')}
                  />
                  {errors.actualAmount && (
                    <p className="px-2 pt-2 text-xs text-red-500">
                      {String(errors.actualAmount.message)}
                    </p>
                  )}
                </AreaBox>
                <AreaBox>
                  <Input
                    isReadOnly
                    labelPlacement="outside"
                    placeholder="수납액"
                    variant="faded"
                    radius="md"
                    type="text"
                    label="수납액"
                    defaultValue={
                      studentPaymentData?.amountReceived === null
                        ? '0'
                        : feeFormet(studentPaymentData?.amountReceived)
                    }
                    {...register('amountReceived')}
                  />
                </AreaBox>
              </FlexBox>
              <FlexBox>
                <AreaBox>
                  <Input
                    isReadOnly
                    labelPlacement="outside"
                    placeholder="현금결제액"
                    variant="faded"
                    radius="md"
                    type="text"
                    label="현금결제액"
                    defaultValue={
                      studentPaymentData?.cashAmount === null
                        ? '0'
                        : feeFormet(studentPaymentData?.cashAmount)
                    }
                    {...register('cashAmount')}
                  />
                </AreaBox>
                <AreaBox>
                  <Input
                    isReadOnly
                    labelPlacement="outside"
                    placeholder="카드 결제액"
                    variant="faded"
                    radius="md"
                    type="text"
                    label="카드 결제액"
                    defaultValue={
                      studentPaymentData?.cardAmount === null
                        ? '0'
                        : feeFormet(studentPaymentData?.cardAmount)
                    }
                    {...register('cardAmount')}
                  />
                </AreaBox>
                <AreaBox>
                  <Input
                    isReadOnly
                    labelPlacement="outside"
                    placeholder="미수납액"
                    variant="faded"
                    radius="md"
                    type="text"
                    label="미수납액"
                    defaultValue={
                      studentPaymentData?.unCollectedAmount === null
                        ? '0'
                        : studentPaymentData?.unCollectedAmount
                    }
                    {...register('unCollectedAmount')}
                  />
                </AreaBox>
              </FlexBox>
              <FlexBox>
                <AreaBox>
                  <DatePickerBox>
                    <Controller
                      control={control}
                      name="paymentDate"
                      defaultValue={studentPaymentData?.paymentDate}
                      rules={{
                        required: {
                          value: true,
                          message: '결제예정일을 선택해주세요.',
                        },
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
                            paymentDateSelect === null
                              ? null
                              : new Date(paymentDateSelect)
                          }
                          placeholderText="날짜를 선택해주세요."
                          isClearable
                          onChange={date => {
                            field.onChange(date)
                            setPaymentDateSelect(date)
                          }}
                          dateFormat="yyyy/MM/dd"
                          customInput={
                            <Input
                              ref={field.ref}
                              label={
                                <FilterLabel>
                                  결제일자<span>*</span>
                                </FilterLabel>
                              }
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
                    {errors.paymentDate && (
                      <p className="px-2 pt-2 text-xs text-red-500">
                        {String(errors.paymentDate.message)}
                      </p>
                    )}
                  </DatePickerBox>
                </AreaBox>
                <AreaBox>
                  <DatePickerBox>
                    <Controller
                      control={control}
                      name="dueDate"
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
                            dueDateSelect === null
                              ? null
                              : new Date(dueDateSelect)
                          }
                          placeholderText="날짜를 선택해주세요."
                          isClearable
                          onChange={date => {
                            field.onChange(date)
                            setDueDateSelect(date)
                          }}
                          dateFormat="yyyy/MM/dd"
                          customInput={
                            <Input
                              label="수강예정일"
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
                <AreaBox>
                  <Controller
                    control={control}
                    name="processingManagerId"
                    defaultValue={studentPaymentData?.processingManagerId}
                    rules={{
                      required: {
                        value: true,
                        message: '수강담당자를 선택해주세요.',
                      },
                    }}
                    render={({ field, fieldState }) => (
                      <Select
                        labelPlacement="outside"
                        label="수강 담당자"
                        placeholder=" "
                        className="w-full"
                        variant="bordered"
                        defaultValue={studentPaymentData?.processingManagerId}
                        selectedKeys={[subjectManager]}
                        onChange={value => {
                          if (value.target.value !== '') {
                            field.onChange(value)
                            handleSubManagerChange(value)
                          }
                        }}
                      >
                        <SelectItem
                          key={'담당자 지정필요'}
                          value={'담당자 지정필요'}
                        >
                          {'담당자 지정필요'}
                        </SelectItem>
                        {managerList
                          ?.filter(
                            manager => manager.mGrade > 0 && manager.mGrade < 3,
                          )
                          .map(item => (
                            <SelectItem key={item.id} value={item.id}>
                              {item.mUsername}
                            </SelectItem>
                          ))}
                      </Select>
                    )}
                  />
                  {errors.processingManagerId && (
                    <p className="px-2 pt-2 text-xs text-red-500">
                      {String(errors.processingManagerId.message)}
                    </p>
                  )}
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
          </DetailBox>
          <DetailBox>
            <DetailDiv>
              <BtnBox>
                <Button2
                  buttonType="submit"
                  width="100%"
                  height="2.5rem"
                  typeBorder={true}
                  fontColor="#fff"
                  bgColor="#007de9"
                >
                  수정
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
      <SubjectModal
        subjectSelected={subjectSelected}
        setSubjectSelected={setSubjectSelected}
        setSubjectSelectedData={setSubjectSelectedData}
        sbjIsOpen={sbjIsOpen}
        sbjClose={sbjClose}
        setValue={setValue}
        radio={true}
      />
    </>
  )
}
StudentPaymentForm.getLayout = page => <Layout>{page}</Layout>
