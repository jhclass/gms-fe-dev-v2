import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Pagination,
  ScrollShadow,
} from '@nextui-org/react'
import { styled } from 'styled-components'
import { useEffect, useState } from 'react'
import { SEE_MESSAGE_STORAGE_QUERY } from '@/graphql/queries'
import { useMutation, useSuspenseQuery } from '@apollo/client'
import { ResultMessageStorage } from '@/src/generated/graphql'
import { DELETE_MESSAGE_STORAGE_MUTATION } from '@/graphql/mutations'
import useUserLogsMutation from '@/utils/userLogs'

const FlexBox = styled.div`
  gap: 1rem;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  display: grid;

  @media (max-width: 1610px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
  @media (max-width: 1450px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  @media (max-width: 1200px) {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  @media (max-width: 540px) {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
`

const ConLabel = styled.p`
  color: #11181c;
  font-size: 0.875rem;
`

const ConText = styled.p`
  color: ${({ theme }) => theme.colors.gray};
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

  span {
    color: ${({ theme }) => theme.colors.gray};
  }
`

const SendState = styled.p`
  color: ${({ theme }) => theme.colors.gray};
  font-size: 0.875rem;
  font-weight: 700;

  &.res {
    color: ${({ theme }) => theme.colors.secondary};
  }

  &.succ {
    color: ${({ theme }) => theme.colors.primary};
  }

  &.err {
    color: ${({ theme }) => theme.colors.accent};
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
  color: ${({ theme }) => theme.colors.gray};
`

type SeeMessageStorageQuery = {
  seeMessageStorage: ResultMessageStorage
}

export default function SMSItem({
  setMessageCon,
  setValue,
  type,
  setByteLength,
}) {
  const [currentPage, setCurrentPage] = useState(1)
  const [currentLimit, setCurrentLimit] = useState(12)
  const { error, data, refetch } = useSuspenseQuery<SeeMessageStorageQuery>(
    SEE_MESSAGE_STORAGE_QUERY,
    {
      variables: {
        saveType: type,
        limit: currentLimit,
        page: currentPage,
      },
    },
  )
  const [deleteMessageStorage] = useMutation(DELETE_MESSAGE_STORAGE_MUTATION)
  const { userLogs } = useUserLogsMutation()

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

  const getHtmlByteSize = htmlString => {
    const parser = new DOMParser()
    const doc = parser.parseFromString(htmlString, 'text/html')

    const textContent = doc.body.innerHTML
      .replace(/&nbsp;/g, ' ')
      .replace(/<br\/?>/g, '\n')

    const encoder = new TextEncoder()
    return encoder.encode(textContent).length
  }

  const handleApply = message => {
    setMessageCon(message)
    setByteLength(getHtmlByteSize(message))
    setValue('message', message)
  }

  const handleDelete = id => {
    deleteMessageStorage({
      variables: {
        deleteMessageStorageId: id,
      },
      refetchQueries: [SEE_MESSAGE_STORAGE_QUERY],
      onCompleted: result => {
        if (result.deleteMessageStorage.ok) {
          userLogs(`문자 보관함 ID : ${id} 삭제`)
          alert('문자함에서 삭제 되었습니다.')
        }
      },
    })
  }

  return (
    <>
      {data?.seeMessageStorage?.totalCount > 0 ? (
        <FlexBox>
          {data?.seeMessageStorage?.data?.map((item, index) => (
            <Card
              key={index}
              shadow="none"
              classNames={{
                base: 'bg-white px-3 py-1 border-2 border-primary',
              }}
            >
              <CardHeader className="flex flex-col gap-3 p-2">
                <SendInfo className="first">
                  <ConLabel>저장일</ConLabel>
                  <ConText>{formatDate(item.createdAt)}</ConText>
                </SendInfo>
                <SendInfo>
                  {getHtmlByteSize(item.message) > 90 ? (
                    <SendState className="err">LMS</SendState>
                  ) : (
                    <SendState className="succ">SMS</SendState>
                  )}

                  <SendType>
                    {getHtmlByteSize(item.message)}
                    <span>byte</span>
                  </SendType>
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
              <CardFooter className="justify-center gap-[0.5rem] text-small">
                <Button
                  size="sm"
                  variant="solid"
                  color="primary"
                  className="text-white"
                  onClick={() => handleApply(item.message)}
                >
                  적용
                </Button>
                <Button
                  size="sm"
                  variant="solid"
                  className="text-white bg-accent"
                  onClick={() => handleDelete(item.id)}
                >
                  삭제
                </Button>
              </CardFooter>
            </Card>
          ))}
        </FlexBox>
      ) : (
        <Nolist>보관된 문자가 없습니다.</Nolist>
      )}

      {data?.seeMessageStorage?.totalCount > 0 && (
        <PagerWrap>
          <Pagination
            variant="light"
            showControls
            initialPage={currentPage}
            page={currentPage}
            total={Math.ceil(
              data?.seeMessageStorage?.totalCount / currentLimit,
            )}
            onChange={newPage => {
              setCurrentPage(newPage)
            }}
          />
        </PagerWrap>
      )}
    </>
  )
}
