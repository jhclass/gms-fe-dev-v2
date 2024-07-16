import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Pagination,
  ScrollShadow,
} from '@nextui-org/react'
import { useState } from 'react'
import { styled } from 'styled-components'
import ConsultationMo from './ConsultationMo'

const TTopic = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`
const Ttotal = styled.p`
  font-weight: 300;
  margin-right: 0.5rem;

  span {
    font-weight: 400;
    color: #007de9;
  }
`
const FlexBox = styled.div`
  margin-top: 1rem;
  gap: 1rem;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  display: grid;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  @media (max-width: 480px) {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
`

export default function SMSList() {
  // const [currentPage, setCurrentPage] = useRecoilState(consultPageState)
  const [currentLimit] = useState(10)
  const [totalCount, setTotalCount] = useState(0)

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <ConsultationMo />
      <TTopic>
        <Ttotal>
          총 <span>1</span>건
        </Ttotal>
      </TTopic>
      <FlexBox>
        <Card
          shadow="none"
          classNames={{
            base: 'bg-transparent',
          }}
        >
          <CardHeader>
            <div>
              <p>2024-05-06 11:23:43</p>
              <p>발송완료</p>
            </div>
          </CardHeader>
          <CardBody className="p-[0.5rem] bg-white rounded-[1rem] min-h-[13rem] max-h-[13rem]">
            <ScrollShadow orientation="horizontal" className="scrollbar">
              <div className="pr-[0.5rem]">
                asddasd1234123412341235fdfasdfasdfas
              </div>
            </ScrollShadow>
          </CardBody>
          <CardFooter className="justify-center gap-[0.5rem] text-small"></CardFooter>
        </Card>
        <Card
          shadow="none"
          classNames={{
            base: 'bg-transparent',
          }}
        >
          <CardBody className="p-[0.5rem] bg-white rounded-[1rem] min-h-[13rem] max-h-[13rem]">
            <ScrollShadow orientation="horizontal" className="scrollbar">
              <div className="pr-[0.5rem]">
                asddasd1234123412341235fdfasdfasdfas
              </div>
            </ScrollShadow>
          </CardBody>
          <CardFooter className="justify-center gap-[0.5rem] text-small"></CardFooter>
        </Card>
        <Card
          shadow="none"
          classNames={{
            base: 'bg-transparent',
          }}
        >
          <CardBody className="p-[0.5rem] bg-white rounded-[1rem] min-h-[13rem] max-h-[13rem]">
            <ScrollShadow orientation="horizontal" className="scrollbar">
              <div className="pr-[0.5rem]">
                asddasd1234123412341235fdfasdfasdfas
              </div>
            </ScrollShadow>
          </CardBody>
          <CardFooter className="justify-center gap-[0.5rem] text-small"></CardFooter>
        </Card>
        <Card
          shadow="none"
          classNames={{
            base: 'bg-transparent',
          }}
        >
          <CardBody className="p-[0.5rem] bg-white rounded-[1rem] min-h-[13rem] max-h-[13rem]">
            <ScrollShadow orientation="horizontal" className="scrollbar">
              <div className="pr-[0.5rem]">
                asddasd1234123412341235fdfasdfasdfas
              </div>
            </ScrollShadow>
          </CardBody>
          <CardFooter className="justify-center gap-[0.5rem] text-small"></CardFooter>
        </Card>
      </FlexBox>
    </>
  )
}
