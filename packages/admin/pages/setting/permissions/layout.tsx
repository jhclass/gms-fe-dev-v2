import MainWrap from '@/components/wrappers/MainWrap'
import { gradeState } from '@/lib/recoilAtoms'
import useMmeQuery from '@/utils/mMe'
import { useAuthRedirect } from '@/utils/useAuthRedirect'
import { useRecoilValue } from 'recoil'

export default function PermissionsLayout({ children }) {
  const grade = useRecoilValue(gradeState)
  const { useMme } = useMmeQuery()
  const mGrade = useMme('mGrade')
  const isCheckingLogin = useAuthRedirect()

  if (isCheckingLogin) {
    return null
  }

  if (mGrade <= grade.subMaster) {
    return <main>{children}</main>
  } else {
    return <MainWrap>접근 권한이 없습니다.</MainWrap>
  }
}
