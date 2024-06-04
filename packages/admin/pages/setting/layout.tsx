import { useAuthRedirect } from '@/utils/useAuthRedirect'

export default function LectureLayout({ children }) {
  // const grade = useRecoilValue(gradeState)
  // const { useMme } = useMmeQuery()
  // const mGrade = useMme('mGrade')
  const isCheckingLogin = useAuthRedirect()

  if (isCheckingLogin) {
    return null
  }
  // if (mGrade === grade.dev) {
  //   return <main>{children}</main>
  // } else {
  //   return <MainWrap>미오픈 카테고리입니다.</MainWrap>
  // }
  return <main>{children}</main>
}
