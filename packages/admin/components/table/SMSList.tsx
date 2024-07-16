import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Pagination,
  ScrollShadow,
} from '@nextui-org/react'
import { useState } from 'react'
import { styled } from 'styled-components'
import ConsultationMo from './ConsultationMo'

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
const FlexBox = styled.div`
  margin-top: 1rem;
  gap: 1rem;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  display: grid;

  @media (max-width: 1580px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
  @media (max-width: 1300px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  @media (max-width: 920px) {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  @media (max-width: 540px) {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
`

const Conbox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

const ConLabel = styled.p`
  color: #11181c;
  font-size: 0.875rem;
`

const ConText = styled.p`
  color: #71717a;
  font-size: 0.875rem;
`

const SendInfo = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`

const SendType = styled.p`
  color: #11181c;
  font-size: 0.875rem;
`

const SendState = styled.p`
  color: #71717a;
  font-size: 0.875rem;
  font-weight: 700;

  &.res {
    color: #07bbae;
  }

  &.succ {
    color: #007de9;
  }

  &.err {
    color: #ff5900;
  }
`

export default function SMSList() {
  // const [currentPage, setCurrentPage] = useRecoilState(consultPageState)
  const [currentLimit] = useState(10)
  const [totalCount, setTotalCount] = useState(0)

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <TTopic>
        <Ttotal>
          총 <span>1</span>건
        </Ttotal>
      </TTopic>
      <FlexBox>
        <Card
          shadow="none"
          classNames={{
            base: 'bg-white px-3 py-1',
          }}
        >
          <CardHeader className="flex flex-col gap-3 p-2">
            <SendInfo className="flex">
              <ConLabel>발송일시</ConLabel>
              <ConText>2024-05-01 12:45</ConText>
            </SendInfo>
            <SendInfo>
              <SendType>SMS</SendType>
              <SendState className="succ">성공</SendState>
            </SendInfo>
          </CardHeader>
          <CardBody className="p-[0.5rem] bg-[#f4f4f6] rounded-[1rem] min-h-[13rem] max-h-[13rem]">
            <ScrollShadow orientation="horizontal" className="scrollbar">
              <div className="pr-[0.5rem]">
                asdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdf
              </div>
            </ScrollShadow>
          </CardBody>
          <CardFooter className="flex gap-3 p-2 ">
            <Conbox>
              <ConLabel>수신번호</ConLabel>
              <ConText>010523452323</ConText>
            </Conbox>
            <Conbox>
              <ConLabel>발신번호</ConLabel>
              <ConText>01012341234</ConText>
            </Conbox>
          </CardFooter>
        </Card>
        <Card
          shadow="none"
          classNames={{
            base: 'bg-white px-3 py-1',
          }}
        >
          <CardHeader className="flex flex-col gap-3 p-2">
            <SendInfo className="flex">
              <ConLabel>발송일시</ConLabel>
              <ConText>2024-05-01 12:45</ConText>
            </SendInfo>
            <SendInfo>
              <SendType>SMS</SendType>
              <SendState className="err">실패</SendState>
            </SendInfo>
          </CardHeader>
          <CardBody className="p-[0.5rem] bg-[#f4f4f6] rounded-[1rem] min-h-[13rem] max-h-[13rem]">
            <ScrollShadow orientation="horizontal" className="scrollbar">
              <div className="pr-[0.5rem]">
                asdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdf
              </div>
            </ScrollShadow>
          </CardBody>
          <CardFooter className="flex gap-3 p-2 ">
            <Conbox>
              <ConLabel>수신번호</ConLabel>
              <ConText>010523452323</ConText>
            </Conbox>
            <Conbox>
              <ConLabel>발신번호</ConLabel>
              <ConText>01012341234</ConText>
            </Conbox>
          </CardFooter>
        </Card>
        <Card
          shadow="none"
          classNames={{
            base: 'bg-white px-3 py-1',
          }}
        >
          <CardHeader className="flex flex-col gap-3 p-2">
            <SendInfo className="flex">
              <ConLabel>발송일시</ConLabel>
              <ConText>2024-05-01 12:45</ConText>
            </SendInfo>
            <SendInfo>
              <SendType>SMS</SendType>
              <SendState className="res">예약</SendState>
            </SendInfo>
          </CardHeader>
          <CardBody className="p-[0.5rem] bg-[#f4f4f6] rounded-[1rem] min-h-[13rem] max-h-[13rem]">
            <ScrollShadow orientation="horizontal" className="scrollbar">
              <div className="pr-[0.5rem]">
                asdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdf
              </div>
            </ScrollShadow>
          </CardBody>
          <CardFooter className="flex gap-3 p-2 ">
            <Conbox>
              <ConLabel>수신번호</ConLabel>
              <ConText>010523452323</ConText>
            </Conbox>
            <Conbox>
              <ConLabel>발신번호</ConLabel>
              <ConText>01012341234</ConText>
            </Conbox>
          </CardFooter>
        </Card>
        <Card
          shadow="none"
          classNames={{
            base: 'bg-white px-3 py-1',
          }}
        >
          <CardHeader className="flex flex-col gap-3 p-2">
            <SendInfo className="flex">
              <ConLabel>발송일시</ConLabel>
              <ConText>2024-05-01 12:45</ConText>
            </SendInfo>
            <SendInfo>
              <SendType>SMS</SendType>
              <SendState>발송중</SendState>
            </SendInfo>
          </CardHeader>
          <CardBody className="p-[0.5rem] bg-[#f4f4f6] rounded-[1rem] min-h-[13rem] max-h-[13rem]">
            <ScrollShadow orientation="horizontal" className="scrollbar">
              <div className="pr-[0.5rem]">
                asdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdf
              </div>
            </ScrollShadow>
          </CardBody>
          <CardFooter className="flex gap-3 p-2 ">
            <Conbox>
              <ConLabel>수신번호</ConLabel>
              <ConText>010523452323</ConText>
            </Conbox>
            <Conbox>
              <ConLabel>발신번호</ConLabel>
              <ConText>01012341234</ConText>
            </Conbox>
          </CardFooter>
        </Card>
      </FlexBox>
    </>
  )
}
