import {
  Button,
  Checkbox,
  CheckboxGroup,
  Input,
  ScrollShadow,
  Select,
  SelectItem,
  Tab,
  Tabs,
  Textarea,
} from '@nextui-org/react'
import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useRecoilState } from 'recoil'
import { formGroupSelectedState } from '@/lib/recoilAtoms'
import { gql, useMutation } from '@apollo/react-hooks'
import badwords from '@/lib/badwords.json'

const STUDENT_STATE_MUTATION = gql`
  mutation CreateStudentState($input: CreateStudentStateDto!) {
    createStudentState(input: $input) {
      ok
      error
      message
    }
  }
`
type FormValues = {
  groupSelected: string[]
  campus: string
  name: string
  phone: string
  contents: string
  privacy: string
  receiptDiv: string
}

export default function Form() {
  const [studentStateResult] = useMutation(STUDENT_STATE_MUTATION)
  const [groupSelected, setGroupSelected] = useRecoilState(
    formGroupSelectedState,
  )
  const regExp = new RegExp(badwords.join('|'), 'i')
  const [checkPrivacy, setCheckPrivacy] = useState(false)
  const {
    register,
    handleSubmit,
    control,
    setValue,
    setError,
    clearErrors,
    setFocus,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm()

  const onSubmit = async (data: FormValues) => {
    try {
      if (regExp.test(data.contents)) {
        setError('contents', {
          type: 'manual',
          message: '비속어는 사용불가능합니다.',
        })
        setFocus('contents')
      } else {
        await studentStateResult({
          variables: {
            input: {
              stName: data.name,
              subject: data.groupSelected,
              campus: data.campus,
              agreement: data.privacy ? '동의' : '비동의',
              phoneNum1: data.phone,
              detail: data.contents,
              receiptDiv: data.receiptDiv,
            },
          },
          onCompleted: result => {
            if (result.createStudentState.ok) {
              alert('상담신청이 완료되었습니다. 😊')
            }
          },
        })
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (groupSelected.length !== 0) {
      clearErrors('groupSelected')
    }
  }, [groupSelected])

  const handleCheckboxChange = (value: string[]) => {
    setValue('groupSelected', value)
    setGroupSelected(value)
  }

  const handleRemoveItem = (index: number) => {
    const updatedGroupSelected = groupSelected.filter((_, i) => i !== index)
    setValue('groupSelected', updatedGroupSelected)
    setGroupSelected(updatedGroupSelected)
  }

  return (
    <>
      <div className="wrap">
        <h2 className="pb-3 mb-5 text-3xl font-bold border-b-2 border-zinc-600">
          온라인 상담
        </h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col lg:flex-row"
        >
          <div className="hidden lg:w-1/3 lg:mr-10 lg:block">
            <img
              src="https://highclass-image.s3.amazonaws.com/academy/hc_it/eximg/info.webp"
              alt="HighClass"
            />
          </div>
          <div className="flex flex-col w-full lg:w-1/3 lg:mr-10">
            <p className="mb-3 text-base text-zinc-600">
              원하시는 과정을 선택해주세요. 교육과정은 중복 선택이 가능합니다.
            </p>
            <Controller
              control={control}
              rules={{
                required: {
                  value: true,
                  message: '과정을 최소 1개 이상 선택해주세요.',
                },
              }}
              name="groupSelected"
              render={({ field, fieldState }) => (
                <div className="w-full border-2 rounded-lg p-7">
                  <CheckboxGroup
                    value={groupSelected}
                    onValueChange={handleCheckboxChange}
                  >
                    <h4 className="text-base text-primary">상담과정 선택</h4>
                    <Checkbox size="md" value="웹툰">
                      <span className="text-lg text-zinc-600">웹툰</span>
                    </Checkbox>
                    <Checkbox size="md" value="이모티콘">
                      <span className="text-lg text-zinc-600">이모티콘</span>
                    </Checkbox>
                    <Checkbox size="md" value="컴퓨터그래픽스운용기능사">
                      <span className="text-lg text-zinc-600">
                        컴퓨터그래픽스운용기능사
                      </span>
                    </Checkbox>
                    <Checkbox size="md" value="웹디자인기능사">
                      <span className="text-lg text-zinc-600">
                        웹디자인기능사
                      </span>
                    </Checkbox>
                    <Checkbox size="md" value="OA">
                      <span className="text-lg text-zinc-600">OA</span>
                    </Checkbox>
                    <Checkbox size="md" value="실내건축">
                      <span className="text-lg text-zinc-600">실내건축</span>
                    </Checkbox>
                    <Checkbox size="md" value="영상편집">
                      <span className="text-lg text-zinc-600">영상편집</span>
                    </Checkbox>
                    <Checkbox size="md" value="포토샵(단기)">
                      <span className="text-lg text-zinc-600">
                        포토샵(단기)
                      </span>
                    </Checkbox>
                    <h4 className="text-base text-primary">수업 방식 선택</h4>
                    <Checkbox size="md" value="오프라인">
                      <span className="text-lg text-zinc-600">오프라인</span>
                    </Checkbox>
                    <Checkbox size="md" value="실시간 온라인">
                      <span className="text-lg text-zinc-600">
                        실시간 온라인
                      </span>
                    </Checkbox>
                  </CheckboxGroup>
                </div>
              )}
            />
          </div>
          <div className="lg:w-1/3 f-full">
            <ul className="flex flex-wrap mb-2">
              {groupSelected.map((item, index) => (
                <li
                  key={index}
                  className="flex items-center px-2 mx-1 my-1 rounded-lg text-sm/sm border-1 border-primary"
                >
                  <span>{item}</span>
                  <button
                    onClick={() => handleRemoveItem(index)}
                    className="text-lg text-center text-primary"
                  >
                    <i className="xi-close-min" />
                  </button>
                </li>
              ))}
              {errors.groupSelected && (
                <p className="px-2 pt-2 text-xs text-red-500">
                  {String(errors.groupSelected.message)}
                </p>
              )}
            </ul>
            <ul>
              <li className="hidden py-2">
                <Input
                  variant="bordered"
                  radius="md"
                  type="text"
                  label="상담 구분"
                  className="w-full"
                  defaultValue={'온라인'}
                  {...register('receiptDiv')}
                />
              </li>
              <li className="hidden py-2">
                <Select
                  variant="bordered"
                  label="캠퍼스"
                  className="w-full"
                  defaultSelectedKeys={['신촌']}
                  {...register('campus', {
                    required: {
                      value: true,
                      message: '지점을 선택해주세요.',
                    },
                  })}
                >
                  <SelectItem value={'신촌'} key={'신촌'}>
                    신촌
                  </SelectItem>
                </Select>
                {errors.campus && (
                  <p className="px-2 pt-2 text-xs text-red-500">
                    {String(errors.campus.message)}
                  </p>
                )}
              </li>
              <li className="py-2">
                <Input
                  variant="bordered"
                  radius="md"
                  type="text"
                  label="이름"
                  className="w-full"
                  {...register('name', {
                    required: {
                      value: true,
                      message: '이름을 입력해주세요.',
                    },
                    pattern: {
                      value: /^[ㄱ-ㅎ|가-힣]+$/,
                      message: '한글로 입력해주세요.',
                    },
                  })}
                />
                {errors.name && (
                  <p className="px-2 pt-2 text-xs text-red-500">
                    {String(errors.name.message)}
                  </p>
                )}
              </li>
              <li className="py-2">
                <Input
                  variant="bordered"
                  radius="md"
                  type="text"
                  label="휴대폰 번호"
                  className="w-full"
                  maxLength={11}
                  {...register('phone', {
                    required: {
                      value: true,
                      message: '번호를 입력해주세요.',
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
                {errors.phone && (
                  <p className="px-2 pt-2 text-xs text-red-500">
                    {String(errors.phone.message)}
                  </p>
                )}
              </li>
              <li className="py-2">
                <p className="text-lg font-bold">상담 내용</p>
                <Textarea
                  maxLength={300}
                  variant="bordered"
                  placeholder="상담을 원하시는 과목과 내용을 포함하여 최대한 상세하게 적어주시면 상담에 큰 도움이 됩니다."
                  {...register('contents', {
                    maxLength: {
                      value: 300,
                      message: '최대 300자리까지 입력 가능합니다.',
                    },
                  })}
                  className="w-full"
                />
                {errors.contents && (
                  <p className="px-2 pt-2 text-xs text-red-500">
                    {String(errors.contents.message)}
                  </p>
                )}
              </li>
            </ul>
            <div>
              <p className="text-lg font-bold">개인정보처리방침</p>
              <div className="mt-3 border-2 rounded-lg">
                <ScrollShadow className="w-full h-60">
                  <p className="p-3 text-sm text-zinc-600">
                    HighClass가 운영하는 웹&amp;모바일 사이트에 대하여 상담 및
                    이용자가 원하는 서비스를 충족시키기 위해 아래와 같은
                    개인정보를 수집하고 있습니다.
                    <br />
                    <br />
                    <b>1. 수집하는 개인정보 항목 및 수집방법</b>
                    <br />
                    (1) 수집항목
                    <br />
                    필수: 캠퍼스, 상담과목, 이름, 전화번호
                    <br />
                    선택입력: 아이디, 생년월일, 성별, 제목, 내용, 사진 등<br />
                    (2) 개인정보 수집 방법 : 웹&모바일 홈페이지(온라인상담신청,
                    수강료조회, 내일배움카드제(계좌제)조회, 고용보험환급,
                    재직자국비과정조회, 시간표조회, 지점별 위치조회,
                    위탁교육문의 등), 서면양식 외<br />
                    <br />
                    <br />
                    <b>2. 수집한 개인정보의 이용</b>
                    <br />
                    (1) 이용자가 제공한 모든 정보는 교육 서비스 제공, 이벤트
                    안내 등 필요한 용도로만 사용되며, 목적이 변경될 시에는
                    사전에 동의를 구합니다.
                    <br />
                    <br />
                    <br />
                    <b>3. 개인정보의 보유 · 이용기간 및 폐기</b>
                    <br />
                    모든 검토가 완료된 후 5년간 이용자의 조회를 위하여 보관하며,
                    이 후 해당정보를 지체없이 파기합니다.
                    <br />
                    <br />
                    <br />
                    <b>
                      4. 동의를 거부할 권리가 있다는 사실과 동의 거부에 따른
                      불이익 내용
                    </b>
                    <br />
                    이용자는 HighClass가 운영하는 컴퓨터학원 및 계열 브랜드
                    웹&모바일 사이트에서 수집하는 개인정보에 대해 동의를 거부할
                    권리가 있으며 동의 거부 시에는 회원가입 및 인터넷 수강료
                    조회, 온라인 상담 등의 홈페이지 서비스가 일부 제한됩니다.
                    <br />
                    <br />그 밖의 사항은 <b>&lt;개인정보 처리방침&gt;</b>을
                    준수합니다.
                  </p>
                </ScrollShadow>
              </div>
              <Checkbox
                isSelected={checkPrivacy}
                onValueChange={e => {
                  setValue('privacy', e)
                  setCheckPrivacy(e)
                }}
                className="mt-2"
                size="md"
                {...register('privacy', {
                  required: {
                    value: true,
                    message: '개인정보수집 동의를 해주세요.',
                  },
                })}
              >
                개인정보수집 및 이용에 동의합니다.
              </Checkbox>
              {errors.privacy && (
                <p className="text-xs text-red-500">
                  개인정보수집 및 이용에 동의를 체크해주세요.
                </p>
              )}
            </div>
            <Button
              type="submit"
              size="lg"
              className="w-full mt-5 text-xl text-white rounded-lg bg-primary"
            >
              온라인 상담 신청하기
            </Button>
          </div>
        </form>
      </div>
    </>
  )
}
