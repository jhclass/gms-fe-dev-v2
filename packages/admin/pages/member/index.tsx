import MainWrap from '@/components/wrappers/MainWrap'
import Breadcrumb from '@/components/common/Breadcrumb'
import { styled } from 'styled-components'
import { useRouter } from 'next/router'
import { Input, Button, useDisclosure } from '@nextui-org/react'
import { useMutation, useSuspenseQuery } from '@apollo/client'
import { useForm } from 'react-hook-form'
import { MME_QUERY } from '@/graphql/queries'
import Button2 from '@/components/common/Button'
import useUserLogsMutation from '@/utils/userLogs'
import { EDIT_MANAGE_USER_MUTATION } from '@/graphql/mutations'
import Layout from '@/pages/member/layout'
import { ManageUser } from '@/src/generated/graphql'
import ChangePassword from '@/components/modal/ChangePassword'
import { Suspense } from 'react'
import MemberProfile from '@/components/form/MemberProfile'

const LodingDiv = styled.div`
  padding: 1.5rem;
  width: 100%;
  min-width: 20rem;
  position: relative;
  background: white;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
export default function Profile() {
  return (
    <>
      <Suspense
        fallback={
          <LodingDiv>
            <i className="xi-spinner-2" />
          </LodingDiv>
        }
      >
        <MemberProfile />
      </Suspense>
    </>
  )
}
Profile.getLayout = page => <Layout>{page}</Layout>
