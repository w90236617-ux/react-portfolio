import Footer from "./components/Footer";
import Header from "./components/header";
import ScrollToTop from "./components/ScrollToTop";
import Navigation from "./config/Navigation";

function App() {
  return (
    <>
      <ScrollToTop />
      <Header/>
      <main className="page-main">
        <Navigation />
      </main>
      <Footer />
    </>
  );
}

export default App;