import {
  Button,
  Input,
  Pagination,
  Radio,
  RadioGroup,
  ScrollShadow,
} from '@nextui-org/react'
import { useState } from 'react'
import { styled } from 'styled-components'
import { useRecoilState } from 'recoil'
import { consultPageState } from '@/lib/recoilAtoms'

const TableArea = styled.div`
  margin-top: 0.5rem;
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
  border-bottom: 1px solid #d4d4d8;
  text-align: center;
`

const TheaderBox = styled.div`
  display: flex;
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
  width: 9%;
  padding: 0.5rem;
  font-size: inherit;
  color: inherit;
  min-width: ${1200 * 0.09}px;
`

const Tdate = styled.div`
  position: relative;
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 11%;
  padding: 0.5rem;
  font-size: inherit;
  min-width: ${1200 * 0.11}px;
`

const Tname = styled.div`
  position: relative;
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 6%;
  padding: 0.5rem;
  font-size: inherit;
  min-width: ${1200 * 0.06}px;
`

const Tradio = styled.div`
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 6%;
  padding: 0.5rem;
  font-size: inherit;
  color: inherit;
  min-width: ${1200 * 0.06}px;
`
const PagerWrap = styled.div`
  display: flex;
  margin-top: 1.5rem;
  justify-content: center;
`
const TableItem = styled.div`
  position: relative;
  width: 100%;
  min-width: fit-content;
  border-bottom: 1px solid #d4d4d8;
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

const TableRow = styled.div`
  position: relative;
  display: table-row;
  width: 100%;
  min-width: fit-content;
  text-align: center;
  z-index: 1;
  /* display: grid;
  width: 100%;
  grid-template-columns: 0.5rem 2% auto; */
`

export default function EmploymentList() {
  const [currentPage, setCurrentPage] = useRecoilState(consultPageState)
  const [currentLimit] = useState(10)
  const [totalCount, setTotalCount] = useState(0)
  const [stVisitDate, setStVisitDate] = useState(null)

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const formatDate = data => {
    const date = new Date(data)
    const formatted =
      `${date.getFullYear()}-` +
      `${(date.getMonth() + 1).toString().padStart(2, '0')}-` +
      `${date.getDate().toString().padStart(2, '0')}`
    return formatted
  }

  return (
    <>
      <TableArea>
        <ScrollShadow orientation="horizontal" className="scrollbar">
          <TableWrap>
            <Theader>
              <TheaderBox>
                <ClickBox>
                  <Tname>이름</Tname>
                  <Tradio>구분</Tradio>
                  <Tdate>취업일자</Tdate>
                  <Ttext>회사명</Ttext>
                  <Ttext>사업자번호</Ttext>
                  <Ttext>담당업무</Ttext>
                  <Ttext>소재지</Ttext>
                  <Ttext>전화번호</Ttext>
                  <Ttext>사업자규모</Ttext>
                  <Tradio>
                    고용
                    <br />
                    보험
                  </Tradio>
                  <Tradio>
                    재직 <br />
                    증명
                  </Tradio>
                  <Tradio>
                    관련 <br />
                    분야
                  </Tradio>
                  <Tradio>
                    취업 <br />
                    형태
                  </Tradio>
                </ClickBox>
              </TheaderBox>
            </Theader>
            <TableItem>
              <TableRow>
                <ClickBox>
                  <Tname>
                    <Input
                      isReadOnly={true}
                      labelPlacement="outside"
                      variant="bordered"
                      radius="sm"
                      size="sm"
                      type="text"
                      placeholder=" "
                      className="w-full"
                    />
                  </Tname>
                  <Tradio>
                    <RadioGroup
                      isReadOnly={true}
                      size={'sm'}
                      className="gap-[0.5rem] items-center"
                      defaultValue={'취업'}
                    >
                      <Radio key={'취업'} value={'취업'}>
                        취업
                      </Radio>
                      <Radio key={'창업'} value={'창업'}>
                        창업
                      </Radio>
                    </RadioGroup>
                  </Tradio>
                  <Tdate>
                    <Input
                      labelPlacement="outside"
                      variant="bordered"
                      radius="sm"
                      size="sm"
                      type="text"
                      placeholder=" "
                      id="date"
                      classNames={{
                        input: 'caret-transparent',
                      }}
                      isReadOnly={true}
                      startContent={<i className="xi-calendar" />}
                      defaultValue={
                        stVisitDate === null ? null : String(stVisitDate)
                      }
                      value={formatDate(stVisitDate) || ''}
                    />
                  </Tdate>
                  <Ttext>
                    <Input
                      labelPlacement="outside"
                      variant="bordered"
                      radius="sm"
                      size="sm"
                      type="text"
                      placeholder=" "
                      className="w-full"
                      isReadOnly={true}
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
                      isReadOnly={true}
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
                      isReadOnly={true}
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
                      isReadOnly={true}
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
                      isReadOnly={true}
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
                      isReadOnly={true}
                    />
                  </Ttext>
                  <Tradio>
                    <RadioGroup
                      isReadOnly={true}
                      size={'sm'}
                      className="gap-[0.5rem] items-center"
                      defaultValue={'Y'}
                    >
                      <Radio key={'Y'} value={'Y'}>
                        Y
                      </Radio>
                      <Radio key={'N'} value={'N'}>
                        N
                      </Radio>
                    </RadioGroup>
                  </Tradio>
                  <Tradio>
                    <RadioGroup
                      isReadOnly={true}
                      size={'sm'}
                      className="gap-[0.5rem] items-center"
                      defaultValue={'Y'}
                    >
                      <Radio key={'Y'} value={'Y'}>
                        Y
                      </Radio>
                      <Radio key={'N'} value={'N'}>
                        N
                      </Radio>
                    </RadioGroup>
                  </Tradio>
                  <Tradio>
                    <RadioGroup
                      isReadOnly={true}
                      size={'sm'}
                      className="gap-[0.5rem] items-center"
                      defaultValue={'동일'}
                    >
                      <Radio key={'동일'} value={'동일'}>
                        동일
                      </Radio>
                      <Radio key={'관련'} value={'관련'}>
                        관련
                      </Radio>
                      <Radio key={'다른'} value={'다른'}>
                        다른
                      </Radio>
                    </RadioGroup>
                  </Tradio>
                  <Tradio>
                    <RadioGroup
                      isReadOnly={true}
                      size={'sm'}
                      className="gap-[0.5rem] items-center"
                      defaultValue={'조기'}
                    >
                      <Radio key={'조기'} value={'조기'}>
                        조기
                      </Radio>
                      <Radio key={'수료'} value={'수료'}>
                        수료
                      </Radio>
                    </RadioGroup>
                  </Tradio>
                </ClickBox>
              </TableRow>
            </TableItem>
            <TableItem>
              <TableRow>
                <ClickBox>
                  <Tname>
                    <Input
                      isReadOnly={true}
                      defaultValue={'김나라'}
                      labelPlacement="outside"
                      variant="bordered"
                      radius="sm"
                      size="sm"
                      type="text"
                      placeholder=" "
                      className="w-full"
                    />
                  </Tname>
                  <Tradio>
                    <RadioGroup
                      isReadOnly={true}
                      size={'sm'}
                      className="gap-[0.5rem] items-center"
                      defaultValue={'취업'}
                    >
                      <Radio key={'취업'} value={'취업'}>
                        취업
                      </Radio>
                      <Radio key={'창업'} value={'창업'}>
                        창업
                      </Radio>
                    </RadioGroup>
                  </Tradio>
                  <Tdate>
                    <Input
                      labelPlacement="outside"
                      variant="bordered"
                      radius="sm"
                      size="sm"
                      type="text"
                      placeholder=" "
                      id="date"
                      classNames={{
                        input: 'caret-transparent',
                      }}
                      isReadOnly={true}
                      startContent={<i className="xi-calendar" />}
                      defaultValue={
                        stVisitDate === null ? null : String(stVisitDate)
                      }
                      value={formatDate(stVisitDate) || ''}
                    />
                  </Tdate>
                  <Ttext>
                    <Input
                      isReadOnly={true}
                      defaultValue={'회사명'}
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
                      isReadOnly={true}
                      defaultValue={'사업자번호'}
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
                      isReadOnly={true}
                      defaultValue={'담당업무'}
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
                      isReadOnly={true}
                      defaultValue={'소재지'}
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
                      isReadOnly={true}
                      defaultValue={'전화번호'}
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
                      isReadOnly={true}
                      defaultValue={'사업장규모'}
                      labelPlacement="outside"
                      variant="bordered"
                      radius="sm"
                      size="sm"
                      type="text"
                      placeholder=" "
                      className="w-full"
                    />
                  </Ttext>
                  <Tradio>
                    <RadioGroup
                      isReadOnly={true}
                      size={'sm'}
                      className="gap-[0.5rem] items-center"
                      defaultValue={'Y'}
                    >
                      <Radio key={'Y'} value={'Y'}>
                        Y
                      </Radio>
                      <Radio key={'N'} value={'N'}>
                        N
                      </Radio>
                    </RadioGroup>
                  </Tradio>
                  <Tradio>
                    <RadioGroup
                      isReadOnly={true}
                      size={'sm'}
                      className="gap-[0.5rem] items-center"
                      defaultValue={'Y'}
                    >
                      <Radio key={'Y'} value={'Y'}>
                        Y
                      </Radio>
                      <Radio key={'N'} value={'N'}>
                        N
                      </Radio>
                    </RadioGroup>
                  </Tradio>
                  <Tradio>
                    <RadioGroup
                      isReadOnly={true}
                      size={'sm'}
                      className="gap-[0.5rem] items-center"
                      defaultValue={'동일'}
                    >
                      <Radio key={'동일'} value={'동일'}>
                        동일
                      </Radio>
                      <Radio key={'관련'} value={'관련'}>
                        관련
                      </Radio>
                      <Radio key={'다른'} value={'다른'}>
                        다른
                      </Radio>
                    </RadioGroup>
                  </Tradio>
                  <Tradio>
                    <RadioGroup
                      isReadOnly={true}
                      size={'sm'}
                      className="gap-[0.5rem] items-center"
                      defaultValue={'조기'}
                    >
                      <Radio key={'조기'} value={'조기'}>
                        조기
                      </Radio>
                      <Radio key={'수료'} value={'수료'}>
                        수료
                      </Radio>
                    </RadioGroup>
                  </Tradio>
                </ClickBox>
              </TableRow>
            </TableItem>
          </TableWrap>
        </ScrollShadow>
        {totalCount > 0 && (
          <PagerWrap>
            <Pagination
              variant="light"
              showControls
              initialPage={currentPage}
              page={currentPage}
              total={Math.ceil(totalCount / currentLimit)}
              onChange={newPage => {
                setCurrentPage(newPage)
              }}
            />
          </PagerWrap>
        )}
      </TableArea>
    </>
  )
}
