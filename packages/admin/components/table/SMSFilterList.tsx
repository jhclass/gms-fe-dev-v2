import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Pagination,
  ScrollShadow,
} from '@nextui-org/react'
import { useEffect, useState } from 'react'
import { styled } from 'styled-components'
import { useSuspenseQuery } from '@apollo/client'
import { SEARCH_MESSAGE_QUERY } from '@/graphql/queries'
import { ResultSearchSms } from '@/src/generated/graphql'

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
  @media (max-width: 900px) {
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
const ConBox = styled.div`
  max-height: 5rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: flex-end;
`

const ConText = styled.p`
  color: #71717a;
  font-size: 0.875rem;
`

const SendInfo = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: flex-start;

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
  font-size: 0.875rem;
  font-weight: 700;

  &.succ {
    color: #007de9;
  }

  &.err {
    color: #ff5900;
  }

  &.resSucc {
    color: #07bbae;
  }

  &.resErr {
    color: #71717a;
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

const Nolist = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  padding: 2rem 0;
  color: #71717a;
`

type SearchMessageQuery = {
  searchSms: ResultSearchSms
}

export default function SMSFilterList({ smsFilter }) {
  const [currentPage, setCurrentPage] = useState(1)
  const [currentLimit] = useState(12)

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

  return (
    <>
      <TTopic>
        <Ttotal>
          총{' '}
          <span>
            {data?.searchSms?.totalCount === null
              ? '0'
              : data?.searchSms?.totalCount}
          </span>
          건
        </Ttotal>
      </TTopic>
      {data?.searchSms?.totalCount && data.searchSms.totalCount > 0 ? (
        <FlexBox>
          {data?.searchSms?.data?.map((item, index) => (
            <Card
              key={index}
              shadow="none"
              classNames={{
                base: `bg-white px-3 py-1 border-2 ${
                  item.rDate === null
                    ? item.successType === 'Y'
                      ? 'border-[#007de9]'
                      : 'border-[#ff5900]'
                    : item.successType === 'Y'
                    ? 'border-[#07bbae]'
                    : 'border-[#71717a]'
                }`,
              }}
            >
              <CardHeader className="flex flex-col gap-3 p-2">
                {item.rDate === null ? (
                  <SendInfo className="first">
                    <ConLabel>발송일시</ConLabel>
                    <ConText>{formatDate(item.createdAt)}</ConText>
                  </SendInfo>
                ) : (
                  <SendInfo className="first">
                    <ConLabel>예약일시</ConLabel>
                    <ConText>{formatDate(item.createdAt)}</ConText>
                  </SendInfo>
                )}
                <SendInfo>
                  <SendType>SMS</SendType>
                  <SendState
                    className={`${
                      item.rDate === null
                        ? item.successType === 'Y'
                          ? 'succ'
                          : 'err'
                        : item.successType === 'Y'
                        ? 'resSucc'
                        : 'resErr'
                    } `}
                  >
                    {item.rDate === null ? '즉시전송' : '예약전송'} /{' '}
                    {item.successType === 'Y' ? '성공' : '실패'}
                  </SendState>
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
                  <ConLabel>발신자</ConLabel>
                  <ConText>{item.manageUser.mUsername}</ConText>
                </SendInfo>
                <SendInfo className="first">
                  <ConLabel>발신번호</ConLabel>
                  <ConText>01041942040</ConText>
                </SendInfo>
                <SendInfo>
                  <ConLabel>수신번호</ConLabel>
                  <ConBox className="scrollbar_g">
                    <ScrollShadow className="scrollbar">
                      {item.receiver.split(',').map((num, index) => (
                        <ConText key={index}>{num}</ConText>
                      ))}
                    </ScrollShadow>
                  </ConBox>
                </SendInfo>
              </CardFooter>
            </Card>
          ))}
        </FlexBox>
      ) : (
        <Nolist>발송된 문자가 없습니다.</Nolist>
      )}

      {data.searchSms.totalCount > 0 && (
        <PagerWrap>
          <Pagination
            variant="light"
            showControls
            initialPage={1}
            page={currentPage}
            total={Math.ceil(data.searchSms.totalCount / currentLimit)}
            onChange={newPage => {
              setCurrentPage(newPage)
            }}
          />
        </PagerWrap>
      )}
    </>
  )
}
