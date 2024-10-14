import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faTwitter, faInstagram } from "@fortawesome/free-brands-svg-icons";

export default function Footer({ domain }) {
  return (
    <>
      <footer className="text-white text-center">
        <section className="py-5">
          <div className="social-icons mb-3">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="me-3">
              <FontAwesomeIcon icon={faFacebookF} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="me-3">
              <FontAwesomeIcon icon={faTwitter} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faInstagram} />
            </a>
          </div>
          <div>© 2024 - {domain}</div>
        </section>
      </footer>
    </>
  );
}
