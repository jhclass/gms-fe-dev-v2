import { Button, Input, Pagination, ScrollShadow } from '@nextui-org/react'
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
import {
  ManageUser,
  StudentState,
  StudentStateResponse,
} from '@/src/generated/graphql'
import DatePickerHeader from '../common/DatePickerHeader'

const TableArea = styled.div`
  margin-top: 0.5rem;
`
const TTopic = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`
const Ttotal = styled.p`
  font-weight: 300;
  margin-right: 0.5rem;

  span {
    font-weight: 400;
    color: #007de9;
  }
`
const ColorHelp = styled.div`
  display: flex;
`

const ColorCip = styled.p`
  padding-left: 0.5rem;
  display: flex;
  align-items: center;
  color: #71717a;
  font-size: 0.7rem;

  span {
    display: inline-block;
    margin-right: 0.5rem;
    width: 1rem;
    height: 2px;
  }
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
`
const Ttext = styled.div`
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 22%;
  padding: 0.5rem;
  font-size: inherit;
  color: inherit;
  min-width: ${1200 * 0.22}px;
`

const Tdate = styled.div`
  position: relative;
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 10%;
  padding: 0.5rem;
  font-size: inherit;
  min-width: ${1200 * 0.1}px;
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
const Nolist = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  padding: 2rem 0;
  color: #71717a;
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
type seeStudentState = {
  seeStudentState: StudentStateResponse
}
type mmeFavoQuery = {
  mMe: ManageUser
}
type seeFavoriteState = {
  seeFavorite: StudentState[]
}

export default function AbsentList() {
  const [currentPage, setCurrentPage] = useRecoilState(consultPageState)
  const [currentLimit] = useState(10)
  const [totalCount, setTotalCount] = useState(0)
  const [stVisitDate, setStVisitDate] = useState(null)
  const years = _.range(2000, getYear(new Date()) + 5, 1)

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
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
                  <Tdate>결석일자</Tdate>
                  <Ttext>자격증명</Ttext>
                  <Ttext>급수</Ttext>
                  <Ttext>발행처</Ttext>
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
                  <Tdate>
                    <DatePickerBox>
                      <DatePicker
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
                        selected={
                          stVisitDate === null ? null : new Date(stVisitDate)
                        }
                        placeholderText="날짜선택"
                        isClearable
                        onChange={date => {
                          setStVisitDate(date)
                        }}
                        dateFormat="yyyy/MM/dd"
                        onChangeRaw={e => e.preventDefault()}
                        onFocus={e => e.target.blur()}
                        customInput={
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
                          />
                        }
                      />
                    </DatePickerBox>
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
                  <Tdate>
                    <Input
                      isReadOnly={true}
                      defaultValue={'2024-01-14'}
                      labelPlacement="outside"
                      variant="bordered"
                      radius="sm"
                      size="sm"
                      type="text"
                      placeholder=" "
                      className="w-full"
                    />
                  </Tdate>
                  <Ttext>
                    <Input
                      isReadOnly={true}
                      defaultValue={'자격증명자격증명'}
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
                      defaultValue={'급수'}
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
                      defaultValue={'발행처'}
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
    </>
  )
}
