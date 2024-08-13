import { styled } from 'styled-components'
import { Button } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import { SEARCH_SM_QUERY } from '@/graphql/queries'
import { ResultSearchSm } from '@/src/generated/graphql'
import { useSuspenseQuery } from '@apollo/client'
import EmploymentMemoItem from '@/components/items/EmploymentMemoItem'

const MoreBtn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

type searchSMQuery = {
  searchSM: ResultSearchSm
}

export default function EmploymentMemoList({
  isCreate,
  setIsCreate,
  paymentId,
  mId,
}) {
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)
  const [isFetching, setIsFetching] = useState(false)
  const [searchData, setSearchData] = useState([])
  const { error, data, fetchMore, refetch } = useSuspenseQuery<searchSMQuery>(
    SEARCH_SM_QUERY,
    {
      variables: {
        modelType: 'StudentConsultation',
        studentPaymentId: paymentId,
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
      {searchData &&
        searchData.map((item, index) => (
          <EmploymentMemoItem
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
  )
}
