import { styled } from 'styled-components'
import Layout from '@/pages/member/layout'
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
