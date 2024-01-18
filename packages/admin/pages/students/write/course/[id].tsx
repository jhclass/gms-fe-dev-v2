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
  CREATE_STUDENT_PAYMENT_MUTATION,
  SEARCH_STUDENT_BASIC_MUTATION,
  SEARCH_SUBJECT_BASIC_MUTATION,
} from '@/graphql/mutations'
import PaymentDetail from '@/components/form/PaymentDetail'

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

export default function StudentsWriteCourse() {
  const router = useRouter()
  const { userLogs } = useUserLogsMutation()
  const studentId = typeof router.query.id === 'string' ? router.query.id : null
  const [searchStudentBasic] = useMutation(SEARCH_STUDENT_BASIC_MUTATION)
  const [createStudentPayment] = useMutation(CREATE_STUDENT_PAYMENT_MUTATION)
  const {
    loading: managerLoading,
    error: managerError,
    data: managerData,
  } = useQuery(SEE_MANAGEUSER_QUERY)
  const managerList = managerData?.seeManageUser || []
  const { register, watch, control, setValue, handleSubmit, formState } =
    useForm()
  const { errors } = formState
  const {
    isOpen: sbjIsOpen,
    onOpen: sbjOpen,
    onClose: sbjClose,
  } = useDisclosure()
  const [studentData, setStudentData] = useState(null)
  const [birthdayDate, setBirthdayDate] = useState(null)
  const [subjectSelected, setSubjectSelected] = useState(null)
  const [subjectInfo, setSubjectInfo] = useState()
  const [disCountType, setDisCountType] = useState('%')
  const [discountAmount, setDiscountAmount] = useState(0)
  const [actualAmount, setActualAmount] = useState(0)
  const [manager, setManager] = useState('담당자 지정필요')
  const [paymentDate, setPaymentDate] = useState(null)
  const [dueDate, setDueDate] = useState(null)
  const [subjectManager, setSubjectManager] = useState('담당자 지정필요')

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

  useEffect(() => {
    const tuitionFee = subjectSelected?.fee
    if (subjectSelected !== null) {
      if (disCountType === '%') {
        const disCount = (tuitionFee * (100 - discountAmount)) / 100
        setActualAmount(disCount)
        setValue('actualAmount', disCount)
      } else {
        const disCount = tuitionFee - discountAmount
        setActualAmount(disCount)
        setValue('actualAmount', disCount)
      }
    } else {
      setValue('actualAmount', 0)
    }
  }, [subjectSelected, discountAmount])

  const onSubmit = data => {
    createStudentPayment({
      variables: {
        studentId: parseInt(studentId),
        campus: '신촌',
        seScore: parseInt(data.seScore),
        subject: data.subject.trim(),
        tuitionFee: subjectSelected.fee,
        processingManagerId: parseInt(data.processingManagerId),
        subjectId: subjectSelected.id,
        situationReport:
          data.situationReport === undefined
            ? false
            : data.situationReport === '동의'
            ? true
            : false,
        paymentDate:
          data.paymentDate === undefined ? null : new Date(data.paymentDate),
        // receiptClassification:
        //   data.receiptClassification === undefined
        //     ? null
        //     : data.receiptClassification,
        unCollectedAmount: parseInt(data.unCollectedAmount),
        actualAmount:
          data.actualAmount === '' ? null : parseInt(data.actualAmount),
        cardAmount: data.cardAmount === '' ? null : parseInt(data.cardAmount),
        cashAmount: data.cashAmount === '' ? null : parseInt(data.cashAmount),
        discountAmount:
          data.discountAmount === ''
            ? null
            : data.discountAmount + disCountType,
      },
      onCompleted: data => {
        alert('등록되었습니다.')
      },
    })
    userLogs(`${studentData.name} 수강신청`)
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
    const result = fee
      .toString()
      .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')
    return result
  }

  const handleDisCountChange = e => {
    setDisCountType(e.target.value)
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
              <FlexBox>
                <AreaBox>
                  <div>
                    <FilterLabel>기타번호</FilterLabel>
                    <LineBox>{studentData?.phoneNum2}</LineBox>
                  </div>
                </AreaBox>
                <AreaBox>
                  <div>
                    <FilterLabel>담당자</FilterLabel>
                    <LineBox>{studentData?.writer}</LineBox>
                  </div>
                </AreaBox>
                <AreaBox>
                  <div>
                    <FilterLabel>등록일시</FilterLabel>
                    <LineBox>{fametDate(studentData?.createdAt, true)}</LineBox>
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
                        subjectSelected !== null &&
                        subjectSelected?.subjectCode !== null
                          ? String(subjectSelected?.subjectCode)
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
                            value={field.value?.subjectName || ''}
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
                        render={({ field }) => (
                          <RadioGroup
                            label={<FilterLabel>교육상황보고여부</FilterLabel>}
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
                        subjectSelected !== null ? subjectSelected?.subDiv : ''
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
                        subjectSelected !== null
                          ? feeFormet(subjectSelected?.fee)
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
                      defaultValue={String(discountAmount)}
                      onChange={e => {
                        register('discountAmount').onChange(e)
                        setDiscountAmount(parseInt(e.target.value))
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
                        subjectSelected !== null
                          ? feeFormet(subjectSelected?.fee)
                          : ''
                      }
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
                        name="stVisit"
                        render={({ field }) => (
                          <DatePicker
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
                  </AreaBox>
                </FlexBox>
              </DetailDiv>
            </DetailBox>
          </form>
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
        </ConArea>
      </MainWrap>
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
