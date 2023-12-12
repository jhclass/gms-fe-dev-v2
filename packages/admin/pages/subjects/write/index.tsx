import MainWrap from '@/components/wrappers/MainWrap'
import { useState } from 'react'
import Breadcrumb from '@/components/common/Breadcrumb'
import { styled } from 'styled-components'
import router from 'next/router'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { Input, Select, SelectItem } from '@nextui-org/react'
import { subStatusState } from '@/lib/recoilAtoms'
import { useRecoilValue } from 'recoil'
import { useMutation } from '@apollo/client'
import { CREATE_SUBJECT_MUTATION } from '@/graphql/mutations'
import { Controller, useForm } from 'react-hook-form'
import Button2 from '@/components/common/Button'
import useUserLogsMutation from '@/utils/userLogs'

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
  gap: 1rem;
  justify-content: center;
`

export default function Consoultation() {
  const [createSubject] = useMutation(CREATE_SUBJECT_MUTATION)
  const { userLogs } = useUserLogsMutation()
  const subStatus = useRecoilValue(subStatusState)
  const [subjectSelected, setSubjectSelected] = useState()

  const { register, control, handleSubmit, formState } = useForm()
  const { errors } = formState
  const [fee, setFee] = useState(0)
  const [sjStartDate, setSjStartDate] = useState(null)
  const [sjEndDate, setSjEndDate] = useState(null)
  const [sub, setSub] = useState('없음')

  const onSubmit = data => {
    console.log(data)
    console.log(typeof data.endDate, data.endDate)
    console.log(typeof data.startDate, data.startDate)
    console.log(typeof feeReplace(data.fee), data.fee)
    console.log(typeof data.roomNum, data.roomNum)

    createSubject({
      variables: {
        subDiv: data.subDiv,
        subjectName: data.subjectName,
        fee: data.fee,
        startDate: data.stVisit === undefined ? null : new Date(data.startDate),
        endDate: data.endDate === undefined ? null : new Date(data.endDate),
        roomNum: data.roomNum === undefined ? null : data.roomNum,
      },
      onCompleted: data => {
        console.log(data)
        alert('등록되었습니다.')
      },
    })
    userLogs(`${data.subjectName}과정 등록`)
  }

  const handleSubChange = e => {
    setSub(e.target.value)
  }
  const feeReplace = fee => {
    const result = parseInt(fee.replaceAll(',', ''))
    return result
  }
  const feeFormet = fee => {
    // const fee2 = fee
    const result = fee
    // .toString()
    // .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')
    return result
  }

  return (
    <>
      <MainWrap>
        {/* <Breadcrumb
          onFilterToggle={setFilterActive}
          isActive={filterActive}
          onBtn={false}
        /> */}
        <DetailBox>
          <DetailForm onSubmit={handleSubmit(onSubmit)}>
            <FlexBox>
              <AreaBox>
                <Input
                  labelPlacement="outside"
                  placeholder="과정명"
                  variant="bordered"
                  radius="md"
                  type="text"
                  label="과정명"
                  defaultValue={null}
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
              <AreaBox>
                <Input
                  labelPlacement="outside"
                  placeholder="수강료"
                  variant="bordered"
                  radius="md"
                  type="text"
                  label="수강료"
                  value={fee.toLocaleString()}
                  onValueChange={value => {
                    console.log(value)
                    const test = value
                    setFee(parseInt(test))
                  }}
                  onChange={e => {
                    register('fee').onChange(e)
                  }}
                  className="w-full"
                  {...register('fee', {
                    // required: {
                    //   value: true,
                    //   message: '수강료를 입력해주세요.',
                    // },
                    // pattern: {
                    //   value: /\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g,
                    //   message: '숫자만 입력해주세요.',
                    // },
                  })}
                />
                {errors.fee && (
                  <p className="px-2 pt-2 text-xs text-red-500">
                    {String(errors.fee.message)}
                  </p>
                )}
              </AreaBox>
            </FlexBox>
            <FlexBox>
              <AreaBox>
                <Controller
                  control={control}
                  name="subDiv"
                  rules={{
                    required: {
                      value: true,
                      message: '수강 구분을 선택해주세요.',
                    },
                  }}
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
                {errors.subDiv && (
                  <p className="px-2 pt-2 text-xs text-red-500">
                    {String(errors.subDiv.message)}
                  </p>
                )}
              </AreaBox>
              <AreaBox>
                <Input
                  labelPlacement="outside"
                  placeholder="강의실"
                  variant="bordered"
                  radius="md"
                  type="text"
                  label="강의실"
                  onChange={e => {
                    register('roomNum').onChange(e)
                  }}
                  className="w-full"
                  {...register('roomNum')}
                />
              </AreaBox>
            </FlexBox>
            <FlexBox>
              <DatePickerBox>
                <Controller
                  control={control}
                  name="startDate"
                  // locale="ko"
                  render={({ field, fieldState }) => (
                    <DatePicker
                      selected={
                        sjStartDate === null ? null : new Date(sjStartDate)
                      }
                      placeholderText="기간을 선택해주세요."
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
              <DatePickerBox>
                <Controller
                  control={control}
                  name="endDate"
                  render={({ field, fieldState }) => (
                    <DatePicker
                      selected={sjEndDate === null ? null : new Date(sjEndDate)}
                      placeholderText="기간을 선택해주세요."
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
                onClick={() => router.push('/subjects')}
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
