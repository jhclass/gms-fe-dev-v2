import { styled } from 'styled-components'
import { useSuspenseQuery } from '@apollo/client'
import { SEE_MANAGEUSER_QUERY } from '@/graphql/queries'
import { ManageUser } from '@/src/generated/graphql'

const LineBox = styled.div`
  padding-left: 0.25rem;
  padding-right: 0.25rem;
  border-bottom: 2px solid hsl(240 6% 90%);
  height: 40px;
  line-height: 40px;
  font-size: 0.875rem;
`

type seeManagerQuery = {
  seeManageUser: ManageUser[]
}

export default function PaymentInfoManager({ studentPaymentData }) {
  const { error, data: managerData } =
    useSuspenseQuery<seeManagerQuery>(SEE_MANAGEUSER_QUERY)
  const managerList = managerData?.seeManageUser

  if (error) {
    console.log(error)
  }

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
