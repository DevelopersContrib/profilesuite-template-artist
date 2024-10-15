import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faTwitter, faInstagram } from "@fortawesome/free-brands-svg-icons";

export default function Footer({ domain,social }) {
  return (
    <>
      <footer className="text-white text-center">
        <section className="py-5">
        <div className="social-icons mb-3">
            {social.facebook && 
            <a href={social.facebook} target="_blank" rel="noopener noreferrer" className="me-3">
              <FontAwesomeIcon icon={faFacebookF} />
            </a>
            }

            {social.twitter && 
            <a href={social.twitter} target="_blank" rel="noopener noreferrer" className="me-3">
              <FontAwesomeIcon icon={faTwitter} />
            </a>
            }
            
            {social.instagram && 
            <a href={social.instagram} target="_blank" rel="noopener noreferrer" className="me-3">
              <FontAwesomeIcon icon={faInstagram} />
            </a>
            }


          </div>
          <div>&copy; {new Date().getFullYear()} - {domain}</div>
        </section>
      </footer>
    </>
  );
}
