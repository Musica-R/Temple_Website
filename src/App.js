import './App.css';
import Footer from './Pages/Footer';
import Header from './Pages/Header';
import HomePage from './Pages/HomePage';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import OurHeritage from './Pages/OurHeritage';
// import BookPooja from './Pages/BookPooja';
import DonationPage from './Pages/DonationPage';
import DivineGallery from './Pages/DivineGallery';
import ReachUs from './Pages/ReachUs';
import { LanguageProvider } from "./Context/Languagecontext";
import ScrollToTop from './Components/ScrollTop';
import Event from './Pages/Event';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <LanguageProvider>
          <ScrollToTop />
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/history" element={<OurHeritage />} />
            {/* <Route path="/booking" element={<BookPooja />} /> */}
            <Route path="/donation" element={<DonationPage />} />
            <Route path="/gallery" element={<DivineGallery />} />
            <Route path="/event" element={<Event />} />
            <Route path="/contact" element={<ReachUs />} />
          </Routes>
          <Footer />
        </LanguageProvider>
      </BrowserRouter>
    </div>

  );
}

export default App;
