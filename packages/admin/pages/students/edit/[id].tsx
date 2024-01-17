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
  Input,
  Radio,
  RadioGroup,
  Select,
  SelectItem,
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
import {
  SEARCH_STUDENT_BASIC_MUTATION,
  SEARCH_SUBJECT_BASIC_MUTATION,
  UPDATE_STUDENT_BASIC_MUTATION,
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

export default function StudentsEditInfo() {
  const router = useRouter()
  const { userLogs } = useUserLogsMutation()
  const studentId = typeof router.query.id === 'string' ? router.query.id : null
  const [searchStudentBasic] = useMutation(SEARCH_STUDENT_BASIC_MUTATION)
  const [UpdateStudentBasic] = useMutation(UPDATE_STUDENT_BASIC_MUTATION)
  const { register, control, setValue, handleSubmit, formState } = useForm()
  const { errors, isDirty, dirtyFields } = formState
  const [studentData, setStudentData] = useState(null)
  const [birthdayDate, setBirthdayDate] = useState(null)

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
    if (studentData?.birthday === null || studentData?.birthday === undefined) {
      setBirthdayDate(null)
    } else {
      const date = parseInt(studentData?.birthday)
      setBirthdayDate(date)
    }
  }, [studentData])

  const onSubmit = data => {
    if (isDirty) {
      const isModify = confirm('변경사항이 있습니다. 수정하시겠습니까?')
      if (isModify) {
        UpdateStudentBasic({
          variables: {
            editStudentId: studentData.id,
            name: data.name.trim(),
            phoneNum1: data.phoneNum1.trim(),
            phoneNum2: data.phoneNum2.trim(),
            smsAgreement: data.smsAgreement,
            birthday:
              data.birthday === null
                ? null
                : typeof data.birthday === 'string'
                ? new Date(parseInt(data.birthday))
                : new Date(data.birthday),
          },
          onCompleted: data => {
            alert('수정되었습니다.')
          },
        })
        const dirtyFieldsArray = [...Object.keys(dirtyFields)]
        userLogs(
          `${studentData.name} 수강생 기본정보 수정`,
          dirtyFieldsArray.join(', '),
        )
      }
    }
  }

  return (
    <>
      {studentData !== null && (
        <MainWrap>
          <ConArea>
            <Breadcrumb rightArea={false} />
            <DetailBox>
              <TopInfo>
                <Noti>
                  <span>*</span> 는 필수입력입니다.
                </Noti>
              </TopInfo>
              <form onSubmit={handleSubmit(onSubmit)}>
                <DetailDiv>
                  <FlexBox>
                    <AreaBox>
                      <Input
                        defaultValue={studentData?.name}
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
                        className="w-full"
                        onChange={e => {
                          register('name').onChange(e)
                        }}
                        {...register('name', {
                          required: {
                            value: true,
                            message: '이름을 입력해주세요.',
                          },
                        })}
                      />
                      {errors.name && (
                        <p className="px-2 pt-2 text-xs text-red-500">
                          {String(errors.name.message)}
                        </p>
                      )}
                    </AreaBox>
                    <AreaBox>
                      <Input
                        defaultValue={studentData?.phoneNum1}
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
                        className="w-full"
                        onChange={e => {
                          register('phoneNum1').onChange(e)
                        }}
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
                    <AreaSmallBox>
                      <RadioBox>
                        <Controller
                          control={control}
                          name="smsAgreement"
                          defaultValue={studentData?.smsAgreement}
                          rules={{
                            required: {
                              value: true,
                              message: 'SMS 수신여부를 선택해주세요.',
                            },
                          }}
                          render={({ field }) => (
                            <RadioGroup
                              label={
                                <FilterLabel>
                                  SMS 수신 여부<span>*</span>
                                </FilterLabel>
                              }
                              orientation="horizontal"
                              className="gap-[0.65rem]"
                              defaultValue={studentData?.smsAgreement}
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
                      {errors.smsAgreement && (
                        <p className="px-2 pt-2 text-xs text-red-500">
                          {String(errors.smsAgreement.message)}
                        </p>
                      )}
                    </AreaSmallBox>
                  </FlexBox>
                  <FlexBox>
                    <AreaBox>
                      <DatePickerBox>
                        <Controller
                          control={control}
                          name="birthday"
                          defaultValue={studentData?.birthday}
                          rules={{
                            required: {
                              value: true,
                              message: '생년월일을 선택해주세요.',
                            },
                          }}
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
                      {errors.birthday && (
                        <p className="px-2 pt-2 text-xs text-red-500">
                          {String(errors.birthday.message)}
                        </p>
                      )}
                    </AreaBox>
                    <AreaBox>
                      <Input
                        defaultValue={studentData?.phoneNum2}
                        labelPlacement="outside"
                        placeholder="기타 연락처"
                        variant="bordered"
                        radius="md"
                        type="text"
                        label="기타 연락처"
                        className="w-full"
                        {...register('phoneNum2', {
                          pattern: {
                            value: /^[0-9]+$/,
                            message: '숫자만 입력 가능합니다.',
                          },
                        })}
                      />
                      {errors.phoneNum2 && (
                        <p className="px-2 pt-2 text-xs text-red-500">
                          {String(errors.phoneNum2.message)}
                        </p>
                      )}
                    </AreaBox>
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
                      수정
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
                </DetailDiv>
              </form>
            </DetailBox>
          </ConArea>
        </MainWrap>
      )}
    </>
  )
}
StudentsEditInfo.getLayout = page => <Layout>{page}</Layout>