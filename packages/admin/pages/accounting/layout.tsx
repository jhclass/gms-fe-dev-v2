import { useRouter } from 'next/router'
import useMmeQuery from '@/utils/mMe'
import MainWrap from '@/components/wrappers/MainWrap'
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

  return <main>{children}</main>
}
