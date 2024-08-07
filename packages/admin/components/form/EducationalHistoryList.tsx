import { SEARCH_SM_QUERY } from '@/graphql/queries'
import { ResultSearchSm } from '@/src/generated/graphql'
import { useSuspenseQuery } from '@apollo/client'
import {
  Button,
  Input,
  ScrollShadow,
  Select,
  SelectItem,
} from '@nextui-org/react'
import { useState } from 'react'
import { styled } from 'styled-components'

const TableArea = styled.div`
  padding-top: 2rem;
  border-top: 1px solid ${({ theme }) => theme.colors.secondary};
`
const TableWrap = styled.div`
  width: 100%;
  display: table;
  min-width: 1200px;
`
const Theader = styled.div`
  width: 100%;
  min-width: fit-content;
  display: table-row;
  flex-wrap: nowrap;
  row-gap: 1rem;
  color: #111;
  font-size: 0.875rem;
  font-weight: 700;
  border-bottom: 1px solid ${({ theme }) => theme.colors.lightGray};
  text-align: center;
`

const TheaderBox = styled.div`
  display: flex;
  margin-bottom: 0.5rem;
`
const ItemBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

const ClickBox = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
`
const Ttext = styled.div`
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 23%;
  padding: 0.5rem;
  font-size: inherit;
  color: inherit;
  min-width: ${1200 * 0.23}px;
`

const Tselect = styled.div`
  position: relative;
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 20%;
  padding: 0.5rem;
  font-size: inherit;
  min-width: ${1200 * 0.2}px;
`

const Tbtn = styled.div`
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 16%;
  padding: 0.5rem;
  font-size: inherit;
  color: inherit;
  min-width: ${1200 * 0.16}px;
`

const TableItem = styled.div`
  position: relative;
  width: 100%;
  min-width: fit-content;
  border: 1px solid ${({ theme }) => theme.colors.lightGray};
  color: ${({ theme }) => theme.colors.gray};
  font-size: 0.875rem;
  border-radius: 0.5rem;
  background: #fff;
  overflow: hidden;

  &:hover {
    cursor: pointer;
    background: rgba(255, 255, 255, 0.8);
  }
`
const TopInfo = styled.div`
  display: flex;
  justify-content: flex-end;
  font-size: 0.8rem;
  padding: 0 0.5rem 0.5rem;
  @media screen and (max-width: 1200px) {
    justify-content: flex-start;
  }
`
const UpdateTime = styled.p`
  span {
    color: ${({ theme }) => theme.colors.accent};
  }
`
const TableRow = styled.div`
  display: flex;
`
const BtnBox = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 0.5rem;
`
const MoreBtn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`
type searchSMQuery = {
  searchSM: ResultSearchSm
}

export default function EducationalHistoryList({ paymentId }) {
  // const { error, data, refetch } = useSuspenseQuery<searchSMQuery>(
  //   SEARCH_SM_QUERY,
  //   {
  //     variables: {
  //       modelType: 'EduInfomation',
  //       studentPaymentId: paymentId,
  //     },
  //   },
  // )
  const [educationValue, setEducationValue] = useState('학력선택')
  const [graduationValue, setGraduationValue] = useState('졸업여부')

  const handleEducationChange = e => {
    setEducationValue(e.target.value)
  }
  const handleGraduationChange = e => {
    setGraduationValue(e.target.value)
  }

  // console.log(data)

  return (
    <>
      <TableArea>
        <ScrollShadow orientation="horizontal" className="scrollbar">
          <TableWrap>
            <Theader>
              <TheaderBox>
                <ClickBox>
                  <Tselect>학력</Tselect>
                  <Ttext>학교명</Ttext>
                  <Ttext>전공</Ttext>
                  <Tselect>졸업여부</Tselect>
                  <Tbtn></Tbtn>
                </ClickBox>
              </TheaderBox>
            </Theader>
            <ItemBox>
              <TableItem>
                <TableRow>
                  <ClickBox>
                    <Tselect>
                      <Select
                        labelPlacement="outside"
                        label={<p className="hidden">학력</p>}
                        variant="bordered"
                        size="sm"
                        selectedKeys={[educationValue]}
                        onChange={e => handleEducationChange(e)}
                        classNames={{
                          label: 'w-[4rem] pr-0',
                        }}
                      >
                        <SelectItem value={'학력선택'} key={'학력선택'}>
                          학력선택
                        </SelectItem>
                        <SelectItem value={'초등학교'} key={'초등학교'}>
                          초등학교
                        </SelectItem>
                        <SelectItem value={'중학교'} key={'중학교'}>
                          중학교
                        </SelectItem>
                        <SelectItem value={'고등학교'} key={'고등학교'}>
                          고등학교
                        </SelectItem>
                        <SelectItem value={'대학,대학원'} key={'대학,대학원'}>
                          대학,대학원
                        </SelectItem>
                        <SelectItem value={'기타학력'} key={'기타학력'}>
                          기타학력
                        </SelectItem>
                      </Select>
                    </Tselect>
                    <Ttext>
                      <Input
                        labelPlacement="outside"
                        variant="bordered"
                        radius="sm"
                        size="sm"
                        type="text"
                        placeholder=" "
                        className="w-full"
                      />
                    </Ttext>
                    <Ttext>
                      <Input
                        labelPlacement="outside"
                        variant="bordered"
                        radius="sm"
                        size="sm"
                        type="text"
                        placeholder=" "
                        className="w-full"
                      />
                    </Ttext>
                    <Tselect>
                      <Select
                        labelPlacement="outside"
                        label={<p className="hidden">졸업여부</p>}
                        variant="bordered"
                        size="sm"
                        selectedKeys={[graduationValue]}
                        onChange={e => handleGraduationChange(e)}
                        classNames={{
                          label: 'w-[4rem] pr-0',
                        }}
                      >
                        <SelectItem value={'졸업여부'} key={'졸업여부'}>
                          졸업여부
                        </SelectItem>
                        <SelectItem value={'학력 선택'} key={'학력 선택'}>
                          졸업
                        </SelectItem>
                        <SelectItem value={'초등학교'} key={'초등학교'}>
                          휴학
                        </SelectItem>
                        <SelectItem value={'중학교'} key={'중학교'}>
                          재학
                        </SelectItem>
                        <SelectItem value={'고등학교'} key={'고등학교'}>
                          중퇴
                        </SelectItem>
                      </Select>
                    </Tselect>
                    <Tbtn>
                      <BtnBox>
                        <Button
                          size="sm"
                          variant="solid"
                          color="primary"
                          className="w-full text-white"
                          // onClick={() => setIsOpen(!isOpen)}
                        >
                          수정
                        </Button>
                        <Button
                          size="sm"
                          variant="bordered"
                          color="primary"
                          className="w-full"
                          // onClick={() => clickCancelReq(item)}
                        >
                          삭제
                        </Button>
                      </BtnBox>
                    </Tbtn>
                  </ClickBox>
                </TableRow>
                <TopInfo>
                  <UpdateTime>
                    <span>
                      · 마지막 업데이트 :{' '}
                      <b>영업팀 아무개 2024-06-21 18:36:58</b> 에 수정됨
                    </span>
                    {/* {formatDate(lectureData?.updatedAt, true)} */}
                  </UpdateTime>
                </TopInfo>
              </TableItem>
              <TableItem>
                <TableRow>
                  <ClickBox>
                    <Tselect>
                      <Select
                        labelPlacement="outside"
                        label={<p className="hidden">학력</p>}
                        variant="bordered"
                        size="sm"
                        selectedKeys={[educationValue]}
                        onChange={e => handleEducationChange(e)}
                        classNames={{
                          label: 'w-[4rem] pr-0',
                        }}
                      >
                        <SelectItem value={'학력선택'} key={'학력선택'}>
                          학력선택
                        </SelectItem>
                        <SelectItem value={'초등학교'} key={'초등학교'}>
                          초등학교
                        </SelectItem>
                        <SelectItem value={'중학교'} key={'중학교'}>
                          중학교
                        </SelectItem>
                        <SelectItem value={'고등학교'} key={'고등학교'}>
                          고등학교
                        </SelectItem>
                        <SelectItem value={'대학,대학원'} key={'대학,대학원'}>
                          대학,대학원
                        </SelectItem>
                        <SelectItem value={'기타학력'} key={'기타학력'}>
                          기타학력
                        </SelectItem>
                      </Select>
                    </Tselect>
                    <Ttext>
                      <Input
                        labelPlacement="outside"
                        variant="bordered"
                        radius="sm"
                        size="sm"
                        type="text"
                        placeholder=" "
                        className="w-full"
                      />
                    </Ttext>
                    <Ttext>
                      <Input
                        labelPlacement="outside"
                        variant="bordered"
                        radius="sm"
                        size="sm"
                        type="text"
                        placeholder=" "
                        className="w-full"
                      />
                    </Ttext>
                    <Tselect>
                      <Select
                        labelPlacement="outside"
                        label={<p className="hidden">졸업여부</p>}
                        variant="bordered"
                        size="sm"
                        selectedKeys={[graduationValue]}
                        onChange={e => handleGraduationChange(e)}
                        classNames={{
                          label: 'w-[4rem] pr-0',
                        }}
                      >
                        <SelectItem value={'졸업여부'} key={'졸업여부'}>
                          졸업여부
                        </SelectItem>
                        <SelectItem value={'학력 선택'} key={'학력 선택'}>
                          졸업
                        </SelectItem>
                        <SelectItem value={'초등학교'} key={'초등학교'}>
                          휴학
                        </SelectItem>
                        <SelectItem value={'중학교'} key={'중학교'}>
                          재학
                        </SelectItem>
                        <SelectItem value={'고등학교'} key={'고등학교'}>
                          중퇴
                        </SelectItem>
                      </Select>
                    </Tselect>
                    <Tbtn>
                      <BtnBox>
                        <Button
                          size="sm"
                          variant="solid"
                          color="primary"
                          className="w-full text-white"
                          // onClick={() => setIsOpen(!isOpen)}
                        >
                          수정
                        </Button>
                        <Button
                          size="sm"
                          variant="bordered"
                          color="primary"
                          className="w-full"
                          // onClick={() => clickCancelReq(item)}
                        >
                          삭제
                        </Button>
                      </BtnBox>
                    </Tbtn>
                  </ClickBox>
                </TableRow>
                <TopInfo>
                  <UpdateTime>
                    <span>
                      · 마지막 업데이트 :{' '}
                      <b>영업팀 아무개 2024-06-21 18:36:58</b> 에 수정됨
                    </span>
                    {/* {formatDate(lectureData?.updatedAt, true)} */}
                  </UpdateTime>
                </TopInfo>
              </TableItem>
            </ItemBox>
          </TableWrap>
        </ScrollShadow>
      </TableArea>
      <MoreBtn>
        <Button
          size="md"
          // onClick={loadMore}
          className="w-full bg-white border-secondary text-secondary"
        >
          더보기{' '}
          <span className="text-secondary text-[1rem]">
            <i className="xi-plus-circle" />
          </span>
        </Button>
      </MoreBtn>
    </>
  )
}
