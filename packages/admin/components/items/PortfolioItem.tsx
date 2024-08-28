import { styled } from 'styled-components'
import 'react-datepicker/dist/react-datepicker.css'
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  useDisclosure,
} from '@nextui-org/react'
import PortfoiloModal from '@/components/modal/PortfoiloModal'

const PortfoiloFigure = styled.figure`
  width: 100%;
  height: 140px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

const PortfoiloBtn = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 1rem;
  width: 100%;
`

export default function PortfolioItem() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <Card shadow="sm">
        <CardBody className="p-0">
          <Button type="button" className="w-full h-full p-0" onClick={onOpen}>
            <PortfoiloFigure>
              <img
                alt={'포트폴리오1'}
                className="w-full object-cover h-[140px]"
                src={'https://via.placeholder.com/200x400.png'}
              />
            </PortfoiloFigure>
          </Button>
        </CardBody>
        <CardFooter className="p-0">
          <PortfoiloBtn>
            <Button
              type="button"
              size="sm"
              variant={'bordered'}
              color="primary"
              className="text-[1.1rem]"
            >
              <i className="xi-download" />
            </Button>
            <Button
              type="button"
              size="sm"
              variant={'bordered'}
              className="text-[1rem] border-accent text-accent"
            >
              <i className="xi-trash" />
            </Button>
          </PortfoiloBtn>
        </CardFooter>
      </Card>
      <PortfoiloModal isOpen={isOpen} onClose={onClose} />
    </>
  )
}
