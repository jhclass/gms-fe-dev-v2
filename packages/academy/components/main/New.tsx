
import SquareCard from "@/components//SquareCard";
import ListLayout from "@/components/layout/ListLayout"

export default function New() {
  return (
    <>
      <div className="wrap">
        <span className="px-2 py-1 font-light text-center text-white rounded-r-lg rounded-tl-lg text-xs/xs bg-primary">NEW</span>
        <h2 className="mt-2 text-3xl font-bold">신규 강좌</h2>
        <p className="mt-1 text-base text-zinc-600">신규 런칭 강의</p>
        <div className="mt-5">
          <ListLayout>
            <SquareCard />
          </ListLayout>
        </div>
      </div>
    </>
  );
}