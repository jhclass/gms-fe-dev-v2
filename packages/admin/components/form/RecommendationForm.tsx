import { Button, Checkbox, Input, ScrollShadow } from '@nextui-org/react'
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
  padding-bottom: 1.5rem;
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
  width: 10%;
  padding: 0.5rem;
  font-size: inherit;
  color: inherit;
  min-width: ${1200 * 0.1}px;
`

const Tcon = styled.div`
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

const Tcheck = styled.div`
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 6%;
  padding: 0.5rem;
  font-size: inherit;
  color: inherit;
  min-width: ${1200 * 0.06}px;
  text-align: center;
`
const Tbtn = styled.div`
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 5%;
  padding: 0.5rem;
  font-size: inherit;
  color: inherit;
  min-width: ${1200 * 0.05}px;
`
const TableItem = styled.div`
  position: relative;
  width: 100%;
  min-width: fit-content;
  color: ${({ theme }) => theme.colors.gray};
  font-size: 0.875rem;
  border-radius: 0.5rem;
  background: #fff;
  overflow: hidden;
`

const TableRow = styled.div`
  display: flex;
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

export default function RecommendationForm() {
  const [recommendationDate, setRecommendationDate] = useState(null)
  const [interviewDate, setInterviewDate] = useState(null)
  const [isEmployment, setIsEmployment] = useState(false)
  const [isCertificate, setIsCertificate] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const years = _.range(2000, getYear(new Date()) + 5, 1)
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
                  <Tdate>추천일자</Tdate>
                  <Ttext>회사명</Ttext>
                  <Ttext>채용분야</Ttext>
                  <Ttext>소재지</Ttext>
                  <Ttext>전화번호</Ttext>
                  <Tdate>면접일자</Tdate>
                  <Tcheck>취업여부</Tcheck>
                  <Tcon>미취업사유</Tcon>
                  <Tcheck>
                    재직증명
                    <br />
                    확보예정
                  </Tcheck>
                  <Tbtn></Tbtn>
                </ClickBox>
              </TheaderBox>
            </Theader>
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
                        recommendationDate === null
                          ? null
                          : String(recommendationDate)
                      }
                      value={formatDate(recommendationDate) || ''}
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
                        interviewDate === null ? null : String(interviewDate)
                      }
                      value={formatDate(interviewDate) || ''}
                      onClick={() => setIsOpen(!isOpen)}
                    />
                  </Tdate>
                  <Tcheck>
                    <Checkbox
                      size="sm"
                      isSelected={isEmployment}
                      onValueChange={setIsEmployment}
                      classNames={{
                        wrapper: 'mr-0',
                      }}
                    />
                  </Tcheck>
                  <Tcon>
                    <Input
                      labelPlacement="outside"
                      variant="bordered"
                      radius="sm"
                      size="sm"
                      type="text"
                      placeholder=" "
                      className="w-full"
                    />
                  </Tcon>
                  <Tcheck>
                    <Checkbox
                      size="sm"
                      isSelected={isCertificate}
                      onValueChange={setIsCertificate}
                      classNames={{
                        wrapper: 'mr-0',
                      }}
                    />
                  </Tcheck>
                  <Tbtn>
                    <BtnBox>
                      <Button
                        size="sm"
                        variant="solid"
                        color="primary"
                        className="w-full text-white bg-secondary"
                        // onClick={() => setIsOpen(!isOpen)}
                      >
                        추가
                      </Button>
                    </BtnBox>
                  </Tbtn>
                </ClickBox>
              </TableRow>
            </TableItem>
          </TableWrap>
        </ScrollShadow>
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
            selected={
              recommendationDate === null ? null : new Date(recommendationDate)
            }
            onChange={date => {
              setRecommendationDate(date)
              setIsOpen(false)
            }}
          />
        </DatePickerBox>
      )}
    </>
  )
}
