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

export default function CurriculumItem({ itemData }) {
  const item = itemData
  return (
    <Item>
      <Link href={item.link}>
        {item.img && (
          <img
            src={item.img}
            alt={`${item.category} / ${item.desc}`}
            className="hidden lg:block"
          />
        )}
        {item.mimg && (
          <img
            src={item.mimg}
            alt={`${item.category} / ${item.desc}`}
            className="block lg:hidden"
          />
        )}
      </Link>
    </Item>
  )
}
