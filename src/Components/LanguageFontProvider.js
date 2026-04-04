import { useEffect } from "react";
import { useLanguage } from "../Context/Languagecontext";

export default function LanguageFontProvider() {
  const { language } = useLanguage();

  useEffect(() => {
    const body = document.body;

    // Remove only Tamil & Malayalam classes
    body.classList.remove("lang-ta", "lang-ml");

    // Apply only when needed
    if (language === "TA") {
      body.classList.add("lang-ta");
    } else if (language === "ML") {
      body.classList.add("lang-ml");
    }
  }, [language]);

  return null;
}