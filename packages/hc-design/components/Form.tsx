import {
  Button,
  Checkbox,
  CheckboxGroup,
  Input,
  ScrollShadow,
  Textarea,
} from '@nextui-org/react'
import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useRecoilState } from 'recoil'
import { formGroupSelectedState } from '@/lib/recoilAtoms'
import badwords from '@/lib/badwords.json'
import { gql, useMutation, useQuery } from '@apollo/react-hooks'

const STUDENT_STATE_MUTATION = gql`
  mutation Mutation(
    $stName: String!
    $phoneNum1: String!
    $subject: [String]!
    $agreement: String!
    $progress: Int!
    $adviceTypes: [String]!
    $classMethod: [String]
    $receiptDiv: String
    $campus: String
    $detail: String
  ) {
    createStudentState(
      stName: $stName
      phoneNum1: $phoneNum1
      subject: $subject
      agreement: $agreement
      progress: $progress
      adviceTypes: $adviceTypes
      classMethod: $classMethod
      receiptDiv: $receiptDiv
      campus: $campus
      detail: $detail
    ) {
      error
      message
      ok
    }
  }
`

export const SEE_ADVICE_TYPE_QUERY = gql`
  query Query {
    seeAdviceType {
      adviceType {
        id
        type
      }
      error
      message
      ok
    }
  }
`
type FormValues = {
  groupSelected: string[]
  methodSelect: string[]
  campus: string
  name: string
  phone: string
  contents: string
  privacy: string
}
const adviceList = [
  '포토샵',
  '에펙',
  '모션그래픽',
  '게임원화',
  '자격증',
  '일러스트',
  '시네마 4D',
  '웹툰',
  '이모티콘',
  '국민취업지원제도',
  '프리미어 프로',
  '영상편집',
  '디지털드로잉',
  'JAVA/IT',
  '업무제휴',
]
export default function Form() {
  const [studentStateResult] = useMutation(STUDENT_STATE_MUTATION)
  // const { loading, error, data: adciveData } = useQuery(SEE_ADVICE_TYPE_QUERY)
  // const adviceList = adciveData?.seeAdviceType.adviceType || []
  const [groupSelected, setGroupSelected] = useRecoilState(
    formGroupSelectedState,
  )
  const [methodSelect, setMethodSelect] = useState([])
  const regExp = new RegExp(badwords.join('|'), 'i')
  const [checkPrivacy, setCheckPrivacy] = useState(false)
  const [isButtonClickable, setButtonClickable] = useState(true)
  const {
    register,
    handleSubmit,
    control,
    setValue,
    setError,
    clearErrors,
    setFocus,
    formState: { errors },
  } = useForm()

  const onSubmit = async (data: FormValues) => {
    console.log(data)
    setButtonClickable(false)
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
            stName: data.name,
            phoneNum1: data.phone,
            subject: [],
            agreement: data.privacy ? '동의' : '비동의',
            progress: 0,
            adviceTypes: data.groupSelected,
            campus: '신촌',
            detail: data.contents,
            receiptDiv: '온라인',
            classMethod: data.methodSelect,
          },
          onCompleted: result => {
            console.log(result)
            if (result.createStudentState.ok) {
              alert('상담신청이 완료되었습니다. 😊')
            }
          },
        })
      }
    } catch (error) {
      console.error(error)
    }

    setTimeout(() => {
      setButtonClickable(true)
    }, 500)
  }

  useEffect(() => {
    if (groupSelected.length !== 0) {
      clearErrors('groupSelected')
    }
  }, [groupSelected])

  useEffect(() => {}, [isButtonClickable])

  const handleCheckboxChange = (value: string[]) => {
    setValue('groupSelected', value)
    setGroupSelected(value)
  }

  const handleMethodChange = (value: string[]) => {
    setValue('methodSelect', value)
    setMethodSelect(value)
  }

  const handleRemoveItem = (index: number) => {
    const updatedGroupSelected = groupSelected.filter((_, i) => i !== index)
    setValue('groupSelected', updatedGroupSelected)
    setGroupSelected(updatedGroupSelected)
  }

  // if (error) {
  //   console.log(error)
  // }

  return (
    <>
      <div className="wrap">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col mt-10">
          <div className="flex flex-col w-full">
            <p className="mb-3 text-lg text-[#100061] font-bold">
              * 원하시는 분야을 선택해주세요. 중복 선택이 가능합니다.
            </p>
            <div className="w-full border-2 font-bold border-[#100061] rounded-lg p-7">
              <h4 className="text-lg mb-[0.5rem] text-[#ea0000]">
                상담분야 선택(필수)
              </h4>
              <Controller
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: '상담 분야를 최소 1개 이상 선택해주세요.',
                  },
                }}
                name="groupSelected"
                render={({ field, fieldState }) => (
                  <CheckboxGroup
                    value={groupSelected}
                    orientation={'horizontal'}
                    onValueChange={handleCheckboxChange}
                    classNames={{
                      wrapper: 'gap-x-[2rem] gap-y-[0.5rem]',
                    }}
                  >
                    {adviceList !== null &&
                      adviceList.map((item, index) => (
                        <Checkbox
                          key={index}
                          value={item}
                          radius={'full'}
                          classNames={{
                            wrapper: 'before:border-[#100061]',
                          }}
                        >
                          <span className="text-lg text-[#100061]">{item}</span>
                        </Checkbox>
                      ))}
                    {adviceList === null && (
                      <div className="text-zinc-600">
                        등록된 분야가 없습니다.
                      </div>
                    )}
                  </CheckboxGroup>
                )}
              />
              <h4 className="font-bold my-[0.5rem] text-primary text-lg">
                수업 방식 선택
              </h4>
              <Controller
                control={control}
                name="groupSelected"
                render={({ field, fieldState }) => (
                  <CheckboxGroup
                    value={methodSelect}
                    orientation={'horizontal'}
                    onValueChange={handleMethodChange}
                    classNames={{
                      wrapper: 'gap-x-[2rem] gap-y-[0.5rem]',
                    }}
                  >
                    <Checkbox
                      key={'오프라인'}
                      value={'오프라인'}
                      radius={'full'}
                      classNames={{
                        wrapper: 'before:border-[#100061] ',
                      }}
                    >
                      <span className="text-lg text-[#100061]">오프라인</span>
                    </Checkbox>
                    <Checkbox
                      key={'실시간 온라인'}
                      value={'실시간 온라인'}
                      radius={'full'}
                      classNames={{
                        wrapper: 'before:border-[#100061] ',
                      }}
                    >
                      <span className="text-lg text-[#100061]">
                        실시간 온라인
                      </span>
                    </Checkbox>
                  </CheckboxGroup>
                )}
              />
            </div>
          </div>
          <div className="mt-4 f-full">
            <div className="relative w-full border-2 border-[#100061] rounded-lg pt-[4.5rem] wmd:pt-3 pb-3 pr-3 pl-3 wmd:pl-40 min-h-[10rem] wmd:min-h-[4rem] flex flex-wrap mb-2">
              <p className="absolute top-[1rem] wmd:top-[50%] wmd:left-[2rem] wmd:-translate-y-[50%] bg-[#100061] px-5 py-2 text-center font-bold text-white rounded-full">
                선택 분야
              </p>
              {groupSelected.map((item, index) => (
                <div
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
                </div>
              ))}
              {methodSelect.map((item, index) => (
                <div
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
                </div>
              ))}
              {errors.groupSelected && (
                <p className="px-2 pt-2 text-xs text-red-500">
                  {String(errors.groupSelected.message)}
                </p>
              )}
            </div>
            <div>
              {/* <li className="hidden py-2">
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
              </li> */}
              <div className="flex flex-col w-full lg:gap-4 lg:flex-row">
                <div className="w-full py-2">
                  <Input
                    variant="bordered"
                    radius="md"
                    type="text"
                    label="이름"
                    className="w-full"
                    classNames={{
                      inputWrapper: 'border-[#100061]',
                    }}
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
                </div>
                <div className="w-full py-2">
                  <Input
                    variant="bordered"
                    radius="md"
                    type="text"
                    label="휴대폰 번호"
                    className="w-full"
                    classNames={{
                      inputWrapper: 'border-[#100061]',
                    }}
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
                </div>
              </div>
              <div className="py-2">
                <p className="text-lg font-bold text-[#100061]">상담 내용</p>
                <Textarea
                  maxLength={300}
                  classNames={{
                    inputWrapper: 'border-[#100061]',
                  }}
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
              </div>
            </div>
            <div>
              <p className="text-lg font-bold text-[#100061]">
                개인정보처리방침
              </p>
              <div className="mt-3 border-2 border-[#100061] rounded-lg">
                <ScrollShadow className="w-full h-60">
                  <p className="p-3 text-sm text-zinc-600">
                    &lt;H ACADEMY 개인정보 보호정책 &gt; <br />
                    <br />
                    1. 개인정보의 수집 목적 <br />
                    - H ACADEMY 사이트 내 서비스 제공 계약의 성립 및 유지 종료를
                    위한 본인 식별 및 실명확인, 가입의사 확인, 회원에 대한 고지
                    사항 전달 등 <br />- H ACADEMY 사이트 내 서비스 제공을 위한
                    통합ID 제공, 카드발급, 포인트 적립 및 사용,포인트 정산,
                    고객센터 운영, 불량회원 부정이용 방지 및 비인가 사용방지,
                    이벤트 및 마케팅 기획관리, 서비스 개발을 위한 연구조사, 물품
                    등의 배송 등 <br />- H ACADEMY 사이트 내 서비스 관련 각종
                    이벤트 및 행사 관련 정보안내를 위한 전화, SMS, 이메일, DM
                    발송 등의 마케팅 활동 등 <br />- 당사 및 제휴사 상품서비스에
                    대한 제반 마케팅(대행포함) 활동 관련 전화, SMS, 이메일, DM
                    발송을 통한 마케팅, 판촉행사 및 이벤트, 사은행사 안내 등{' '}
                    <br /> <br />
                    2. 수집하는 개인정보 항목 <br />
                    [필수입력사항 ]<br />- 성명, 아이디, 비밀번호, 이메일주소,
                    주소, 우편물수령지, 전화번호(휴대폰번호 포함),이메일주소,
                    생일 등 (i-PIN을 통한 신규가입의 경우 주민등록번호가 아닌
                    본인 확인 기관이 제공한 정보를 수집합니다.)
                    <br />
                    [선택입력항목]
                    <br />- 이메일/SMS/전화/DM 수신동의 ,결혼 여부, 결혼기념일,
                    기타 기념일, 선호 브랜드 등 개인별 서비스 제공을 위해 필요한
                    항목 및 추가 입력 사항 <br />
                    [서비스 이용 또는 사업처리 과정에서 생성 수집되는 각종 거래
                    및 개인 성향 정보] <br />- 서비스이용기록, 접속로그, 쿠키,
                    접속IP정보, 결제기록, 이용정지기록 등 단, 이용자의 기본적
                    인권 침해의 우려가 있는 민감한 개인정보(인종 및 민족, 사상
                    및 신조, 출신지 및 본적지, 정치적 성향 및 범죄기록, 건강상태
                    및 성생활 등)는 수집하지 않습니다.
                    <br />
                    <br />
                    3. 개인정보의 보유/이용기간 및 폐기
                    <br />
                    당사(패밀리 사이트 내)는 수집된 회원의 개인정보는 수집 목적
                    또는 제공 받은 목적이 달성되면 지체없이 파기함을 원칙으로
                    합니다. 다만, 다음 각 호의 경우 일정기간 동안 예외적으로
                    수집한 회원정보의 전부 또는 일부를 보관할 수 있습니다.
                    <br />- 고객요구사항 처리 및 A/S의 목적 : 수집한 회원정보를
                    회원탈퇴 후 30일간 보유
                    <br />- 당사가 지정한 쿠폰 서비스의 임의적인 악용을 방지
                    하기 위한 목적 : 수집한 회원정보 중 회원의 기념일 쿠폰
                    사용여부에 관한 정보를 회원 탈퇴 후 1년 간 보유
                    <br />- 회원 자격 상실의 경우 : H ACADEMY 사이트 내 부정
                    이용 및 타 회원의 추가적인 피해 방지를 위해 수집한
                    회원정보를 회원 자격 상실일로부터 2년간 보유
                    <br />- 기타 당사 및 제휴사가 필요에 의해 별도로 동의를 득한
                    경우 : 별도 동의를 받은 범위 (회원정보 및 보유 기간) 내에서
                    보유
                    <br />
                    <br />
                    상기 조항에도 불구하고 상법 및 '전자상거래 등에서
                    소비자보호에 관한 법률'등 관련 법령의 규정에 의하여 다음과
                    같이 일정기간 보유해야 할 필요가 있을 경우에는 관련 법령이
                    정한 기간 또는 다음 각 호의 기간 동안 회원정보를 보유할 수
                    있습니다.
                    <br />- 계약 또는 청약철회 등에 관한 기록 : 5년
                    <br />- 대금결제 및 재화등의 공급에 관한 기록 : 5년
                    <br />- 소비자의 불만 또는 분쟁처리에 관한 기록 : 3년
                    <br />
                    <br />
                    개인정보를 파기할 때에는 아래와 같이 재생할 수 없는 방법을
                    사용하여 이를 삭제합니다.
                    <br />- 종이에 출력된 개인정보 : 분쇄기로 분쇄하거나 소각
                    <br />- 전자적 파일 형태로 저장된 개인정보 : 기록을 재생할
                    수 없는 기술적 방법을 사용하여 삭제
                  </p>
                </ScrollShadow>
              </div>
              <Checkbox
                isSelected={checkPrivacy}
                onValueChange={e => {
                  setValue('privacy', e)
                  setCheckPrivacy(e)
                }}
                className="mt-2 "
                radius={'full'}
                classNames={{
                  wrapper: 'before:border-[#100061] ',
                  label: 'text-[#100061]',
                }}
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
              className="w-full lg:max-w-[50%] mt-5 mx-auto mb-0 block text-xl text-white rounded-full bg-primary"
              isDisabled={!isButtonClickable}
            >
              {!isButtonClickable
                ? '잠시만 기다려주세요....'
                : '온라인 상담 신청하기'}
            </Button>
          </div>
        </form>
      </div>
    </>
  )
}
