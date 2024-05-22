import styled from 'styled-components'
import {
  Button,
  CheckboxGroup,
  Chip,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ScrollShadow,
} from '@nextui-org/react'
import { useForm } from 'react-hook-form'
import useUserLogsMutation from '@/utils/userLogs'
import { useMutation, useSuspenseQuery } from '@apollo/client'
import {
  CHANGE_ORDER_AT_MUTATION,
  DEV_EDIT_MANAGE_USER_MUTATION,
  EDIT_MANAGE_USER_MUTATION,
} from '@/graphql/mutations'
import { useEffect, useState } from 'react'
import { SEE_ADVICE_TYPE_QUERY } from '@/graphql/queries'
import { ResultAdviceType } from '@/src/generated/graphql'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'

const Container = styled.div`
  width: 100%;
  height: 50vh;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  overflow: auto;
`

const Item = styled.div`
  padding: 0.5rem 1rem;
  background: #fff;
  color: #71717a;
  font-size: 0.875rem;
  border: 1px solid #e4e4e7;
  border-radius: 0.5rem;
  gap: 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

type seeAdviceTypeQuery = {
  seeAdviceType: ResultAdviceType
}

export default function TypeIndex({ isOpen, onClose, managerData }) {
  const { userLogs } = useUserLogsMutation()

  const { error, data } = useSuspenseQuery<seeAdviceTypeQuery>(
    SEE_ADVICE_TYPE_QUERY,
    {
      variables: {
        page: 1,
        category: '상담분야',
        limit: 30,
      },
    },
  )
  const [changeOrderAt] = useMutation(CHANGE_ORDER_AT_MUTATION)
  const adviceList = data?.seeAdviceType.adviceType
  const [items, setItems] = useState(adviceList)

  const { handleSubmit, formState, setValue } = useForm()
  const { errors, isDirty } = formState

  const handleOnDragEnd = result => {
    console.log(result)
    if (!result.destination) return

    const newItems = Array.from(items)
    const [reorderedItem] = newItems.splice(result.source.index, 1)
    newItems.splice(result.destination.index, 0, reorderedItem)

    setItems(newItems)
    setValue('adviceType', newItems, { shouldDirty: true })
  }

  const onSubmit = async data => {
    console.log(isDirty)
    if (!isDirty) return

    try {
      const typeID = data.adviceType.map(advice => advice.id)
      const typeIndex = data.adviceType.map((_, index) => index + 1)
      const result = await changeOrderAt({
        variables: {
          ids: typeID,
          indexNums: typeIndex,
        },
      })
      if (!result.data.changeOrderAT.ok) {
        throw new Error('상담 분야 순서 변경 실패')
      }
      alert('상담 분야 순서가 변경되었습니다.')
      userLogs(`상담분야 순서 변경`)
      onClose()
    } catch (error) {
      console.error('상담 분야 순서 변경 중 에러 발생:', error)
    }
  }

  if (error) {
    console.log(error)
  }

  return (
    <>
      <Modal size={'md'} isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {onClose => (
            <>
              <form onSubmit={handleSubmit(onSubmit)}>
                <ModalHeader className="flex flex-col gap-1">
                  분야 순서변경
                </ModalHeader>
                <ModalBody>
                  <DragDropContext onDragEnd={handleOnDragEnd}>
                    <Droppable droppableId="droppable">
                      {provided => (
                        <Container
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                        >
                          {items.map((item, index) => (
                            <Draggable
                              key={item.id}
                              draggableId={item.type}
                              index={index}
                            >
                              {provided => (
                                <Item
                                  key={index}
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                >
                                  <span>{item.type}</span>
                                  <span>
                                    <i className="xi-drag-handle" />
                                  </span>
                                </Item>
                              )}
                            </Draggable>
                          ))}

                          {provided.placeholder}
                        </Container>
                      )}
                    </Droppable>
                  </DragDropContext>
                </ModalBody>
                <ModalFooter>
                  <Button
                    size="sm"
                    color="danger"
                    variant="light"
                    onPress={onClose}
                  >
                    Close
                  </Button>
                  <Button size="sm" color="primary" type="submit">
                    저장
                  </Button>
                </ModalFooter>
              </form>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
