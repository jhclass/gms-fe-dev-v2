import { Input, ScrollShadow } from '@nextui-org/react'
import { styled } from 'styled-components'

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
  align-items: center;
`
const Ttext = styled.div`
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 33%;
  padding: 0.5rem;
  font-size: inherit;
  color: inherit;
`

const Ttitle = styled.div`
  position: relative;
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 26%;
  padding: 0.5rem;
  font-size: inherit;
`

const Tname = styled.div`
  position: relative;
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 14%;
  padding: 0.5rem;
  font-size: inherit;
`

const Tnum = styled.div`
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 6%;
  padding: 0.5rem;
  font-size: inherit;
  color: inherit;
  min-width: ${1200 * 0.06}px;
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

export default function AbsentList() {
  const periods = [
    '1교시',
    '2교시',
    '3교시',
    '4교시',
    '5교시',
    '6교시',
    '7교시',
  ]
  return (
    <>
      <TableArea>
        <ScrollShadow orientation="horizontal" className="scrollbar">
          <TableWrap>
            <Theader>
              <TheaderBox>
                <ClickBox>
                  <Tnum>교시</Tnum>
                  <Tname>담당교사</Tname>
                  <Ttitle>교과목명</Ttitle>
                  <Ttitle>능력단위명</Ttitle>
                  <Ttext>훈련내용(능력단위요소명)</Ttext>
                </ClickBox>
              </TheaderBox>
            </Theader>
            {periods.map((period, index) => (
              <TableItem key={index}>
                <TableRow>
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
                    <Tname>
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
                    </Tname>
                    <Ttitle>
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
                    </Ttitle>
                    <Ttitle>
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
                    </Ttitle>
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
                </TableRow>
              </TableItem>
            ))}
          </TableWrap>
        </ScrollShadow>
      </TableArea>
    </>
  )
}
