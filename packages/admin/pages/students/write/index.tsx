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
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Radio,
  RadioGroup,
  Select,
  SelectItem,
  Textarea,
  Button,
  useDisclosure,
  Pagination,
  ScrollShadow,
} from '@nextui-org/react'
import { useQuery } from '@apollo/client'
import { Controller, useForm } from 'react-hook-form'
import { SEE_MANAGEUSER_QUERY } from '@/graphql/queries'
import Button2 from '@/components/common/Button'
import useUserLogsMutation from '@/utils/userLogs'
import Layout from '../layout'
import { useRecoilValue } from 'recoil'
import { ReceiptState } from '@/lib/recoilAtoms'
import SubjectModal from '@/components/modal/SubjectModal'

const ConArea = styled.div`
  width: 100%;
  max-width: 1400px;
`
const DetailForm = styled.form`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`
const TopInfo = styled.div`
  display: flex;
  justify-content: space-between;
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
const DetailBox = styled.div`
  display: flex;
  flex-direction: column;
  background: #fff;
  border-radius: 0.5rem;
  padding: 1.5rem;
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
`
const AreaSmallBox = styled.div``
const DatePickerBox = styled.div`
  width: 100%;
  .react-datepicker-wrapper {
    width: 100%;
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
const InputText = styled.span`
  display: inline-block;
  font-size: 0.75rem;
  width: 2rem;
`
const BtnBox = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: center;
`

export default function StudentsWrite() {
  const router = useRouter()
  const { userLogs } = useUserLogsMutation()
  const {
    loading: managerLoading,
    error: managerError,
    data: managerData,
  } = useQuery(SEE_MANAGEUSER_QUERY)
  const Receipt = useRecoilValue(ReceiptState)
  const managerList = managerData?.seeManageUser || []
  const { register, control, setValue, handleSubmit, formState } = useForm()
  const { errors } = formState
  const {
    isOpen: sbjIsOpen,
    onOpen: sbjOpen,
    onClose: sbjClose,
  } = useDisclosure()
  const [subjectSelected, setSubjectSelected] = useState(null)
  const [subjectSubDiv, setSubjectSubDiv] = useState('')
  const [birthdayDate, setBirthdayDate] = useState(null)
  const [sub, setSub] = useState('없음')
  const [manager, setManager] = useState('담당자 지정필요')

  useEffect(() => {}, [router])
  useEffect(() => {
    setValue('testSubDiv', subjectSelected?.subDiv)
  }, [subjectSelected])

  const onSubmit = data => {
    console.log(data)
    // createStudent({
    //   variables: {
    //     stName: data.stName.trim(),
    //     agreement: '동의',
    //     subject: data.subject,
    //     campus: '신촌',
    //     detail: data.detail === '' ? null : data.detail.trim(),
    //     category: null,
    //     phoneNum1: data.phoneNum1.trim(),
    //     phoneNum2: data.phoneNum2 === '' ? null : data.phoneNum2.trim(),
    //     phoneNum3: data.phoneNum3 === '' ? null : data.phoneNum3.trim(),
    //     stEmail: data.stEmail === '' ? null : data.stEmail.trim(),
    //     stAddr: null,
    //     subDiv: data.subDiv === undefined ? null : data.subDiv,
    //     stVisit: data.stVisit === undefined ? null : new Date(data.stVisit),
    //     expEnrollDate:
    //       data.expEnrollDate === undefined
    //         ? null
    //         : new Date(data.expEnrollDate),
    //     perchase: null,
    //     birthday: null,
    //     receiptDiv: data.subDiv === undefined ? '' : data.receiptDiv,
    //     pic: data.subDiv === undefined ? null : data.pic,
    //     // progress: 0,
    //   },
    //   refetchQueries: [
    //     {
    //       query: SEE_STUDENT_QUERY,
    //       variables: { page: 1, limit: 10 },
    //     },
    //   ],
    //   onCompleted: data => {
    //     alert('등록되었습니다.')
    //     router.push('/consult')
    //   },
    // })
    // userLogs(`${data.stName}의 상담 등록`)
  }

  const fametDate = data => {
    const timestamp = parseInt(data, 10)
    const date = new Date(timestamp)
    const formatted =
      `${date.getFullYear()}-` +
      `${(date.getMonth() + 1).toString().padStart(2, '0')}-` +
      `${date.getDate().toString().padStart(2, '0')} ` +
      `${date.getHours().toString().padStart(2, '0')}:` +
      `${date.getMinutes().toString().padStart(2, '0')}:` +
      `${date.getSeconds().toString().padStart(2, '0')}`
    return formatted
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
          <Breadcrumb rightArea={false} />
          <DetailForm onSubmit={handleSubmit(onSubmit)}>
            <TopInfo>
              <Noti>
                <span>*</span> 는 필수입력입니다.
              </Noti>
            </TopInfo>
            <DetailBox>
              <AreaTitle>
                <h4>기본정보</h4>
              </AreaTitle>
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
                    defaultValue={''}
                    className="w-full"
                  />
                </AreaBox>
                <AreaBox>
                  <Input
                    labelPlacement="outside"
                    placeholder="연락처"
                    variant="bordered"
                    radius="md"
                    type="text"
                    label={
                      <FilterLabel>
                        연락처<span>*</span>
                      </FilterLabel>
                    }
                    defaultValue={''}
                    className="w-full"
                  />
                </AreaBox>
                <AreaSmallBox>
                  <RadioBox>
                    <Controller
                      control={control}
                      name="progress"
                      render={({ field }) => (
                        <RadioGroup
                          label={
                            <FilterLabel>
                              SNS 수신 여부<span>*</span>
                            </FilterLabel>
                          }
                          orientation="horizontal"
                          className="gap-[0.65rem]"
                          onValueChange={value => {
                            field.onChange(parseInt(value))
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
                  <DatePickerBox>
                    <Controller
                      control={control}
                      name="stVisit"
                      render={({ field }) => (
                        <DatePicker
                          locale="ko"
                          showYearDropdown
                          selected={
                            birthdayDate === null
                              ? null
                              : new Date(birthdayDate)
                          }
                          placeholderText="날짜를 선택해주세요."
                          isClearable
                          onChange={date => {
                            field.onChange(date)
                            setBirthdayDate(date)
                          }}
                          ref={field.ref}
                          dateFormat="yyyy/MM/dd"
                          customInput={
                            <Input
                              label={
                                <FilterLabel>
                                  생년월일<span>*</span>
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
                  <Input
                    labelPlacement="outside"
                    placeholder="선별테스트 점수"
                    variant="bordered"
                    radius="md"
                    type="text"
                    label={
                      <FilterLabel>
                        선별테스트 점수<span>*</span>
                      </FilterLabel>
                    }
                    defaultValue={''}
                    className="w-full"
                  />
                </AreaBox>
                <AreaBox>
                  <Controller
                    control={control}
                    name="pic"
                    render={({ field, fieldState }) => (
                      <Select
                        labelPlacement="outside"
                        label="담당자"
                        placeholder=" "
                        className="w-full"
                        variant="bordered"
                        selectedKeys={[manager]}
                        onChange={value => {
                          field.onChange(value)
                          handleManagerChange(value)
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
                            <SelectItem
                              key={item.mUsername}
                              value={item.mUsername}
                            >
                              {item.mUsername}
                            </SelectItem>
                          ))}
                      </Select>
                    )}
                  />
                </AreaBox>
              </FlexBox>
            </DetailBox>
            <DetailBox>
              <AreaTitle>
                <h4>수강료 정보</h4>
              </AreaTitle>
              <FlexBox>
                <Controller
                  control={control}
                  name="subject"
                  render={({ field }) => (
                    <>
                      <AreaBox>
                        <Textarea
                          readOnly
                          value={field.value}
                          label="상담 과정 선택"
                          labelPlacement="outside"
                          className="max-w-full"
                          variant="bordered"
                          minRows={1}
                          onClick={sbjOpen}
                          {...register('subject')}
                        />
                        <SubjectModal
                          subjectSelected={subjectSelected}
                          setSubjectSelected={setSubjectSelected}
                          field={field}
                          sbjIsOpen={sbjIsOpen}
                          sbjClose={sbjClose}
                          setValue={setValue}
                          radio={true}
                        />
                      </AreaBox>
                    </>
                  )}
                />
              </FlexBox>
              <FlexBox>
                <AreaBox>
                  <Input
                    isReadOnly
                    labelPlacement="outside"
                    placeholder="수강 구분"
                    variant="faded"
                    radius="md"
                    type="text"
                    label="수강 구분"
                    className="w-full"
                    {...register('testSubDiv')}
                  />
                </AreaBox>
                <AreaBox>
                  <Input
                    readOnly
                    labelPlacement="outside"
                    placeholder="수강료"
                    variant="faded"
                    radius="md"
                    type="text"
                    label="수강료"
                    className="w-full"
                  />
                </AreaBox>
                <AreaSmallBox>
                  <RadioBox>
                    <Controller
                      control={control}
                      name="progress"
                      render={({ field }) => (
                        <RadioGroup
                          label={
                            <FilterLabel>
                              교육상황보고여부<span>*</span>
                            </FilterLabel>
                          }
                          orientation="horizontal"
                          className="gap-[0.65rem]"
                          onValueChange={value => {
                            field.onChange(parseInt(value))
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
                    placeholder="할인율"
                    variant="bordered"
                    radius="md"
                    type="text"
                    label="할인율"
                    endContent="%"
                  />
                </AreaBox>
                <AreaBox>
                  <Input
                    labelPlacement="outside"
                    placeholder="할인금액"
                    variant="bordered"
                    radius="md"
                    type="text"
                    label="할인금액"
                  />
                </AreaBox>
                <AreaBox>
                  <Input
                    labelPlacement="outside"
                    placeholder="수납액"
                    variant="bordered"
                    radius="md"
                    type="text"
                    label="수납액"
                  />
                </AreaBox>
              </FlexBox>
              <FlexBox>
                <AreaBox>
                  <Input
                    labelPlacement="outside"
                    placeholder="현금결제액"
                    variant="bordered"
                    radius="md"
                    type="text"
                    label="현금결제액"
                  />
                </AreaBox>
                <AreaBox>
                  <Input
                    labelPlacement="outside"
                    placeholder="카드 결제액"
                    variant="bordered"
                    radius="md"
                    type="text"
                    label="카드 결제액"
                  />
                </AreaBox>
                <AreaBox>
                  <Input
                    labelPlacement="outside"
                    placeholder="미수납액"
                    variant="bordered"
                    radius="md"
                    type="text"
                    label="미수납액"
                  />
                </AreaBox>
              </FlexBox>
              <FlexBox>
                <AreaBox>
                  <RadioBox>
                    <Controller
                      control={control}
                      name="progress"
                      defaultValue={''}
                      render={({ field, fieldState }) => (
                        <CheckboxGroup
                          label={<FilterLabel>영수구분</FilterLabel>}
                          orientation="horizontal"
                          className="gap-1"
                          onChange={value => {
                            field.onChange(value)
                          }}
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
              <FlexBox>
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
                            birthdayDate === null
                              ? null
                              : new Date(birthdayDate)
                          }
                          placeholderText="날짜를 선택해주세요."
                          isClearable
                          onChange={date => {
                            field.onChange(date)
                            setBirthdayDate(date)
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
                            birthdayDate === null
                              ? null
                              : new Date(birthdayDate)
                          }
                          placeholderText="날짜를 선택해주세요."
                          isClearable
                          onChange={date => {
                            field.onChange(date)
                            setBirthdayDate(date)
                          }}
                          ref={field.ref}
                          dateFormat="yyyy/MM/dd"
                          customInput={
                            <Input
                              label={
                                <FilterLabel>
                                  수강예정일<span>*</span>
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
                  <Controller
                    control={control}
                    name="pic"
                    render={({ field, fieldState }) => (
                      <Select
                        labelPlacement="outside"
                        label="수강 담당자"
                        placeholder=" "
                        className="w-full"
                        variant="bordered"
                        selectedKeys={[manager]}
                        onChange={value => {
                          field.onChange(value)
                          handleManagerChange(value)
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
                            <SelectItem
                              key={item.mUsername}
                              value={item.mUsername}
                            >
                              {item.mUsername}
                            </SelectItem>
                          ))}
                      </Select>
                    )}
                  />
                </AreaBox>
              </FlexBox>
            </DetailBox>
            <DetailBox>
              <AreaTitle>
                <h4>카드 결제 정보</h4>
                <Button
                  size="sm"
                  radius="sm"
                  variant="solid"
                  className="text-white bg-flag1"
                >
                  추가
                </Button>
              </AreaTitle>
              <FlexBox>
                <AreaBox>
                  <Controller
                    control={control}
                    name="pic"
                    render={({ field, fieldState }) => (
                      <Select
                        labelPlacement="outside"
                        label="카드사"
                        placeholder=" "
                        className="w-full"
                        variant="bordered"
                        selectedKeys={[manager]}
                        onChange={value => {
                          field.onChange(value)
                          handleManagerChange(value)
                        }}
                      >
                        <SelectItem key={'카드사 선택'} value={'카드사 선택'}>
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
                  />
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
                            birthdayDate === null
                              ? null
                              : new Date(birthdayDate)
                          }
                          placeholderText="날짜를 선택해주세요."
                          isClearable
                          onChange={date => {
                            field.onChange(date)
                            setBirthdayDate(date)
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
            </DetailBox>
            <DetailBox>
              <AreaTitle>
                <h4>입금 결제 정보</h4>
                <Button
                  size="sm"
                  radius="sm"
                  variant="solid"
                  className="text-white bg-flag1"
                >
                  추가
                </Button>
              </AreaTitle>
              <FlexBox>
                <AreaBox>
                  <Controller
                    control={control}
                    name="pic"
                    render={({ field, fieldState }) => (
                      <Select
                        labelPlacement="outside"
                        label="은행명"
                        placeholder=" "
                        className="w-full"
                        variant="bordered"
                        selectedKeys={[manager]}
                        onChange={value => {
                          field.onChange(value)
                          handleManagerChange(value)
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
                  />
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
                            birthdayDate === null
                              ? null
                              : new Date(birthdayDate)
                          }
                          placeholderText="날짜를 선택해주세요."
                          isClearable
                          onChange={date => {
                            field.onChange(date)
                            setBirthdayDate(date)
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
            </DetailBox>
            <DetailBox>
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
                  onClick={() => router.push('/consult')}
                >
                  목록으로
                </Button2>
              </BtnBox>
            </DetailBox>
          </DetailForm>
        </ConArea>
      </MainWrap>
    </>
  )
}
StudentsWrite.getLayout = page => <Layout>{page}</Layout>
