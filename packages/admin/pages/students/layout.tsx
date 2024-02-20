import { useRouter } from 'next/router'
import useMmeQuery from '@/utils/mMe'
import MainWrap from '@/components/wrappers/MainWrap'
import { useRecoilValue } from 'recoil'
import { gradeState } from '@/lib/recoilAtoms'
import { useAuthRedirect } from '@/utils/useAuthRedirect'

export default function StudentsLayout({ children }) {
  const isCheckingLogin = useAuthRedirect()
  if (isCheckingLogin) {
    return null
  }
  return <main>{children}</main>
}
