import { styled } from 'styled-components'
import { useSuspenseQuery } from '@apollo/client'
import { SEARCH_MANAGEUSER_QUERY } from '@/graphql/queries'
import { SearchManageUserResult } from '@/src/generated/graphql'

const LineBox = styled.div`
  padding-left: 0.25rem;
  padding-right: 0.25rem;
  border-bottom: 2px solid hsl(240 6% 90%);
  height: 40px;
  line-height: 40px;
  font-size: 0.875rem;
`

type searchManageUserQuery = {
  searchManageUser: SearchManageUserResult
}

export default function PaymentInfoManager({ studentPaymentData }) {
  const { data: managerData, error } = useSuspenseQuery<searchManageUserQuery>(
    SEARCH_MANAGEUSER_QUERY,
    {
      variables: {
        mPart: '영업팀',
        resign: 'N',
      },
    },
  )
  const managerList = managerData?.searchManageUser.data

  return (
    <>
      <LineBox>
        {
          managerList.find(
            user => user.id === studentPaymentData?.processingManagerId,
          )?.mUsername
        }
      </LineBox>
    </>
  )
}
