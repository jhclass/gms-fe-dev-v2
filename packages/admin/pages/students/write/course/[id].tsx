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
import {
  Input,
  Radio,
  RadioGroup,
  Select,
  SelectItem,
  Textarea,
  useDisclosure,
} from '@nextui-org/react'
import { useMutation, useQuery } from '@apollo/client'
import { Controller, useForm } from 'react-hook-form'
import { SEE_MANAGEUSER_QUERY } from '@/graphql/queries'
import Button2 from '@/components/common/Button'
import useUserLogsMutation from '@/utils/userLogs'
import Layout from '@/pages/students/layout'
import { useRecoilValue } from 'recoil'
import { ReceiptState, subStatusState } from '@/lib/recoilAtoms'
import SubjectModal from '@/components/modal/SubjectModal'
import {
  CREATE_STUDENT_PAYMENT_MUTATION,
  SEARCH_STUDENT_BASIC_MUTATION,
  UPDATE_STUDENT_DUEDATE_MUTATION,
} from '@/graphql/mutations'
import DatePickerHeader from '@/components/common/DatePickerHeader'

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
  const [searchStudentBasic] = useMutation(SEARCH_STUDENT_BASIC_MUTATION)
  const [createStudentPayment] = useMutation(CREATE_STUDENT_PAYMENT_MUTATION)
  const [updateStudentDuedate] = useMutation(UPDATE_STUDENT_DUEDATE_MUTATION)
  const {
    loading: managerLoading,
    error: managerError,
    data: managerData,
  } = useQuery(SEE_MANAGEUSER_QUERY)
  const managerList = managerData?.seeManageUser || []
  const Receipt = useRecoilValue(ReceiptState)
  const {
    register,
    getValues,
    control,
    setError,
    setValue,
    handleSubmit,
    clearErrors,
    formState,
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      editStudentPaymentId: studentId,
      seScore: null,
      subject: null,
      tuitionFee: null,
      actualAmount: null,
      unCollectedAmount: null,
      paymentDate: null,
      processingManagerId: null,
      situationReport: null,
      subjectId: null,
      amountReceived: null,
      cashAmount: null,
      cardAmount: null,
      discountAmount: null,
      dueDate: null,
      discount: 0,
      discountUnit: '%',
      subDiv: null,
    },
  })
  const { errors } = formState
  const {
    isOpen: sbjIsOpen,
    onOpen: sbjOpen,
    onClose: sbjClose,
  } = useDisclosure()
  const subStatus = useRecoilValue(subStatusState)
  const [studentData, setStudentData] = useState(null)
  const [subjectSelectedData, setSubjectSelectedData] = useState(null)
  const [subjectSelected, setSubjectSelected] = useState(null)
  const [disCountType, setDisCountType] = useState('%')
  const [paymentDate, setPaymentDate] = useState(null)
  const [dueDate, setDueDate] = useState(null)
  const [sub, setSub] = useState('없음')
  const [subjectManager, setSubjectManager] = useState('담당자 지정필요')
  const [receiptSelected, setReceiptSelected] = useState([])
  const years = _.range(2000, getYear(new Date()) + 5, 1)

  useEffect(() => {
    searchStudentBasic({
      variables: {
        searchStudentId: parseInt(studentId),
      },
      onCompleted: data => {
        setStudentData(data.searchStudent.student[0])
      },
    })
  }, [router])

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
    if (price < 0) {
      setError('actualAmount', {
        type: 'custom',
        message: '할인 금액이 너무 큽니다.',
      })
      setValue('actualAmount', price, { shouldDirty: true })
      setValue('unCollectedAmount', price, { shouldDirty: true })
    } else {
      setValue('actualAmount', price, { shouldDirty: true })
      setValue('unCollectedAmount', price, { shouldDirty: true })
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
    if (data.actualAmount > 0) {
      createStudentPayment({
        variables: {
          campus: '신촌',
          seScore: parseInt(data.seScore),
          subject: data.subject.trim(),
          tuitionFee: parseInt(subjectSelectedData.fee),
          studentId: parseInt(studentId),
          subjectId: parseInt(subjectSelected),
          processingManagerId: parseInt(data.processingManagerId),
          paymentDate: data.paymentDate,
          amountReceived: 0,
          situationReport: data.situationReport === '동의' ? true : false,
          actualAmount:
            data.actualAmount === '' ? 0 : parseInt(data.actualAmount),
          discountAmount:
            data.discount === 0 ? null : data.discount + disCountType,
          unCollectedAmount:
            data.actualAmount === '' ? 0 : parseInt(data.actualAmount),
          subDiv: data.subDiv,
        },
        onCompleted: () => {
          updateStudentDuedate({
            variables: {
              editStudentId: parseInt(studentId),
              dueDate: data.dueDate === undefined ? null : data.dueDate,
            },
            onCompleted: () => {
              alert('등록되었습니다.')
              router.push(`/students/detail/${studentId}`)
            },
          })
        },
      })
      userLogs(`${studentData.name} 수강신청`)
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

  const handleDisCountChange = e => {
    setDisCountType(e.target.value)
    if (subjectSelectedData !== null) {
      disCounCalculator(subjectSelectedData?.fee)
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
    }
  }

  const discountTotal = value => {
    if (subjectSelectedData !== null) {
      const discountPrice = subjectSelectedData?.fee - parseInt(value)
      setValue('discount', discountPrice)
      setDisCountType('원')
      setValue('discountUnit', '원')
      disCounCalculator(subjectSelectedData?.fee)
    }
  }
  const handleSubChange = e => {
    setSub(e.target.value)
    setValue('subDiv', e.target.value)
  }
  const handleSubManagerChange = e => {
    setSubjectManager(e.target.value)
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
                        subjectSelectedData !== null &&
                        subjectSelectedData?.subjectCode !== null
                          ? String(subjectSelectedData?.subjectCode)
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
                      value={subjectSelectedData?.subjectName || ''}
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
                          message: '과정을 선택해 주세요.',
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
                        defaultValue={'비동의'}
                        render={({ field }) => (
                          <RadioGroup
                            label={<FilterLabel>교육상황보고여부</FilterLabel>}
                            defaultValue={'비동의'}
                            orientation="horizontal"
                            className="gap-[0.65rem]"
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
                      placeholder="선발 평가 점수"
                      variant="bordered"
                      radius="md"
                      type="number"
                      endContent={<InputText>/ 100</InputText>}
                      label={
                        <FilterLabel>
                          선발 평가 점수
                          {sub === '국가기간' && <span>*</span>}
                        </FilterLabel>
                      }
                      className="w-full"
                      {...register('seScore', {
                        required: {
                          value: sub === '국가기간' ? true : false,
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
                      render={({ field, fieldState }) => (
                        <Select
                          selectionMode="single"
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
                        subjectSelectedData !== null &&
                        subjectSelectedData?.fee !== null
                          ? feeFormet(subjectSelectedData?.fee)
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
                      isDisabled={subjectSelectedData === null ? true : false}
                      labelPlacement="outside"
                      placeholder="할인"
                      variant="bordered"
                      radius="md"
                      type="number"
                      label="할인"
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
                              labelPlacement="outside"
                              label={<span style={{ display: 'none' }}></span>}
                              placeholder=" "
                              variant={'underlined'}
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
                      isDisabled={subjectSelectedData === null ? true : false}
                      labelPlacement="outside"
                      placeholder="할인된 수강료"
                      variant="bordered"
                      radius="md"
                      type="number"
                      label="할인된 수강료"
                      defaultValue={
                        subjectSelectedData?.fee !== undefined
                          ? subjectSelectedData?.fee
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
                              paymentDate === null
                                ? null
                                : new Date(paymentDate)
                            }
                            placeholderText="날짜를 선택해주세요."
                            isClearable
                            onChange={date => {
                              field.onChange(date)
                              setPaymentDate(date)
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
                              dueDate === null ? null : new Date(dueDate)
                            }
                            placeholderText="날짜를 선택해주세요."
                            isClearable
                            onChange={date => {
                              field.onChange(date)
                              setDueDate(date)
                            }}
                            ref={field.ref}
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
                      rules={{
                        required: {
                          value: true,
                          message: '수강담당자를 선택해주세요.',
                        },
                      }}
                      render={({ field, fieldState }) => (
                        <Select
                          labelPlacement="outside"
                          label={
                            <FilterLabel>
                              수강 담당자<span>*</span>
                            </FilterLabel>
                          }
                          placeholder=" "
                          className="w-full"
                          variant="bordered"
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
                              manager =>
                                manager.mGrade > 0 && manager.mGrade < 3,
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
                    등록
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
