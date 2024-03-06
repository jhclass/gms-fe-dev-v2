import { useRouter } from 'next/router'
import useMmeQuery from '@/utils/mMe'
import MainWrap from '@/components/wrappers/MainWrap'
import { useRecoilValue } from 'recoil'
import { gradeState } from '@/lib/recoilAtoms'
import { useAuthRedirect } from '@/utils/useAuthRedirect'

export default function StudentsLayout({ children }) {
  const isCheckingLogin = useAuthRedirect()
  const grade = useRecoilValue(gradeState)
  const { useMme } = useMmeQuery()
  const mGrade = useMme('mGrade')
  if (isCheckingLogin) {
    return null
  }
  if (mGrade === grade.dev) {
    return <main>{children}</main>
  } else {
    return <MainWrap>기능 점검으로 잠시 서비스 중단 합니다.</MainWrap>
  }
}
