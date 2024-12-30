import Link from 'next/link'
import { useForm, useWatch } from 'react-hook-form'
import styled from 'styled-components'
import { useRecoilState } from 'recoil'
import { formFocusState } from '@/lib/recoilAtoms'
import { useRouter } from 'next/router'
import { useMutation } from '@apollo/client'
import { Button, Input, Checkbox } from '@nextui-org/react'
import {
  VALIDATE_NUMBER,
  CREATE_BUSINESS_ACCOUNT,
  SEND_SMS_MUTATION,
} from '@/graphql/mutations'
import { useEffect, useState, useRef } from 'react'
import axios from 'axios'

interface IBusinessForm {
  companyName: String
  phoneNum: String
  email: String
  filePath: [String]
  agreement: String
}

const Logo = styled.h1`
  width: 70%;
  margin: 0 auto 3rem;
`

const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  overflow-y: auto;
  padding: 0 2rem;
  background: radial-gradient(
    circle,
    rgba(56, 99, 182, 1),
    rgba(33, 58, 101, 1)
  );
`

const LoginBox = styled.div`
  font-size: 2rem;
  color: #333;
  max-width: 28rem;
  width: 100%;
  padding: 5rem 2rem;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0 0 5rem rgba(0, 0, 0, 0.4);
`
const InputBox = styled.div`
  margin-top: 0.7rem;
  font-size: 1rem;

  label {
    color: inherit;
  }

  input {
    &:-webkit-autofill {
      background-color: transparent !important;
      -webkit-box-shadow: 0 0 0px 0 transparent inset;
      transition: background-color 5000s ease-in-out 0s;
      -webkit-text-fill-color: ${({ theme }) => theme.colors.black} !important;
    }

    &:autofill {
      background-color: transparent !important;
      -webkit-box-shadow: 0 0 0px 0 transparent inset;
      transition: background-color 5000s ease-in-out 0s;
      -webkit-text-fill-color: ${({ theme }) => theme.colors.black} !important;
    }
  }
`

const BtnBox = styled.div`
  margin-top: 3rem;
`
const ValidationBtnBox = styled.div`
  margin: 1rem 0;
`
const AlinkWrap = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  padding-top: 2.5rem;
`
const Alink = styled.p`
  margin-top: 0.7rem;
  font-size: 0.9rem;
  font-weight: 200;
  color: ${({ theme }) => theme.colors.black};
  padding-left: 0.2rem;

  a {
    position: relative;
  }

  a:after {
    content: '';
    width: 100%;
    height: 1px;
    background: #fff;
    position: absolute;
    bottom: 0;
    left: 0;
  }
`

const ErrorMessage = styled.p`
  padding: 0.5rem 0.5rem 0;
  font-size: 0.75rem;
  line-height: 1rem;
  color: tomato;
`
const InfoBox = styled.div`
  font-size: 1rem;
  margin-bottom: 1rem;
  background-color: ${({ theme }) => theme.colors.lightPrimary};
`
const Intro = styled.p`
  font-size: 1rem;
  margin-bottom: 1rem;
`

const RowTitle = styled.h3`
  font-weight: bold;
  margin: 1rem 0;
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
const PrimaryColorTextBox = styled.span`
  color: ${({ theme }) => theme.colors.primary};
  font-weight: bold;
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

export default function BusinessMember() {
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    reset,
    setValue,
    getValues,
    setFocus,
    control,
    formState,
  } = useForm({
    defaultValues: {
      ownerName: '',
      companyName: '',
      phoneNum: '',
      email: '',
      validateNumber: '',
      filePath: '',
      agreement: 'N',
    },
  })

  const { errors } = formState
  const [focusState, setFocusState] = useRecoilState(formFocusState)
  // 상태 업데이트
  const handleFocus = (field: string, value: boolean) => {
    setFocusState(prev => ({
      ...prev,
      [field]: value,
    }))
  }

  //번호 인증 관련
  const [hasValidateNum, setHasValidateNum] = useState<boolean>(false)
  const [checkValidateNum, setCheckValidateNum] = useState<boolean>(false)
  const [completeValidateNum, setCompleteValidateNum] = useState<boolean>(false)
  // 연속 클릭 방지
  const [isRequestAllowed, setIsRequestAllowed] = useState(true)
  const [timer, setTimer] = useState(0)
  const [submitError, setSubmitError] = useState('')
  //인증번호 저장
  const [valiNumber, setValiNumber] = useState<string>('')
  const router = useRouter()
  const [createBusinessAccountReq, { loading, error, data }] = useMutation(
    CREATE_BUSINESS_ACCOUNT,
  )
  const [sendSms] = useMutation(SEND_SMS_MUTATION)
  const [validateNumber] = useMutation(VALIDATE_NUMBER)
  const [
    ownerNameValue,
    companyNameValue,
    phoneNumValue,
    emailValue,
    validateNumberValue,
  ] = useWatch({
    control,
    name: ['ownerName', 'companyName', 'phoneNum', 'email', 'validateNumber'],
  })
  const [authImg, setAuthImg] = useState([])
  const [validFiles, setValidFiles] = useState([])
  const fileInputRef = useRef(null)
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
            setAuthImg(prev => [...prev, reader.result])
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

    setAuthImg(prevAuthImg => {
      const updatedAuthImg = [...prevAuthImg]
      updatedAuthImg.splice(index, 1)
      return updatedAuthImg
    })
  }
  const handleButtonClick = () => {
    fileInputRef.current.click()
  }

  const onSubmit = async (data: IBusinessForm) => {
    try {
      const uploadedUrls = []
      for (const file of validFiles) {
        const formData = new FormData()
        formData.append('file', file)
        formData.append('folderName', 'business')
        try {
          const { data } = await axios.post(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/s3/upload`,
            formData,
            {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            },
          )
          uploadedUrls.push(data)
        } catch (error) {
          console.error(`파일 업로드 실패: ${error.message}`)
          setError('filePath', {
            type: 'manual',
            message: `파일업로드 중 문제가 발생하였습니다.`,
          })
        }
      }
      //db 전송
      createBusinessAccountReq({
        variables: {
          companyName: data.companyName,
          phoneNum: data.phoneNum,
          validate: completeValidateNum ? 'Y' : 'N',
          email: data.email,
          filePath: uploadedUrls,
          agree: data.agreement,
        },
        onCompleted: result => {
          if (result.createBusinessAccountReq?.ok === false) {
            throw new Error(result.createBusinessAccountReq?.error)
          }
        },
      })
      //sms메세지 발송
      sendSms({
        variables: {
          receiver: process.env.NEXT_PUBLIC_MANAGER_NUMBER_1,
          message: `새로운 사업자 회원 요청이 있습니다. 확인하세요.`,
        },
        onCompleted: result => {
          if (result.sendSms?.ok === false) {
            throw new Error(result.sendSms?.error)
          }
        },
      })
      alert('전송완료 되었습니다. 24시간 이내 확인 후 연락드리겠습니다. :)')
      //링크이동 (로그인 페이지)
      router.push('/login')
    } catch (error) {
      console.error(error.message)
    }
  }

  const inputRefs = useRef<
    (HTMLInputElement | HTMLButtonElement | HTMLLabelElement | null)[]
  >([]) // 입력 필드 refs 배열
  const handleKeyDown = (index: number) => (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault() // 기본 Enter 동작 방지
      const nextElement = inputRefs.current[index + 1]
      if (nextElement) {
        nextElement.focus() // 다음 요소로 포커스 이동
      }
    }
  }
  // useEffect(() => {

  // }, [
  //   ownerNameValue,
  //   companyNameValue,
  //   phoneNumValue,
  //   emailValue,
  //   validateNumberValue,
  // ])

  useEffect(() => {
    if (validFiles.length < 2) {
      setError('filePath', {
        type: 'manual',
        message:
          '이미지가 첨부되지 않았습니다. 사업자 등록증과 신분증 이미지를 각각 첨부하여 주세요.',
      })
      return
    } else if (validFiles.length > 2) {
      setError('filePath', {
        type: 'manual',
        message: `이미지는 2개만 첨부하면 됩니다.(신분증 앞면 과 사업자 등록증) `,
      })
      return
    } else {
      clearErrors('filePath')
    }
  }, [validFiles])
  const handleValidateNumRequest = async () => {
    try {
      const phoneNum = getValues('phoneNum').trim()

      if (!phoneNum || typeof phoneNum !== 'string') {
        setError('phoneNum', {
          type: 'manual',
          message: '휴대폰 번호를 입력하세요.',
        })
        return
      }

      const { data } = await validateNumber({
        variables: { input: { phoneNum } },
      })

      const { ok, message, validateNum } = data?.validateNumber || {}
      if (ok) {
        setHasValidateNum(true)
        setValiNumber(validateNum)
        alert('인증번호가 발송되었습니다. 확인 후 입력해주세요.')
        // 요청 제한 시작
        setIsRequestAllowed(false)
        setTimer(5)

        const interval = setInterval(() => {
          setTimer(prev => {
            if (prev === 1) {
              clearInterval(interval)
              setIsRequestAllowed(true) // 제한 해제
            }
            return prev - 1
          })
        }, 1000)
      } else {
        alert(`인증번호 요청 실패:${message}`)
      }
    } catch (error) {
      console.error(error)
      alert('인증번호 요청 중 오류가 발생했습니다. 다시 시도해주세요.')
    }
  }
  const checkValidateNumFunc = async () => {
    try {
      // check
      const writeValidateNum = getValues('validateNumber').trim()
      if (writeValidateNum === valiNumber) {
        setCheckValidateNum(true)
        setCompleteValidateNum(true)
        alert('인증완료 되었습니다.')
        if (inputRefs.current[6]) {
          inputRefs.current[6].focus()
        }
      }
    } catch (error) {
      throw new Error(error.message)
    }
  }

  return (
    <>
      <Container>
        <LoginBox>
          <Logo>사업자 회원 신청</Logo>
          <Intro>
            {' '}
            <PrimaryColorTextBox>
              제출 후 3일 이내로 아이디를 발급하여 작성하신
              <br />
              이메일로 발송하여 드립니다.
            </PrimaryColorTextBox>
          </Intro>
          <form onSubmit={handleSubmit(onSubmit)}>
            <InputBox>
              <InfoBox>
                <p>
                  제출하신 자료는 저희 솔루션을 이용하실 수 있도록 자격을
                  부여하는데 있어 확인용도로만 사용됩니다.
                  <br />
                  아래 '동의'에 체크하여 주시기 바랍니다.
                </p>
              </InfoBox>
              <Checkbox
                //isSelected={best}
                classNames={{ wrapper: 'mr-[0.3rem]' }}
                {...register('agreement', {
                  validate: value => {
                    if (value === 'N') {
                      return `[필수] 동의에 체크해주세요.`
                    }
                    return true
                  },
                })}
                tabIndex={1}
                ref={el => (inputRefs.current[0] = el)}
                onKeyDown={handleKeyDown(0)} // 첫 번째 필드
                onChange={e =>
                  setValue('agreement', e.target.checked ? 'Y' : 'N', {
                    shouldValidate: true,
                  })
                }
              >
                <CheckText>
                  <span>[필수] 동의</span>
                </CheckText>
              </Checkbox>
              {errors.agreement && (
                <ErrorMessage>{String(errors.agreement.message)}</ErrorMessage>
              )}
            </InputBox>
            <InputBox>
              <RowTitle>이름</RowTitle>

              <Input
                type="text"
                variant="bordered"
                label="사업자 등록증의 대표자 명을 작성하여주세요."
                id="ownerName"
                autoCapitalize="none"
                className="text-black"
                {...register('ownerName', {
                  required: {
                    value: true,
                    message: '이 필드는 입력이 되어야 합니다.',
                  },
                })}
                onFocus={() => handleFocus('ownerName', true)} // DOM 이벤트 직접 처리
                onBlur={e => handleFocus('ownerName', !!e.target.value.trim())}
                tabIndex={2}
                ref={el => (inputRefs.current[1] = el)}
                onKeyDown={handleKeyDown(1)} // 첫 번째 필드
                onChange={e =>
                  setValue('ownerName', e.target.value, {
                    shouldValidate: true,
                  })
                }
              />
              {errors.ownerName && (
                <ErrorMessage>{String(errors.ownerName.message)}</ErrorMessage>
              )}
            </InputBox>
            <InputBox>
              <RowTitle>상호명</RowTitle>

              <Input
                type="text"
                variant="bordered"
                label="사업자등록증의 상호명을 작성하여주세요."
                id="companyName"
                className="text-black"
                {...register('companyName', {
                  required: {
                    value: true,
                    message: '이 필드는 입력되어야 합니다.',
                  },
                })}
                onFocus={() => handleFocus('companyName', true)} // DOM 이벤트 직접 처리
                onBlur={e =>
                  handleFocus('companyName', !!e.target.value.trim())
                }
                tabIndex={3}
                ref={el => (inputRefs.current[2] = el)}
                onKeyDown={handleKeyDown(2)} // 첫 번째 필드
                onChange={e =>
                  setValue('companyName', e.target.value, {
                    shouldValidate: true,
                  })
                }
              />
              {errors.companyName && (
                <ErrorMessage>
                  {String(errors.companyName.message)}
                </ErrorMessage>
              )}
            </InputBox>
            <InputBox>
              <RowTitle>전화번호</RowTitle>

              <Input
                type="text"
                variant="bordered"
                label="본인소유의 휴대전화번호를 입력하세요."
                id="phoneNum"
                className="text-black"
                {...register('phoneNum', {
                  required: {
                    value: true,
                    message: '이 필드는 입력되어야 합니다.',
                  },
                  onChange: e =>
                    setValue('phoneNum', e.target.value, {
                      shouldValidate: true,
                    }),
                })}
                onFocus={() => handleFocus('phoneNum', true)} // DOM 이벤트 직접 처리
                onBlur={e => handleFocus('phoneNum', !!e.target.value.trim())}
                tabIndex={4}
                ref={el => (inputRefs.current[3] = el)}
                onKeyDown={handleKeyDown(3)} // 첫 번째 필드
                disabled={hasValidateNum}
                onChange={e =>
                  setValue('phoneNum', e.target.value, { shouldValidate: true })
                }
              />
              {errors.phoneNum && (
                <ErrorMessage>{String(errors.phoneNum.message)}</ErrorMessage>
              )}
              {/* 인증 요청 메시지 */}
              {!hasValidateNum && (
                <ErrorMessage>인증번호를 요청하세요.</ErrorMessage>
              )}

              {!hasValidateNum && (
                <ValidationBtnBox>
                  <Button
                    type="button"
                    color="secondary"
                    className="w-full text-white"
                    tabIndex={5}
                    ref={el => (inputRefs.current[4] = el)}
                    onKeyDown={handleKeyDown(4)} // 첫 번째 필드
                    disabled={checkValidateNum}
                    onClick={handleValidateNumRequest}
                  >
                    인증번호요청
                  </Button>
                </ValidationBtnBox>
              )}

              {hasValidateNum && (
                <ValidationBtnBox>
                  <Button
                    type="button"
                    color="danger"
                    className="w-full text-white"
                    tabIndex={5}
                    ref={el => (inputRefs.current[4] = el)}
                    onKeyDown={handleKeyDown(4)} // 첫 번째 필드
                    disabled={!isRequestAllowed}
                    onClick={
                      !completeValidateNum ? handleValidateNumRequest : null
                    }
                  >
                    {!isRequestAllowed ? `${timer}초 후 다시 시도` : '재요청'}
                  </Button>
                </ValidationBtnBox>
              )}

              {hasValidateNum && (
                <Input
                  type="text"
                  variant="bordered"
                  label="인증번호를 입력하세요."
                  id="validateNumber"
                  className="text-black"
                  {...register('validateNumber', {
                    required: {
                      value: true,
                      message: '이 필드는 입력되어야 합니다.',
                    },
                    onChange: e =>
                      setValue('validateNumber', e.target.value, {
                        shouldValidate: true,
                      }),
                  })}
                  onFocus={() => handleFocus('validateNumber', true)} // DOM 이벤트 직접 처리
                  onBlur={e =>
                    handleFocus('validateNumber', !!e.target.value.trim())
                  }
                  tabIndex={6}
                  ref={el => (inputRefs.current[5] = el)}
                  onKeyDown={handleKeyDown(5)} // 첫 번째 필드
                  disabled={checkValidateNum}
                />
              )}

              {errors.validateNumber && (
                <ErrorMessage>
                  {String(errors.validateNumber.message)}
                </ErrorMessage>
              )}
              {hasValidateNum && (
                <ValidationBtnBox>
                  <Button
                    type="button"
                    color="secondary"
                    className="w-full text-white"
                    disabled={checkValidateNum}
                    onClick={!completeValidateNum ? checkValidateNumFunc : null}
                  >
                    {!completeValidateNum
                      ? '인증번호 확인'
                      : '인증번호 확인 완료'}
                  </Button>
                </ValidationBtnBox>
              )}
            </InputBox>
            <InputBox>
              <RowTitle>이메일</RowTitle>

              <Input
                type="text"
                variant="bordered"
                label="계정정보가 발송되오니 정확하게 작성해주세요."
                id="email"
                autoCapitalize="none"
                className="text-black"
                {...register('email', {
                  validate: value => {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/ // 이메일 검증 정규식
                    if (!value.trim()) {
                      return '이 필드는 입력되어야 합니다.' // 빈 값 에러 메시지
                    }
                    if (!emailRegex.test(value)) {
                      return '유효한 이메일 주소를 입력해주세요' // 이메일 형식 에러 메시지
                    }
                    return true // 검증 통과
                  },
                })}
                onFocus={() => handleFocus('email', true)} // DOM 이벤트 직접 처리
                onBlur={e => handleFocus('email', !!e.target.value.trim())}
                tabIndex={7}
                ref={el => (inputRefs.current[6] = el)}
                onKeyDown={handleKeyDown(6)} // 첫 번째 필드
                onChange={e =>
                  setValue('email', e.target.value, {
                    shouldValidate: true,
                  })
                }
              />
              {errors.email && (
                <ErrorMessage>{String(errors.email.message)}</ErrorMessage>
              )}
            </InputBox>
            <InputBox>
              <RowTitle>파일첨부</RowTitle>
              <FilterLabel>
                <span>*</span> 사업자등록증, 신분증을 첨부하여 주세요.
                <br />
                신분증의 주민등록번호 뒷자리는 마스킹 부탁드립니다.
              </FilterLabel>
              <FilesBox>
                {authImg?.map((img, index) => (
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
                <FilesBtn
                  type="button"
                  onClick={handleButtonClick}
                  tabIndex={8}
                  ref={el => (inputRefs.current[7] = el)}
                  onKeyDown={handleKeyDown(7)} // 첫 번째 필드
                >
                  <i className="xi-plus" />
                </FilesBtn>
              </FilesBox>
              {errors.filePath && (
                <p className="px-2 pt-2 text-xs text-red">
                  {String(errors.filePath.message)}
                </p>
              )}
            </InputBox>
            {submitError && <ErrorMessage>{submitError}</ErrorMessage>}
            <BtnBox>
              <Button
                type="submit"
                color="primary"
                className="w-full text-white"
                tabIndex={9}
                ref={el => (inputRefs.current[8] = el)}
                onKeyDown={handleKeyDown(8)} // 첫 번째 필드
                //onClick={testOnSubmit}
              >
                전송
              </Button>
            </BtnBox>
          </form>
          <AlinkWrap>
            <Alink>
              <Link href={'/'}>로그인 화면으로 돌아가기</Link>
            </Alink>{' '}
          </AlinkWrap>
        </LoginBox>
      </Container>
    </>
  )
}
