import { styled } from 'styled-components'

const UpdateTime = styled.p`
  font-size: 0.75rem;
  padding-left: 0.5rem;
  color: ${({ theme }) => theme.colors.gray};
`
export default function ListInfo({ item }) {
  const formatDate = data => {
    const timestamp = parseInt(data, 10)
    const date = new Date(timestamp)
    const formatted =
      `${date.getFullYear()}-` +
      `${(date.getMonth() + 1).toString().padStart(2, '0')}-` +
      `${date.getDate().toString().padStart(2, '0')} ` +
      `${date.getHours().toString().padStart(2, '0')}:` +
      `${date.getMinutes().toString().padStart(2, '0')}:` +
      `${date.getSeconds().toString().padStart(2, '0')}`
    return formatted
  }
  return (
    <UpdateTime>
      마지막 업데이트 : {item.lastModifiedByName}({item.lastModifiedByUserId}) -{' '}
      {formatDate(item.createdAt)}
    </UpdateTime>
  )
}
