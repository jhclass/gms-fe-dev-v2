import { useSuspenseQuery } from '@apollo/client'
import { SEARCH_SM_QUERY } from '@/graphql/queries'
import { ResultSearchSm } from '@/src/generated/graphql'
import EmploymentForm from '@/components/form/EmploymentForm'

type searchSMQuery = {
  searchSM: ResultSearchSm
}

export default function Employment({ paymentId, subjectId }) {
  const { error, data, refetch } = useSuspenseQuery<searchSMQuery>(
    SEARCH_SM_QUERY,
    {
      variables: {
        modelType: 'EmploymentStatus',
        studentPaymentId: paymentId,
      },
    },
  )

  return (
    <>
      {data?.searchSM.data.length > 0 ? (
        // <WishFormList
        //   item={data?.searchSM.data.length > 0 ? data?.searchSM.data[0] : null}
        //   refetch={refetch}
        // />
        <></>
      ) : (
        <EmploymentForm paymentId={paymentId} subjectId={subjectId} />
      )}
    </>
  )
}
