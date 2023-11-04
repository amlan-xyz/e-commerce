import { AiFillFacebook, AiFillInstagram } from "react-icons/ai";
import "./Footer.css";
export const Footer = () => {
  return (
    <section className="footer__container">
      <div className="footer__links">
        <h2>Candyland</h2>
        <p>ENJOY 100% ORIGINAL FRESH CANDIES, CUPCAKES & DOUGHNUTS</p>
        <p>Contact: 1234567890</p>
        <p>&copy;Candyland</p>
      </div>
      <div className="footer__socials">
        <div className="footer__item">
          <AiFillInstagram className="size-lg" />
          <p>Instagram</p>
        </div>

        <div className="footer__item">
          <AiFillFacebook className="size-lg" />
          <p>Facebook</p>
        </div>
      </div>
    </section>
  );
};
