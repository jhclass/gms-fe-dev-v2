import styled from 'styled-components'
import { useResetRecoilState } from 'recoil'
import { studentPageState } from '@/lib/recoilAtoms'
import { Controller, useForm } from 'react-hook-form'
import { Button, Input } from '@nextui-org/react'
import { Suspense, useState } from 'react'
import { useRouter } from 'next/router'
import SubDivSelect from '../common/SubDivSelect'

const FilterForm = styled.form`
  display: flex;
  width: 100%;
  gap: 1.5rem;
  border-radius: 0.5rem;
  margin-top: 1rem;
  flex-direction: column;
  padding: 0 0.75rem;
  @media (max-width: 768px) {
    gap: 1rem;
  }
`
const BoxTop = styled.div`
  display: flex;
  flex: 1;
  gap: 2rem;

  @media (max-width: 768px) {
    gap: 1rem;
    flex-direction: column;
  }
`
const BoxMiddle = styled.div`
  display: flex;
  flex: 1;
  gap: 2rem;
  @media (max-width: 768px) {
    gap: 1rem;
    flex-direction: column;
  }
`
const ItemBox = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`

const BtnBox = styled.div`
  display: flex;
  gap: 1rem;
  flex: 1;
`
const FilterLabel = styled.label`
  font-weight: 500;
  font-size: 0.875rem;
  line-height: 1.25rem;
  color: ${({ theme }) => theme.colors.black};
  padding-bottom: 0.1rem;
  display: block;
`
const LodingDiv = styled.div`
  padding: 1.5rem;
  width: 100%;
  min-width: 20rem;
  position: relative;
  background: #fff;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export default function EmploymentStudentFilterForm({
  onFilterSearch,
  setStudentFilter,
  studentFilter,
}) {
  const router = useRouter()
  const studentPage = useResetRecoilState(studentPageState)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [sub, setSub] = useState('-')

  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { isDirty, errors },
  } = useForm({
    defaultValues: {
      studentName: '',
      phoneNum: '',
      subDiv: '-',
    },
  })

  // useEffect(() => {
  //   if (
  //     Object.keys(studentFilter).length === 0 ||
  //     studentFilter?.studentName === null
  //   ) {
  //     setName('')
  //   } else {
  //     setName(studentFilter?.studentName)
  //   }
  //   if (
  //     Object.keys(studentFilter).length === 0 ||
  //     studentFilter?.phoneNum === null
  //   ) {
  //     setPhone('')
  //   } else {
  //     setPhone(studentFilter?.phoneNum)
  //   }
  //   if (
  //     Object.keys(studentFilter).length === 0 ||
  //     studentFilter?.birthday === null
  //   ) {
  //     setBirthdayRange([null, null])
  //   } else {
  //     setBirthdayRange([studentFilter?.birthday[0], studentFilter?.birthday[1]])
  //   }
  //   if (
  //     Object.keys(studentFilter).length === 0 ||
  //     studentFilter?.createdAt === null
  //   ) {
  //     setCreatDateRange([null, null])
  //   } else {
  //     setCreatDateRange([
  //       studentFilter?.createdAt[0],
  //       studentFilter?.createdAt[1],
  //     ])
  //   }
  // }, [router, studentFilter])

  const onSubmit = data => {
    if (isDirty || data.progress !== undefined) {
      const validateDateRange = (dateRange, message) => {
        if (dateRange !== undefined) {
          if (dateRange[1] !== null) {
            return true
          } else {
            alert(message)
            return false
          }
        } else {
          return true
        }
      }
      const birthdayDate = validateDateRange(
        data.birthday,
        '생년월일의 마지막날을 선택해주세요.',
      )
      const createDate = validateDateRange(
        data.createdAt,
        '방문예정일의 마지막날을 선택해주세요.',
      )
      if (birthdayDate && createDate) {
        const filter = {
          studentName: data.studentName === '' ? null : data.studentName,
          phoneNum: data.phoneNum === '' ? null : data.phoneNum,
          birthday: data.birthday === undefined ? null : data.birthday,
          createdAt: data.createdAt === undefined ? null : data.createdAt,
        }
        setStudentFilter(filter)
        onFilterSearch(true)
        studentPage()
      }
    }
  }

  const handleReset = () => {
    setSub('-')
    reset()
  }

  const handleSubChange = e => {
    setSub(e.target.value)
  }

  return (
    <FilterForm onSubmit={handleSubmit(onSubmit)}>
      <BoxTop>
        <ItemBox>
          <Input
            labelPlacement="outside"
            placeholder=" "
            type="text"
            variant="bordered"
            label="수강생이름"
            value={name}
            onValueChange={setName}
            id="studentName"
            {...register('studentName', {
              pattern: {
                value: /^[가-힣a-zA-Z0-9\s]*$/,
                message: '한글, 영어, 숫자만 사용 가능합니다.',
              },
            })}
          />
          {errors.studentName && (
            <p className="px-2 pt-2 text-xs text-red">
              {String(errors.studentName.message)}
            </p>
          )}
        </ItemBox>
        <ItemBox>
          <Input
            labelPlacement="outside"
            placeholder="'-'없이 작성해주세요"
            type="text"
            variant="bordered"
            label="연락처"
            value={phone}
            onValueChange={setPhone}
            maxLength={11}
            id="phoneNum"
            {...register('phoneNum', {
              maxLength: {
                value: 11,
                message: '최대 11자리까지 입력 가능합니다.',
              },
              pattern: {
                value: /^[0-9]+$/,
                message: '숫자만 사용가능합니다.',
              },
            })}
          />
          {errors.phoneNum && (
            <p className="px-2 pt-2 text-xs text-red">
              {String(errors.phoneNum.message)}
            </p>
          )}
        </ItemBox>
      </BoxTop>
      <BoxMiddle>
        <ItemBox>
          <Controller
            control={control}
            name="subDiv"
            defaultValue={'-'}
            render={({ field }) => (
              <Suspense
                fallback={
                  <LodingDiv>
                    <i className="xi-spinner-2" />
                  </LodingDiv>
                }
              >
                <SubDivSelect
                  selectedKey={sub}
                  field={field}
                  defaultValue={'-'}
                  label={<FilterLabel>수강구분</FilterLabel>}
                  handleChange={handleSubChange}
                  optionDefault={{ type: '-' }}
                  isHyphen={true}
                />
              </Suspense>
            )}
          />
        </ItemBox>
        <ItemBox></ItemBox>
      </BoxMiddle>
      <BtnBox>
        <Button type="submit" color="primary" className="w-[50%] text-white">
          검색
        </Button>
        <Button
          color="primary"
          variant="bordered"
          className="w-[50%] text-primary"
          onClick={handleReset}
        >
          초기화
        </Button>
      </BtnBox>
    </FilterForm>
  )
}
