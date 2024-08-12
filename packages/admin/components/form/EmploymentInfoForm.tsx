import { useEffect, useState } from 'react'
import { styled } from 'styled-components'
import { useRouter } from 'next/router'
import { Button, Select, SelectItem } from '@nextui-org/react'
import { useMutation } from '@apollo/client'
import { EDIT_STUDENT_INFOMATION_MUTATION } from '@/graphql/mutations'
import StudentInfo from '@/components/items/StudentInfo'
import Address from '@/components/common/Address'
import { useForm } from 'react-hook-form'
import useUserLogsMutation from '@/utils/userLogs'

const FlexConBox = styled.div`
  display: flex;
  gap: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`

const AreaBox = styled.div`
  width: 100%;
  display: flex;

  > div {
    width: 100%;
  }
`
const FilterLabel = styled.label`
  font-weight: 500;
  font-size: 0.875rem;
  line-height: 1.25rem;
  color: ${({ theme }) => theme.colors.black};
  display: block;
  padding-bottom: 0.375rem;
  span {
    color: red;
  }
`
const LineBox = styled.div`
  padding-left: 0.25rem;
  padding-right: 0.25rem;
  border-bottom: 2px solid hsl(240 6% 90%);
  height: 40px;
  line-height: 40px;
  font-size: 0.875rem;
`
const BtnBox = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: center;
`

export default function EmploymentInfoForm({ paymentData }) {
  const { userLogs } = useUserLogsMutation()
  const [editStudent] = useMutation(EDIT_STUDENT_INFOMATION_MUTATION)
  const [selectValue, setSelectValue] = useState('유형선택')
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    control,
    formState: { isDirty, dirtyFields, errors },
  } = useForm({
    defaultValues: {
      supportType: '',
      mAddresses: '',
      mAddressDetail: '',
      mZipCode: '',
    },
  })

  useEffect(() => {
    if (paymentData) {
      reset({
        supportType: paymentData.supportType || '유형선택',
        mAddresses: paymentData.mAddresses || '',
        mAddressDetail: paymentData.mAddressDetail || '',
        mZipCode: paymentData.mZipCode || '',
      })

      if (paymentData.supportType) {
        setSelectValue(paymentData.supportType)
      }
    }
  }, [paymentData])

  const onSubmit = data => {
    console.log(data)
    // if (isDirty) {
    //   const isModify = confirm('변경사항이 있습니다. 수정하시겠습니까?')
    //   if (isModify) {
    //     try {
    //       const result = await editStudent({
    //         variables: {
    //           editStudentPaymentId: null,
    //           subjectId: null,
    //           mAddressDetail: null,
    //           mAddresses: null,
    //           mZipCode: null,
    //         },
    //       })
    //       const dirtyFieldsArray = [...Object.keys(dirtyFields)]
    //       userLogs(
    //         `${item.stName} 취업 현황 수정`,
    //         `ok: ${
    //           result.data.editHopeForEmployment.ok
    //         } / ${dirtyFieldsArray.join(', ')}`,
    //       )

    //       if (!result.data.editHopeForEmployment.ok) {
    //         throw new Error('취업 현황 수정 실패')
    //       }
    //       refetch()
    //       alert('수정되었습니다.')
    //     } catch (error) {
    //       console.error('취업 현황 수정 중 에러 발생:', error)
    //       alert('취업 현황 수정 처리 중 오류가 발생했습니다.')
    //     }
    //   }
    // }
  }

  console.log(paymentData)

  const formatDate = data => {
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
  const calculateAge = birthday => {
    const today = new Date()
    const timestamp = parseInt(birthday, 10)
    const birthDate = new Date(timestamp)

    let age = today.getFullYear() - birthDate.getFullYear()

    const monthDifference = today.getMonth() - birthDate.getMonth()
    const dayDifference = today.getDate() - birthDate.getDate()

    if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
      age--
    }

    return age
  }
  const handleSelectChange = e => {
    setSelectValue(e.target.value)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <StudentInfo
        studentData={paymentData.student}
        detailAll={false}
        record={true}
      />
      <FlexConBox>
        <AreaBox>
          <div>
            <FilterLabel>나이</FilterLabel>
            <LineBox>{calculateAge(paymentData.student.birthday)}세</LineBox>
          </div>
        </AreaBox>
        <AreaBox>
          <div>
            <FilterLabel>선발평가 점수</FilterLabel>
            <LineBox>{paymentData.seScore}점</LineBox>
          </div>
        </AreaBox>
        <AreaBox className="h-[66px]">
          <Select
            label={'유형'}
            labelPlacement="outside"
            className="w-full"
            variant="bordered"
            selectedKeys={[selectValue]}
            onChange={e => handleSelectChange(e)}
            classNames={{
              label: 'w-[4rem] pr-0 text-left',
            }}
          >
            <SelectItem value={'유형선택'} key={'유형선택'}>
              유형선택
            </SelectItem>
            <SelectItem value={'1유형'} key={'1유형'}>
              1유형
            </SelectItem>
            <SelectItem value={'2유형'} key={'2유형'}>
              2유형
            </SelectItem>
          </Select>
        </AreaBox>
      </FlexConBox>
      <Address
        codeValueName={'mZipCode'}
        valueName={'mAddresses'}
        detailValueName={'mAddressDetail'}
        setValue={setValue}
        defaultPostcode={'0101010'}
        defaultAddress={'주소를 입력해주세요.'}
        defaultDetails={'상세주소주소'}
      />
      <BtnBox>
        <Button
          size="md"
          radius="md"
          color="primary"
          className="lg:w-[50%] w-full"
          // onClick={() => {
          //   router.back()
          // }}
        >
          저장
        </Button>
      </BtnBox>
    </form>
  )
}
