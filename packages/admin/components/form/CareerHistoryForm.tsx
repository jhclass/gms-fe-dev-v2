import { Button, Input, ScrollShadow } from '@nextui-org/react'
import { styled } from 'styled-components'

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
  width: 84%;
  padding: 0.5rem;
  font-size: inherit;
  color: inherit;
  min-width: ${1200 * 0.84}px;
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
  color: #71717a;
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

export default function CareerHistoryForm() {
  return (
    <TableArea>
      <ScrollShadow orientation="horizontal" className="scrollbar">
        <TableWrap>
          <Theader>
            <TheaderBox>
              <ClickBox>
                <Ttext>경력 내용</Ttext>
                <Tbtn></Tbtn>
              </ClickBox>
            </TheaderBox>
          </Theader>
          <TableItem>
            <TableRow>
              <ClickBox>
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
                      className="w-full bg-[#07bbae] text-white"
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
  )
}
