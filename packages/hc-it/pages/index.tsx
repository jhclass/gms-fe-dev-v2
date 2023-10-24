import WideSlider from "@/components/main/WideSlider";
import Ranking from "@/components/main/Ranking";
import New from "@/components/main/New";
import MainBnr from "@/components/main/MainBnr";
import Bnr from "@/components/main/Bnr";
import CateList from "@/components/main/CateList";
import Info from "@/components/main/Info";
import Form from "@/components/Form";
import QuickMenu from "@/components/main/QuickMenu";
import { gql, useApolloClient, useMutation, useQuery } from "@apollo/client";

const MLOGIN_MUTATION = gql`
  mutation MLogin($mUserId: String!, $mPassword: String!) {
    mLogin(mUserId: $mUserId, mPassword: $mPassword) {
      error
      ok
      token
    }
  }
`;
export default function Home() {
  const [mLoginData] = useMutation(MLOGIN_MUTATION, {
    variables: {
      mUserId: "이진형",
      mPassword: "123123",
    },
    onCompleted: (data) => {
      console.log(data);
    },
  });
  return (
    <>
      <div
        style={{ width: 100, height: 50, backgroundColor: "red" }}
        onClick={() => mLoginData()}
      >
        버튼
      </div>
      <WideSlider />
      <div className="border-b">
        <QuickMenu />
      </div>
      <div className="mt-20">
        <New />
      </div>
      <div className="mt-20">
        <Bnr />
      </div>
      <div className="mt-20">
        <Ranking />
      </div>
      <div className="py-20 mt-20 bg-slate-200">
        <MainBnr />
      </div>
      <div className="mt-20">
        <CateList cate={"근로자"} slideNo={1} />
      </div>
      <div className="mt-20">
        <CateList cate={"실업자"} slideNo={2} />
      </div>
      <div className="mt-20">
        <Info />
      </div>
      <div className="mt-20">
        <Form />
      </div>
    </>
  );
}
