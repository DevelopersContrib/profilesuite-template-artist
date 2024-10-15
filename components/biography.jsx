import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

export default function Biography({ profile, experiences, social, links }) {
  

  return (
    <section className="aboutme-bg py-5" id="about">
      <div className="container py-5">
        <div className="row">
          <div className="col-md-12 mb-4">
            <h2 className="section-title mb-4">{profile.name}</h2>
            <p>
              {profile.introduction}
              {links && links.length > 0 &&
                 <a href={links[0].link} target="_blank" rel="noopener noreferrer">{links[0].title}</a>
                }
            </p>
             {experiences.length> 0 && experiences.map((exp, index) => (
               <div key={index} className="experience-item">
               <p className="experience-label">
                 <span><FontAwesomeIcon icon={faChevronRight} /></span> {exp.location}:
               </p>
               <h5 className="experience-description">{exp.description}</h5>
             </div>
            ))}
          </div>
        </div>
        
        <div className="row"> 
          <div className="col-md-4 mb-4">
            <h2 className="section-title mb-4">Location</h2>
           
              <div className="location-item">
                <p className="location-label"><span><FontAwesomeIcon icon={faChevronRight} /></span> {profile.hometown} - </p>
                <h5 className="location-value">{profile.location}</h5>
              </div>
           
          </div>
          
          <div className="col-md-4 mb-4">
            <h2 className="section-title mb-4">Socials</h2>
            {social.facebook && 
              <div key={0} className="social-item">
                <h5>
                 <a href={social.facebook} target="_blank" rel="noopener noreferrer">{social.facebook}</a>
                </h5>
              </div>
            }

            {social.twitter && 
              <div key={1} className="social-item">
                <h5>
                 <a href={social.twitter} target="_blank" rel="noopener noreferrer">{social.twitter}</a>
                </h5>
              </div>
            }

          {social.instagram && 
              <div key={2} className="social-item">
                <h5>
                 <a href={social.instagram} target="_blank" rel="noopener noreferrer">{social.instagram}</a>
                </h5>
              </div>
            }
          </div>
          
          <div className="col-md-4 mb-4">
            <h2 className="section-title mb-4">Links</h2>
            {links.map((link, index) => (
              <div key={index} className="link-item">
                <h5>
                  <a href={link.link} target="_blank" rel="noopener noreferrer">{link.link}</a>
                </h5>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
