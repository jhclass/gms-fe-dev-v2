import {
  Button,
  Card,
  CardBody,
  CardFooter,
  ScrollShadow,
  Textarea,
} from '@nextui-org/react'
import { styled } from 'styled-components'
import useMmeQuery from '@/utils/mMe'
import { useRouter } from 'next/router'

const FlexBox = styled.div`
  gap: 1rem;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  display: grid;

  @media (max-width: 1400px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  @media (max-width: 480px) {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
`
const ConBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
`
const BtnBox = styled.div`
  display: flex;
  gap: 0.5rem;
`

export default function SMSItem() {
  const router = useRouter()
  const { useMme } = useMmeQuery()

  return (
    <FlexBox>
      <Card
        shadow="none"
        classNames={{
          base: 'bg-transparent',
        }}
      >
        <CardBody className="p-[0.5rem] bg-white rounded-[1rem] min-h-[13rem] max-h-[13rem]">
          <ScrollShadow orientation="horizontal" className="scrollbar">
            <div className="pr-[0.5rem]">
              asdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdf
            </div>
          </ScrollShadow>
        </CardBody>
        <CardFooter className="justify-center gap-[0.5rem] text-small">
          <Button
            size="sm"
            variant="solid"
            color="primary"
            className="text-white"
          >
            적용
          </Button>
          <Button size="sm" variant="solid" className="bg-[#ff5900] text-white">
            삭제
          </Button>
        </CardFooter>
      </Card>
      <Card
        shadow="none"
        classNames={{
          base: 'bg-transparent',
        }}
      >
        <CardBody className="p-[0.5rem] bg-white rounded-[1rem] min-h-[13rem] max-h-[13rem]">
          <ScrollShadow orientation="horizontal" className="scrollbar">
            <div className="pr-[0.5rem]">asddasdfdfasdfasdfas</div>
          </ScrollShadow>
        </CardBody>
        <CardFooter className="justify-center gap-[0.5rem] text-small">
          <Button
            size="sm"
            variant="solid"
            color="primary"
            className="text-white"
          >
            적용
          </Button>
          <Button size="sm" variant="solid" className="bg-[#ff5900] text-white">
            삭제
          </Button>
        </CardFooter>
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
        <CardFooter className="justify-center gap-[0.5rem] text-small">
          <Button
            size="sm"
            variant="solid"
            color="primary"
            className="text-white"
          >
            적용
          </Button>
          <Button size="sm" variant="solid" className="bg-[#ff5900] text-white">
            삭제
          </Button>
        </CardFooter>
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
        <CardFooter className="justify-center gap-[0.5rem] text-small">
          <Button
            size="sm"
            variant="solid"
            color="primary"
            className="text-white"
          >
            적용
          </Button>
          <Button size="sm" variant="solid" className="bg-[#ff5900] text-white">
            삭제
          </Button>
        </CardFooter>
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
        <CardFooter className="justify-center gap-[0.5rem] text-small">
          <Button
            size="sm"
            variant="solid"
            color="primary"
            className="text-white"
          >
            적용
          </Button>
          <Button size="sm" variant="solid" className="bg-[#ff5900] text-white">
            삭제
          </Button>
        </CardFooter>
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
        <CardFooter className="justify-center gap-[0.5rem] text-small">
          <Button
            size="sm"
            variant="solid"
            color="primary"
            className="text-white"
          >
            적용
          </Button>
          <Button size="sm" variant="solid" className="bg-[#ff5900] text-white">
            삭제
          </Button>
        </CardFooter>
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
        <CardFooter className="justify-center gap-[0.5rem] text-small">
          <Button
            size="sm"
            variant="solid"
            color="primary"
            className="text-white"
          >
            적용
          </Button>
          <Button size="sm" variant="solid" className="bg-[#ff5900] text-white">
            삭제
          </Button>
        </CardFooter>
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
        <CardFooter className="justify-center gap-[0.5rem] text-small">
          <Button
            size="sm"
            variant="solid"
            color="primary"
            className="text-white"
          >
            적용
          </Button>
          <Button size="sm" variant="solid" className="bg-[#ff5900] text-white">
            삭제
          </Button>
        </CardFooter>
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
        <CardFooter className="justify-center gap-[0.5rem] text-small">
          <Button
            size="sm"
            variant="solid"
            color="primary"
            className="text-white"
          >
            적용
          </Button>
          <Button size="sm" variant="solid" className="bg-[#ff5900] text-white">
            삭제
          </Button>
        </CardFooter>
      </Card>
    </FlexBox>
  )
}
