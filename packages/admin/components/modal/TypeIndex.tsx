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
import {
  useLazyQuery,
  useMutation,
  useQuery,
  useSuspenseQuery,
} from '@apollo/client'
import {
  CHANGE_ORDER_AT_MUTATION,
  DEV_EDIT_MANAGE_USER_MUTATION,
  EDIT_MANAGE_USER_MUTATION,
} from '@/graphql/mutations'
import { useEffect, useRef, useState } from 'react'
import { SEE_ADVICE_TYPE_QUERY } from '@/graphql/queries'
import { ResultAdviceType } from '@/src/generated/graphql'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'

const Container = styled.div`
  width: 100%;
  height: 40vh;
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

  &:hover {
    background-color: #d9e3fa;
  }
`

type seeAdviceTypeQuery = {
  seeAdviceType: ResultAdviceType
}

export default function TypeIndex({
  refetch,
  isOpen,
  onClose,
  orderAdviceList,
  orderPage,
  setOrderPage,
  seeAdviceQuery,
  totalCount,
  category,
  limit,
  orderRefetch,
  setPage,
}) {
  const { userLogs } = useUserLogsMutation()
  const [items, setItems] = useState([])
  const [changeOrderAt] = useMutation(CHANGE_ORDER_AT_MUTATION)
  const { handleSubmit, formState, setValue } = useForm()
  const { errors, isDirty } = formState
  const [bottomReached, setBottomReached] = useState(false)
  const handleScroll = e => {
    const { scrollTop, scrollHeight, clientHeight } = e.target
    if (scrollTop + clientHeight >= scrollHeight - 40) {
      if (orderPage < Math.ceil(totalCount / 3)) {
        setOrderPage(prev => prev + 1)
        setBottomReached(true)
      }
    }
  }

  // useEffect(() => {
  //   if (bottomReached) {
  //   }
  // }, [bottomReached])

  useEffect(() => {
    if (orderPage > 1) {
      seeAdviceQuery({
        variables: {
          page: orderPage,
          category: category,
          limit: 30,
        },
      })
    } else {
      seeAdviceQuery({
        variables: {
          page: 1,
          category: category,
          limit: 30,
        },
      })
    }

    setBottomReached(false)
  }, [bottomReached])

  useEffect(() => {
    setItems(orderAdviceList)
  }, [orderAdviceList])

  const handleOnDragEnd = result => {
    if (!result.destination) return

    const newItems = Array.from(items)
    const [reorderedItem] = newItems.splice(result.source.index, 1)
    newItems.splice(result.destination.index, 0, reorderedItem)

    setItems(newItems)
    setValue('adviceType', newItems, { shouldDirty: true })
  }

  const onSubmit = async data => {
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
        throw new Error(`${category} 순서 변경 실패`)
      }
      setPage(1)
      refetch({
        page: 1,
        category: category,
        limit: limit,
      })
      setOrderPage(1)
      orderRefetch({
        page: 1,
        category: category,
        limit: 30,
      })

      alert(`${category} 순서가 변경되었습니다.`)
      userLogs(`${category} 순서 변경`)
      closeBtn()
    } catch (error) {
      console.error(`${category} 순서 변경 중 에러 발생:`, error)
    }
  }

  const closeBtn = () => {
    onClose()
    setOrderPage(1)
  }

  return (
    <>
      <Modal size={'md'} isOpen={isOpen} onClose={closeBtn}>
        <ModalContent>
          {closeBtn => (
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
                          className="scrollbar"
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          onScroll={handleScroll}
                        >
                          {items.map((item, index) => (
                            <Draggable
                              key={item.id}
                              draggableId={item.type}
                              index={index}
                            >
                              {provided => (
                                <Item
                                  key={item.id}
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
                    onPress={closeBtn}
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
