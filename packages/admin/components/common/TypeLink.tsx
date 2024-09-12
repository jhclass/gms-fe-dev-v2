import { SEARCH_PERMISSIONS_GRANTED_QUERY } from '@/graphql/queries'
import { gradeState } from '@/lib/recoilAtoms'
import { ResultSearchPermissionsGranted } from '@/src/generated/graphql'
import useMmeQuery from '@/utils/mMe'
import { useSuspenseQuery } from '@apollo/client'
import { Link } from '@nextui-org/react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import { styled } from 'styled-components'

const AddLink = styled.p`
  > a {
    font-size: 0.8rem;
    color: ${({ theme }) => theme.colors.gray};
  }
  position: absolute;
  top: 0;
  right: 0;
  z-index: 5;
`

type SearchPermissionsGrantedQeury = {
  searchPermissionsGranted: ResultSearchPermissionsGranted
}

export default function TypeLink({ typeLink, typeName, permissionName }) {
  const router = useRouter()
  const grade = useRecoilValue(gradeState)
  const { useMme } = useMmeQuery()
  const mGrade = useMme('mGrade')
  const mId = useMme('id')
  const [permissionManagers, setPermissionManagers] = useState([])
  const { error, data, refetch } =
    useSuspenseQuery<SearchPermissionsGrantedQeury>(
      SEARCH_PERMISSIONS_GRANTED_QUERY,
      {
        variables: {
          permissionName: permissionName,
        },
      },
    )

  useEffect(() => {
    if (data) {
      setPermissionManagers(
        data.searchPermissionsGranted.data[0].ManageUser.map(
          manager => manager.id,
        ),
      )
    }
  }, [data])

  const handleAddTypeClick = e => {
    e.preventDefault()
    router.push({
      pathname: '/setting/types',
      query: { typeTab: typeLink },
    })
  }

  return (
    <>
      {mGrade <= grade.subMaster || permissionManagers.includes(mId) ? (
        <AddLink>
          <Link
            size="sm"
            underline="hover"
            href="#"
            onClick={e => handleAddTypeClick(e)}
          >
            {typeName} 추가
          </Link>
        </AddLink>
      ) : null}
    </>
  )
}
