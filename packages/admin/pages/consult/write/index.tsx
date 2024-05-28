import MainWrap from '@/components/wrappers/MainWrap'
import { Suspense, useState } from 'react'
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
import {
  progressStatusState,
  subStatusState,
  receiptStatusState,
  gradeState,
} from '@/lib/recoilAtoms'
import { useRecoilValue } from 'recoil'
import { useMutation } from '@apollo/client'
import { CREATE_STUDENT_STATE_MUTATION } from '@/graphql/mutations'
import { Controller, useForm } from 'react-hook-form'
import { SEE_STUDENT_STATE_QUERY } from '@/graphql/queries'
import Button2 from '@/components/common/Button'
import useUserLogsMutation from '@/utils/userLogs'
import AdviceTypeModal from '@/components/modal/AdviceTypeModal'
import SubjectModal from '@/components/modal/SubjectModal'
import DatePickerHeader from '@/components/common/DatePickerHeader'
import Layout from '@/pages/consult/layout'
import ManagerSelect from '@/components/common/ManagerSelect'

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
const Noti = styled.p`
  span {
    color: red;
  }
`
const DetailForm = styled.form`
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
const AreaBox = styled.div`
  flex: 1;
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
  .react-datepicker__triangle {
    left: 1.5rem !important;
    transform: translate(0, 0) !important;
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
  padding-bottom: 0.1rem;
  display: block;

  span {
    color: red;
  }
`
const BtnBox = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: center;
`

export default function ConsultWirte() {
  const router = useRouter()
  const grade = useRecoilValue(gradeState)
  const [createStudent] = useMutation(CREATE_STUDENT_STATE_MUTATION)
  const { userLogs } = useUserLogsMutation()
  const progressStatus = useRecoilValue(progressStatusState)
  const receiptStatus = useRecoilValue(receiptStatusState)
  const subStatus = useRecoilValue(subStatusState)
  const { register, control, setValue, handleSubmit, formState } = useForm()
  const { errors } = formState
  const { isOpen, onOpen, onClose } = useDisclosure()
  const {
    isOpen: sbjIsOpen,
    onOpen: sbjOpen,
    onClose: sbjClose,
  } = useDisclosure()
  const [subjectSelected, setSubjectSelected] = useState<string[]>([])
  const [adviceTypeSelected, setAdviceTypeSelected] = useState([])
  const [adviceTypeSelectedName, setAdviceTypeSelectedName] = useState([])
  const [stVisitDate, setStVisitDate] = useState(null)
  const [expEnrollDate, setExpEnrollDate] = useState(null)
  const [receipt, setReceipt] = useState('없음')
  const [sub, setSub] = useState('없음')
  const [manager, setManager] = useState('담당자 지정필요')
  const years = _.range(2000, getYear(new Date()) + 5, 1)

  const onSubmit = data => {
    createStudent({
      variables: {
        stName: data.stName.trim(),
        agreement: '동의',
        adviceTypes: data.adviceTypes === '' ? [] : adviceTypeSelected,
        subject: data.subject === '' ? [] : subjectSelected,
        campus: '신촌',
        detail: data.detail === '' ? null : data.detail.trim(),
        category: null,
        phoneNum1: data.phoneNum1.trim(),
        phoneNum2: data.phoneNum2 === '' ? null : data.phoneNum2.trim(),
        phoneNum3: data.phoneNum3 === '' ? null : data.phoneNum3.trim(),
        stEmail: data.stEmail === '' ? null : data.stEmail.trim(),
        stAddr: null,
        subDiv: data.subDiv === undefined ? null : data.subDiv,
        stVisit: data.stVisit === undefined ? null : new Date(data.stVisit),
        expEnrollDate:
          data.expEnrollDate === undefined
            ? null
            : new Date(data.expEnrollDate),
        perchase: null,
        birthday: null,
        progress: data.progress === undefined ? 0 : data.progress,
        receiptDiv: data.receiptDiv === undefined ? '' : data.receiptDiv,
        pic: data.pic === undefined ? '담당자 지정필요' : data.pic,
      },
      refetchQueries: [
        {
          query: SEE_STUDENT_STATE_QUERY,
          variables: { page: 1, limit: 10 },
        },
      ],
      onCompleted: result => {
        if (result.createStudentState.ok) {
          userLogs(`${data.stName}의 상담 등록`)
          alert('등록되었습니다.')
          router.back()
        }
      },
    })
  }

  const handleReceiptChange = e => {
    setReceipt(e.target.value)
  }
  const handleSubChange = e => {
    setSub(e.target.value)
  }
  const handleManagerChange = e => {
    setManager(e.target.value)
  }

  return (
    <>
      <MainWrap>
        <ConArea>
          <Breadcrumb isFilter={false} isWrite={false} rightArea={false} />
          <DetailBox>
            <TopInfo>
              <Noti>
                <span>*</span> 는 필수입력입니다.
              </Noti>
            </TopInfo>
            <DetailForm onSubmit={handleSubmit(onSubmit)}>
              <FlexBox>
                <AreaBox>
                  <Input
                    labelPlacement="outside"
                    placeholder="이름"
                    variant="bordered"
                    radius="md"
                    type="text"
                    label={
                      <FilterLabel>
                        이름<span>*</span>
                      </FilterLabel>
                    }
                    onChange={e => {
                      register('stName').onChange(e)
                    }}
                    className="w-full"
                    {...register('stName', {
                      required: {
                        value: true,
                        message: '이름을 입력해주세요.',
                      },
                      pattern: {
                        value: /^[가-힣a-zA-Z0-9\s]*$/,
                        message: '한글, 영어, 숫자만 사용 가능합니다.',
                      },
                    })}
                  />
                  {errors.stName && (
                    <p className="px-2 pt-2 text-xs text-red-500">
                      {String(errors.stName.message)}
                    </p>
                  )}
                </AreaBox>
                <AreaBox>
                  <Input
                    labelPlacement="outside"
                    placeholder="이메일"
                    variant="bordered"
                    radius="md"
                    type="text"
                    label="이메일"
                    onChange={e => {
                      register('stEmail').onChange(e)
                    }}
                    className="w-full"
                    {...register('stEmail', {
                      pattern: {
                        value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                        message: '유효하지 않은 이메일 형식입니다.',
                      },
                    })}
                  />
                  {errors.stEmail && (
                    <p className="px-2 pt-2 text-xs text-red-500">
                      {String(errors.stEmail.message)}
                    </p>
                  )}
                </AreaBox>
              </FlexBox>
              <FlexBox>
                <AreaBox>
                  <Input
                    labelPlacement="outside"
                    placeholder="'-'없이 작성해주세요"
                    variant="bordered"
                    radius="md"
                    type="text"
                    label={
                      <FilterLabel>
                        휴대폰번호<span>*</span>
                      </FilterLabel>
                    }
                    onChange={e => {
                      register('phoneNum1').onChange(e)
                    }}
                    className="w-full"
                    maxLength={11}
                    {...register('phoneNum1', {
                      required: {
                        value: true,
                        message: '휴대폰번호를 입력해주세요.',
                      },
                      maxLength: {
                        value: 11,
                        message: '최대 11자리까지 입력 가능합니다.',
                      },
                      minLength: {
                        value: 10,
                        message: '최소 10자리 이상이어야 합니다.',
                      },
                      pattern: {
                        value: /^010[0-9]{7,8}$/,
                        message: '010으로 시작해주세요.',
                      },
                    })}
                  />
                  {errors.phoneNum1 && (
                    <p className="px-2 pt-2 text-xs text-red-500">
                      {String(errors.phoneNum1.message)}
                    </p>
                  )}
                </AreaBox>
                <AreaBox>
                  <Input
                    labelPlacement="outside"
                    placeholder="'-'없이 작성해주세요"
                    variant="bordered"
                    radius="md"
                    type="text"
                    label="기타번호1"
                    onChange={e => {
                      register('phoneNum2').onChange(e)
                    }}
                    className="w-full"
                    maxLength={12}
                    {...register('phoneNum2', {
                      pattern: {
                        value: /^[0-9]+$/,
                        message: '숫자만 입력 가능합니다.',
                      },
                      maxLength: {
                        value: 12,
                        message: '최대 12자리까지 입력 가능합니다.',
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
                    labelPlacement="outside"
                    placeholder="'-'없이 작성해주세요"
                    variant="bordered"
                    radius="md"
                    type="text"
                    label="기타번호2"
                    onChange={e => {
                      register('phoneNum3').onChange(e)
                    }}
                    className="w-full"
                    maxLength={12}
                    {...register('phoneNum3', {
                      pattern: {
                        value: /^[0-9]+$/,
                        message: '숫자만 입력 가능합니다.',
                      },
                      maxLength: {
                        value: 12,
                        message: '최대 12자리까지 입력 가능합니다.',
                      },
                    })}
                  />
                  {errors.phoneNum3 && (
                    <p className="px-2 pt-2 text-xs text-red-500">
                      {String(errors.phoneNum3.message)}
                    </p>
                  )}
                </AreaBox>
              </FlexBox>
              <AreaBox>
                <Controller
                  control={control}
                  name="adviceTypes"
                  rules={{
                    required: {
                      value: true,
                      message: '상담 분야를 최소 1개 이상 선택해주세요.',
                    },
                  }}
                  render={({ field }) => (
                    <>
                      <Textarea
                        readOnly
                        value={String(adviceTypeSelectedName)}
                        label={
                          <FilterLabel>
                            상담 분야<span>*</span>
                          </FilterLabel>
                        }
                        labelPlacement="outside"
                        className="max-w-full"
                        variant="bordered"
                        minRows={1}
                        onClick={onOpen}
                        {...register('adviceTypes')}
                      />
                      <Suspense
                        fallback={
                          <LodingDiv>
                            <i className="xi-spinner-2" />
                          </LodingDiv>
                        }
                      >
                        <AdviceTypeModal
                          adviceTypeSelected={adviceTypeSelected}
                          setAdviceTypeSelected={setAdviceTypeSelected}
                          setAdviceTypeSelectedName={setAdviceTypeSelectedName}
                          isOpen={isOpen}
                          onClose={onClose}
                          setValue={setValue}
                        />
                      </Suspense>
                    </>
                  )}
                />
                {errors.adviceTypes && (
                  <p className="px-2 pt-2 text-xs text-red-500">
                    {String(errors.adviceTypes.message)}
                  </p>
                )}
              </AreaBox>
              <AreaBox>
                <Textarea
                  readOnly
                  label="상담 과정 선택"
                  labelPlacement="outside"
                  className="max-w-full"
                  variant="bordered"
                  minRows={1}
                  onClick={sbjOpen}
                  {...register('subject')}
                />
              </AreaBox>
              <FlexBox>
                <Controller
                  control={control}
                  name="receiptDiv"
                  render={({ field }) => (
                    <Select
                      labelPlacement="outside"
                      label={<FilterLabel>접수구분</FilterLabel>}
                      placeholder=" "
                      className="w-full"
                      variant="bordered"
                      selectedKeys={[receipt]}
                      onChange={value => {
                        if (value.target.value !== '') {
                          field.onChange(value)
                          handleReceiptChange(value)
                        }
                      }}
                    >
                      {Object.entries(receiptStatus).map(([key, item]) => (
                        <SelectItem key={item} value={item}>
                          {item}
                        </SelectItem>
                      ))}
                    </Select>
                  )}
                />
                <Controller
                  control={control}
                  name="subDiv"
                  render={({ field, fieldState }) => (
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
              </FlexBox>
              <FlexBox>
                <Controller
                  control={control}
                  name="pic"
                  render={({ field, fieldState }) => (
                    <Suspense
                      fallback={
                        <LodingDiv>
                          <i className="xi-spinner-2" />
                        </LodingDiv>
                      }
                    >
                      <ManagerSelect
                        selecedKey={manager}
                        field={field}
                        label={'담당자'}
                        handleChange={handleManagerChange}
                        optionDefualt={{
                          mUsername: '담당자 지정필요',
                          mUserId: '담당자 지정필요',
                        }}
                        filter={{
                          // mGrade: grade.master,
                          mPart: '영업팀',
                        }}
                      />
                    </Suspense>
                  )}
                />
                <Input
                  isReadOnly
                  labelPlacement="outside"
                  placeholder="등록일시"
                  variant="faded"
                  radius="md"
                  type="text"
                  label="등록일시"
                  startContent={<i className="xi-calendar" />}
                  className="w-full"
                />
              </FlexBox>
              <RadioBox>
                <Controller
                  control={control}
                  name="progress"
                  render={({ field }) => (
                    <RadioGroup
                      label={<FilterLabel>진행상태</FilterLabel>}
                      orientation="horizontal"
                      className="gap-1"
                      onValueChange={value => {
                        field.onChange(parseInt(value))
                      }}
                    >
                      {Object.entries(progressStatus)
                        .filter(([key]) => key !== '999')
                        .map(([key, value]) => (
                          <Radio key={key} value={key}>
                            {value.name}
                          </Radio>
                        ))}
                    </RadioGroup>
                  )}
                />
              </RadioBox>
              <FlexBox>
                <DatePickerBox>
                  <Controller
                    control={control}
                    name="stVisit"
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
                          stVisitDate === null ? null : new Date(stVisitDate)
                        }
                        placeholderText="날짜를 선택해주세요."
                        isClearable
                        onChange={date => {
                          field.onChange(date)
                          setStVisitDate(date)
                        }}
                        showTimeSelect
                        dateFormat="yyyy/MM/dd HH:mm"
                        onChangeRaw={e => e.preventDefault()}
                        onFocus={e => e.target.blur()}
                        customInput={
                          <Input
                            label="상담예정일"
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
                <DatePickerBox>
                  <Controller
                    control={control}
                    name="expEnrollDate"
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
                          expEnrollDate === null
                            ? null
                            : new Date(expEnrollDate)
                        }
                        placeholderText="날짜를 선택해주세요."
                        isClearable
                        onChange={date => {
                          field.onChange(date)
                          setExpEnrollDate(date)
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
              </FlexBox>
              <FlexBox>
                <Textarea
                  label="상담 내용"
                  labelPlacement="outside"
                  className="max-w-full"
                  variant="bordered"
                  minRows={5}
                  onChange={e => {
                    register('detail').onChange(e)
                  }}
                  {...register('detail')}
                />
              </FlexBox>
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
                  이전으로
                </Button2>
              </BtnBox>
            </DetailForm>
          </DetailBox>
        </ConArea>
      </MainWrap>
      <SubjectModal
        subjectSelected={subjectSelected}
        setSubjectSelected={setSubjectSelected}
        sbjIsOpen={sbjIsOpen}
        sbjClose={sbjClose}
        setValue={setValue}
      />
    </>
  )
}
ConsultWirte.getLayout = page => <Layout>{page}</Layout>
