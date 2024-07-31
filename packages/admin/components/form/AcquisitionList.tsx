import { Button, Input, ScrollShadow } from '@nextui-org/react'
import { styled } from 'styled-components'
import DatePicker, { registerLocale } from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import ko from 'date-fns/locale/ko'
import { getYear } from 'date-fns'
registerLocale('ko', ko)
const _ = require('lodash')
import DatePickerHeader from '@/components/common/DatePickerHeader'
import { useState } from 'react'

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
  border-bottom: 1px solid #d4d4d8;
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
  width: 25%;
  padding: 0.5rem;
  font-size: inherit;
  color: inherit;
  min-width: ${1200 * 0.25}px;
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
const TableItem = styled.div`
  position: relative;
  width: 100%;
  min-width: fit-content;
  border: 1px solid #d4d4d8;
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

export default function AcquisitionList() {
  const [acquisitionDate, setAcquisitionDate] = useState(null)
  const years = _.range(2000, getYear(new Date()) + 5, 1)
  const [isOpen, setIsOpen] = useState(false)
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
                  <Tdate>취득일자</Tdate>
                  <Ttext>자격증명</Ttext>
                  <Ttext>급수</Ttext>
                  <Ttext>발행처</Ttext>
                  <Tbtn></Tbtn>
                </ClickBox>
              </TheaderBox>
            </Theader>
            <ItemBox>
              <TableItem>
                <TableRow>
                  <ClickBox>
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
                          acquisitionDate === null
                            ? null
                            : String(acquisitionDate)
                        }
                        value={formatDate(acquisitionDate) || ''}
                        onClick={() => setIsOpen(!isOpen)}
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
                          acquisitionDate === null
                            ? null
                            : String(acquisitionDate)
                        }
                        value={formatDate(acquisitionDate) || ''}
                        onClick={() => setIsOpen(!isOpen)}
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
            selected={
              acquisitionDate === null ? null : new Date(acquisitionDate)
            }
            onChange={date => {
              setAcquisitionDate(date)
              setIsOpen(false)
            }}
          />
        </DatePickerBox>
      )}
    </>
  )
}
