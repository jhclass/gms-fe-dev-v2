import MainWrap from '@/components/wrappers/MainWrap'
import { SEARCH_PERMISSIONS_GRANTED_QUERY } from '@/graphql/queries'
import { gradeState } from '@/lib/recoilAtoms'
import useMmeQuery from '@/utils/mMe'
import { useAuthRedirect } from '@/utils/useAuthRedirect'
import { useQuery } from '@apollo/client'
import { useRecoilValue } from 'recoil'

export default function WorkBoardLayout({ children }) {
  const grade = useRecoilValue(gradeState)
  const { useMme } = useMmeQuery()
  const mGrade = useMme('mGrade')
  const mId = useMme('id')
  const { loading, data } = useQuery(SEARCH_PERMISSIONS_GRANTED_QUERY, {
    variables: {
      permissionName: '업무게시판접근',
    },
  })
  const isCheckingLogin = useAuthRedirect()
  const permissionManagers =
    data?.searchPermissionsGranted?.data?.[0]?.ManageUser?.map(
      manager => manager.id,
    ) ?? []

  if (loading || isCheckingLogin || mGrade === undefined || mId === undefined) {
    return null
  }

  if (mGrade <= grade?.subMaster || permissionManagers.includes(mId)) {
    return <main>{children}</main>
  } else {
    return <MainWrap>접근 권한이 없습니다.</MainWrap>
  }
}
