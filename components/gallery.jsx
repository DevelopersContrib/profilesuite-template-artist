import Image from 'next/image';

export default function Gallery({ gallery }) {
  

  return (
    <section className="py-5 text-white" id="portfolio">
      <div className="container container-padding">
        <h2>My Works</h2>
        <p>Portfolio</p>
        <div className="gallery-container">
        {gallery.map((url, index) => (
            <div key={index} className="gallery-item">
              <Image
                src={`https://www.profilesuite.com/uploads/gallery/`+url.filename}
                alt={`Gallery Image ${index + 1}`}
                width={300}
                height={200}
                className="gallery-image"
                priority={index === 0}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
