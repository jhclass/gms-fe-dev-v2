import { useRouter } from 'next/router'
import useMmeQuery from '@/utils/mMe'
import MainWrap from '@/components/wrappers/MainWrap'

export default function AccountingLayout({ children }) {
  const router = useRouter()
  const { useMme } = useMmeQuery()
  const mGrade = useMme('mGrade')

  // useEffect(() => {
  //   if (mGrade !== 0) {
  //     router.push('/')
  //   }
  // }, [mGrade])

  // return <main>{children}</main>

  if (mGrade === 0) {
    return <main>{children}</main>
  } else {
    return <MainWrap>준비중입니다.</MainWrap>
  }
}
