import { Tab, Tabs } from '@nextui-org/react'
import { styled } from 'styled-components'
import { Suspense, useEffect, useState } from 'react'
import useMmeQuery from '@/utils/mMe'
import { useRecoilValue } from 'recoil'
import { gradeState } from '@/lib/recoilAtoms'
import { useRouter } from 'next/router'
import PermissionCate from '@/components/form/PermissionCate'
import { ResultSearchPermissionsGranted } from '@/src/generated/graphql'
import { useSuspenseQuery } from '@apollo/client'
import { SEARCH_PERMISSIONS_GRANTED_QUERY } from '@/graphql/queries'

const LodingDiv = styled.div`
  padding: 1.5rem;
  width: 100%;
  min-width: 20rem;
  position: relative;
  background: none;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
const NotiText = styled.p`
  text-align: center;
  font-size: 0.875rem;
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
            <div className="flex flex-wrap w-full gap-[1rem]">
              {data.searchPermissionsGranted.data.map((permission, index) => (
                <PermissionCate
                  key={index}
                  isActive={true}
                  permission={permission}
                />
              ))}
            </div>
          </Tab>
        </Tabs>
      </>
    )
  )
}
