import { styled } from 'styled-components'
import { ResultSearchPermissionsGranted } from '@/src/generated/graphql'
import { useSuspenseQuery } from '@apollo/client'
import { SEARCH_PERMISSIONS_GRANTED_QUERY } from '@/graphql/queries'
import PermissionMasterAddForm from '@/components/form/PermissionMasterAddForm'
import PermissionMasterEditForm from '@/components/form/PermissionMasterEditForm'

const PermissionBox = styled.div`
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  gap: 1em;
`
const BoxArea = styled.div`
  display: flex;
  width: 100%;
  gap: 1.5rem;
  background: #fff;
  padding: 1.5rem;
  border-radius: 0.5rem;
  flex-direction: column;

  @media (max-width: 768px) {
    gap: 1rem;
  }
`
const BoxBtn = styled.div`
  display: flex;
  gap: 2rem;
  justify-content: space-between;
  @media (max-width: 768px) {
    gap: 1rem;
    flex-direction: column;
  }
  max-width: 1400px;
`

type SearchPermissionsGrantedQeury = {
  searchPermissionsGranted: ResultSearchPermissionsGranted
}

export default function PermissionMasterTabItem({ permissionName }) {
  const { error, data, refetch } =
    useSuspenseQuery<SearchPermissionsGrantedQeury>(
      SEARCH_PERMISSIONS_GRANTED_QUERY,
      {
        variables: {
          permissionName: permissionName,
        },
      },
    )

  return (
    data && (
      <>
        <PermissionBox>
          <BoxArea>
            <BoxBtn>
              <PermissionMasterAddForm
                permission={data.searchPermissionsGranted.data[0]}
              />
            </BoxBtn>
            <PermissionMasterEditForm
              permission={data.searchPermissionsGranted.data[0]}
            />
          </BoxArea>
        </PermissionBox>
      </>
    )
  )
}
