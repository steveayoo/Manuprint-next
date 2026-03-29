import Navbar from "./Navbar";
import Footer from "./Footer";
import WhatsAppButton from "./WhatsAppButton";

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <WhatsAppButton />
      <Footer />
    </>
  );
}