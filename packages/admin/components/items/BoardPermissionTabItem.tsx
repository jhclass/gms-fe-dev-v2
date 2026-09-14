import { styled } from 'styled-components'
import PermissionCate from '@/components/layout/PermissionCate'
import { ResultSearchPermissionsGranted } from '@/src/generated/graphql'
import { useSuspenseQuery } from '@apollo/client'
import { SEARCH_PERMISSIONS_GRANTED_QUERY } from '@/graphql/queries'

const PermissionBox = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1em;
  @media (max-width: 1024px) {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
`

const EmptyBox = styled.div`
  width: 100%;
  background: #fff;
  padding: 1.5rem;
  border-radius: 0.5rem;
  color: ${({ theme }) => theme.colors.gray};
  font-size: 0.875rem;
`

type SearchPermissionsGrantedQeury = {
  searchPermissionsGranted: ResultSearchPermissionsGranted
}

export default function BoardPermissionTabItem() {
  const { data } = useSuspenseQuery<SearchPermissionsGrantedQeury>(
    SEARCH_PERMISSIONS_GRANTED_QUERY,
    {
      variables: {
        permissionName: '업무게시판접근',
      },
    },
  )

  const permissions = data?.searchPermissionsGranted?.data ?? []

  if (permissions.length === 0) {
    return (
      <EmptyBox>
        업무게시판접근 권한 항목이 없습니다. 백엔드 권한 데이터에 topic 게시판,
        permissionName 업무게시판접근 항목이 필요합니다.
      </EmptyBox>
    )
  }

  return (
    <PermissionBox>
      {permissions.map((permission, index) => (
        <PermissionCate key={permission?.id ?? index} permission={permission} />
      ))}
    </PermissionBox>
  )
}
