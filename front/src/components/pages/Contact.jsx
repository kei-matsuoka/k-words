import { useEffect } from "react";
import { ContactForm } from "../forms/ContactForm";

export const Contact = ({ handleFlashMessage, setTitle }) => {
  useEffect(() => {
    setTitle("お問い合わせ")
  }, []);
  return (
    <div className="flex justify-center bg-white px-8 pt-2 pb-2 -m-4">
      <ContactForm handleFlashMessage={handleFlashMessage} />
    </div>
  )
};
