import { Tab, Tabs } from '@nextui-org/react'
import { styled } from 'styled-components'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import PermissionCate from '@/components/form/PermissionCate'
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

type SearchPermissionsGrantedQeury = {
  searchPermissionsGranted: ResultSearchPermissionsGranted
}

export default function PermissionTabs() {
  const router = useRouter()
  const { typeTab } = router.query
  const [selected, setSelected] = useState('category')

  const { error, data, refetch } =
    useSuspenseQuery<SearchPermissionsGrantedQeury>(
      SEARCH_PERMISSIONS_GRANTED_QUERY,
      {
        variables: {
          topic: '카테고리',
        },
      },
    )

  useEffect(() => {
    if (typeTab) {
      setSelected(String(typeTab))
    }
  }, [typeTab])

  return (
    data && (
      <>
        <Tabs
          variant="underlined"
          aria-label="Options"
          color="primary"
          classNames={{
            tabList: 'flex-wrap',
            tab: 'w-auto',
          }}
          selectedKey={selected}
          onSelectionChange={e => setSelected(String(e))}
        >
          <Tab key="category" title="카테고리">
            <PermissionBox>
              {data.searchPermissionsGranted.data.map((permission, index) => (
                <PermissionCate
                  key={index}
                  isActive={true}
                  permission={permission}
                />
              ))}
            </PermissionBox>
          </Tab>
        </Tabs>
      </>
    )
  )
}
