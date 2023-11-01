import SquareCard from '@/components//SquareCard'
import ListLayout from '@/components/layout/ListLayout'
import MainTitle from '@/components/MainTitle'

export default function New() {
  return (
    <>
      <div className="wrap">
        <MainTitle title={'신규 강좌'} subs={'신규 런칭 강의🆕'} flag={'NEW'} />
        <div className="mt-5">
          <ListLayout>
            <SquareCard />
          </ListLayout>
        </div>
      </div>
    </>
  )
}
