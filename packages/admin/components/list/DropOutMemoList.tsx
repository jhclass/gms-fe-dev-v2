import { styled } from 'styled-components'
import { Button } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import { SEARCH_SM_QUERY } from '@/graphql/queries'
import { ResultSearchSm } from '@/src/generated/graphql'
import { useSuspenseQuery } from '@apollo/client'
import DropOutMemoEditForm from '@/components/form/DropOutMemoEditForm'
import { useRouter } from 'next/router'

const MoreBtn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`
const Nolist = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  padding: 1rem 0;
  color: ${({ theme }) => theme.colors.gray};
`

type searchSMQuery = {
  searchSM: ResultSearchSm
}

export default function DropOutMemoList({
  isCreate,
  setIsCreate,
  lectureId,
  mId,
}) {
  const router = useRouter()
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)
  const [isFetching, setIsFetching] = useState(false)
  const [searchData, setSearchData] = useState([])
  const { error, data, fetchMore, refetch } = useSuspenseQuery<searchSMQuery>(
    SEARCH_SM_QUERY,
    {
      variables: {
        modelType: 'PreInspection',
        lectureId: lectureId,
        limit: limit,
        page: 1,
      },
    },
  )

  const fetchMoreData = async nextPage => {
    await fetchMore({
      variables: { page: nextPage },
      updateQuery: (prevResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prevResult
        const newData = [
          ...prevResult.searchSM.data,
          ...fetchMoreResult.searchSM.data,
        ]
        setSearchData(newData)

        return {
          ...prevResult,
          searchSM: {
            ...prevResult.searchSM,
            data: newData,
            totalCount: fetchMoreResult.searchSM.totalCount,
          },
        }
      },
    })
    setPage(nextPage)
  }

  useEffect(() => {
    if (isFetching) {
      const nextPage = page + 1
      fetchMoreData(nextPage).finally(() => {
        setIsFetching(false)
      })
    }
  }, [isFetching])

  const loadMore = () => {
    if (page < Math.ceil(data?.searchSM.totalCount / limit)) {
      setIsFetching(true)
    }
  }

  useEffect(() => {
    if (data && data?.searchSM) {
      setSearchData(data?.searchSM.data)
    }
  }, [data])

  useEffect(() => {
    if (isCreate) {
      setPage(1)
      setIsCreate(false)
    }
  }, [isCreate])

  if (error) {
    console.log(error)
  }

  return (
    <>
      {data?.searchSM.totalCount > 0 ? (
        <>
          {searchData &&
            searchData.map((item, index) => (
              <DropOutMemoEditForm
                key={index}
                item={item}
                refetch={refetch}
                setPage={setPage}
                mId={mId}
              />
            ))}
          {page < Math.ceil(data?.searchSM.totalCount / limit) && (
            <MoreBtn>
              <Button
                size="md"
                onClick={loadMore}
                className="w-full bg-white border-secondary text-secondary"
              >
                더보기{' '}
                <span className="text-secondary text-[1rem]">
                  <i className="xi-plus-circle" />
                </span>
              </Button>
            </MoreBtn>
          )}
        </>
      ) : (
        <>
          <Nolist>등록된 상담이 없습니다.</Nolist>
        </>
      )}
    </>
  )
}
