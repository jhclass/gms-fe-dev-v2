import { motion } from 'framer-motion'
import styled from 'styled-components'
import { useRecoilValue } from 'recoil'
import { progressStatusState } from '@/lib/recoilAtoms'
import { useForm } from 'react-hook-form'
import Button from './Button'
import ChipCheckbox from '@/components/common/ChipCheckbox'
import { CheckboxGroup, Input, Select, SelectItem } from '@nextui-org/react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { useState } from 'react'
import { gql, useLazyQuery, useMutation, useQuery } from '@apollo/client'
import { SEE_MANAGEUSER_QUERY } from '@/graphql/queries'
import { SEARCH_STUDENTSTATE_MUTATION } from '@/graphql/mutations'
//현재 리턴되는 studentState 값은 id,pic,stName 밖에 없음.

type ConsoultFilterProps = {
  isActive: boolean
}

const FilterBox = styled(motion.div)`
  overflow: hidden;
`
const FilterForm = styled.form`
  display: flex;
  width: 100%;
  gap: 1.5rem;
  background: #fff;
  padding: 1.5rem;
  border-radius: 0.5rem;
  margin-top: 1rem;
  flex-direction: column;

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
const BoxBottom = styled.div`
  display: flex;
  flex: 1;
  gap: 2rem;
  justify-content: space-between;
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

const FilterVariants = {
  hidden: {
    scaleY: 0,
    transformOrigin: 'top',
    height: 0,
  },
  visible: {
    scaleY: 1,
    transformOrigin: 'top',
    height: 'auto',
    transition: {
      duration: 0.3,
    },
  },
}
export default function TableFillter({ isActive }: ConsoultFilterProps) {
  const [searchStudentStateMutation, { loading }] = useMutation(
    SEARCH_STUDENTSTATE_MUTATION,
  )
  //전체 담당자를 불러올수 있습니다.
  //정렬: 가나다 순
  //이 쿼리는 셀렉트를 누른 시점에서 부르는 것이 좋습니다.

  const [
    getManage,
    { data: seeManageUserData, error, loading: seeMansgeuserLoading },
  ] = useLazyQuery(SEE_MANAGEUSER_QUERY)

  const manageData = seeManageUserData?.seeManageUser || []
  const progressStatus = useRecoilValue(progressStatusState)
  const [creatDateRange, setCreatDateRange] = useState([null, null])
  const [startCreatDate, endCreatDate] = creatDateRange
  const [visitDateRange, setVisitDateRange] = useState([null, null])
  const [startVisitDate, endVisitDate] = visitDateRange

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
  const manageClick = () => {
    getManage()
  }

  const onSubmit = data => {
    console.log(data)
    // data 값을 변수값에 대입
    searchStudentStateMutation({
      variables: {
        searchStudentStateId: null, // data?.어쩌구 // data 뒤에 ? 추가
        receiptDiv: data?.receiptDiv,
        subDiv: data?.subDiv,
        pic: data?.pic,
        stVisit: data?.stVisit,
        stName: data?.stName,
        progress: data?.progress,
        page: null,
        perPage: null,
      },
      onCompleted: resData => {
        console.log(resData)
      },
    })
  }

  return (
    <>
      <FilterBox
        variants={FilterVariants}
        initial="hidden"
        animate={isActive ? 'visible' : 'hidden'}
      >
        <FilterForm onSubmit={handleSubmit(onSubmit)}>
          <BoxTop>
            <ItemBox>
              <Select
                labelPlacement="outside"
                label="접수구분"
                placeholder=" "
                className="w-full"
                defaultValue=""
                {...register('receiptDiv')}
              >
                <SelectItem key={'온라인'} value={'온라인'}>
                  온라인
                </SelectItem>
                <SelectItem key={'방문'} value={'방문'}>
                  방문
                </SelectItem>
                <SelectItem key={'전화'} value={'전화'}>
                  전화
                </SelectItem>
              </Select>
            </ItemBox>
            <ItemBox>
              <Select
                labelPlacement="outside"
                label="수강구분"
                placeholder=" "
                className="w-full"
                defaultValue=""
                {...register('subDiv')}
              >
                <SelectItem key={'HRD'} value={'HRD'}>
                  HRD
                </SelectItem>
                <SelectItem key={'일반'} value={'일반'}>
                  일반
                </SelectItem>
              </Select>
            </ItemBox>
            <ItemBox>
              <Select
                onClick={manageClick}
                labelPlacement="outside"
                label="담당자"
                placeholder=" "
                className="w-full"
                defaultValue=""
                {...register('pic')}
              >
                {manageData.map((item, index) => (
                  <SelectItem key={index} value={item.mUsername}>
                    {item.mUsername}
                  </SelectItem>
                ))}
              </Select>
            </ItemBox>
          </BoxTop>
          <BoxMiddle>
            <ItemBox>
              <DatePicker
                selectsRange={true}
                startDate={startCreatDate}
                endDate={endCreatDate}
                onChange={update => {
                  setCreatDateRange(update)
                }}
                placeholderText="기간을 선택해주세요."
                customInput={
                  <Input
                    label="등록일시"
                    labelPlacement="outside"
                    type="text"
                    variant="bordered"
                    id="date"
                    startContent={<i className="xi-calendar" />}
                  />
                }
              />
            </ItemBox>
            <ItemBox>
              <DatePicker
                selectsRange={true}
                startDate={startVisitDate}
                endDate={endVisitDate}
                onChange={update => {
                  setVisitDateRange(update)
                }}
                placeholderText="기간을 선택해주세요."
                customInput={
                  <Input
                    label="상담예정일"
                    labelPlacement="outside"
                    type="text"
                    variant="bordered"
                    id="date"
                    startContent={<i className="xi-calendar" />}
                  />
                }
              />
            </ItemBox>
            <ItemBox>
              <Input
                labelPlacement="outside"
                placeholder=" "
                type="text"
                variant="bordered"
                label="수강생이름"
                id="stName"
                {...register('stName')}
              />
            </ItemBox>
          </BoxMiddle>
          <BoxBottom>
            <ItemBox>
              <CheckboxGroup
                label="진행상태"
                orientation="horizontal"
                defaultValue={['buenos-aires', 'london']}
                className="gap-1"
              >
                {Object.entries(progressStatus).map(([key, value]) => (
                  <ChipCheckbox key={key} value={value.name}>
                    {value.name}
                  </ChipCheckbox>
                ))}
              </CheckboxGroup>
            </ItemBox>
          </BoxBottom>
          <BtnBox>
            <Button
              buttonType="submit"
              width="calc(50% - 0.5rem)"
              height="2.5rem"
            >
              검색
            </Button>
            <Button
              buttonType="reset"
              width="calc(50% - 0.5rem)"
              height="2.5rem"
              typeBorder={true}
            >
              초기화
            </Button>
          </BtnBox>
        </FilterForm>
      </FilterBox>
    </>
  )
}
