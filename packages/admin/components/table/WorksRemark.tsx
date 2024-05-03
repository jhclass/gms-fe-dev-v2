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
import DatePickerHeader from '../common/DatePickerHeader'

const TableArea = styled.div`
  margin-top: 0.5rem;
`
const TableWrap = styled.div`
  width: 100%;
  display: table;
  min-width: 38rem;
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
  border-bottom: 1px solid #e4e4e7;
`

const ClickBox = styled.div`
  display: flex;
  width: 100%;
`

const Tnum = styled.div`
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 20%;
  padding: 0.5rem;
  font-size: inherit;
  color: inherit;
`
const Ttext = styled.div`
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 80%;
  padding: 0.5rem;
  font-size: inherit;
  color: inherit;
`

const TableItem = styled.div`
  position: relative;
  width: 100%;
  min-width: fit-content;
  color: #71717a;
  font-size: 0.875rem;
  border-radius: 0.5rem;
  background: #fff;
  overflow: hidden;

  &:hover {
    cursor: pointer;
    background: rgba(255, 255, 255, 0.8);
  }
  &:nth-child(odd) {
    background: #e2eafc;
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

export default function WorksTime() {
  const periods = ['결석', '지각', '조퇴', '외출', '기타사항']
  return (
    <>
      <TableArea>
        <ScrollShadow orientation="horizontal" className="scrollbar">
          <TableWrap>
            <Theader>
              <TheaderBox>
                <ClickBox>
                  <Tnum>구분</Tnum>
                  <Ttext>학생명</Ttext>
                </ClickBox>
              </TheaderBox>
            </Theader>
            {periods.map((period, index) => (
              <TableItem key={index}>
                <ClickBox>
                  <Tnum>
                    <Input
                      isReadOnly={true}
                      labelPlacement="outside"
                      variant="flat"
                      radius="sm"
                      size="sm"
                      type="text"
                      value={period}
                      className="w-full"
                    />
                  </Tnum>
                  <Ttext>
                    <Input
                      labelPlacement="outside"
                      variant="bordered"
                      radius="sm"
                      size="sm"
                      type="text"
                      placeholder=" "
                      className="w-full"
                      classNames={{
                        inputWrapper: `${
                          index % 2 === 0 ? '' : 'border-default-300'
                        }  `,
                      }}
                    />
                  </Ttext>
                </ClickBox>
              </TableItem>
            ))}
          </TableWrap>
        </ScrollShadow>
      </TableArea>
    </>
  )
}
