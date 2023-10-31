import { Card, CardBody, CardFooter, Image } from '@nextui-org/react'

export default function SquareCard2() {
  const list = [
    {
      title: 'JAVASCRIPT 마스터 과정 (6개월)',
      img: 'https://placehold.it/500x500',
      subs: '최신 자바스크립트 es6를 활용하여 풀스택개발에 도전하세요.',
    },
    {
      title: 'JAVASCRIPT 마스터 과정 (6개월)',
      img: 'https://placehold.it/500x500',
      subs: '최신 자바스크립트 es6를 활용하여 풀스택개발에 도전하세요.',
    },
    {
      title: 'JAVASCRIPT 마스터 과정 (6개월)',
      img: 'https://placehold.it/500x500',
      subs: '최신 자바스크립트 es6를 활용하여 풀스택개발에 도전하세요.',
    },
    {
      title: 'JAVASCRIPT 마스터 과정 (6개월)',
      img: 'https://placehold.it/500x500',
      subs: '최신 자바스크립트 es6를 활용하여 풀스택개발에 도전하세요.',
    },
    {
      title: 'JAVASCRIPT 마스터 과정 (6개월)',
      img: 'https://placehold.it/500x500',
      subs: '최신 자바스크립트 es6를 활용하여 풀스택개발에 도전하세요.',
    },
    {
      title: 'JAVASCRIPT 마스터 과정 (6개월) 2',
      img: 'https://placehold.it/500x500',
      subs: '최신 자바스크립트 es6를 활용하여 풀스택개발에 도전하세요.',
    },
    {
      title: 'JAVASCRIPT 마스터 과정 (6개월)',
      img: 'https://placehold.it/500x500',
      subs: '최신 자바스크립트 es6를 활용하여 풀스택개발에 도전하세요.',
    },
    {
      title: 'JAVASCRIPT 마스터 과정 (6개월)',
      img: 'https://placehold.it/500x500',
      subs: '최신 자바스크립트 es6를 활용하여 풀스택개발에 도전하세요.',
    },
  ]
  return (
    <>
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-5 lg:gap-8 sm:grid-cols-3 sm:gap-5">
        {list.map((item, index) => (
          <Card
            shadow="none"
            key={index}
            isPressable
            onPress={() => console.log('item pressed')}
          >
            <CardBody className="p-0 overflow-visible ">
              <Image
                shadow="none"
                radius="lg"
                width="100%"
                alt={item.title}
                className="object-cover w-full "
                src={item.img}
              />
              <b className="text-lg font-semibold mt-5 px-1.5">{item.title}</b>
              <p className="text-base mt-3 px-1.5">{item.subs}</p>
            </CardBody>
          </Card>
        ))}
      </div>
    </>
  )
}
