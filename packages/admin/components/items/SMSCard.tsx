import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Pagination,
  ScrollShadow,
  Textarea,
} from '@nextui-org/react'
import { styled } from 'styled-components'
import useMmeQuery from '@/utils/mMe'
import { useRouter } from 'next/router'
import { useState } from 'react'

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

const PagerWrap = styled.div`
  display: flex;
  margin-top: 1.5rem;
  justify-content: center;
`

export default function SMSItem({ setMessage }) {
  const [currentPage, setCurrentPage] = useState(1)
  const [currentLimit] = useState(10)

  const handleApply = id => {
    const divContent = document.getElementById(id).innerHTML
    setMessage(divContent.replace(/<br\s*\/?>/gi, '\n'))
  }

  return (
    <>
      <FlexBox>
        <Card
          shadow="none"
          classNames={{
            base: 'bg-transparent',
          }}
        >
          <CardBody className="p-[0.5rem] bg-white rounded-[1rem] min-h-[13rem] max-h-[13rem]">
            <ScrollShadow orientation="horizontal" className="scrollbar">
              <div id="sms01" className="pr-[0.5rem]">
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
              onClick={id => handleApply('sms01')}
            >
              적용
            </Button>
            <Button
              size="sm"
              variant="solid"
              className="bg-[#ff5900] text-white"
            >
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
              <div id="sms02" className="pr-[0.5rem]">
                asddasdfdfasdfasdfas
              </div>
            </ScrollShadow>
          </CardBody>
          <CardFooter className="justify-center gap-[0.5rem] text-small">
            <Button
              size="sm"
              variant="solid"
              color="primary"
              className="text-white"
              onClick={id => handleApply('sms02')}
            >
              적용
            </Button>
            <Button
              size="sm"
              variant="solid"
              className="bg-[#ff5900] text-white"
            >
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
              <div id="sms03" className="pr-[0.5rem]">
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
              onClick={id => handleApply('sms03')}
            >
              적용
            </Button>
            <Button
              size="sm"
              variant="solid"
              className="bg-[#ff5900] text-white"
            >
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
              <div id="sms04" className="pr-[0.5rem]">
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
              onClick={id => handleApply('sms04')}
            >
              적용
            </Button>
            <Button
              size="sm"
              variant="solid"
              className="bg-[#ff5900] text-white"
            >
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
              <div id="sms05" className="pr-[0.5rem]">
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
              onClick={id => handleApply('sms05')}
            >
              적용
            </Button>
            <Button
              size="sm"
              variant="solid"
              className="bg-[#ff5900] text-white"
            >
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
              <div id="sms06" className="pr-[0.5rem]">
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
              onClick={id => handleApply('sms06')}
            >
              적용
            </Button>
            <Button
              size="sm"
              variant="solid"
              className="bg-[#ff5900] text-white"
            >
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
              <div id="sms07" className="pr-[0.5rem]">
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
              onClick={id => handleApply('sms07')}
            >
              적용
            </Button>
            <Button
              size="sm"
              variant="solid"
              className="bg-[#ff5900] text-white"
            >
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
              <div id="sms08" className="pr-[0.5rem]">
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
              onClick={id => handleApply('sms08')}
            >
              적용
            </Button>
            <Button
              size="sm"
              variant="solid"
              className="bg-[#ff5900] text-white"
            >
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
              <div id="sms09" className="pr-[0.5rem]">
                111asddasd123412341 2341235fdfasd asdfadf fasdfas
              </div>
            </ScrollShadow>
          </CardBody>
          <CardFooter className="justify-center gap-[0.5rem] text-small">
            <Button
              size="sm"
              variant="solid"
              color="primary"
              className="text-white"
              onClick={id => handleApply('sms09')}
            >
              적용
            </Button>
            <Button
              size="sm"
              variant="solid"
              className="bg-[#ff5900] text-white"
            >
              삭제
            </Button>
          </CardFooter>
        </Card>
      </FlexBox>
      {/* {totalCount > 0 && ( */}
      <PagerWrap>
        <Pagination
          variant="light"
          showControls
          initialPage={currentPage}
          page={currentPage}
          total={3}
          // total={Math.ceil(totalCount / currentLimit)}
          onChange={newPage => {
            setCurrentPage(newPage)
          }}
        />
      </PagerWrap>
      {/* )} */}
    </>
  )
}
