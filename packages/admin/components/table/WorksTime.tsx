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
`

const Tnum = styled.div`
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 16.6666%;
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
  const periods = ['일계', '누계']
  return (
    <>
      <TableArea>
        <ScrollShadow orientation="horizontal" className="scrollbar">
          <TableWrap>
            <Theader>
              <TheaderBox>
                <ClickBox>
                  <Tnum>구분</Tnum>
                  <Tnum>교양</Tnum>
                  <Tnum>전공</Tnum>
                  <Tnum>실습</Tnum>
                  <Tnum>기타</Tnum>
                  <Tnum>계</Tnum>
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
                    <Tnum>
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
                    </Tnum>
                    <Tnum>
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
                    </Tnum>
                    <Tnum>
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
                    </Tnum>
                    <Tnum>
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
                    </Tnum>
                    <Tnum>
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
                    </Tnum>
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
