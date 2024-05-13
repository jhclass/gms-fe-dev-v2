import { Suspense } from 'react'
import { styled } from 'styled-components'
import { useRouter } from 'next/router'
import Layout from '@/pages/hr/layout'
import TeacherForm from '@/components/form/TeacherForm'

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

export default function StudentsWrite() {
  const router = useRouter()
  const managerId = typeof router.query.id === 'string' ? router.query.id : null

  return (
    <>
      <Suspense
        fallback={
          <LodingDiv>
            <i className="xi-spinner-2" />
          </LodingDiv>
        }
      >
        <TeacherForm managerId={managerId} />
      </Suspense>
    </>
  )
}
StudentsWrite.getLayout = page => <Layout>{page}</Layout>
