import { useScrollReveal } from './hooks/useScrollReveal'
import Preloader from './components/Preloader'
import Petals from './components/Petals'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import OurStory from './components/OurStory'
import Couple from './components/Couple'
import MaritalGoals from './components/MaritalGoals'
import WeddingDetails from './components/WeddingDetails'
import Gallery from './components/Gallery'
import Program from './components/Program'
import Travel from './components/Travel'
import Faq from './components/Faq'
import Guestbook from './components/Guestbook'
import Gifts from './components/Gifts'
import RSVP from './components/RSVP'
import Footer from './components/Footer'
import BackToTop from './components/BackToTop'

export default function App() {
  useScrollReveal()

  return (
    <>
      <Preloader />
      <Petals />
      <a className="skip-link" href="#home">
        Skip to content
      </a>
      <Navbar />
      <main id="main-content">
        <Hero />
        <OurStory />
        <Couple />
        <MaritalGoals />
        <WeddingDetails />
        <Gallery />
        <Program />
        <Travel />
        <Faq />
        <Guestbook />
        <Gifts />
        <RSVP />
      </main>
      <Footer />
      <BackToTop />
    </>
  )
}
