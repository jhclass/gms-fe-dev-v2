import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Pagination,
  ScrollShadow,
} from '@nextui-org/react'
import { useEffect, useState } from 'react'
import { styled } from 'styled-components'
import ConsultationMo from './ConsultationMo'
import { useSuspenseQuery } from '@apollo/client'
import { ResultSearchSms } from '@/src/generated/graphql'
import { SEARCH_MESSAGE_QUERY } from '@/graphql/queries'

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

  &.first {
    padding-bottom: 0.75rem;
    border-bottom: 1px solid #e3e3e6;
  }
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

const NumInfo = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  border-radius: 0.5rem;
  border: 2px solid #007de9;
  padding: 0.75rem 0.5rem;

  &.caller {
    border: 2px solid #07bbae;
  }
`
const PagerWrap = styled.div`
  display: flex;
  margin-top: 1.5rem;
  justify-content: center;
`
type SearchMessageQuery = {
  searchSms: ResultSearchSms
}

export default function SMSList() {
  const [currentPage, setCurrentPage] = useState(1)
  const [currentLimit] = useState(12)
  const [totalCount, setTotalCount] = useState(0)

  const { error, data, refetch } = useSuspenseQuery<SearchMessageQuery>(
    SEARCH_MESSAGE_QUERY,
    {
      variables: {
        branchId: 1,
        page: currentPage,
        limit: currentLimit,
      },
    },
  )

  useEffect(() => {
    refetch()
  }, [currentPage])

  const formatDate = data => {
    const timestamp = parseInt(data, 10)
    const date = new Date(timestamp)
    const formatted =
      `${date.getFullYear()}-` +
      `${(date.getMonth() + 1).toString().padStart(2, '0')}-` +
      `${date.getDate().toString().padStart(2, '0')} ` +
      `${date.getHours().toString().padStart(2, '0')}:` +
      `${date.getMinutes().toString().padStart(2, '0')}`
    return formatted
  }

  const textDate = '123123<br/>7646&nbsp;qqq'

  console.log(data)

  return (
    <>
      <TTopic>
        <Ttotal>
          총 <span>{data?.searchSms?.totalCount}</span>건
        </Ttotal>
      </TTopic>
      <FlexBox>
        {data?.searchSms?.data?.map((item, index) => (
          <Card
            key={index}
            shadow="none"
            classNames={{
              base: 'bg-white px-3 py-1 border-2 border-[#71717a]',
            }}
          >
            <CardHeader className="flex flex-col gap-3 p-2">
              {/* {data?.searchSms?.data === null ? (
                <SendInfo className="first">
                  <ConLabel>발송일시</ConLabel>
                  <ConText>{formatDate(item.createdAt)}</ConText>
                </SendInfo>
              ) : (
                <SendInfo className="first">
                  <ConLabel>예약일시</ConLabel>
                  <ConText>{formatDate(item.createdAt)}</ConText>
                </SendInfo>
              )} */}
              <SendInfo>
                <SendType>SMS</SendType>
                <SendState>발송중</SendState>
              </SendInfo>
            </CardHeader>
            <CardBody className="p-[0.5rem] bg-[#f4f4f6] rounded-[1rem] min-h-[13rem] max-h-[13rem]">
              <ScrollShadow orientation="horizontal" className="scrollbar">
                <div
                  style={{ whiteSpace: 'pre-wrap' }}
                  className="pr-[0.5rem]"
                  dangerouslySetInnerHTML={{ __html: item.message }}
                />
              </ScrollShadow>
            </CardBody>
            <CardFooter className="flex flex-col gap-3 p-2">
              <SendInfo className="first">
                <ConLabel>수신번호</ConLabel>
                <ConText>010523452323</ConText>
              </SendInfo>
              <SendInfo>
                <ConLabel>발신번호</ConLabel>
                <ConText>01041942040</ConText>
              </SendInfo>
            </CardFooter>
          </Card>
        ))}

        <Card
          shadow="none"
          classNames={{
            base: 'bg-white px-3 py-1 border-2 border-[#007de9]',
          }}
        >
          <CardHeader className="flex flex-col gap-3 p-2">
            <SendInfo className="first">
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
              <div
                className="pr-[0.5rem]"
                dangerouslySetInnerHTML={{ __html: textDate }}
              />
            </ScrollShadow>
          </CardBody>
          <CardFooter className="flex flex-col gap-3 p-2">
            <SendInfo className="first">
              <ConLabel>수신번호</ConLabel>
              <ConText>010523452323</ConText>
            </SendInfo>
            <SendInfo>
              <ConLabel>발신번호</ConLabel>
              <ConText>01041942040</ConText>
            </SendInfo>
          </CardFooter>
        </Card>
        <Card
          shadow="none"
          classNames={{
            base: 'bg-white px-3 py-1 border-2 border-[#ff5900]',
          }}
        >
          <CardHeader className="flex flex-col gap-3 p-2">
            <SendInfo className="first">
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
          <CardFooter className="flex flex-col gap-3 p-2">
            <SendInfo className="flex first">
              <ConLabel>수신번호</ConLabel>
              <ConText>010523452323</ConText>
            </SendInfo>
            <SendInfo className="flex">
              <ConLabel>발신번호</ConLabel>
              <ConText>01041942040</ConText>
            </SendInfo>
          </CardFooter>
        </Card>
        <Card
          shadow="none"
          classNames={{
            base: 'bg-white px-3 py-1 border-2 border-[#07bbae]',
          }}
        >
          <CardHeader className="flex flex-col gap-3 p-2">
            <SendInfo className="first">
              <ConLabel>예약일시</ConLabel>
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
          <CardFooter className="flex flex-col gap-3 p-2">
            <SendInfo className="first">
              <ConLabel>수신번호</ConLabel>
              <ConText>010523452323</ConText>
            </SendInfo>
            <SendInfo>
              <ConLabel>발신번호</ConLabel>
              <ConText>01041942040</ConText>
            </SendInfo>
          </CardFooter>
        </Card>
        <Card
          shadow="none"
          classNames={{
            base: 'bg-white px-3 py-1 border-2 border-[#71717a]',
          }}
        >
          <CardHeader className="flex flex-col gap-3 p-2">
            <SendInfo className="first">
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
          <CardFooter className="flex flex-col gap-3 p-2">
            <SendInfo className="first">
              <ConLabel>수신번호</ConLabel>
              <ConText>010523452323</ConText>
            </SendInfo>
            <SendInfo>
              <ConLabel>발신번호</ConLabel>
              <ConText>01041942040</ConText>
            </SendInfo>
          </CardFooter>
        </Card>
      </FlexBox>
      {/* {totalCount > 0 && ( */}
      <PagerWrap>
        <Pagination
          variant="light"
          showControls
          initialPage={currentPage}
          page={currentPage}
          total={3}
          // total={Math.ceil(totalCount / currentLimit)}
          onChange={newPage => {
            setCurrentPage(newPage)
          }}
        />
      </PagerWrap>
      {/* )} */}
    </>
  )
}
