import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

export default function Biography({ domain }) {
  const experiences = [
    { label: "Slogan", description: "Funny Quotes T-shirt, Conversation starter and Motivational Merch" },
    { label: "Affiliations", description: "https://teetribe21.com" },
    { label: "Achievements", description: "WorldWide Distributions of Teetribe21 merch" },
    { label: "Languages", description: "English" }
  ];

  const location = [
    { label: "Current Location", value: "United States" },
    { label: "Hometown", value: "Hialeah" }
  ];

  const socials = [
    { socialName: "Twitter", url: "https://twitter.com/teetribe21" },
    { socialName: "Facebook", url: "https://facebook.com/teetribe21" },
    { socialName: "Instagram", url: "https://instagram.com/teetribe21" }
  ];

  const links = [
    { linkName: "Teetribe21", url: "https://teetribe21.com/" },
    { linkName: "Teetribe21 eBay Shop", url: "https://www.ebay.com/str/teetribe21" }
  ];

  return (
    <section className="aboutme-bg py-5" id="about">
      <div className="container py-5">
        <div className="row">
          <div className="col-md-12 mb-4">
            <h2 className="section-title mb-4">Teetribe21</h2>
            <p>
              Teetribe21 believes that T-shirts, mugs, and stickers can spark conversations or even movements.
              We create products that celebrate your unique identity and passions. For conversation-starter merch that
              makes you say, &quot;I Want One,&quot; visit: 
              <a href="https://teetribe21.com" target="_blank" rel="noopener noreferrer"> teetribe21.com</a>
            </p>
            {experiences.map((item, index) => (
              <div key={index} className="experience-item">
                <p className="experience-label">
                  <span><FontAwesomeIcon icon={faChevronRight} /></span> {item.label}:
                </p>
                <h5 className="experience-description">{item.description}</h5>
              </div>
            ))}
          </div>
        </div>
        
        <div className="row"> 
          <div className="col-md-4 mb-4">
            <h2 className="section-title mb-4">Location</h2>
            {location.map((loc, index) => (
              <div key={index} className="location-item">
                <p className="location-label"><span><FontAwesomeIcon icon={faChevronRight} /></span> {loc.label}</p>
                <h5 className="location-value">{loc.value}</h5>
              </div>
            ))}
          </div>
          
          <div className="col-md-4 mb-4">
            <h2 className="section-title mb-4">Socials</h2>
            {socials.map((social, index) => (
              <div key={index} className="social-item">
                <h5>
                  {social.socialName}: <a href={social.url} target="_blank" rel="noopener noreferrer">{social.url}</a>
                </h5>
              </div>
            ))}
          </div>
          
          <div className="col-md-4 mb-4">
            <h2 className="section-title mb-4">Links</h2>
            {links.map((link, index) => (
              <div key={index} className="link-item">
                <h5>
                  {link.linkName}: <a href={link.url} target="_blank" rel="noopener noreferrer">{link.url}</a>
                </h5>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
