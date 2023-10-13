import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Aside from "@/components/Aside";

export default function Layout({ children }) {
  return (
    <>
      <Header />
      {children}
      {/* <Footer/>
      <Aside /> */}
    </>
  );
}