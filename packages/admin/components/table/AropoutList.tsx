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
import DatePicker, { registerLocale } from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import ko from 'date-fns/locale/ko'
import { getYear } from 'date-fns'
registerLocale('ko', ko)
const _ = require('lodash')
import DatePickerHeader from '@/components/common/DatePickerHeader'

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
  border-bottom: 1px solid #e4e4e7;
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
  width: 52%;
  padding: 0.5rem;
  font-size: inherit;
  color: inherit;
  min-width: ${1200 * 0.52}px;
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
  width: 9%;
  padding: 0.5rem;
  font-size: inherit;
  min-width: ${1200 * 0.09}px;
`

const Tradio = styled.div`
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 13%;
  padding: 0.5rem;
  font-size: inherit;
  color: inherit;
  min-width: ${1200 * 0.13}px;
`
const Tbtn = styled.div`
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 15%;
  padding: 0.5rem;
  font-size: inherit;
  color: inherit;
  min-width: ${1200 * 0.15}px;
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
  border-bottom: 1px solid #e4e4e7;
  color: #71717a;
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
const BtnBox = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 0.5rem;
`

const DatePickerBox = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 21;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  .react-datepicker {
    /* margin-left: 50%; */
  }
  .react-datepicker-wrapper {
    display: inline;
    width: 100%;
  }
  .react-datepicker__input-container {
    display: inline;
  }
  .react-datepicker__close-icon {
    height: 2.5rem;
    top: auto;
    bottom: 0;
  }
  .react-datepicker__triangle {
    left: 1.5rem !important;
    transform: translate(0, 0) !important;
  }
`
export default function AbsentList() {
  const [currentPage, setCurrentPage] = useRecoilState(consultPageState)
  const [currentLimit] = useState(10)
  const [totalCount, setTotalCount] = useState(0)
  const [stVisitDate, setStVisitDate] = useState(null)
  const years = _.range(2000, getYear(new Date()) + 5, 1)
  const [isOpen, setIsOpen] = useState(false)

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
                  <Tradio>중도탈락구분</Tradio>
                  <Tdate>중도탈락일자</Tdate>
                  <Ttext>중도탈락사유</Ttext>
                  <Tbtn></Tbtn>
                </ClickBox>
              </TheaderBox>
            </Theader>
            <TableItem>
              <TableRow>
                <ClickBox>
                  <Tname>
                    <Input
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
                      orientation="horizontal"
                      size={'sm'}
                      className="gap-[0.5rem] items-center"
                      defaultValue={'수강보기'}
                    >
                      <Radio key={'수강포기'} value={'수강포기'}>
                        수강포기
                      </Radio>
                      <Radio key={'미수료'} value={'미수료'}>
                        미수료
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
                      onClick={() => setIsOpen(!isOpen)}
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
                    />
                  </Ttext>
                  <Tbtn>
                    <BtnBox>
                      <Button
                        size="sm"
                        variant="solid"
                        color="primary"
                        className="w-full text-white"
                        // onClick={() => setIsOpen(!isOpen)}
                      >
                        추가
                      </Button>
                    </BtnBox>
                  </Tbtn>
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
                      orientation="horizontal"
                      size={'sm'}
                      className="gap-[0.5rem] items-center"
                      defaultValue={'수강포기'}
                    >
                      <Radio key={'수강포기'} value={'수강포기'}>
                        수강포기
                      </Radio>
                      <Radio key={'미수료'} value={'미수료'}>
                        미수료
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
                      onClick={() => setIsOpen(!isOpen)}
                    />
                  </Tdate>
                  <Ttext>
                    <Input
                      isReadOnly={true}
                      defaultValue={'중도탈락사유'}
                      labelPlacement="outside"
                      variant="bordered"
                      radius="sm"
                      size="sm"
                      type="text"
                      placeholder=" "
                      className="w-full"
                    />
                  </Ttext>
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
      {isOpen && (
        <DatePickerBox>
          <DatePicker
            inline
            renderCustomHeader={({
              date,
              changeYear,
              changeMonth,
              decreaseMonth,
              increaseMonth,
            }) => (
              <DatePickerHeader
                rangeYears={years}
                clickDate={date}
                changeYear={changeYear}
                changeMonth={changeMonth}
                decreaseMonth={decreaseMonth}
                increaseMonth={increaseMonth}
              />
            )}
            locale="ko"
            showYearDropdown
            selected={stVisitDate === null ? null : new Date(stVisitDate)}
            onChange={date => {
              setStVisitDate(date)
              setIsOpen(false)
            }}
          />
        </DatePickerBox>
      )}
    </>
  )
}
