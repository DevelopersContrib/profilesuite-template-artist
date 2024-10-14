import Image from 'next/image';

export default function Gallery({ domain }) {
  const imageUrls = [
    "https://images.pexels.com/photos/27024507/pexels-photo-27024507.jpeg",
    "https://images.pexels.com/photos/3952982/pexels-photo-3952982.jpeg",
    "https://images.pexels.com/photos/7013719/pexels-photo-7013719.jpeg",
    "https://images.pexels.com/photos/28492421/pexels-photo-28492421.jpeg",
    "https://images.pexels.com/photos/5606164/pexels-photo-5606164.jpeg",
    "https://images.pexels.com/photos/6695646/pexels-photo-6695646.jpeg"
  ];

  return (
    <section className="py-5 text-white" id="portfolio">
      <div className="container container-padding">
        <h2>My Works</h2>
        <p>Portfolio</p>
        <div className="gallery-container">
          {imageUrls.map((url, index) => (
            <div key={index} className="gallery-item">
              <Image
                src={url}
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
