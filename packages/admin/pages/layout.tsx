import RedirectPage from '@/components/layout/RedirectPage'
import MainWrap from '@/components/wrappers/MainWrap'
import { gradeState } from '@/lib/recoilAtoms'
import useMmeQuery from '@/utils/mMe'
import { useAuthRedirect } from '@/utils/useAuthRedirect'
import { useRecoilValue } from 'recoil'
import { useRouter } from 'next/router'
export default function Layout({ children }) {
  const router = useRouter()
  const { page } = router.query
  const grade = useRecoilValue(gradeState)
  const { useMme } = useMmeQuery()
  const mGrade = useMme('mGrade')
  const isCheckingLogin = useAuthRedirect()

  if (isCheckingLogin) {
    return null
  }

  // 쿼리 파라미터를 기반으로 조건 처리
  if (page === 'business_member') {
    router.push('/businessMember') // 특정 페이지로 라우팅
    return null
  }

  if (mGrade < grade.teacher) {
    return <main>{children}</main>
  } else {
    return (
      <MainWrap>
        <RedirectPage />
      </MainWrap>
    )
  }
}
