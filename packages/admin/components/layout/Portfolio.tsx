import { useSuspenseQuery } from '@apollo/client'
import { SEARCH_SM_QUERY } from '@/graphql/queries'
import { ResultSearchSm } from '@/src/generated/graphql'

import PortfolioForm from '@/components/form/PortfolioForm'
import PortfolioEditForm from '../form/PortfolioEditForm'

type searchSMQuery = {
  searchSM: ResultSearchSm
}

export default function Portfolio({
  paymentId,
  subjectId,
  studentName,
  setIsCreate,
}) {
  // const { error, data, refetch } = useSuspenseQuery<searchSMQuery>(
  //   SEARCH_SM_QUERY,
  //   {
  //     variables: {
  //       modelType: 'StudentPortfolio',
  //       studentPaymentId: paymentId,
  //     },
  //   },
  // )
  // console.log(data)

  return (
    <>
      <PortfolioForm
        paymentId={paymentId}
        subjectId={subjectId}
        setIsCreate={setIsCreate}
        studentName={studentName}
      />
      {/* {data?.searchSM.data.length > 0 ? (
        <PortfolioEditForm
          item={data?.searchSM.data.length > 0 ? data?.searchSM.data[0] : null}
          refetch={refetch}
          studentName={studentName}
        />
      ) : (
        <PortfolioForm
          paymentId={paymentId}
          subjectId={subjectId}
          setIsCreate={undefined}
          studentName={undefined}
        />
      )} */}
    </>
  )
}
