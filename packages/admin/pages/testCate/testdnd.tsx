import { useState } from 'react'
import Layout from './layout'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { styled } from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 0 2rem;
`

const FlexContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 20px;
  width: 100%;
`

const DraggableItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 100px;
  margin: 10px;
  background-color: #f0f0f0;
  border: 1px solid #d4d4d8;
  border-radius: 4px;
  user-select: none;
`

const initialItems = [
  { id: 'item-1', content: 'Item 1' },
  { id: 'item-2', content: 'Item 2' },
  { id: 'item-3', content: 'Item 3' },
  { id: 'item-4', content: 'Item 4' },
  { id: 'item-5', content: 'Item 5' },
  { id: 'item-6', content: 'Item 6' },
]

export default function TestDND() {
  const [items, setItems] = useState(initialItems)

  const handleOnDragEnd = result => {
    if (!result.destination) return

    const newItems = Array.from(items)
    const [reorderedItem] = newItems.splice(result.source.index, 1)
    newItems.splice(result.destination.index, 0, reorderedItem)

    setItems(newItems)
  }
  return (
    <Container>
      <h1>Horizontal Drag and Drop</h1>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="droppable" direction="horizontal">
          {provided => (
            <FlexContainer {...provided.droppableProps} ref={provided.innerRef}>
              {items.map(({ id, content }, index) => (
                <Draggable key={id} draggableId={id} index={index}>
                  {provided => (
                    <DraggableItem
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      {content}
                    </DraggableItem>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </FlexContainer>
          )}
        </Droppable>
      </DragDropContext>
    </Container>
  )
}
TestDND.getLayout = page => <Layout>{page}</Layout>
