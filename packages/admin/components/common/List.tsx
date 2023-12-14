import { useMotionValue, Reorder } from 'framer-motion'
import { useRaisedShadow } from '@/utils/useRaisedShadow'
import { styled } from 'styled-components'

const ItemBox = styled.div`
  border-radius: 10px;
  margin-bottom: 10px;
  width: 100%;
  padding: 15px 18px;
  position: relative;
  background: white;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
  cursor: grab;
`

export default function List({ item }) {
  const y = useMotionValue(0)
  const boxShadow = useRaisedShadow(y)
  return (
    <Reorder.Item key={item} value={item} id={item}>
      <ItemBox>{item}</ItemBox>
    </Reorder.Item>
    // <Reorder.Item drag="y" value={item.item} style={{ boxShadow, y }}>
    //   <ItemBox>
    //     <span>{item.item}</span>
    //   </ItemBox>
    // </Reorder.Item>
  )
}
