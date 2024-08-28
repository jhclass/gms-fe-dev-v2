import useMmeQuery from '@/utils/mMe'
import { useRecoilValue } from 'recoil'
import { gradeState } from '@/lib/recoilAtoms'
import { useAuthRedirect } from '@/utils/useAuthRedirect'

export default function AccountingLayout({ children }) {
  const grade = useRecoilValue(gradeState)
  const { useMme } = useMmeQuery()
  const mGrade = useMme('mGrade')

  // useEffect(() => {
  //   if (mGrade !== grade.dev) {
  //     router.push('/')
  //   }
  // }, [mGrade])

  // return <main>{children}</main>

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
