import Image from 'next/image';

export default function Hero({ domain }) {
  return (
    <section 
      className="hero-section" 
      style={{ backgroundImage: "url('https://images.pexels.com/photos/6695646/pexels-photo-6695646.jpeg')" }}
    >
      <div className="container container-padding">
        <div className="row align-items-center gy-6 gy-xl-0">
          <div className="col-md-12">
            <h1 className="display-2 mb-4">Teetribe21</h1>
            <p className="lead">
              At Teetribe21, we believe that T-shirts, mugs, and stickers can spark conversations or even movements. We create products that celebrate your unique identity and passions. For that conversation-starter merch that makes you say &quot;I Want One,&quot; visit: 
              <a href="https://teetribe21.com" target="_blank" rel="noopener noreferrer"> teetribe21.com</a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
