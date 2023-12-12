import MainWrap from '@/components/wrappers/MainWrap'
import { useEffect, useState } from 'react'
import Breadcrumb from '@/components/common/Breadcrumb'
import { styled } from 'styled-components'
import router, { useRouter } from 'next/router'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
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
  SEARCH_STUDENTSTATE_MUTATION,
  UPDATE_STUDENT_STATE_MUTATION,
} from '@/graphql/mutations'
import { Controller, useForm } from 'react-hook-form'
import { SEE_MANAGEUSER_QUERY, SEE_SUBJECT_QUERY } from '@/graphql/queries'
import Button2 from '@/components/common/Button'
import useUserLogsMutation from '@/utils/userLogs'
import SubjectItem from '@/components/table/SubjectItem'
import ConsolutMemo from '@/components/form/ConsolutMemo'

const DetailBox = styled.div`
  margin-top: 2rem;
  background: #fff;
  border-radius: 0.5rem;
  padding: 1.5rem;
`
const TopInfo = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 1.5rem;
  gap: 0.5rem;
  font-size: 0.8rem;
  span {
    color: #555;
  }
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

const MemoBox = styled.div`
  width: 100%;
  display: flex;
  flex: 1 3;
  gap: 1rem;
  align-items: center;

  textarea {
    width: 100%;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0.3rem;
  }
`
const MemoList = styled.ul`
  width: 100%;
  display: flex;
  gap: 1rem;
  flex-direction: column;
  @media (max-width: 768px) {
    gap: 1.5rem;
  }
`
const MemoItem = styled.li`
  width: 100%;
  display: flex;
  gap: 1rem;
  align-items: center;

  textarea {
    width: 100%;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0.3rem;
  }
`
const MemoBtn = styled.div`
  display: flex;
  align-items: center;
  padding-top: 1.75rem;
  width: 5rem;

  @media (max-width: 768px) {
    padding-top: 0;
    width: 100%;
  }
`

const MemoListBtn = styled.p`
  display: flex;
  gap: 0.5rem;
  flex-direction: column;

  button {
    width: 5rem;
  }

  @media (max-width: 768px) {
    width: 100%;
    flex-direction: row;

    button {
      width: 50%;
    }
  }
`

const MemoInfo = styled.label`
  display: flex;
  gap: 0.5rem;
`
const MemoName = styled.span`
  color: #11181c;
  font-weight: 600;
`
const MemoTime = styled.span``

type studentData = {
  id: number
  campus: string
  category: string
  stName: string
  phoneNum1: string
  phoneNum2: string
  phoneNum3: string
  currentManager: string
  subject: [string]
  detail: string
  agreement: string
  progress: number
  stEmail: string
  stAddr: string
  subDiv: string
  stVisit: string
  expEnrollDate: string
  perchase: boolean
  createdAt: string
  updatedAt: string
  receiptDiv: string
  pic: string
  consultationMemo: {
    id: number
    content: string
    createdAt: string
    updatedAt: string
    manageUsers: {}
  }
}

export default function Consoultation() {
  const [filterActive, setFilterActive] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [currentLimit] = useState(10)
  const {
    loading: managerLoading,
    error: managerError,
    data: managerData,
  } = useQuery(SEE_MANAGEUSER_QUERY)
  const {
    loading: subjectLoading,
    error: subjectError,
    data: subjectData,
  } = useQuery(SEE_SUBJECT_QUERY, {
    variables: { page: currentPage, limit: currentLimit },
  })
  const [createStudent] = useMutation(CREATE_STUDENT_STATE_MUTATION)
  const { userLogs } = useUserLogsMutation()
  const progressStatus = useRecoilValue(progressStatusState)
  const receiptStatus = useRecoilValue(receiptStatusState)
  const subStatus = useRecoilValue(subStatusState)
  const managerList = managerData?.seeManageUser || []
  const subjectList = subjectData?.seeSubject.subject || []

  const [subjectSelected, setSubjectSelected] = useState(subjectList)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { register, control, setValue, handleSubmit, formState } = useForm()
  const { isDirty, dirtyFields } = formState
  const [stVisitDate, setStVisitDate] = useState(null)
  const [expEnrollDate, setExpEnrollDate] = useState(null)
  const [receipt, setReceipt] = useState('없음')
  const [sub, setSub] = useState('없음')
  const [manager, setManager] = useState('담당자 지정필요')

  const onSubmit = data => {
    createStudent({
      variables: {
        stName: data.stName,
        agreement: '동의',
        subject: data.subject,
        campus: '신촌',
        detail: data.detail,
        category: null,
        phoneNum1: data.phoneNum1,
        phoneNum2: data.phoneNum2,
        phoneNum3: data.phoneNum3,
        stEmail: data.phoneNum2,
        stAddr: null,
        subDiv: data.subDiv,
        stVisit: data.stVisit === null ? null : new Date(data.stVisit),
        expEnrollDate:
          data.expEnrollDate === null ? null : new Date(data.expEnrollDate),
        perchase: null,
        birthday: null,
        receiptDiv: data.receiptDiv,
        pic: data.pic,
      },
      onCompleted: data => {
        console.log(data)
        alert('등록되었습니다.')
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
        <Breadcrumb
          onFilterToggle={setFilterActive}
          isActive={filterActive}
          onBtn={false}
        />
        <DetailBox>
          <DetailForm onSubmit={handleSubmit(onSubmit)}>
            <FlexBox>
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
                {...register('stName')}
              />
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
            </FlexBox>
            <FlexBox>
              <Input
                labelPlacement="outside"
                placeholder=" "
                variant="bordered"
                radius="md"
                type="text"
                label="전화번호1"
                onChange={e => {
                  register('phoneNum1').onChange(e)
                }}
                className="w-full"
                {...register('phoneNum1')}
              />
              <Input
                labelPlacement="outside"
                placeholder=" "
                variant="bordered"
                radius="md"
                type="text"
                label="전화번호2"
                onChange={e => {
                  register('phoneNum2').onChange(e)
                }}
                className="w-full"
                {...register('phoneNum2')}
              />
              <Input
                labelPlacement="outside"
                placeholder=" "
                variant="bordered"
                radius="md"
                type="text"
                label="전화번호3"
                onChange={e => {
                  register('phoneNum3').onChange(e)
                }}
                className="w-full"
                {...register('phoneNum3')}
              />
            </FlexBox>
            <Controller
              control={control}
              name="subject"
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
                                {subjectList?.map((item, index) => (
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
                            {subjectData?.seeSubject.totalCount > 0 && (
                              <PagerWrap>
                                <Pagination
                                  variant="light"
                                  showControls
                                  initialPage={currentPage}
                                  total={Math.ceil(
                                    subjectData?.seeSubject.totalCount /
                                      currentLimit,
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

            <FlexBox>
              <Controller
                control={control}
                name="receiptDiv"
                render={({ field, fieldState }) => (
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
                render={({ field, fieldState }) => (
                  <RadioGroup
                    label={<FilterLabel>진행상태</FilterLabel>}
                    orientation="horizontal"
                    className="gap-1"
                    onValueChange={value => {
                      field.onChange(parseInt(value))
                    }}
                  >
                    {Object.entries(progressStatus).map(([key, value]) => (
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
                  // locale="ko"
                  render={({ field, fieldState }) => (
                    <DatePicker
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
                  render={({ field, fieldState }) => (
                    <DatePicker
                      selected={
                        expEnrollDate === null ? null : new Date(expEnrollDate)
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
              <Button2 buttonType="submit" width="100%" height="2.5rem">
                등록
              </Button2>
              <Button2
                buttonType="reset"
                width="100%"
                height="2.5rem"
                typeBorder={true}
                onClick={() => router.push('/consult')}
              >
                목록으로
              </Button2>
            </BtnBox>
          </DetailForm>
        </DetailBox>
      </MainWrap>
    </>
  )
}
