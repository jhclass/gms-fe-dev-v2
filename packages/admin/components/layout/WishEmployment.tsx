import styled from 'styled-components'
import WishForm from '@/components/form/WishForm'
import { useSuspenseQuery } from '@apollo/client'
import { SEARCH_SM_QUERY } from '@/graphql/queries'
import { ResultSearchSm } from '@/src/generated/graphql'
import WishFormList from '../form/WishFormList'

type searchSMQuery = {
  searchSM: ResultSearchSm
}

export default function WishEmployment({ paymentId, subjectId }) {
  const { error, data, refetch } = useSuspenseQuery<searchSMQuery>(
    SEARCH_SM_QUERY,
    {
      variables: {
        modelType: 'HopeForEmployment',
        studentPaymentId: paymentId,
      },
    },
  )

  return (
    <>
      {data?.searchSM.data.length > 0 ? (
        <WishFormList
          item={data?.searchSM.data.length > 0 ? data?.searchSM.data[0] : null}
          refetch={refetch}
        />
      ) : (
        <WishForm paymentId={paymentId} subjectId={subjectId} />
      )}
    </>
  )
}
