import { styled } from 'styled-components'
import 'react-datepicker/dist/react-datepicker.css'
import PortfolioItem from '@/components/items/PortfolioItem'

const PortfolioBox = styled.div`
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 1rem;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
  @media (max-width: 900px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  @media (max-width: 480px) {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
`

export default function PortfolioList({ portfolioFiles }) {
  return (
    <PortfolioBox>
      {portfolioFiles.map((_, index) => (
        <PortfolioItem key={index} />
      ))}
    </PortfolioBox>
  )
}
