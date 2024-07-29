import { Button, Input, ScrollShadow } from '@nextui-org/react'
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
  border-bottom: 1px solid #e4e4e7;
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
  border: 1px solid #e4e4e7;
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

export default function CareerHistoryList() {
  return (
    <>
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
            <ItemBox>
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
