import dynamic from 'next/dynamic'
import Layout from '@/pages/layout'
import MainWrap from '@/components/wrappers/MainWrap'
import Breadcrumb from '@/components/common/Breadcrumb'
import FormTopInfo from '@/components/common/FormTopInfo'
import DatePicker, { registerLocale } from 'react-datepicker'
import DatePickerHeader from '@/components/common/DatePickerHeader'
import { ko } from 'date-fns/locale'
import 'react-datepicker/dist/react-datepicker.css'
const _ = require('lodash')
import { getYear } from 'date-fns'
import 'react-quill/dist/quill.snow.css'
import { Controller, useForm } from 'react-hook-form'
import {
  Button,
  Input,
  Radio,
  RadioGroup,
  Select,
  SelectItem,
} from '@nextui-org/react'
import { useMemo, useRef, useState, useEffect } from 'react'
import ReactQuill, { ReactQuillProps } from 'react-quill'
import { styled } from 'styled-components'
import EditorViewer from '@/components/EditorViewer'
import Editor from '@/components/Editor'
import { useLazyQuery, useMutation, useQuery } from '@apollo/client'
import { CREATE_WORK_BOARD } from '@/graphql/mutations'
import { useRouter } from 'next/router'
import message from '@/pages/message'
import { MME_QUERY } from '@/graphql/queries'
import { SEARCH_MANAGEUSER_QUERY } from '@/graphql/queries'
import axios from 'axios'
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
const RadioBox = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
`
const FilterLabel = styled.p`
  font-weight: 500;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.black};

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
const TimeBox = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: flex-end;

  p {
    height: 40px;
    line-height: 40px;
  }
`
const EditorBox = styled.div`
  img {
    display: inline-block;
    width: 50%;
  }
`
const ViewBox = styled.div`
  border: 1px solid black;
  padding: 1rem;
  background: white;
  width: 100%;
  img {
    display: inline-block;
  }
`

const PersonNameWrap = styled.div``
const PersonName = styled.span`
  display: inline-block;
  padding: 0.2rem;
  background-color: #eee;
  border-radius: 0.2rem;
  margin-right: 0.3rem;
  margin-top: 0.3rem;
  font-size: 0.875rem;
`

interface ForwardedQuillComponent extends ReactQuillProps {
  forwardedRef: React.Ref<ReactQuill>
}
const QuillWrapper = styled.div`
  .ql-container {
    height: 50vh; /* 화면 높이의 50% */
    max-height: 70vh; /* 최대 높이 제한 */
    overflow-y: auto; /* 내용 스크롤 */
  }
  .ql-editor {
    min-height: 40vh;
    padding: 10px;
  }
`
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

export default function testEditor() {
  const router = useRouter()
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
    formState,
    trigger,
  } = useForm()
  const { errors, isDirty } = formState
  const quillRef = useRef<ReactQuill>()
  const [view, setView] = useState(null)
  const [workStatusSelectedKey, setWorkStatusSelectedKey] = useState('미처리')
  const [workLevelsKey, setWorkLevelsKey] = useState('난이도를 선택하세요.')
  const [editorContent, setEditorContent] = useState('')
  const [imagesToUpload, setImagesToUpload] = useState([])
  const [personName, setPersonName] = useState('')
  const [fileName, setFileName] = useState('파일을 선택하세요.')
  const [toPersonNames, setToPersonNames] = useState(null)
  const [returnUrl, setReturnUrl] = useState<string>('')
  const fileInputRef = useRef(null)

  const years = _.range(1950, getYear(new Date()) + 1, 1)
  const [createWorkBoard, { loading: createWorkBoardLoading }] =
    useMutation(CREATE_WORK_BOARD)
  const mMe = useQuery(MME_QUERY)
  const [searchManageUser, { loading, error }] = useLazyQuery(
    SEARCH_MANAGEUSER_QUERY,
    {
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
    },
  )
  useEffect(() => {}, [toPersonNames])
  //비교
  const toPersonHandleChange = e => {
    const inputValue = e.target.value
    setPersonName(inputValue)
    const getMpartValue = getValues('toTeam')
    if (inputValue.trim() !== '' && getMpartValue !== '') {
      clearErrors('toPerson')
      //비교
      searchManageUser({
        variables: { mUsername: inputValue, mPart: getMpartValue },
      })
    } else if (getMpartValue === '') {
      setToPersonNames(null)
      setError('toPerson', { message: '에러에러' })
    } else {
      clearErrors('toPerson')
    }
  }

  const onEditorStateChange = editorState => {
    setEditorContent(editorState)
  }

  const imageHandler = () => {
    const input = document.createElement('input')
    input.setAttribute('type', 'file')
    input.setAttribute('accept', 'image/*')
    input.click()
    input.addEventListener('change', async () => {
      const file = input.files?.[0]
      if (!file) return

      const editor = quillRef.current.getEditor()
      const range = editor.getSelection()

      const reader = new FileReader()
      reader.readAsDataURL(file)

      reader.onload = () => {
        const imageSrc = reader.result
        // 가져온 위치에 이미지를 삽입한다
        setImagesToUpload(prev => [...prev, { file, imageSrc }])
        editor.insertEmbed(range.index, 'image', imageSrc)
      }

      reader.onerror = error => {
        console.error('Image read error: ', error)
      }
    })
  }

  const handleFileChange = event => {
    const MAX_FILE_SIZE = 10 * 1024 * 1024
    const file = event.target.files[0]
    if (file) {
      if (file.size > MAX_FILE_SIZE) {
        setError('attachment', {
          type: 'manual',
          message: '파일이 너무 큽니다. 10Mb이하만 가능합니다.',
        })
        setFileName('')
        fileInputRef.current.value = ''
        resetField('attachment')
      } else {
        clearErrors('attachment')
        setFileName(file.name)
        setValue('attachment', file)
      }
    }
  }
  const handleButtonClick = e => {
    fileInputRef.current.click()
  }

  //event 클릭
  const formEventHandler = async e => {
    const inValid = await trigger([
      'title',
      'writer',
      'toTeam',
      'toPerson',
      'level',
      'workStartDate',
      'workEndDate',
      'workStatus',
    ])

    //console.log(values)
    console.log('inValid', inValid)
    console.log(errors)
  }
  const onSubmit = async data => {
    try {
      if (!editorContent || editorContent.trim().length === 0) {
        alert('요청 상세 내용이 입력되지 않았습니다.')
        return
      }
      if (data.attachment && data.file !== '파일을 선택하세요.') {
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
        setReturnUrl(response)
      }

      await createWorkBoard({
        variables: {
          createWorkBoardDto: {
            title: data.title,
            writer: data.writer,
            toTeam: data.toTeam,
            toPerson: data.toPerson,
            level: data.level,
            startDate: data.workStartDate,
            endDate: data.workEndDate,
            workStatus: data.workStatus,
            detail: editorContent,
            filePath: returnUrl,
          },
        },
        onCompleted: result => {
          if (result?.createWorkBoard?.ok) {
            alert('정상적으로 등록완료 되었습니다.')
          } else {
            alert('등록에 실패하였습니다.')
            console.log(result?.createWorkBoard?.error)
          }
        },
      })
    } catch (error) {
      console.error('Error:', error.response?.data || error.message)
      if (error.response) {
        switch (error.response.status) {
          case 400:
            alert('요청데이터가 잘못되었습니다. 입력값을 확인하세요.')
            break
          case 401:
            alert('인증되지 않은 사용자입니다. 다시 로그인해주세요.')
            break
          case 500:
            alert('서버 오류입니다. 잠시 후 다시 시도해주세요.')
            break
          default:
            alert('알수없는 오류가 발생했습니다.')
        }
      } else {
        alert('네트워크 오류가 발생했습니다.')
      }
    }
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
                    maxLength={12}
                    {...register('title', {
                      validate: value => {
                        return value.trim() !== '' || '글 제목을 입력하세요.'
                      },
                    })}
                    label={
                      <FilterLabel>
                        글 제목<span>*</span>
                      </FilterLabel>
                    }
                    onChange={e => {
                      setValue('title', e.target.value)
                    }}
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
                    defaultValue={mMe.data.mMe.mUsername}
                    readOnly={true}
                    label={<FilterLabel>작성자</FilterLabel>}
                  />
                  {errors.writer && (
                    <p className="px-2 pt-2 text-xs text-red">
                      {String(errors.writer.message)}
                    </p>
                  )}
                </AreaBox>
                <AreaBox>
                  <Input
                    labelPlacement="outside"
                    placeholder="ex) 영업팀"
                    variant="bordered"
                    radius="md"
                    type="text"
                    className="w-full"
                    maxLength={12}
                    {...register('toTeam')}
                    label={<FilterLabel>전달 부서 또는 팀</FilterLabel>}
                    onChange={e => {
                      clearErrors('toPerson')
                      setValue('toTeam', e.target.value)
                    }}
                  />
                  {errors.toTeam && (
                    <p className="px-2 pt-2 text-xs text-red">
                      {String(errors.toTeam.message)}
                    </p>
                  )}
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
                        <PersonName key={index}>
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
                    isDisabled={false}
                    labelPlacement="outside"
                    label="작업난이도"
                    placeholder=" "
                    className="w-full"
                    variant="bordered"
                    selectedKeys={[workLevelsKey]}
                    {...register('level')}
                    onChange={e => {
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

                  {errors.level && (
                    <p className="px-2 pt-2 text-xs text-red">
                      {String(errors.level.message)}
                    </p>
                  )}
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
                          showYearDropdown
                          selected={field.value}
                          openToDate={new Date()}
                          placeholderText="날짜를 선택해주세요."
                          isClearable
                          onChange={date => {
                            field.onChange(date)
                          }}
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
                  {errors.workStartDate && (
                    <p className="px-2 pt-2 text-xs text-red">
                      {String(errors.workStartDate.message)}
                    </p>
                  )}
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
                          showYearDropdown
                          selected={field.value}
                          openToDate={new Date()}
                          placeholderText="날짜를 선택해주세요."
                          isClearable
                          onChange={date => {
                            field.onChange(date)
                          }}
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
                  {errors.workEndDate && (
                    <p className="px-2 pt-2 text-xs text-red">
                      {String(errors.workEndDate.message)}
                    </p>
                  )}
                </AreaBox>

                <AreaBox>
                  <Select
                    isDisabled={false}
                    labelPlacement="outside"
                    label="작업진행상태"
                    placeholder="작업 진행상태를 선택하세요."
                    className="w-full"
                    variant="bordered"
                    selectedKeys={[workStatusSelectedKey]}
                    {...register('workStatus', {})}
                    onChange={e => {
                      setWorkStatusSelectedKey(e.target.value)
                      setValue('workStatus', e.target.value)
                    }}
                  >
                    <SelectItem key="미처리">미처리</SelectItem>
                    <SelectItem key="진행중">진행중</SelectItem>
                    <SelectItem key="작업완료">작업완료</SelectItem>
                    <SelectItem key="재진행요청">재진행요청</SelectItem>
                  </Select>
                  {errors.workStatus && (
                    <p className="px-2 pt-2 text-xs text-red">
                      {String(errors.workStatus.message)}
                    </p>
                  )}
                </AreaBox>
              </FlexBox>
              <EditorBox>
                <QuillWrapper>
                  <QuillNoSSRWrapper
                    forwardedRef={quillRef}
                    onChange={onEditorStateChange}
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
                    <Button color={'primary'} onClick={handleButtonClick}>
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
                  {errors.file && (
                    <p className="px-2 pt-2 text-xs text-red">
                      {String(errors.file.message)}
                    </p>
                  )}
                </AreaBox>
              </FlexBox>
              <BtnBox>
                <Button
                  type="submit"
                  //type="button"
                  size="md"
                  radius="md"
                  variant="solid"
                  color="primary"
                  className="w-full text-white"
                  //onClick={formEventHandler}
                >
                  등록
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

          {/**
         *  <Editor view={view}></Editor>
          <EditorViewer view={view}></EditorViewer>
         */}
        </DetailBox>
      </ConArea>
    </MainWrap>
  )
}
testEditor.getLayout = page => <Layout>{page}</Layout>
