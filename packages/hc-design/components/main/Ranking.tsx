import MainTitle from '@/components/MainTitle'
import RankingCard from '@/components/RankingCard'
import ListLayout from '@/components/layout/ListLayout'

export default function Ringking() {
  return (
    <>
      <div className="wrap">
        <MainTitle
          title={'인기강의'}
          subs={'H-CLASS의 인기 강좌🔥'}
          flag={'HOT'}
        />
        <div className="mt-5">
          <ListLayout>
            <RankingCard />
          </ListLayout>
        </div>
      </div>
    </>
  )
}
