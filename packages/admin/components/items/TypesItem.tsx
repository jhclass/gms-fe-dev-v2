import { Card, CardBody, Link, Tab, Tabs } from '@nextui-org/react'
import { styled } from 'styled-components'
import { useEffect, useState } from 'react'
import useMmeQuery from '@/utils/mMe'
import { useRecoilValue } from 'recoil'
import { gradeState } from '@/lib/recoilAtoms'
import CreateAdviceType from '@/components/form/CreateAdviceType'
import CreateSmsSender from '@/components/form/CreateSmsSender'
import { SEARCH_PERMISSIONS_GRANTED_QUERY } from '@/graphql/queries'
import { useSuspenseQuery } from '@apollo/client'
import { ResultSearchPermissionsGranted } from '@/src/generated/graphql'

const NotiText = styled.p`
  text-align: center;
  font-size: 0.875rem;
`

type SearchPermissionsGrantedQeury = {
  searchPermissionsGranted: ResultSearchPermissionsGranted
}

export default function TypesItem({ type }) {
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
          permissionName: type,
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

  return (
    <>
      {mGrade <= grade.subMaster || permissionManagers.includes(mId) ? (
        <>
          {type === '발신인증번호' ? (
            <CreateSmsSender isActive={true} category={'발신인증번호'} />
          ) : (
            <CreateAdviceType isActive={true} category={type} />
          )}
        </>
      ) : (
        <Card radius="sm">
          <CardBody>
            <NotiText>{type} 설정 권한이 없습니다.</NotiText>
          </CardBody>
        </Card>
      )}
    </>
  )
}
