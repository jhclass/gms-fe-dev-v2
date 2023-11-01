export default function CardDim() {
  return (
    <div className="relative group">
      <img alt="" src="https://placehold.it/500x500" />
      <dl className="absolute top-0 left-0 hidden w-full h-full text-white bg-black px-7 py-7 group-hover:block bg-opacity-70">
        <dd className="text-2xl">타이틀111 타이틀111 타이틀111</dd>
        <dd className="mt-4 text-base">
          내용내용 내용내용 내용내용 내용내용 내용내용 내용내용 내용내용
          내용내용 내용내용내용내용내용내용내용내용내용내용내용내용내용내용
        </dd>
      </dl>
    </div>
  )
}
