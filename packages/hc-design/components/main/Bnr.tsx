import { Link } from '@nextui-org/react'

export default function Bnr() {
  const handleTest = e => {
    e.preventDefault()
    alert(`준비중입니다. 😊`)
  }
  const list = [
    {
      title: '타이틀111 타이틀111 타이틀111',
      img: 'https://highclass-image.s3.amazonaws.com/academy/hc_design/eximg/long02.webp',
    },
    {
      title: '타이틀111 타이틀111 타이틀111',
      img: 'https://highclass-image.s3.amazonaws.com/academy/hc_design/eximg/long01.webp',
    },
  ]
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="relative w-full flex justify-end md:justify-center bg-[#e7eef4]">
          <Link href="#" onClick={handleTest}>
            <img
              alt="배너2"
              src="https://highclass-image.s3.amazonaws.com/academy/hc_design/eximg/long02.webp"
              className="w-full"
            />
          </Link>
        </div>
        <div className="relative w-full flex justify-start md:justify-center bg-[#370409]">
          <Link href="#" onClick={handleTest}>
            <img
              alt="배너1"
              src="https://highclass-image.s3.amazonaws.com/academy/hc_design/eximg/long01.webp"
              className="w-full"
            />
          </Link>
        </div>
      </div>
    </>
  )
}
