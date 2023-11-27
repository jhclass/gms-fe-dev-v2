import MainWrap from '@/components/wrappers/MainWrap'
import { useState } from 'react'
import Breadcrumb from '@/components/common/Breadcrumb'
import { styled } from 'styled-components'
import { useRouter } from 'next/router'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { Input, Radio, RadioGroup, Select, SelectItem } from '@nextui-org/react'
import { progressStatusState } from '@/lib/recoilAtoms'
import { useRecoilValue } from 'recoil'

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
`

const DatePickerBox = styled.div`
  width: 100%;
  > div {
    width: 100%;
  }
`

export default function Consoultation() {
  const [startDate, setStartDate] = useState(new Date())
  const progressStatus = useRecoilValue(progressStatusState)
  const [filterActive, setFilterActive] = useState(false)
  const router = useRouter()
  const { id } = router.query

  return (
    <>
      <MainWrap>
        <Breadcrumb onFilterToggle={setFilterActive} isActive={filterActive} />
        <DetailBox>
          <DetailForm>
            <FlexBox>
              <Input
                isReadOnly
                labelPlacement="outside"
                placeholder="이름"
                variant="bordered"
                radius="md"
                type="text"
                label="이름"
                value={'김딸기'}
                className="w-full"
              />
              <Input
                isReadOnly
                labelPlacement="outside"
                placeholder="이메일"
                variant="bordered"
                radius="md"
                type="text"
                label="이메일"
                value={'aa@naver.com'}
                className="w-full"
              />
            </FlexBox>
            <FlexBox>
              <Input
                isReadOnly
                labelPlacement="outside"
                placeholder="전화번호1"
                variant="bordered"
                radius="md"
                type="text"
                label="전화번호1"
                value={'01011111111'}
                className="w-full"
              />
              <Input
                isReadOnly
                labelPlacement="outside"
                placeholder="전화번호2"
                variant="bordered"
                radius="md"
                type="text"
                label="전화번호2"
                value={'01022222222'}
                className="w-full"
              />
              <Input
                isReadOnly
                labelPlacement="outside"
                placeholder="전화번호3"
                variant="bordered"
                radius="md"
                type="text"
                label="전화번호3"
                value={'01033333333'}
                className="w-full"
              />
            </FlexBox>
            <Input
              isReadOnly
              labelPlacement="outside"
              placeholder="상담과목"
              variant="bordered"
              radius="md"
              type="text"
              label="상담과목"
              value={'상담과목'}
              className="w-full"
            />
            <FlexBox>
              <Select
                labelPlacement="outside"
                defaultSelectedKeys={['일반']}
                label="수강구분"
                placeholder=" "
                className="w-full"
                defaultValue=""
              >
                <SelectItem key={'HRD'} value={'HRD'}>
                  HRD
                </SelectItem>
                <SelectItem key={'일반'} value={'일반'}>
                  일반
                </SelectItem>
              </Select>
              <Select
                defaultSelectedKeys={['김사원']}
                labelPlacement="outside"
                label="담당자"
                placeholder=" "
                className="w-full"
                defaultValue=""
              >
                <SelectItem key={'김사원'} value={'김사원'}>
                  김사원
                </SelectItem>
                <SelectItem key={'이주임'} value={'이주임'}>
                  이주임
                </SelectItem>
                <SelectItem key={'박대리'} value={'박대리'}>
                  박대리
                </SelectItem>
              </Select>
            </FlexBox>
            <RadioGroup
              label="진행상태"
              orientation="horizontal"
              className="gap-1"
            >
              {Object.entries(progressStatus).map(([key, value]) => (
                <Radio key={key} value={value.name}>
                  {value.name}
                </Radio>
              ))}
            </RadioGroup>
            <FlexBox>
              <DatePickerBox>
                <DatePicker
                  selected={startDate}
                  onChange={date => setStartDate(date)}
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
              </DatePickerBox>
              <DatePickerBox>
                <DatePicker
                  selected={startDate}
                  onChange={date => setStartDate(date)}
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
              </DatePickerBox>
              <DatePickerBox>
                <DatePicker
                  selected={startDate}
                  onChange={date => setStartDate(date)}
                  placeholderText="기간을 선택해주세요."
                  customInput={
                    <Input
                      label="수강예정일"
                      labelPlacement="outside"
                      type="text"
                      variant="bordered"
                      id="date"
                      startContent={<i className="xi-calendar" />}
                    />
                  }
                />
              </DatePickerBox>
            </FlexBox>
          </DetailForm>
        </DetailBox>
      </MainWrap>
    </>
  )
}
