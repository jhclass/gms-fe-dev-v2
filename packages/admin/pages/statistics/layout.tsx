import { useAuthRedirect } from '@/utils/useAuthRedirect'

export default function StatisticsLayout({ children }) {
  const isCheckingLogin = useAuthRedirect()

  if (isCheckingLogin) {
    return null
  }
  // if (mGrade === grade.dev) {
  //   return <main>{children}</main>
  // } else {
  //   return <MainWrap>기능 점검으로 잠시 서비스 중단 합니다.</MainWrap>
  // }
  return <main>{children}</main>
}
