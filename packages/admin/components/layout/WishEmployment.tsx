import styled from 'styled-components'
import WishForm from '@/components/form/WishForm'
import { useSuspenseQuery } from '@apollo/client'
import { SEARCH_SM_QUERY } from '@/graphql/queries'
import { ResultSearchSm } from '@/src/generated/graphql'

type searchSMQuery = {
  searchSM: ResultSearchSm
}

export default function WishEmployment({ paymentId, subjectId, mId }) {
  const { error, data, fetchMore, refetch } = useSuspenseQuery<searchSMQuery>(
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
      <WishForm
        item={data?.searchSM.data}
        paymentId={paymentId}
        subjectId={subjectId}
        mId={mId}
      />
    </>
  )
}
