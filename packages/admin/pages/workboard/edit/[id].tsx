import dynamic from 'next/dynamic'
import Layout from '@/pages/layout'
import MainWrap from '@/components/wrappers/MainWrap'
import Breadcrumb from '@/components/common/Breadcrumb'
import FormTopInfo from '@/components/common/FormTopInfo'
import DatePicker, { registerLocale } from 'react-datepicker'
import DatePickerHeader from '@/components/common/DatePickerHeader'
import ko from 'date-fns/locale/ko'
import 'react-datepicker/dist/react-datepicker.css'
import 'react-quill/dist/quill.snow.css'
const _ = require('lodash')
import { getYear } from 'date-fns'
import { Controller, useForm } from 'react-hook-form'
import { Button, Input, Select, SelectItem } from '@nextui-org/react'
import { Suspense, useMemo, useRef, useState, useEffect } from 'react'
import ReactQuill, { ReactQuillProps } from 'react-quill'
import { styled } from 'styled-components'
import { useLazyQuery, useMutation, useQuery } from '@apollo/client'
import { EDIT_WORK_BOARD } from '@/graphql/mutations'
import {
  SEARCH_MANAGEUSER_QUERY,
  SEARCH_WORKBOARD_QUERY,
} from '@/graphql/queries'
import { useRouter } from 'next/router'
import axios from 'axios'
import AdviceSelect from '@/components/common/select/AdviceSelect'

registerLocale('ko', ko)

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
  @media (max-width: 768px) {
    flex-direction: column;
  }
`
const AreaBox = styled.div`
  flex: 1;
  width: 100%;
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
const FilterLabel = styled.p`
  font-weight: 500;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.black};
  span {
    color: red;
  }
`
const BtnBox = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  align-items: center;
`
const LodingDiv = styled.div`
  padding: 1.5rem;
  width: 100%;
  min-width: 20rem;
  position: relative;
  background: white;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
const TimeBox = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: flex-end;
  margin-top: 8px;
`
const EditorBox = styled.div`
  img {
    display: inline-block;
    max-width: 100%;
    height: auto;
  }
`
const PersonNameWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.3rem;
  margin-top: 0.3rem;
`
const PersonName = styled.button`
  display: inline-block;
  padding: 0.2rem;
  background-color: #eee;
  border: 0;
  border-radius: 0.2rem;
  cursor: pointer;
  font-size: 0.875rem;
`
const QuillWrapper = styled.div`
  .ql-container {
    height: 50vh;
    max-height: 70vh;
    overflow-y: auto;
  }
  .ql-editor {
    min-height: 40vh;
    padding: 10px;
  }
`

interface ForwardedQuillComponent extends ReactQuillProps {
  forwardedRef: React.Ref<ReactQuill>
}

const QuillNoSSRWrapper = dynamic(
  async () => {
    const { default: QuillComponent } = await import('react-quill')
    const Quill = ({ forwardedRef, ...props }: ForwardedQuillComponent) => (
      <QuillComponent ref={forwardedRef} {...props} />
    )
    return Quill
  },
  { loading: () => <div>...loading</div>, ssr: false },
)

const parseDate = (value?: string) => {
  if (!value) return null
  const timestamp = Number(value)
  return Number.isNaN(timestamp) ? new Date(value) : new Date(timestamp)
}

export default function WorkboardEdit() {
  const router = useRouter()
  const boardId = Number(router?.query?.id)
  const years = _.range(1950, getYear(new Date()) + 1, 1)
  const quillRef = useRef<ReactQuill>()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [workStatusSelectedKey, setWorkStatusSelectedKey] = useState('미처리')
  const [workLevelsKey, setWorkLevelsKey] = useState('난이도를 선택하세요.')
  const [editorContent, setEditorContent] = useState('')
  const [fileName, setFileName] = useState('파일을 선택하세요.')
  const [toTeamSelectedKey, setToTeamSelectedKey] = useState('')
  const [currentFilePath, setCurrentFilePath] = useState('')
  const [personName, setPersonName] = useState('')
  const [toPersonNames, setToPersonNames] = useState(null)

  const {
    register,
    getValues,
    control,
    setError,
    setValue,
    handleSubmit,
    resetField,
    reset,
    clearErrors,
    formState: { errors },
  } = useForm<any>()

  const { data: searchWorkBoardData, loading } = useQuery(
    SEARCH_WORKBOARD_QUERY,
    {
      skip: !boardId,
      variables: {
        searchWorkBoardDto: { id: boardId },
      },
    },
  )
  const [editWorkBoard, { loading: editWorkBoardLoading }] =
    useMutation(EDIT_WORK_BOARD)
  const [searchManageUser] = useLazyQuery(SEARCH_MANAGEUSER_QUERY, {
    onCompleted: data => {
      if (data.searchManageUser.totalCount === 0) {
        setError('toPerson', {
          message: '일치하는 이름이 없습니다.',
        })
      } else {
        setToPersonNames(data.searchManageUser.data)
        clearErrors('toPerson')
      }
    },
  })
  const boardDetailInfo = searchWorkBoardData?.searchWorkBoard?.data?.[0]

  useEffect(() => {
    if (!boardDetailInfo) return

    const level = boardDetailInfo.level || '난이도를 선택하세요.'
    const workStatus = boardDetailInfo.workStatus || '미처리'

    reset({
      title: boardDetailInfo.title || '',
      writer: boardDetailInfo.writer || '',
      toTeam: boardDetailInfo.toTeam || '',
      toPerson: boardDetailInfo.toPerson || '',
      level,
      workStartDate: parseDate(boardDetailInfo.startDate),
      workEndDate: parseDate(boardDetailInfo.endDate),
      workStatus,
      file: boardDetailInfo.fileName || '',
    })
    setEditorContent(boardDetailInfo.detail || '')
    setWorkLevelsKey(level)
    setWorkStatusSelectedKey(workStatus)
    setFileName(boardDetailInfo.fileName || '파일을 선택하세요.')
    setToTeamSelectedKey(boardDetailInfo.toTeam || '')
    setPersonName(boardDetailInfo.toPerson || '')
    setCurrentFilePath(boardDetailInfo.filePath || '')
  }, [boardDetailInfo, reset])

  const toPersonHandleChange = e => {
    const inputValue = e.target.value
    setPersonName(inputValue)
    setValue('toPerson', inputValue)

    if (inputValue.trim() !== '') {
      clearErrors('toPerson')
      searchManageUser({
        variables: { mUsername: inputValue },
      })
    } else {
      setToPersonNames(null)
      clearErrors('toPerson')
    }
  }

  const toPersonHandleClick = user => {
    const selectedName = user?.mUsername || ''
    setPersonName(selectedName)
    setValue('toPerson', selectedName)
    setToPersonNames(null)
    clearErrors('toPerson')
  }

  const toTeamHandleChange = e => {
    const value = e.target.value
    setToTeamSelectedKey(value)
    setValue('toTeam', value)
    setValue('toPerson', '')
    setPersonName('')
    setToPersonNames(null)
    clearErrors('toPerson')
  }

  const uploadEditorImage = async (file: File) => {
    const token = localStorage.getItem('token')
    const formData = new FormData()

    formData.append('file', file)
    formData.append('folderName', 'workboard')

    const { data: response } = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/s3/upload`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          token,
        },
      },
    )

    return response
  }

  const imageHandler = () => {
    const input = document.createElement('input')
    input.setAttribute('type', 'file')
    input.setAttribute('accept', 'image/*')
    input.click()
    input.addEventListener('change', async () => {
      const file = input.files?.[0]
      if (!file || !quillRef.current) return

      try {
        const editor = quillRef.current.getEditor()
        const range = editor.getSelection(true)
        const imageUrl = await uploadEditorImage(file)

        editor.insertEmbed(range?.index || 0, 'image', imageUrl)
        editor.setSelection((range?.index || 0) + 1, 0)
      } catch (error) {
        console.error('Editor image upload error: ', error)
        alert('본문 이미지 업로드에 실패하였습니다.')
      }
    })
  }

  const handleFileChange = event => {
    const MAX_FILE_SIZE = 10 * 1024 * 1024
    const file = event.target.files[0]
    if (!file) return

    if (file.size > MAX_FILE_SIZE) {
      setError('attachment', {
        type: 'manual',
        message: '파일이 너무 큽니다. 10Mb이하만 가능합니다.',
      })
      setFileName('')
      fileInputRef.current.value = ''
      resetField('attachment')
      return
    }

    clearErrors('attachment')
    setFileName(file.name)
    setValue('attachment', file)
  }

  const onSubmit = async data => {
    let uploadedFilePath = currentFilePath
    let uploadedFileName = fileName === '파일을 선택하세요.' ? '' : fileName

    if (!editorContent || editorContent.trim().length === 0) {
      alert('요청 상세 내용이 입력되지 않았습니다.')
      return
    }

    if (data.attachment) {
      try {
        const token = localStorage.getItem('token')
        const formData = new FormData()
        formData.append('file', data.attachment)
        formData.append('folderName', 'workboard')

        const { data: response } = await axios.post(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/s3/upload`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              token,
            },
          },
        )
        uploadedFilePath = response
        uploadedFileName = data.attachment.name
      } catch (error) {
        console.log(error)
        alert('파일 업로드에 실패하였습니다.')
        return
      }
    }

    editWorkBoard({
      variables: {
        editWorkBoardDto: {
          id: boardId,
          title: data.title,
          writer: data.writer,
          toTeam: data.toTeam,
          toPerson: data.toPerson,
          level: data.level,
          startDate: data.workStartDate,
          endDate: data.workEndDate,
          workStatus: data.workStatus,
          detail: editorContent,
          filePath: uploadedFilePath,
          fileName: uploadedFileName,
          lastModifiedTime: boardDetailInfo?.lastModifiedTime,
        },
      },
      onCompleted: result => {
        if (result?.editWorkBoard?.ok) {
          alert('정상적으로 수정완료 되었습니다.')
          router.push(`/workboard/read/${boardId}`)
        } else {
          alert('수정에 실패하였습니다.')
          console.log(result?.editWorkBoard?.error)
        }
      },
    })
  }

  const modules = useMemo(() => {
    return {
      toolbar: {
        container: [
          [{ header: [1, 2, false] }],
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
          [{ list: 'ordered' }, { list: 'bullet' }, { align: [] }],
          ['link', 'image'],
        ],
        handlers: {
          image: imageHandler,
        },
      },
    }
  }, [])

  if (loading || !boardDetailInfo) return null

  return (
    <MainWrap>
      <ConArea>
        <Breadcrumb rightArea={false} isFilter={false} />
        <DetailBox>
          <FormTopInfo item={null} noti={true} time={false} />
          <form onSubmit={handleSubmit(onSubmit)}>
            <DetailDiv>
              <FlexBox>
                <AreaBox>
                  <Input
                    labelPlacement="outside"
                    placeholder="글 제목 입력"
                    variant="bordered"
                    radius="md"
                    type="text"
                    className="w-full"
                    maxLength={100}
                    {...register('title', {
                      validate: value =>
                        value.trim() !== '' || '글 제목을 입력하세요.',
                    })}
                    label={
                      <FilterLabel>
                        글 제목<span>*</span>
                      </FilterLabel>
                    }
                  />
                  {errors.title && (
                    <p className="px-2 pt-2 text-xs text-red">
                      {String(errors.title.message)}
                    </p>
                  )}
                </AreaBox>
              </FlexBox>
              <FlexBox>
                <AreaBox>
                  <Input
                    labelPlacement="outside"
                    placeholder="작성자"
                    variant="bordered"
                    radius="md"
                    type="text"
                    className="w-full"
                    maxLength={12}
                    {...register('writer')}
                    readOnly={true}
                    label={<FilterLabel>작성자</FilterLabel>}
                  />
                </AreaBox>
                <AreaBox>
                  <Controller
                    control={control}
                    name="toTeam"
                    render={({ field }) => (
                      <Suspense
                        fallback={
                          <LodingDiv>
                            <i className="xi-spinner-2" />
                          </LodingDiv>
                        }
                      >
                        <AdviceSelect
                          selectedKey={toTeamSelectedKey}
                          field={field}
                          label={<FilterLabel>전달 부서 또는 팀</FilterLabel>}
                          handleChange={toTeamHandleChange}
                          placeholder="부서 또는 팀을 선택해주세요."
                          category="부서"
                        />
                      </Suspense>
                    )}
                  />
                </AreaBox>
                <AreaBox>
                  <Input
                    labelPlacement="outside"
                    placeholder="ex) 홍길동"
                    variant="bordered"
                    radius="md"
                    type="text"
                    className="w-full"
                    maxLength={12}
                    value={personName}
                    {...register('toPerson')}
                    onChange={toPersonHandleChange}
                    label={<FilterLabel>전달 개인 추가</FilterLabel>}
                  />
                  {errors.toPerson && (
                    <p className="px-2 pt-2 text-xs text-red">
                      {String(errors.toPerson.message)}
                    </p>
                  )}
                  {toPersonNames && (
                    <PersonNameWrap>
                      {toPersonNames.map((data, index) => (
                        <PersonName
                          key={index}
                          type="button"
                          onClick={() => toPersonHandleClick(data)}
                        >
                          {data?.mUsername}({data?.mPart})
                        </PersonName>
                      ))}
                    </PersonNameWrap>
                  )}
                </AreaBox>
              </FlexBox>
              <FlexBox>
                <AreaBox>
                  <Select
                    labelPlacement="outside"
                    label="작업난이도"
                    placeholder=" "
                    className="w-full"
                    variant="bordered"
                    selectedKeys={[workLevelsKey]}
                    {...register('level')}
                    onChange={e => {
                      if (e.target.value === '') return
                      setWorkLevelsKey(e.target.value)
                      setValue('level', e.target.value)
                    }}
                  >
                    <SelectItem key="난이도를 선택하세요.">
                      난이도를 선택하세요.
                    </SelectItem>
                    <SelectItem key="상">상</SelectItem>
                    <SelectItem key="중">중</SelectItem>
                    <SelectItem key="하">하</SelectItem>
                  </Select>
                </AreaBox>
                <AreaBox>
                  <DatePickerBox>
                    <Controller
                      control={control}
                      name="workStartDate"
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
                          locale={ko}
                          selected={field.value}
                          openToDate={new Date()}
                          placeholderText="날짜를 선택해주세요."
                          isClearable
                          onChange={date => field.onChange(date)}
                          dateFormat="yyyy/MM/dd"
                          onChangeRaw={e => e.preventDefault()}
                          onFocus={e => e.target.blur()}
                          customInput={
                            <Input
                              ref={field.ref}
                              label={<FilterLabel>작업 시작일</FilterLabel>}
                              labelPlacement="outside"
                              type="text"
                              variant="bordered"
                              classNames={{ input: 'caret-transparent' }}
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
                  <DatePickerBox>
                    <Controller
                      control={control}
                      name="workEndDate"
                      rules={{
                        validate: value => {
                          const workStartDate = getValues('workStartDate')
                          if (
                            workStartDate &&
                            value &&
                            new Date(value) <= new Date(workStartDate)
                          ) {
                            return '작업완료일은 작업 시작일 이후여야 합니다.'
                          }
                          return true
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
                          locale={ko}
                          selected={field.value}
                          openToDate={new Date()}
                          placeholderText="날짜를 선택해주세요."
                          isClearable
                          onChange={date => field.onChange(date)}
                          dateFormat="yyyy/MM/dd"
                          onChangeRaw={e => e.preventDefault()}
                          onFocus={e => e.target.blur()}
                          customInput={
                            <Input
                              ref={field.ref}
                              label={<FilterLabel>작업 완료일</FilterLabel>}
                              labelPlacement="outside"
                              type="text"
                              variant="bordered"
                              classNames={{ input: 'caret-transparent' }}
                              isReadOnly={true}
                              startContent={<i className="xi-calendar" />}
                            />
                          }
                        />
                      )}
                    />
                  </DatePickerBox>
                  {errors.workEndDate && (
                    <p className="px-2 pt-2 text-xs text-red">
                      {String(errors.workEndDate.message)}
                    </p>
                  )}
                </AreaBox>
                <AreaBox>
                  <Select
                    labelPlacement="outside"
                    label="작업진행상태"
                    placeholder="작업 진행상태를 선택하세요."
                    className="w-full"
                    variant="bordered"
                    selectedKeys={[workStatusSelectedKey]}
                    {...register('workStatus')}
                    onChange={e => {
                      if (e.target.value === '') return
                      setWorkStatusSelectedKey(e.target.value)
                      setValue('workStatus', e.target.value)
                    }}
                  >
                    <SelectItem key="미처리">미처리</SelectItem>
                    <SelectItem key="진행중">진행중</SelectItem>
                    <SelectItem key="작업완료">작업완료</SelectItem>
                    <SelectItem key="재진행요청">재진행요청</SelectItem>
                  </Select>
                </AreaBox>
              </FlexBox>
              <EditorBox>
                <QuillWrapper>
                  <QuillNoSSRWrapper
                    forwardedRef={quillRef}
                    value={editorContent}
                    onChange={setEditorContent}
                    modules={modules}
                    className="editor"
                  />
                </QuillWrapper>
              </EditorBox>
              <FlexBox>
                <AreaBox>
                  <FilterLabel className="file">
                    파일 첨부 (10MB 미만)
                  </FilterLabel>
                  <TimeBox>
                    <input
                      type="file"
                      ref={fileInputRef}
                      style={{ display: 'none' }}
                      onChange={handleFileChange}
                    />
                    <Button
                      color={'primary'}
                      onClick={() => fileInputRef.current?.click()}
                    >
                      파일 선택
                    </Button>
                    <Input
                      readOnly
                      placeholder=" "
                      variant="faded"
                      radius="md"
                      type="text"
                      value={fileName}
                      {...register('file')}
                    />
                  </TimeBox>
                  {errors.attachment && (
                    <p className="px-2 pt-2 text-xs text-red">
                      {String(errors.attachment.message)}
                    </p>
                  )}
                </AreaBox>
              </FlexBox>
              <BtnBox>
                <Button
                  type="submit"
                  size="md"
                  radius="md"
                  variant="solid"
                  color="primary"
                  className="w-full text-white"
                  isLoading={editWorkBoardLoading}
                >
                  수정
                </Button>
                <Button
                  variant="bordered"
                  color="primary"
                  className="w-full text-primary"
                  onClick={() => router.back()}
                >
                  이전으로
                </Button>
              </BtnBox>
            </DetailDiv>
          </form>
        </DetailBox>
      </ConArea>
    </MainWrap>
  )
}

WorkboardEdit.getLayout = page => <Layout>{page}</Layout>
