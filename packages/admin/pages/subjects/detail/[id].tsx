import MainWrap from '@/components/wrappers/MainWrap'
import { useEffect, useState } from 'react'
import Breadcrumb from '@/components/common/Breadcrumb'
import { styled } from 'styled-components'
import { useRouter } from 'next/router'
import DatePicker, { registerLocale } from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import ko from 'date-fns/locale/ko'
registerLocale('ko', ko)
import { Input, Select, SelectItem, Switch, Textarea } from '@nextui-org/react'
import { subStatusState } from '@/lib/recoilAtoms'
import { useRecoilValue } from 'recoil'
import { useMutation } from '@apollo/client'
import {
  CREATE_SUBJECT_MUTATION,
  DELETE_SUBJECT_MUTATION,
  SEARCH_SUBJECT_MUTATION,
  UPDATE_SUBJECT_MUTATION,
} from '@/graphql/mutations'
import { Controller, useForm } from 'react-hook-form'
import Button2 from '@/components/common/Button'
import useUserLogsMutation from '@/utils/userLogs'
import { SEE_SUBJECT_QUERY } from '@/graphql/queries'
import useMmeQuery from '@/utils/mMe'

const ConArea = styled.div`
  width: 100%;
  max-width: 1400px;
`
const SwitchDiv = styled.div`
  display: flex;
  align-items: center;
  background: #fff;
  padding: 0.5rem 0 0.5rem 0.5rem;
  border-radius: 0.75rem;
`
const SwitchText = styled.span`
  width: max-content;
  padding-right: 0.5rem;
  font-size: 0.8rem;
`
const DetailForm = styled.form`
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
const UpdateTime = styled.p`
  span {
    color: #555;
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
const BtnBox = styled.div<{ $isMaster: boolean }>`
  display: flex;
  gap: 1rem;
  justify-content: center;

  @media (max-width: 768px) {
    ${props => props.$isMaster && 'flex-wrap:wrap;'}
    button {
      ${props => props.$isMaster && ' width: calc(50% - 0.5rem);'}
    }
  }
`

export default function SubjectDetail() {
  const router = useRouter()
  const { useMme } = useMmeQuery()
  const mGrade = useMme('mGrade')
  const subjectId = typeof router.query.id === 'string' ? router.query.id : null
  const subjectsPage = router.query.page
  const subjectsLimit = router.query.limit
  const [createSubject] = useMutation(CREATE_SUBJECT_MUTATION)
  const [deleteSubject] = useMutation(DELETE_SUBJECT_MUTATION)
  const [updateSubject] = useMutation(UPDATE_SUBJECT_MUTATION)
  const [searchSubjectMutation, { data, loading, error }] = useMutation(
    SEARCH_SUBJECT_MUTATION,
    {
      variables: {
        searchStudentStateId: parseInt(subjectId),
      },
    },
  )
  const subjectState = data?.searchSubject.result[0] || []
  const { userLogs } = useUserLogsMutation()
  const subStatus = useRecoilValue(subStatusState)

  const { register, control, setValue, handleSubmit, formState } = useForm({
    defaultValues: {
      updateSubjectId: subjectState.id,
      subDiv: subjectState.subDiv,
      subjectName: subjectState.subjectName,
      subjectCode: subjectState.subjectCode,
      fee: subjectState.fee,
      startDate: subjectState.startDate,
      endDate: subjectState.endDate,
      roomNum: subjectState.roomNum,
      exposure: subjectState.exposure,
      totalTime: subjectState.totalTime,
      teacherName: subjectState.teacherName,
    },
  })
  const { isDirty, dirtyFields, errors } = formState
  const [sjStartDate, setSjStartDate] = useState(null)
  const [sjEndDate, setSjEndDate] = useState(null)
  const [sub, setSub] = useState('없음')
  const [teacher, setTeacher] = useState('강사명 없음')
  const [isSelected, setIsSelected] = useState(Boolean)
  useEffect(() => {
    searchSubjectMutation({
      variables: {
        searchSubjectId: parseInt(subjectId),
      },
    })
  }, [router])

  useEffect(() => {
    if (subjectState.exposure) {
      setIsSelected(subjectState.exposure)
    }
    if (subjectState.subDiv === null || subjectState.subDiv === undefined) {
      setSub('없음')
    } else {
      setSub(subjectState.subDiv)
    }

    if (
      subjectState.teacherName === undefined ||
      subjectState.teacherName === null
    ) {
      setTeacher('강사명 없음')
    } else {
      setTeacher(subjectState.teacherName)
    }

    if (
      subjectState.startDate === null ||
      subjectState.startDate === undefined
    ) {
      setSjStartDate(null)
    } else {
      const date = parseInt(subjectState.startDate)
      setSjStartDate(date)
    }

    if (subjectState.endDate === null || subjectState.endDate === undefined) {
      setSjEndDate(null)
    } else {
      const date = parseInt(subjectState.endDate)
      setSjEndDate(date)
    }
  }, [subjectState])
  const onSubmit = data => {
    if (isDirty || subjectState.exposure !== isSelected) {
      const isModify = confirm('변경사항이 있습니다. 수정하시겠습니까?')
      if (isModify) {
        updateSubject({
          variables: {
            updateSubjectId: subjectState.id,
            subjectName: data.subjectName.trim(),
            subjectCode: data.roomNum === '' ? null : data.subjectCode.trim(),
            fee: parseInt(data.fee.trim()),
            subDiv: data.subDiv,
            startDate:
              data.startDate === null
                ? null
                : typeof data.startDate === 'string'
                ? new Date(parseInt(data.startDate))
                : new Date(data.startDate),
            endDate:
              data.endDate === null
                ? null
                : typeof data.endDate === 'string'
                ? new Date(parseInt(data.endDate))
                : new Date(data.endDate),
            roomNum: data.roomNum === '' ? null : data.roomNum.trim(),
            exposure: isSelected,
            totalTime:
              data.totalTime === '' ? 0 : parseInt(data.totalTime.trim()),
            teacherName:
              data.teacherName === '' ? '강사명 없음' : data.teacherName,
          },
          onCompleted: () => {
            alert('수정되었습니다.')
          },
        })
        const dirtyFieldsArray = [...Object.keys(dirtyFields)]
        userLogs(
          `${subjectState.subjectName} 과목 수정`,
          dirtyFieldsArray.join(', '),
        )
      }
    }
  }
  const onCopy = () => {
    const isCopy = confirm('과정을 복사하시겠습니까?')
    if (isCopy) {
      createSubject({
        variables: {
          subDiv: subjectState?.subDiv,
          subjectName: `${subjectState?.subjectName}_copy`,
          subjectCode:
            subjectState?.subjectCode === null
              ? null
              : subjectState?.subjectCode,
          fee: parseInt(subjectState?.fee),
          startDate:
            subjectState?.startDate === null
              ? null
              : new Date(subjectState?.startDate),
          endDate:
            subjectState?.endDate === null
              ? null
              : new Date(subjectState?.endDate),
          roomNum: subjectState.roomNum === null ? null : subjectState?.roomNum,
          exposure: subjectState?.exposure,
          totalTime:
            subjectState?.totalTime === null
              ? 0
              : parseInt(subjectState?.totalTime),
          teacherName:
            subjectState?.teacherName === null
              ? '강사명 없음'
              : subjectState?.teacherName,
        },
        refetchQueries: [
          {
            query: SEE_SUBJECT_QUERY,
            variables: { page: 1, limit: 10 },
          },
        ],
        onCompleted: data => {
          alert('복사되었습니다.')
          userLogs(`${subjectState.subjectName} 과정 복사`)
          router.push('/subjects')
        },
      })
    }
  }

  const onDelete = data => {
    const isDelete = confirm('과정을 삭제하시겠습니까?')
    if (isDelete) {
      deleteSubject({
        variables: {
          deleteSubjectId: data,
        },
        refetchQueries: [
          {
            query: SEE_SUBJECT_QUERY,
            variables: {
              page: Number(subjectsPage),
              limit: Number(subjectsLimit),
            },
          },
        ],
        onCompleted: () => {
          alert('과정이 삭제되었습니다.')
          router.push('/subjects')
          userLogs(`${subjectState.subjectName} 과목 삭제`)
        },
      })
    }
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
  const feeDate = fee => {
    const result = Number(fee.replaceAll(',', ''))
    return result
  }
  const feeFormet = fee => {
    const result = parseInt(fee).toLocaleString()
    return result
  }
  const handleSubChange = e => {
    setSub(e.target.value)
  }
  const handleTeacherChange = e => {
    setTeacher(e.target.value)
  }

  return (
    <>
      {data !== undefined && (
        <MainWrap>
          <ConArea>
            <Breadcrumb
              rightArea={true}
              addRender={
                <SwitchDiv>
                  <SwitchText>노출여부</SwitchText>
                  <Switch
                    size="md"
                    isSelected={isSelected}
                    onValueChange={setIsSelected}
                  />
                </SwitchDiv>
              }
            />
            <DetailForm onSubmit={handleSubmit(onSubmit)}>
              <TopInfo>
                <Noti>
                  <span>*</span> 는 필수입력입니다.
                </Noti>
                <UpdateTime>
                  <span>최근 업데이트 일시 :</span>
                  {fametDate(subjectState?.updatedAt)}
                </UpdateTime>
              </TopInfo>
              <DetailDiv>
                <FlexBox>
                  <AreaBox>
                    <Textarea
                      labelPlacement="outside"
                      placeholder="과정명"
                      variant="bordered"
                      radius="md"
                      type="text"
                      label={
                        <FilterLabel>
                          과정명<span>*</span>
                        </FilterLabel>
                      }
                      minRows={1}
                      defaultValue={subjectState?.subjectName}
                      onChange={e => {
                        register('subjectName').onChange(e)
                      }}
                      className="w-full"
                      {...register('subjectName', {
                        required: {
                          value: true,
                          message: '과정명을 입력해주세요.',
                        },
                      })}
                    />
                    {errors.subjectName && (
                      <p className="px-2 pt-2 text-xs text-red-500">
                        {String(errors.subjectName.message)}
                      </p>
                    )}
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
                      label="과정코드"
                      defaultValue={subjectState?.subjectCode}
                      onChange={e => {
                        register('subjectCode').onChange(e)
                      }}
                      className="w-full"
                      {...register('subjectCode')}
                    />
                  </AreaBox>
                  <AreaBox>
                    <Input
                      labelPlacement="outside"
                      placeholder="수강료"
                      variant="bordered"
                      radius="md"
                      type="text"
                      label={
                        <FilterLabel>
                          수강료<span>*</span>
                        </FilterLabel>
                      }
                      defaultValue={subjectState?.fee}
                      onChange={e => {
                        register('fee').onChange(e)
                      }}
                      className="w-full"
                      {...register('fee', {
                        required: {
                          value: true,
                          message: '수강료를 입력해주세요.',
                        },
                        pattern: {
                          value: /^[0-9]+$/,
                          message: '숫자만 입력 가능합니다.',
                        },
                      })}
                    />
                    {errors.fee && (
                      <p className="px-2 pt-2 text-xs text-red-500">
                        {String(errors.fee.message)}
                      </p>
                    )}
                  </AreaBox>
                  <AreaBox>
                    <Controller
                      control={control}
                      name="subDiv"
                      defaultValue={subjectState?.subDiv}
                      render={({ field, fieldState }) => (
                        <Select
                          labelPlacement="outside"
                          defaultValue={subjectState?.subDiv}
                          label={
                            <FilterLabel>
                              수강구분<span>*</span>
                            </FilterLabel>
                          }
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
                    {errors.subDiv && (
                      <p className="px-2 pt-2 text-xs text-red-500">
                        {String(errors.subDiv.message)}
                      </p>
                    )}
                  </AreaBox>
                </FlexBox>
                <FlexBox>
                  <AreaBox>
                    <Input
                      labelPlacement="outside"
                      placeholder="예) 204호 또는 별관 204호"
                      variant="bordered"
                      radius="md"
                      type="text"
                      label="강의실"
                      defaultValue={subjectState?.roomNum}
                      onChange={e => {
                        register('roomNum').onChange(e)
                      }}
                      className="w-full"
                      {...register('roomNum')}
                    />
                  </AreaBox>
                  {/* <AreaBox>
                    <Controller
                      control={control}
                      name="teacherName"
                      defaultValue={subjectState?.teacherName}
                      render={({ field }) => (
                        <Select
                          labelPlacement="outside"
                          label="강사명"
                          placeholder=" "
                          className="w-full"
                          variant="bordered"
                          defaultValue={subjectState?.teacherName}
                          selectedKeys={[teacher]}
                          onChange={value => {
                            field.onChange(value)
                            handleTeacherChange(value)
                          }}
                        >
                          <SelectItem key={'강사명 없음'} value={'강사명 없음'}>
                            {'강사명 없음'}
                          </SelectItem>
                          <SelectItem key={'김강사'} value={'김강사'}>
                            {'김강사'}
                          </SelectItem>
                          <SelectItem key={'이강사'} value={'이강사'}>
                            {'이강사'}
                          </SelectItem>
                          {managerList?.map(item => (
                            <SelectItem key={item.mUsername} value={item.mUsername}>
                              {item.mUsername}
                            </SelectItem>
                          ))}
                        </Select>
                      )}
                    />
                  </AreaBox> */}
                  <AreaBox>
                    <Input
                      labelPlacement="outside"
                      placeholder=" "
                      variant="bordered"
                      radius="md"
                      type="text"
                      label="강사명"
                      defaultValue={subjectState?.teacherName}
                      onChange={e => {
                        register('teacherName').onChange(e)
                      }}
                      className="w-full"
                      {...register('teacherName')}
                    />
                  </AreaBox>
                </FlexBox>
                <FlexBox>
                  <AreaBox>
                    <DatePickerBox>
                      <Controller
                        control={control}
                        name="startDate"
                        defaultValue={subjectState?.startDate}
                        render={({ field }) => (
                          <DatePicker
                            locale="ko"
                            showYearDropdown
                            selected={
                              sjStartDate === null
                                ? null
                                : new Date(sjStartDate)
                            }
                            placeholderText="날짜를 선택해주세요."
                            isClearable
                            onChange={date => {
                              field.onChange(date)
                              setSjStartDate(date)
                            }}
                            ref={field.ref}
                            dateFormat="yyyy/MM/dd"
                            customInput={
                              <Input
                                label="개강일"
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
                        name="endDate"
                        defaultValue={subjectState?.endDate}
                        render={({ field }) => (
                          <DatePicker
                            locale="ko"
                            showYearDropdown
                            selected={
                              sjEndDate === null ? null : new Date(sjEndDate)
                            }
                            placeholderText="날짜를 선택해주세요."
                            isClearable
                            onChange={date => {
                              field.onChange(date)
                              setSjEndDate(date)
                            }}
                            ref={field.ref}
                            dateFormat="yyyy/MM/dd"
                            customInput={
                              <Input
                                label="종강일"
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
                      placeholder="총 강의시간"
                      variant="bordered"
                      radius="md"
                      type="text"
                      label="총 강의시간"
                      defaultValue={subjectState?.totalTime}
                      onChange={e => {
                        register('totalTime').onChange(e)
                      }}
                      className="w-full"
                      {...register('totalTime', {
                        pattern: {
                          value: /^[0-9]+$/,
                          message: '숫자만 입력 가능합니다.',
                        },
                      })}
                    />
                    {errors.totalTime && (
                      <p className="px-2 pt-2 text-xs text-red-500">
                        {String(errors.totalTime.message)}
                      </p>
                    )}
                  </AreaBox>
                </FlexBox>
                <BtnBox $isMaster={mGrade < 2}>
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
                    onClick={() => router.push('/subjects')}
                  >
                    목록으로
                  </Button2>
                  <Button2
                    buttonType="button"
                    width="100%"
                    height="2.5rem"
                    typeBorder={true}
                    fontColor="#ff5900"
                    bgColor="#fff"
                    borderColor="#ff5900"
                    onClick={() => onCopy()}
                  >
                    복사하기
                  </Button2>
                  {mGrade < 2 && (
                    <Button2
                      buttonType="button"
                      width="100%"
                      height="2.5rem"
                      typeBorder={true}
                      fontColor="#fff"
                      bgColor="#ff5900"
                      onClick={() => onDelete(subjectState.id)}
                    >
                      삭제
                    </Button2>
                  )}
                </BtnBox>
              </DetailDiv>
            </DetailForm>
          </ConArea>
        </MainWrap>
      )}
    </>
  )
}
