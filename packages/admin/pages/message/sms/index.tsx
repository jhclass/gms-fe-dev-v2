import MainWrap from '@/components/wrappers/MainWrap'
import Breadcrumb from '@/components/common/Breadcrumb'
import { styled } from 'styled-components'
import Layout from '@/pages/message/layout'
import { useState } from 'react'
import SMSTabs from '@/components/items/SMSTabs'
import {
  Button,
  Chip,
  Input,
  Radio,
  RadioGroup,
  Textarea,
} from '@nextui-org/react'

const ConBox = styled.div`
  margin: 2rem 0;
  z-index: 0;
  position: relative;
  display: flex;
  gap: 1rem;
`

const LeftBox = styled.div`
  width: 20rem;
  display: flex;
  flex-direction: column;
`

const RightBox = styled.div`
  width: calc(100% - 20rem);
  display: flex;
  flex-direction: column;
`
const FlexBox = styled.div`
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`
const RoundBox = styled.div`
  background: #fff;
  border-radius: 1rem;
`
const FilterLabel = styled.label`
  font-weight: 500;
  font-size: 0.875rem;
  line-height: 1.25rem;
  color: #11181c;
  padding-bottom: 0.1rem;
  display: block;
`

const LodingDiv = styled.div`
  padding: 1.5rem;
  width: 100%;
  min-width: 20rem;
  position: relative;
  background: none;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export default function message() {
  const [filterActive, setFilterActive] = useState()
  const [filterSearch, setFilterSearch] = useState()
  const [studentFilter, setStudentFilter] = useState()

  return (
    <>
      <MainWrap>
        <Breadcrumb
          onFilterToggle={setFilterActive}
          isActive={filterActive}
          isFilter={false}
          isWrite={false}
          rightArea={false}
        />
        <ConBox>
          <LeftBox>
            <Textarea
              variant="flat"
              label={<FilterLabel>문자내용</FilterLabel>}
              labelPlacement="outside"
              placeholder="문자내용을 작성해주세요."
              minRows={10}
            />
            <div>
              <FlexBox>
                <RadioGroup
                  defaultValue="개인"
                  orientation="horizontal"
                  className="gap-[0.65rem]"
                >
                  <Radio key={'개인'} value={'개인'}>
                    <FilterLabel>개인</FilterLabel>
                  </Radio>
                  <Radio key={'학원'} value={'학원'}>
                    <FilterLabel>학원</FilterLabel>
                  </Radio>
                </RadioGroup>
                <Button size="sm" color="primary">
                  문자함 저장
                </Button>
              </FlexBox>
              <RoundBox>
                <FlexBox>
                  <FilterLabel>받는사람</FilterLabel>
                  <Button size="sm" color="primary">
                    검색
                  </Button>
                </FlexBox>
                <FlexBox>
                  <Chip
                    variant="bordered"
                    onClose={() => console.log('a')}
                    className={'hover:border-primary'}
                  >
                    호호 &#91;01012341234&#93;
                  </Chip>
                </FlexBox>
              </RoundBox>
              <RoundBox>
                <FlexBox>
                  <Input
                    labelPlacement="outside"
                    placeholder="'-'없이 작성해주세요"
                    variant="bordered"
                    radius="md"
                    type="text"
                    label={<FilterLabel>보내는사람</FilterLabel>}
                    maxLength={11}
                    defaultValue="01059494922"
                    // onChange={e => {
                    //   register('phoneNum1').onChange(e)
                    // }}
                    className="w-full"
                    // {...register('phoneNum1', {
                    //   required: {
                    //     value: true,
                    //     message: '휴대폰번호를 입력해주세요.',
                    //   },
                    //   maxLength: {
                    //     value: 11,
                    //     message: '최대 11자리까지 입력 가능합니다.',
                    //   },
                    //   minLength: {
                    //     value: 10,
                    //     message: '최소 10자리 이상이어야 합니다.',
                    //   },
                    //   pattern: {
                    //     value: /^010[0-9]{7,8}$/,
                    //     message: '010으로 시작해주세요.',
                    //   },
                    // })}
                  />
                </FlexBox>
              </RoundBox>
              <FlexBox>
                <RadioGroup
                  defaultValue="즉시전송"
                  orientation="horizontal"
                  className="gap-[0.65rem]"
                >
                  <Radio key={'즉시전송'} value={'즉시전송'}>
                    <FilterLabel>즉시전송</FilterLabel>
                  </Radio>
                  <Radio key={'예약전송'} value={'예약전송'}>
                    <FilterLabel>예약전송</FilterLabel>
                  </Radio>
                </RadioGroup>
              </FlexBox>
            </div>
          </LeftBox>
          <RightBox>
            <SMSTabs />
          </RightBox>
        </ConBox>
      </MainWrap>
    </>
  )
}
message.getLayout = page => <Layout>{page}</Layout>
