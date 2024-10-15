import Image from 'next/image';

export default function Hero({ profile, links }) {
  return (
    <section 
      className="hero-section" 
      style={{ backgroundImage: "url(https://www.profilesuite.com/uploads/profile/"+profile.profile_image+")" }}
    >
      <div className="container container-padding">
        <div className="row align-items-center gy-6 gy-xl-0">
          <div className="col-md-12">
            <h1 className="display-2 mb-4">{profile.name}</h1>
            <p className="lead">
              {profile.slogan}<br />
              {links && links.length > 0 &&
                 <a href={links[0].link} target="_blank" rel="noopener noreferrer">{links[0].title}</a>
                }
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
