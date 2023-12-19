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
import {
  progressStatusState,
  subStatusState,
  receiptStatusState,
} from '@/lib/recoilAtoms'
import { useRecoilValue } from 'recoil'
import { useMutation, useQuery } from '@apollo/client'
import {
  CREATE_STUDENT_STATE_MUTATION,
  SEARCH_SUBJECT_MUTATION,
} from '@/graphql/mutations'
import { Controller, useForm } from 'react-hook-form'
import { SEE_MANAGEUSER_QUERY, SEE_STUDENT_QUERY } from '@/graphql/queries'
import Button2 from '@/components/common/Button'
import useUserLogsMutation from '@/utils/userLogs'
import SubjectItem from '@/components/table/SubjectItem'

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

const DetailForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
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
`
const BtnBox = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: center;
`
const BtnArea = styled.div`
  display: flex;
  justify-content: start;
`
const Theader = styled.div`
  width: 100%;
  min-width: fit-content;
  display: table-row;
  flex-wrap: nowrap;
  color: #111;
  font-size: 0.875rem;
  font-weight: 700;
  border-bottom: 1px solid #e4e4e7;
  text-align: center;
`
const TableItem = styled.div`
  display: table;
  position: relative;
  width: 100%;
  min-width: fit-content;
  flex-wrap: nowrap;
  border-bottom: 1px solid #e4e4e7;
  color: #71717a;
  font-size: 0.875rem;
  background: #fff;
  overflow: hidden;

  &:hover {
    cursor: pointer;
    background: rgba(255, 255, 255, 0.8);
  }
`
const TableRow = styled.div`
  display: table-row;
  width: 100%;
  min-width: fit-content;
  text-align: center;
`
const Tcheck = styled.div`
  width: 1.25rem;
  height: 1.25rem;
  margin-right: 0.5rem;
`
const Tname = styled.div`
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 50%;
  padding: 1rem;
  font-size: inherit;
  color: inherit;
  min-width: 300px;
`
const TsubDiv = styled.div`
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 25%;
  padding: 1rem;
  font-size: inherit;
  color: inherit;
  min-width: 150px;
`
const Tfee = styled.div`
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 25%;
  padding: 1rem;
  font-size: inherit;
  color: inherit;
  min-width: 150px;
`

const PagerWrap = styled.div`
  display: flex;
  margin-top: 1.5rem;
  justify-content: center;
`

export default function ConsultWirte() {
  const router = useRouter()
  const [currentPage, setCurrentPage] = useState(1)
  const [currentLimit] = useState(10)
  const {
    loading: managerLoading,
    error: managerError,
    data: managerData,
  } = useQuery(SEE_MANAGEUSER_QUERY)
  const [searchSubjectMutation] = useMutation(SEARCH_SUBJECT_MUTATION)
  const [createStudent] = useMutation(CREATE_STUDENT_STATE_MUTATION)
  const { userLogs } = useUserLogsMutation()
  const progressStatus = useRecoilValue(progressStatusState)
  const receiptStatus = useRecoilValue(receiptStatusState)
  const subStatus = useRecoilValue(subStatusState)
  const managerList = managerData?.seeManageUser || []
  const { register, control, setValue, handleSubmit, formState } = useForm()
  const { errors } = formState
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [subjectList, setSubjectList] = useState(null)
  const [subjectSelected, setSubjectSelected] = useState()
  const [stVisitDate, setStVisitDate] = useState(null)
  const [expEnrollDate, setExpEnrollDate] = useState(null)
  const [receipt, setReceipt] = useState('없음')
  const [sub, setSub] = useState('없음')
  const [manager, setManager] = useState('담당자 지정필요')

  useEffect(() => {
    searchSubjectMutation({
      variables: { exposure: true, page: currentPage, limit: currentLimit },
      onCompleted: resData => {
        const { result, totalCount } = resData.searchSubject || {}
        setSubjectList({ result, totalCount })
      },
    })
  }, [router, currentPage])

  const onSubmit = data => {
    createStudent({
      variables: {
        stName: data.stName,
        agreement: '동의',
        subject: data.subject,
        campus: '신촌',
        detail: data.detail === '' ? null : data.detail,
        category: null,
        phoneNum1: data.phoneNum1,
        phoneNum2: data.phoneNum2 === '' ? null : data.phoneNum2,
        phoneNum3: data.phoneNum3 === '' ? null : data.phoneNum3,
        stEmail: data.stEmail === '' ? null : data.stEmail,
        stAddr: null,
        subDiv: data.subDiv === undefined ? null : data.subDiv,
        stVisit: data.stVisit === undefined ? null : new Date(data.stVisit),
        expEnrollDate:
          data.expEnrollDate === undefined
            ? null
            : new Date(data.expEnrollDate),
        perchase: null,
        birthday: null,
        receiptDiv: data.subDiv === undefined ? '' : data.receiptDiv,
        pic: data.subDiv === undefined ? null : data.pic,
        // progress: 0,
      },
      refetchQueries: [
        {
          query: SEE_STUDENT_QUERY,
          variables: { page: 1, limit: 10 },
        },
      ],
      onCompleted: data => {
        alert('등록되었습니다.')
        router.push('/consult')
      },
    })

    userLogs(`${data.stName}의 상담 등록`)
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
  const handleReceiptChange = e => {
    setReceipt(e.target.value)
  }
  const handleSubChange = e => {
    setSub(e.target.value)
  }
  const handleManagerChange = e => {
    setManager(e.target.value)
  }

  const handleCheckboxChange = values => {
    setSubjectSelected(values)
  }
  const clickSubmit = () => {
    setValue('subject', subjectSelected)
    onClose()
  }

  return (
    <>
      <MainWrap>
        <ConArea>
          <Breadcrumb rightArea={false} />
          <DetailBox>
            <DetailForm onSubmit={handleSubmit(onSubmit)}>
              <FlexBox>
                <AreaBox>
                  <Input
                    labelPlacement="outside"
                    placeholder="이름"
                    variant="bordered"
                    radius="md"
                    type="text"
                    label="이름"
                    defaultValue={''}
                    onChange={e => {
                      register('stName').onChange(e)
                    }}
                    className="w-full"
                    {...register('stName', {
                      required: {
                        value: true,
                        message: '이름을 입력해주세요.',
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
                    {...register('stEmail')}
                  />
                </AreaBox>
              </FlexBox>
              <FlexBox>
                <AreaBox>
                  <Input
                    labelPlacement="outside"
                    placeholder=" "
                    variant="bordered"
                    radius="md"
                    type="text"
                    label="휴대폰번호"
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
                    placeholder=" "
                    variant="bordered"
                    radius="md"
                    type="text"
                    label="기타번호1"
                    onChange={e => {
                      register('phoneNum2').onChange(e)
                    }}
                    className="w-full"
                    {...register('phoneNum2')}
                  />
                </AreaBox>
                <AreaBox>
                  <Input
                    labelPlacement="outside"
                    placeholder=" "
                    variant="bordered"
                    radius="md"
                    type="text"
                    label="기타번호2"
                    onChange={e => {
                      register('phoneNum3').onChange(e)
                    }}
                    className="w-full"
                    {...register('phoneNum3')}
                  />
                </AreaBox>
              </FlexBox>
              <AreaBox>
                <Controller
                  control={control}
                  name="subject"
                  rules={{
                    required: {
                      value: true,
                      message: '과정을 최소 1개 이상 선택해주세요.',
                    },
                  }}
                  render={({ field }) => (
                    <>
                      <Textarea
                        readOnly
                        label="상담 과정 선택"
                        labelPlacement="outside"
                        className="max-w-full"
                        variant="bordered"
                        minRows={1}
                        onClick={onOpen}
                        {...register('subject')}
                      />
                      <Modal size={'2xl'} isOpen={isOpen} onClose={onClose}>
                        <ModalContent>
                          {onClose => (
                            <>
                              <ModalHeader className="flex flex-col gap-1"></ModalHeader>
                              <ModalBody>
                                <BtnArea>
                                  <Button
                                    size="sm"
                                    radius="sm"
                                    variant="solid"
                                    className="text-white bg-flag1"
                                    onClick={() => {
                                      router.push('/subjects')
                                    }}
                                  >
                                    과정 등록/수정
                                  </Button>
                                </BtnArea>
                                <ScrollShadow
                                  orientation="horizontal"
                                  className="scrollbar"
                                >
                                  <CheckboxGroup
                                    value={subjectSelected}
                                    onChange={handleCheckboxChange}
                                    classNames={{
                                      wrapper: 'gap-0',
                                    }}
                                  >
                                    <Theader>
                                      <TableRow>
                                        <Tcheck></Tcheck>
                                        <Tname>과정명</Tname>
                                        <TsubDiv>수강구분</TsubDiv>
                                        <Tfee>과정 금액</Tfee>
                                      </TableRow>
                                    </Theader>
                                    {subjectList?.result.map((item, index) => (
                                      <TableItem key={index}>
                                        <TableRow>
                                          <Checkbox
                                            key={item.id}
                                            value={item.subjectName}
                                          >
                                            <SubjectItem tableData={item} />
                                          </Checkbox>
                                        </TableRow>
                                      </TableItem>
                                    ))}
                                  </CheckboxGroup>
                                </ScrollShadow>
                                {subjectList?.totalCount > 0 && (
                                  <PagerWrap>
                                    <Pagination
                                      variant="light"
                                      showControls
                                      initialPage={currentPage}
                                      total={Math.ceil(
                                        subjectList?.totalCount / currentLimit,
                                      )}
                                      onChange={newPage => {
                                        setCurrentPage(newPage)
                                      }}
                                    />
                                  </PagerWrap>
                                )}
                              </ModalBody>
                              <ModalFooter>
                                <Button
                                  color="danger"
                                  variant="light"
                                  onPress={onClose}
                                >
                                  Close
                                </Button>
                                <Button
                                  color="primary"
                                  onPress={() => {
                                    clickSubmit()
                                    field.onChange(subjectSelected)
                                  }}
                                >
                                  선택
                                </Button>
                              </ModalFooter>
                            </>
                          )}
                        </ModalContent>
                      </Modal>
                    </>
                  )}
                />
                {errors.subject && (
                  <p className="px-2 pt-2 text-xs text-red-500">
                    {String(errors.subject.message)}
                  </p>
                )}
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
                        field.onChange(value)
                        handleReceiptChange(value)
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
                        field.onChange(value)
                        handleSubChange(value)
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
                      {managerList?.map(item => (
                        <SelectItem key={item.mUsername} value={item.mUsername}>
                          {item.mUsername}
                        </SelectItem>
                      ))}
                    </Select>
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
                        locale="ko"
                        showYearDropdown
                        selected={
                          stVisitDate === null ? null : new Date(stVisitDate)
                        }
                        placeholderText="기간을 선택해주세요."
                        isClearable
                        onChange={date => {
                          field.onChange(date)
                          setStVisitDate(date)
                        }}
                        showTimeSelect
                        ref={field.ref}
                        dateFormat="yyyy/MM/dd HH:mm"
                        customInput={
                          <Input
                            label="상담예정일"
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
                <DatePickerBox>
                  <Controller
                    control={control}
                    name="expEnrollDate"
                    render={({ field }) => (
                      <DatePicker
                        locale="ko"
                        showYearDropdown
                        selected={
                          expEnrollDate === null
                            ? null
                            : new Date(expEnrollDate)
                        }
                        placeholderText="기간을 선택해주세요."
                        isClearable
                        onChange={date => {
                          field.onChange(date)
                          setExpEnrollDate(date)
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
                  onClick={() => router.push('/consult')}
                >
                  목록으로
                </Button2>
              </BtnBox>
            </DetailForm>
          </DetailBox>
        </ConArea>
      </MainWrap>
    </>
  )
}