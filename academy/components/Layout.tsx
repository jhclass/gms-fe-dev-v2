import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Aside from "@/components/Aside";

export default function Layout({ children }) {
  return (
    <>
      <Header />
      {children}
      <Footer/>
      <Aside />
    </>
  );
}