import Hero from '../Components/Hero'
import OwnerSection from '../Components/Owner'
import Pooja from '../Components/Pooja'
import Section from '../Components/Section'
// import TempleCalendarSwiper from '../Components/TempleSection'
import Ticker from '../Components/Ticker'
import Timing from '../Components/Timing'
import TempleVideo from '../Components/Vidoe'

export default function HomePage() {
    return (
        <div>
            <Hero />
            <Ticker />
            <Section />
            <Pooja />
            <Timing />
            <TempleVideo />
            <OwnerSection />
           {/* <TempleCalendarSwiper /> */}
        </div>
    )
}
