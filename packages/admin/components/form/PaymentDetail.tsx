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
  Textarea,
  Button,
  useDisclosure,
} from '@nextui-org/react'
import { useMutation, useQuery } from '@apollo/client'
import { Controller, useForm } from 'react-hook-form'
import { SEE_MANAGEUSER_QUERY } from '@/graphql/queries'
import Button2 from '@/components/common/Button'
import useUserLogsMutation from '@/utils/userLogs'
import Layout from '@/pages/students/layout'
import { useRecoilValue } from 'recoil'
import { ReceiptState } from '@/lib/recoilAtoms'
import SubjectModal from '@/components/modal/SubjectModal'
import {
  CREATE_PAYMENT_DETAIL_MUTATION,
  CREATE_STUDENT_PAYMENT_MUTATION,
  SEARCH_STUDENT_BASIC_MUTATION,
  SEARCH_SUBJECT_BASIC_MUTATION,
  SEARCH_SUBJECT_MUTATION,
  UPDATE_STUDENT_DUEDATE_MUTATION,
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

export default function StudentsWriteCourse({
  studentData,
  managerList,
  subjectData,
  paymentData,
}) {
  const router = useRouter()
  const { userLogs } = useUserLogsMutation()
  const [createStudentPayment] = useMutation(CREATE_STUDENT_PAYMENT_MUTATION)
  const [updateStudentDuedate] = useMutation(UPDATE_STUDENT_DUEDATE_MUTATION)
  const [searchSubject] = useMutation(SEARCH_SUBJECT_MUTATION)
  const { register, setValue, control, handleSubmit, formState } = useForm()
  const { errors } = formState
  const [subjectSelectedId, setSubjectSelectedId] = useState(null)
  const [subjectSelected, setSubjectSelected] = useState(null)
  const [disCountType, setDisCountType] = useState(null)
  const [discount, setDiscount] = useState(null)
  const [paymentDate, setPaymentDate] = useState(null)
  const [dueDate, setDueDate] = useState(null)
  const [actualAmount, setActualAmount] = useState(0)
  const [subjectManager, setSubjectManager] = useState('담당자 지정필요')
  const {
    isOpen: sbjIsOpen,
    onOpen: sbjOpen,
    onClose: sbjClose,
  } = useDisclosure()

  useEffect(() => {
    if (
      paymentData?.processingManagerId === undefined ||
      paymentData?.processingManagerId === null
    ) {
      setSubjectManager('담당자 지정필요')
    } else {
      setSubjectManager(String(paymentData?.processingManagerId))
    }
    if (
      paymentData?.discountAmount === null ||
      paymentData?.discountAmount === undefined
    ) {
      setDisCountType('%')
    } else {
      const discountUnit = extractUnit(paymentData?.discountAmount)
      setDisCountType(discountUnit)
    }
    if (
      paymentData?.paymentDate === null ||
      paymentData?.paymentDate === undefined
    ) {
      setPaymentDate(null)
    } else {
      const date = parseInt(paymentData?.paymentDate)
      setPaymentDate(date)
    }
    if (studentData?.dueDate === null || studentData?.dueDate === undefined) {
      setDueDate(null)
    } else {
      const date = parseInt(studentData?.dueDate)
      setDueDate(date)
    }
  }, [router, paymentData])

  useEffect(() => {
    searchSubject({
      variables: {
        searchSubjectId: parseInt(subjectSelected),
      },
      onCompleted: resData => {
        const { result } = resData.searchSubject || {}
        // setStudentSubjectData(result[0])
        setSubjectSelected(result[0])
      },
    })
  }, [subjectSelected])

  useEffect(() => {
    const tuitionFee = subjectSelected?.fee
    if (subjectSelected !== null) {
      if (disCountType === '%') {
        const disCountP = (tuitionFee * (100 - discount)) / 100
        setActualAmount(disCountP)
      } else {
        const disCountP = tuitionFee - discount
        setActualAmount(disCountP)
      }
    } else {
      setActualAmount(0)
    }
  }, [subjectSelected, discount, disCountType])

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

  const onSubmit = data => {
    console.log(data)
    // createStudentPayment({
    //   variables: {
    //     studentId: parseInt(studentId),
    //     campus: '신촌',
    //     seScore: parseInt(data.seScore),
    //     subject: data.subject.trim(),
    //     tuitionFee: subjectSelected.fee,
    //     processingManagerId: parseInt(data.processingManagerId),
    //     subjectId: subjectSelected.id,
    //     situationReport:
    //       data.situationReport === undefined
    //         ? false
    //         : data.situationReport === '동의'
    //         ? true
    //         : false,
    //     paymentDate: data.paymentDate === undefined ? null : data.paymentDate,
    //     actualAmount:
    //       data.actualAmount === '' ? 0 : parseInt(data.actualAmount),
    //     discountAmount:
    //       data.discountAmount === '' ? null : String(discount) + disCountType,
    //   },
    //   onCompleted: () => {
    //     updateStudentDuedate({
    //       variables: {
    //         editStudentId: parseInt(studentId),
    //         dueDate: data.dueDate === undefined ? null : data.dueDate,
    //       },
    //       onCompleted: () => {
    //         alert('등록되었습니다.')
    //       },
    //     })
    //   },
    // })

    // userLogs(`${studentData.name} 수강신청`)
  }
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
    if (fee !== null && fee !== undefined) {
      const result = fee
        .toString()
        .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')
      return result
    }
  }

  const handleDisCountChange = e => {
    setDisCountType(e.target.value)
  }
  const handleSubManagerChange = e => {
    setSubjectManager(e.target.value)
  }

  // console.log(subjectSelected)

  return (
    <>
      {paymentData !== null && (
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
                      subjectSelected?.subjectCode !== undefined
                        ? String(subjectSelected?.subjectCode)
                        : subjectData?.subjectCode
                    }
                    variant="faded"
                    radius="md"
                    type="text"
                    label="과정코드"
                    className="w-full"
                  />
                </AreaSmallBox>
                <AreaBox>
                  <Controller
                    control={control}
                    name="subject"
                    rules={{
                      required: {
                        value: true,
                        message: '수강 과정을 선택해주세요.',
                      },
                    }}
                    render={({ field }) => (
                      <>
                        <Textarea
                          readOnly
                          value={
                            subjectSelected?.subjectName !== undefined
                              ? String(subjectSelected?.subjectName)
                              : subjectData?.subjectName
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
                          {...register('subject')}
                        />
                      </>
                    )}
                  />
                </AreaBox>
                <AreaSmallBox>
                  <RadioBox>
                    <Controller
                      control={control}
                      name="situationReport"
                      defaultValue={paymentData?.situationReport}
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
                    placeholder="선별테스트 점수"
                    variant="bordered"
                    radius="md"
                    type="number"
                    defaultValue={String(paymentData?.seScore)}
                    endContent={<InputText>/ 100</InputText>}
                    label="선별테스트 점수"
                    className="w-full"
                    {...register('seScore', {
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
                  {errors.phoneNum2 && (
                    <p className="px-2 pt-2 text-xs text-red-500">
                      {String(errors.phoneNum2.message)}
                    </p>
                  )}
                </AreaBox>
                <AreaBox>
                  <Input
                    isReadOnly
                    labelPlacement="outside"
                    placeholder="수강 구분"
                    value={
                      subjectSelected?.subDiv !== undefined
                        ? String(subjectSelected?.subDiv)
                        : subjectData?.subDiv
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
                      subjectSelected?.fee !== undefined
                        ? feeFormet(subjectSelected?.fee)
                        : feeFormet(subjectData?.fee)
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
                    defaultValue={extractNumber(paymentData.discountAmount)}
                    onChange={e => {
                      register('discountAmount').onChange(e)
                      setDiscount(parseInt(e.target.value))
                    }}
                    endContent={
                      <SelectBox
                        onChange={handleDisCountChange}
                        value={disCountType}
                      >
                        <option value="%">%</option>
                        <option value="원">원</option>
                      </SelectBox>
                    }
                  />
                  {discount}
                </AreaBox>
                <AreaBox>
                  <Input
                    labelPlacement="outside"
                    placeholder="할인된 수강료"
                    variant="bordered"
                    radius="md"
                    type="text"
                    label="할인된 수강료"
                    defaultValue={
                      actualAmount !== null
                        ? feeFormet(actualAmount)
                        : feeFormet(paymentData?.actualAmount)
                    }
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
                      paymentData?.amountReceived === null
                        ? '0'
                        : feeFormet(paymentData?.amountReceived)
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
                      paymentData?.cashAmount === null
                        ? '0'
                        : feeFormet(paymentData?.cashAmount)
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
                      paymentData?.cardAmount === null
                        ? '0'
                        : feeFormet(paymentData?.cardAmount)
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
                      paymentData?.unCollectedAmount === null
                        ? '0'
                        : feeFormet(paymentData?.unCollectedAmount)
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
                      rules={{
                        required: {
                          value: true,
                          message: '결제예정일을 선택해주세요.',
                        },
                      }}
                      render={({ field }) => (
                        <DatePicker
                          locale="ko"
                          showYearDropdown
                          selected={
                            paymentDate === null ? null : new Date(paymentDate)
                          }
                          placeholderText="날짜를 선택해주세요."
                          isClearable
                          onChange={date => {
                            field.onChange(date)
                            setPaymentDate(date)
                          }}
                          ref={field.ref}
                          dateFormat="yyyy/MM/dd"
                          customInput={
                            <Input
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
                  </DatePickerBox>
                </AreaBox>
                <AreaBox>
                  <DatePickerBox>
                    <Controller
                      control={control}
                      name="dueDate"
                      render={({ field }) => (
                        <DatePicker
                          locale="ko"
                          showYearDropdown
                          selected={dueDate === null ? null : new Date(dueDate)}
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
                    render={({ field, fieldState }) => (
                      <Select
                        labelPlacement="outside"
                        label="수강 담당자"
                        placeholder=" "
                        className="w-full"
                        variant="bordered"
                        selectedKeys={[subjectManager]}
                        onChange={value => {
                          field.onChange(value)
                          handleSubManagerChange(value)
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
      )}

      <SubjectModal
        subjectSelected={subjectSelected}
        setSubjectSelected={setSubjectSelected}
        sbjIsOpen={sbjIsOpen}
        sbjClose={sbjClose}
        setValue={setValue}
        radio={true}
      />
    </>
  )
}
StudentsWriteCourse.getLayout = page => <Layout>{page}</Layout>
