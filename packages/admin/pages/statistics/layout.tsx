import MainWrap from '@/components/wrappers/MainWrap'
import { gradeState } from '@/lib/recoilAtoms'
import useMmeQuery from '@/utils/mMe'
import { useAuthRedirect } from '@/utils/useAuthRedirect'
import { useRecoilValue } from 'recoil'

export default function StatisticsLayout({ children }) {
  const isCheckingLogin = useAuthRedirect()
  const grade = useRecoilValue(gradeState)
  const { useMme } = useMmeQuery()
  const mGrade = useMme('mGrade')

  if (isCheckingLogin) {
    return null
  }
  // return <main>{children}</main>
  if (mGrade === grade.dev) {
    return <main>{children}</main>
  } else {
    return <MainWrap>준비중입니다.</MainWrap>
  }
}
