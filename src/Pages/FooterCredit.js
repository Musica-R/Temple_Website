import "../Stylesheet/FooterCredit.css";
import { useLanguage } from "../Context/Languagecontext";

export default function FooterCredit() {
    const { language } = useLanguage();

    const content = {
        EN: <>Developed by <span>Mpeoples Business Solutions Private Limited </span></>,
        TA: <>இந்த இணையதளம் <span>Mpeoples Business Solutions Private Limited</span> நிறுவனத்தால் உருவாக்கப்பட்டது.</>,
        ML: <>ഈ വെബ്സൈറ്റ് <span>Mpeoples Business Solutions Private Limited</span> നിർമ്മിച്ചതാണ്.</>
    };

    return (
        <div className="footer-credit">

            {/* Decorative Divider */}
            <div className="credit-divider">
                <span></span>
                <div className="dot"></div>
                <span></span>
            </div>

            {/* Content */}
            <div className="footer-credit-container">
                <img src="/assets/mp.jpg" alt="Mpeoples Logo" />
                <p>{content[language] || content.EN}</p>
            </div>

        </div>
    );
}