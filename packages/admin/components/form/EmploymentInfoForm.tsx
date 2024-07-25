import { useEffect, useState } from 'react'
import { styled } from 'styled-components'
import { useRouter } from 'next/router'
import { Button, Select, SelectItem } from '@nextui-org/react'
import { useMutation } from '@apollo/client'
import { SEARCH_STUDENT_MUTATION } from '@/graphql/mutations'
import StudentInfo from '@/components/items/StudentInfo'
import Address from '@/components/common/Address'
import { useForm } from 'react-hook-form'

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
  color: #11181c;
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

export default function EmploymentInfoForm() {
  const router = useRouter()
  const [searchStudentMutation] = useMutation(SEARCH_STUDENT_MUTATION)
  const [studentData, setStudentData] = useState(null)
  const [selectValue, setSelectValue] = useState('유형선택')
  const { register, setValue, control, handleSubmit, formState } = useForm({})
  const handleSelectChange = e => {
    setSelectValue(e.target.value)
  }

  useEffect(() => {
    searchStudentMutation({
      variables: {
        searchStudentId: 267,
      },
      onCompleted: data => {
        if (data.searchStudent.ok) {
          setStudentData(data.searchStudent?.student[0])
        }
      },
    })
  }, [router])

  return (
    <>
      <StudentInfo studentData={studentData} detailAll={false} record={true} />
      <FlexConBox>
        <AreaBox>
          <div>
            <FilterLabel>나이</FilterLabel>
            <LineBox>30세</LineBox>
          </div>
        </AreaBox>
        <AreaBox>
          <div>
            <FilterLabel>선발평가 점수</FilterLabel>
            <LineBox>89점</LineBox>
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
    </>
  )
}
