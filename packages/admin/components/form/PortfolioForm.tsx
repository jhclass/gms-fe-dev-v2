import { styled } from 'styled-components'
import 'react-datepicker/dist/react-datepicker.css'
import { Button, Checkbox, Input, Textarea } from '@nextui-org/react'
import { useMutation } from '@apollo/client'
import { CREATE_PORTFOLIO_MUTATION } from '@/graphql/mutations'
import { Controller, useForm } from 'react-hook-form'
import useUserLogsMutation from '@/utils/userLogs'
import { useRef, useState } from 'react'
import Link from 'next/link'
import {
  SEARCH_PORTFLIO_STUDENTS_QUERY,
  SEARCH_SM_QUERY,
} from '@/graphql/queries'
import axios from 'axios'

const DetailForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const FlexBox = styled.div`
  width: 100%;
  display: flex;
  gap: 1rem;
  align-items: flex-start;
  flex: 1 3;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`

const AreaBox = styled.div`
  flex: 1;
  width: 100%;
  position: relative;
`

const FilterLabel = styled.label`
  font-weight: 500;
  font-size: 0.875rem;
  line-height: 1.25rem;
  color: ${({ theme }) => theme.colors.black};
  padding-bottom: 0.1rem;
  display: block;

  span {
    color: red;
  }
`
const CheckAreaBox = styled.div`
  flex: 1;
  width: 100%;
  position: relative;
  display: flex;
  gap: 0.5rem;
  align-items: center;
`
const CheckText = styled.p`
  font-weight: 500;
  font-size: 0.875rem;
  line-height: normal;
  color: ${({ theme }) => theme.colors.black};
  display: block;

  span {
    font-weight: 700;
  }
`
const FilesBox = styled.div`
  margin-top: 0.5rem;
  display: flex;
  gap: 1rem;
  align-items: flex-start;
  flex-wrap: wrap;
`
const FilesBtn = styled.button`
  position: relative;
  border-radius: 0.5rem;
  overflow: hidden;
  width: 5rem;
  height: 5rem;
  background-color: ${({ theme }) => theme.colors.lightPrimary};
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  font-size: 3rem;
  text-align: center;
  color: #fff;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  /* @media (max-width: 768px) {
    width: 100%;
  } */
`
const FilesItemBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
  align-items: center;
`

const FilesItem = styled.div`
  position: relative;
  border-radius: 0.5rem;
  overflow: hidden;
  width: 5rem;
  height: 5rem;
  background-color: #fff;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  font-size: 4rem;
  text-align: center;
  color: #fff;
  font-weight: 700;
`
const FilesDelBtn = styled.button`
  display: flex;
  align-items: center;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.gray};
`
const UrlBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: flex-start;
`
const URLItemBox = styled.div`
  display: flex;
  gap: 0.3rem;
`
const UrlText = styled.span`
  display: block;
  color: ${({ theme }) => theme.colors.gray};
  font-size: 0.875rem;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`
const UrlInputBox = styled.div`
  margin-top: 0.5rem;
  display: flex;
  gap: 0.5rem;
`

const BtnBox = styled.div`
  display: flex;
  align-items: center;
  padding-top: 1.75rem;
  width: 5rem;

  @media (max-width: 768px) {
    padding-top: 0;
    width: 100%;
  }
`

export default function PortfolioForm({
  setIsCreate,
  subjectId,
  paymentId,
  studentName,
}) {
  const { userLogs } = useUserLogsMutation()
  const [createPortfolio] = useMutation(CREATE_PORTFOLIO_MUTATION)
  const [avatarImg, setAvatartImg] = useState([])
  const [validFiles, setValidFiles] = useState([])
  const [urlList, setUrlList] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [best, setBest] = useState(false)
  const fileInputRef = useRef(null)
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    reset,
    setValue,
    control,
    formState,
  } = useForm()
  const { errors } = formState

  const onSubmit = async data => {
    if (validFiles.length === 0) {
      setError('portfolio', {
        type: 'manual',
        message:
          '포트폴리오는 적어도 1개 이상, 스크린샷으로 등록하여야 합니다.',
      })
    }
    const uploadedUrls = []
    //s3에 전송
    for (const file of validFiles) {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('folderName', 'portfolios')
      try {
        const token = localStorage.getItem('token')
        if (!token) {
          throw new Error(`token 에러!`)
        }
        const { data } = await axios.post(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/s3/upload`,
          formData,
          {
            headers: {
              'Content-Type': 'mulipart/form-data',
              token,
            },
          },
        )
        uploadedUrls.push(data)
      } catch (error) {
        console.error(`파일 업로드 실패: ${error.message}`)
        throw new Error(`파일 업로드 중 문제가 발생했습니다.`)
      }
    }
    createPortfolio({
      variables: {
        subjectId: subjectId,
        studentPaymentId: paymentId,
        isBest: data.isBest ? 'Y' : 'N',
        filePath: uploadedUrls,
        url: urlList,
        details: data.details,
      },
      refetchQueries: [SEARCH_SM_QUERY, SEARCH_PORTFLIO_STUDENTS_QUERY],
      onCompleted: result => {
        userLogs(
          `${studentName} 포트폴리오 추가`,
          `ok: ${result.createStudentPortfolio.ok}`,
        )
        if (result.createStudentPortfolio.ok) {
          setIsCreate(true)
          alert(`${studentName} 포트폴리오 추가되었습니다.`)
          reset()
        }
      },
    })
  }

  const handleCheckboxChange = value => {
    // setValue('isWeekend', value[0])
    setBest(value)
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB
    const validImageTypes = [
      'image/jpeg',
      'image/png',
      'image/gif',
      'image/webp',
    ] // 허용할 이미지 타입 목록
    const files = event.target.files

    if (files && files.length > 0) {
      const newValidFiles = []
      const errors = []
      const uploadedUrls = [] // 업로드된 파일 경로를 저장

      Array.from(files).forEach(file => {
        if (!validImageTypes.includes(file.type)) {
          errors.push(
            `${file.name}: 허용되지 않는 파일 형식입니다. (jpg, jpeg, png, gif, webp만 가능)`,
          )
        } else if (file.size > MAX_FILE_SIZE) {
          errors.push(
            `${file.name}: 파일 크기가 너무 큽니다. (최대 10MB 이하만 가능)`,
          )
        } else {
          newValidFiles.push(file)
        }
      })
      if (errors.length > 0) {
        setError('filePath', {
          type: 'manual',
          message: errors.join('\n'),
        })
      } else {
        clearErrors('filePath')
      }
      if (newValidFiles.length > 0) {
        clearErrors('filePath')

        // 기존 validFiles와 새로운 validFiles를 합칩니다.
        setValidFiles(prevValidFiles => [...prevValidFiles, ...newValidFiles])

        newValidFiles.forEach(file => {
          const reader = new FileReader()
          reader.onloadend = () => {
            setAvatartImg(prev => [...prev, reader.result])
          }
          reader.readAsDataURL(file)
        })
      }
    }
  }

  const handleRemoveFile = (index: number) => {
    setValidFiles(prevValidFiles => {
      const updatedFiles = [...prevValidFiles]
      updatedFiles.splice(index, 1)
      return updatedFiles
    })

    setAvatartImg(prevAvatartImg => {
      const updatedAvatartImg = [...prevAvatartImg]
      updatedAvatartImg.splice(index, 1)
      return updatedAvatartImg
    })
  }
  const handleButtonClick = () => {
    fileInputRef.current.click()
  }
  const isValidURL = url => {
    try {
      new URL(url)
      return true
    } catch {
      return false
    }
  }
  const handleUrlClick = () => {
    if (isValidURL(inputValue)) {
      setUrlList([...urlList, inputValue])
      setInputValue('')
      clearErrors('url')
    } else {
      setError('url', {
        type: 'manual',
        message: '올바른 URL 형식이 아닙니다.',
      })
    }
  }
  const handleRemoveURL = (index: number) => {
    setUrlList(prevUrlList => {
      const updatedUrls = [...prevUrlList]
      updatedUrls.splice(index, 1)
      return updatedUrls
    })
  }

  const handleUrlInputKeyDown = event => {
    if (event.key === 'Enter') {
      event.preventDefault() // 기본 폼 제출 동작을 막기
      handleUrlClick() // URL 추가 버튼 클릭 핸들러 호출
    }
  }

  return (
    <>
      <DetailForm onSubmit={handleSubmit(onSubmit)}>
        <FlexBox>
          <CheckAreaBox>
            <CheckText>
              <span>{studentName}</span>학생을 우수학생으로 선정하시겠습니까?
            </CheckText>
            <Controller
              control={control}
              name="isBest"
              render={({ field }) => (
                <Checkbox
                  isSelected={best}
                  classNames={{ wrapper: 'mr-[0.3rem]' }}
                  onValueChange={e => {
                    handleCheckboxChange(e)
                    field.onChange(e)
                  }}
                >
                  <CheckText>선정</CheckText>
                </Checkbox>
              )}
            />
          </CheckAreaBox>
        </FlexBox>
        <FlexBox>
          <div>
            <FilterLabel>
              포트폴리오 <span>*</span>
            </FilterLabel>
            <FilesBox>
              {avatarImg?.map((img, index) => (
                <FilesItemBox key={index}>
                  <FilesItem
                    style={{
                      backgroundImage: `url('${img}')`,
                    }}
                  />
                  <FilesDelBtn
                    type="button"
                    onClick={() => handleRemoveFile(index)}
                  >
                    <i className="xi-close-circle" />
                  </FilesDelBtn>
                </FilesItemBox>
              ))}
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleFileChange}
                multiple
              />
              <FilesBtn type="button" onClick={handleButtonClick}>
                <i className="xi-plus" />
              </FilesBtn>
            </FilesBox>
            {errors.filePath && (
              <p className="px-2 pt-2 text-xs text-red">
                {String(errors.filePath.message)}
              </p>
            )}
          </div>
        </FlexBox>
        <FlexBox>
          <AreaBox>
            <FilterLabel>포트폴리오 URL</FilterLabel>
            <UrlBox>
              {urlList?.map((item, index) => (
                <URLItemBox key={index}>
                  <Link href={item} target="_blank">
                    <UrlText>{item}</UrlText>
                  </Link>
                  <FilesDelBtn
                    type="button"
                    onClick={() => handleRemoveURL(index)}
                  >
                    <i className="xi-close-circle" />
                  </FilesDelBtn>
                </URLItemBox>
              ))}
            </UrlBox>
            <UrlInputBox>
              <Input
                variant="bordered"
                value={inputValue}
                onKeyDown={handleUrlInputKeyDown}
                onChange={e => setInputValue(e.target.value)}
                placeholder="https://example.com"
              />
              <Button
                type="button"
                color="primary"
                className="bg-lightPrimary text-[1.5rem]"
                onClick={handleUrlClick}
              >
                <i className="xi-plus" />
              </Button>
            </UrlInputBox>
            {errors.url && (
              <p className="px-2 pt-2 text-xs text-red">
                {String(errors.url.message)}
              </p>
            )}
          </AreaBox>
        </FlexBox>
        <FlexBox>
          <AreaBox>
            <Textarea
              label={
                <FilterLabel>
                  한줄 평가<span>*</span>
                </FilterLabel>
              }
              labelPlacement="outside"
              className="max-w-full"
              variant="bordered"
              minRows={5}
              onChange={e => {
                register('details').onChange(e)
              }}
              {...register('details', {
                required: {
                  value: true,
                  message: '한줄 평가를 입력해주세요.',
                },
              })}
            />
            {errors.details && (
              <p className="px-2 pt-2 text-xs text-red">
                {String(errors.details.message)}
              </p>
            )}
          </AreaBox>
          <BtnBox>
            <Button
              type="submit"
              size="md"
              radius="md"
              color="primary"
              className="md:w-[50%] w-full"
            >
              저장
            </Button>
          </BtnBox>
        </FlexBox>
      </DetailForm>
    </>
  )
}
