import { Link } from '@nextui-org/react'
import styled from 'styled-components'

const Item = styled.div`
  a {
    display: block;
    width: 100%;
    height: 100%;
  }
  img {
    width: 100%;
  }
`

export default function ReviewItem({ itemData }) {
  const item = itemData
  return (
    <Item>
      <Link href={item.link}>
        <img src={item.img} alt={`${item.category} / ${item.con}`} />
      </Link>
    </Item>
  )
}
