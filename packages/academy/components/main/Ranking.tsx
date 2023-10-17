import RankingCard from "../RankingCard"
import ListLayout from "../layout/ListLayout"

export default function Ringking() {
  return (
    <>
      <div className="wrap">
        <span className="px-2 py-1 font-light text-center text-white rounded-r-lg rounded-tl-lg text-xs/xs bg-primary">HOT</span>
        <h2 className="mt-2 text-3xl font-bold">인기강의</h2>
        <p className="mt-2 text-base text-zinc-600">H-CLASS의 인기 강좌</p>
        <div className="mt-5">
          <ListLayout>
            <RankingCard />
          </ListLayout>
        </div>
      </div>
    </>
  );
}