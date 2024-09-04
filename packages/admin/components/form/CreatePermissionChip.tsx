import { Button, Chip } from '@nextui-org/react'
import { useMutation, useSuspenseQuery } from '@apollo/client'
import {
  CHANGE_ORDER_AT_MUTATION,
  EDIT_ADVICE_TYPE_MUTATION,
} from '@/graphql/mutations'
import useUserLogsMutation from '@/utils/userLogs'
import { styled } from 'styled-components'
import {
  SEARCH_PERMISSIONS_GRANTED_QUERY,
  SEE_ADVICE_TYPE_ORDER_QUERY,
  SEE_ADVICE_TYPE_QUERY,
} from '@/graphql/queries'
import { useEffect, useState } from 'react'
import {
  ResultAdviceType,
  ResultSearchPermissionGranted,
} from '@/src/generated/graphql'

const ChipBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`
const MoreBtn = styled.div`
  border-top: 1px solid ${({ theme }) => theme.colors.offWhite};
  display: flex;
`

type searchPermissionGranted = {
  searchPermissionGranted: ResultSearchPermissionGranted
}

export default function CreatePermissionChip({ topic, permissionName }) {
  const { userLogs } = useUserLogsMutation()
  const [editAdvice] = useMutation(EDIT_ADVICE_TYPE_MUTATION)

  const [isFetching, setIsFetching] = useState(false)
  const [permissionList, setPermissionList] = useState([])
  const {
    error,
    data,
    fetchMore,
    refetch: seeRefetch,
  } = useSuspenseQuery<searchPermissionGranted>(
    SEARCH_PERMISSIONS_GRANTED_QUERY,
    {
      variables: {
        topic: topic,
        permissionName: permissionName,
      },
    },
  )

  useEffect(() => {
    if (data && data.searchPermissionGranted) {
      setPermissionList(data.searchPermissionGranted.data)
    }
  }, [data])

  // const deleteType = async item => {
  //   const isDelete = confirm(
  //     `해당 분야가 노출된 부분에서 전부 삭제 처리됩니다.\n[${item.type}]을 삭제하시겠습니까?`,
  //   )
  //   if (!isDelete) return

  //   try {
  //     const result = await editAdvice({
  //       variables: {
  //         editAdviceTypeId: item.id,
  //         onOff: 'N',
  //       },
  //     })

  //     userLogs(
  //       `${item.type} ${category} 삭제`,
  //       `ok: ${result.data.editAdviceType.ok}`,
  //     )
  //     if (!result.data.editAdviceType.ok) {
  //       throw new Error(`${category} 삭제 실패`)
  //     }
  //     seeRefetch()

  //     alert(`${category}가 삭제되었습니다.`)
  //   } catch (error) {
  //     console.error(`${category} 삭제 중 에러 발생:`, error)
  //   }
  // }

  return (
    <>
      <ChipBox>
        {permissionList &&
          permissionList.map((item, index) => (
            <Chip
              key={index}
              variant="bordered"
              // onClose={() => deleteType(item)}
              className={'hover:border-primary'}
            >
              {item.type}
            </Chip>
          ))}
      </ChipBox>
    </>
  )
}
