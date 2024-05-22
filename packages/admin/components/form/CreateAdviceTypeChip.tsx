import { motion } from 'framer-motion'
import styled from 'styled-components'
import { Chip } from '@nextui-org/react'
import { registerLocale } from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import ko from 'date-fns/locale/ko'
registerLocale('ko', ko)
import { useMutation, useSuspenseQuery } from '@apollo/client'
import { DELETE_ADVICE_TYPE_MUTATION } from '@/graphql/mutations'
import { SEE_ADVICE_TYPE_QUERY } from '@/graphql/queries'
import useUserLogsMutation from '@/utils/userLogs'
import { ResultAdviceType } from '@/src/generated/graphql'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { useState } from 'react'

type seeAdviceTypeQuery = {
  seeAdviceType: ResultAdviceType
}

export default function CreateAdviceTypeChip() {
  const { userLogs } = useUserLogsMutation()
  const [deleteAdvice] = useMutation(DELETE_ADVICE_TYPE_MUTATION)
  const { error, data } = useSuspenseQuery<seeAdviceTypeQuery>(
    SEE_ADVICE_TYPE_QUERY,
    {
      variables: {
        page: 1,
        category: '상담분야',
        limit: 50,
      },
    },
  )
  const adviceList = data?.seeAdviceType.adviceType
  const [items, setItems] = useState(adviceList)

  const deleteType = async item => {
    const isDelete = confirm(`[${item.type}]을 삭제하시겠습니까?`)
    if (!isDelete) return

    try {
      const result = await deleteAdvice({
        variables: {
          deleteAdviceTypeId: item.id,
        },
        refetchQueries: [
          {
            query: SEE_ADVICE_TYPE_QUERY,
          },
        ],
      })

      if (!result.data.deleteAdviceType.ok) {
        throw new Error('상담 분야 삭제 실패')
      }
      alert('상담 분야가 삭제되었습니다.')
      userLogs(`${item.type} 상담분야 삭제`)
    } catch (error) {
      console.error('상담 분야 삭제 중 에러 발생:', error)
    }
  }

  if (error) {
    console.log(error)
  }

  const handleOnDragEnd = result => {
    console.log(result)
    if (!result.destination) return

    const newItems = Array.from(items)
    const [reorderedItem] = newItems.splice(result.source.index, 1)
    newItems.splice(result.destination.index, 0, reorderedItem)

    setItems(newItems)
  }

  return (
    <>
      {adviceList?.map((item, index) => (
        <Chip key={index} variant="bordered" onClose={() => deleteType(item)}>
          {item.type}
        </Chip>
      ))}
    </>
  )
}
