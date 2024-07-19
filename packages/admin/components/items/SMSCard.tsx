import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Pagination,
  ScrollShadow,
  Textarea,
} from '@nextui-org/react'
import { styled } from 'styled-components'
import useMmeQuery from '@/utils/mMe'
import { useRouter } from 'next/router'
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

  @media (max-width: 1400px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  @media (max-width: 480px) {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
`

const PagerWrap = styled.div`
  display: flex;
  margin-top: 1.5rem;
  justify-content: center;
`

type SeeMessageStorageQuery = {
  seeMessageStorage: ResultMessageStorage
}

export default function SMSItem({ setMessageCon, setValue, type }) {
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

  const renderMessage = message => {
    const formattedMessage = message
      .replace(/\\n/g, '<br>')
      .replace(/&nbsp;/g, ' ')
    return { __html: formattedMessage }
  }

  useEffect(() => {
    refetch()
  }, [currentPage])

  const handleApply = message => {
    const restoredMessage = message
      .replace(/\\n/g, '\n')
      .replace(/&nbsp;/g, ' ')

    setMessageCon(restoredMessage)
    setValue('message', restoredMessage)
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
      <FlexBox>
        {data?.seeMessageStorage?.data?.map((item, index) => (
          <Card
            key={index}
            shadow="none"
            classNames={{
              base: 'bg-transparent',
            }}
          >
            <CardBody className="p-[0.5rem] bg-white rounded-[1rem] min-h-[13rem] max-h-[13rem]">
              <ScrollShadow orientation="horizontal" className="scrollbar">
                <div
                  className="pr-[0.5rem]"
                  dangerouslySetInnerHTML={renderMessage(item.message)}
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
                className="bg-[#ff5900] text-white"
                onClick={() => handleDelete(item.id)}
              >
                삭제
              </Button>
            </CardFooter>
          </Card>
        ))}
      </FlexBox>
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
