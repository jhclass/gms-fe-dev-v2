import { Suspense, useEffect, useState } from 'react'
import { styled } from 'styled-components'
import { useRouter } from 'next/router'
import DatePicker, { registerLocale } from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import ko from 'date-fns/locale/ko'
import { getYear } from 'date-fns'
registerLocale('ko', ko)
const _ = require('lodash')
import {
  Input,
  Radio,
  RadioGroup,
  Select,
  SelectItem,
  Textarea,
  useDisclosure,
} from '@nextui-org/react'
import { useMutation } from '@apollo/client'
import { Controller, useForm } from 'react-hook-form'
import Button2 from '@/components/common/Button'
import useUserLogsMutation from '@/utils/userLogs'
import Layout from '@/pages/students/layout'
import SubjectModal from '@/components/modal/SubjectModal'
import {
  SEARCH_SUBJECT_MUTATION,
  UPDATE_STUDENT_PAYMENT_MUTATION,
} from '@/graphql/mutations'
import DatePickerHeader from '@/components/common/DatePickerHeader'
import { useRecoilValue } from 'recoil'
import { gradeState } from '@/lib/recoilAtoms'
import ManagerSelectID from '@/components/common/ManagerSelectID'

const ConArea = styled.div`
  width: 100%;
  max-width: 1400px;
`
const LodingDiv = styled.div`
  padding: 1.5rem;
  width: 100%;
  min-width: 20rem;
  position: relative;
  background: #fff;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
`
const AreaSmallBox = styled.div``
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
  .react-datepicker__triangle {
    left: 1.5rem !important;
    transform: translate(0, 0) !important;
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

export default function StudentsWriteCourse({
  studentData,
  managerList,
  studentSubjectData,
  studentPaymentData,
}) {
  const grade = useRecoilValue(gradeState)
  const router = useRouter()
  const { userLogs } = useUserLogsMutation()
  const [updateStudentPayment] = useMutation(UPDATE_STUDENT_PAYMENT_MUTATION)
  const [searchSubject] = useMutation(SEARCH_SUBJECT_MUTATION)
  const {
    register,
    setValue,
    getValues,
    control,
    handleSubmit,
    getFieldState,
    formState: { isDirty, dirtyFields, errors, isValid },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      editStudentPaymentId: studentPaymentData?.id,
      seScore: studentPaymentData?.seScore,
      subject: studentSubjectData?.subjectName,
      tuitionFee: studentSubjectData?.fee,
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
      discount: studentPaymentData?.discountAmount,
      discountUnit: '%',
    },
  })
  const [subjectSelectedData, setSubjectSelectedData] = useState(null)
  const [subjectSelected, setSubjectSelected] = useState(null)
  const [disCountType, setDisCountType] = useState('%')
  const [paymentDateSelect, setPaymentDateSelect] = useState(null)
  const [dueDateSelect, setDueDateSelect] = useState(null)
  const [subjectManager, setSubjectManager] = useState('담당자 지정필요')
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
  }, [router, studentPaymentData])
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
    setValue('actualAmount', price, { shouldDirty: true })
    setValue('unCollectedAmount', total, { shouldDirty: true })
  }

  useEffect(() => {
    if (subjectSelectedData !== null) {
      disCounCalculator(subjectSelectedData?.fee)
    }
  }, [subjectSelectedData])

  const onSubmit = data => {
    if (isDirty) {
      const isModify = confirm('변경사항이 있습니다. 수정하시겠습니까?')
      if (isModify) {
        updateStudentPayment({
          variables: {
            editStudentPaymentId: parseInt(studentPaymentData.id),
            studentId: parseInt(studentData.id),
            subjectId: parseInt(subjectSelected),
            campus: '신촌',
            seScore: parseInt(data.seScore),
            subject:
              subjectSelectedData === null
                ? data.subject.trim()
                : subjectSelectedData.subjectName.trim(),
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
            actualAmount:
              typeof data.actualAmount === 'string'
                ? parseInt(data.actualAmount.replace(/,/g, ''), 10)
                : data.actualAmount,
            discountAmount:
              data.discount === null
                ? studentPaymentData?.discountAmount
                : String(data.discount) + disCountType,
            unCollectedAmount:
              typeof data.unCollectedAmount === 'string'
                ? parseInt(data.unCollectedAmount.replace(/,/g, ''), 10)
                : data.unCollectedAmount,
          },
        })
        const dirtyFieldsArray = [...Object.keys(dirtyFields)]
        userLogs(
          `${studentData.name} 수강신청 수정`,
          dirtyFieldsArray.join(', '),
        )
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
    if (value === '') {
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
    } else {
      const discountPrice = studentSubjectData?.fee - parseInt(value)
      setValue('discount', discountPrice)
      setDisCountType('원')
      setValue('discountUnit', '원')
    }
  }

  const handleSubManagerChange = e => {
    setSubjectManager(e.target.value)
  }

  return (
    <>
      {studentPaymentData !== null && (
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
                    variant="bordered"
                    minRows={1}
                    onClick={sbjOpen}
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
                  <Input
                    isReadOnly
                    labelPlacement="outside"
                    placeholder="수강 구분"
                    value={
                      subjectSelectedData?.subDiv !== undefined
                        ? String(subjectSelectedData?.subDiv)
                        : studentSubjectData?.subDiv !== null
                        ? studentSubjectData?.subDiv
                        : ''
                    }
                    variant="faded"
                    radius="md"
                    type="text"
                    label="수강 구분"
                    className="w-full"
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
                        : studentSubjectData?.fee !== null
                        ? feeFormet(studentSubjectData?.fee)
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
                    labelPlacement="outside"
                    placeholder="할인"
                    variant="bordered"
                    radius="md"
                    type="text"
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
                    // onChange={e => {
                    //   register('discount').onChange(e)
                    // }}
                    endContent={
                      <Controller
                        control={control}
                        name="discountUnit"
                        defaultValue={studentPaymentData?.processingManagerId}
                        render={({ field, fieldState }) => (
                          <Select
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
                    labelPlacement="outside"
                    placeholder="할인된 수강료"
                    variant="bordered"
                    radius="md"
                    type="text"
                    label={
                      <FilterLabel>
                        할인된 수강료 <span>(실 결제금액)</span>
                      </FilterLabel>
                    }
                    defaultValue={
                      studentPaymentData?.actualAmount !== undefined
                        ? studentPaymentData?.actualAmount
                        : ''
                    }
                    onValueChange={value => discountTotal(value)}
                    onChange={e => {
                      register('actualAmount').onChange(e)
                    }}
                    {...register('actualAmount')}
                  />
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
                        : feeFormet(studentPaymentData?.unCollectedAmount)
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
                          onChangeRaw={e => e.preventDefault()}
                          onFocus={e => e.target.blur()}
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
                              classNames={{
                                input: 'caret-transparent',
                              }}
                              isReadOnly={true}
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
                          onChangeRaw={e => e.preventDefault()}
                          onFocus={e => e.target.blur()}
                          customInput={
                            <Input
                              label="수강예정일"
                              labelPlacement="outside"
                              type="text"
                              variant="bordered"
                              id="date"
                              classNames={{
                                input: 'caret-transparent',
                              }}
                              isReadOnly={true}
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
                      <Suspense
                        fallback={
                          <LodingDiv>
                            <i className="xi-spinner-2" />
                          </LodingDiv>
                        }
                      >
                        <ManagerSelectID
                          selecedKey={subjectManager}
                          field={field}
                          label={'수강 담당자'}
                          defaultValue={studentPaymentData?.processingManagerId}
                          handleChange={handleSubManagerChange}
                          optionDefualt={{
                            mUserId: '담당자 지정필요',
                            mUsername: '담당자 지정필요',
                          }}
                          filter={{
                            mPart: '영업팀',
                          }}
                        />
                      </Suspense>

                      // <Select
                      //   labelPlacement="outside"
                      //   label="수강 담당자"
                      //   placeholder=" "
                      //   className="w-full"
                      //   variant="bordered"
                      //   defaultValue={studentPaymentData?.processingManagerId}
                      //   selectedKeys={[subjectManager]}
                      //   onChange={value => {
                      //     if (value.target.value !== '') {
                      //       field.onChange(value)
                      //       handleSubManagerChange(value)
                      //     }
                      //   }}
                      // >
                      //   <SelectItem
                      //     key={'담당자 지정필요'}
                      //     value={'담당자 지정필요'}
                      //   >
                      //     {'담당자 지정필요'}
                      //   </SelectItem>
                      //   {managerList
                      //     ?.filter(
                      //       manager =>
                      //         manager.mGrade > grade.master ||
                      //         manager.mPart.includes('영업팀'),
                      //     )
                      //     .map(item => (
                      //       <SelectItem key={item.id} value={item.id}>
                      //         {item.mUsername}
                      //       </SelectItem>
                      //     ))}
                      // </Select>
                    )}
                  />
                  {errors.processingManagerId && (
                    <p className="px-2 pt-2 text-xs text-red-500">
                      {String(errors.processingManagerId.message)}
                    </p>
                  )}
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
                  이전으로
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
StudentsWriteCourse.getLayout = page => <Layout>{page}</Layout>
