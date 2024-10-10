import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faFacebookF, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import '@fortawesome/fontawesome-svg-core/styles.css';
import Image from 'next/image';
import Link from 'next/link';

export default function Footer({domain,twitter_url,fb_url,linkedin_url}) {
  
  const contri_link = 'https://www.contrib.com/to/'+domain;
  const footer_text = 'is a proud venture of Global Ventures,LLC.Join our network of performance based companies using '+domain+'.';
  return (
    <>
      <footer className='tw-text-white'>
        <section className='tw-bg-[#191919] tw-py-14'>
          <div className="container">
            <div className="row gy-3">
              <div className="col-xl-3">
                <h3 className="tw-uppercase tw-text-2xl">{domain}</h3>
                <div className="tw-no-underline text-secondary tw-inline-block">
                {footer_text}
                </div>
              </div>
              <div className="col-xl-3">
                <h3 className="tw-uppercase tw-text-2xl">get started</h3>
                <ul className="list-unstyled">
                  <li>
                    <Link href="/partner" className='tw-no-underline text-secondary tw-inline-block tw-capitalize'>
                      partner with us
                    </Link>
                  </li>
                  <li>
                    <Link href="/staffing" className='tw-no-underline text-secondary tw-inline-block tw-capitalize'>
                      apply
                    </Link>
                  </li>
                  <li>
                    <a href="/referral" className='tw-no-underline text-secondary tw-inline-block tw-capitalize'>
                      referral
                    </a>
                  </li>
                  <li>
                    <Link href="/apps" className='tw-no-underline text-secondary tw-inline-block tw-capitalize'>
                      apps
                    </Link>
                  </li>
                  <li>
                    <Link href="/developer" className='tw-no-underline text-secondary tw-inline-block tw-capitalize'>
                      developer
                    </Link>
                  </li>
                  <li>
                    <a href={contri_link} target='_blank' className='tw-no-underline text-secondary tw-inline-block tw-capitalize'>
                      contribute
                    </a>
                  </li>
                  <li>
                    <Link href={`https://domaindirectory.com/servicepage/?domain=${domain}`} className='tw-no-underline text-secondary tw-inline-block tw-capitalize'>
                      Build
                    </Link>
                  </li>
                  <li>
                    <Link href={`https://domaindirectory.com/servicepage/?domain=${domain}`} className='tw-no-underline text-secondary tw-inline-block tw-capitalize'>
                      invest
                    </Link>
                  </li>
                  <li>
                    <Link href={`https://domaindirectory.com/servicepage/?domain=${domain}`} className='tw-no-underline text-secondary tw-inline-block tw-capitalize'>
                      manage
                    </Link>
                  </li>
                  <li>
                    <Link href={`https://domaindirectory.com/servicepage/?domain=${domain}`} className='tw-no-underline text-secondary tw-inline-block tw-capitalize'>
                      monetize
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="col-xl-3">
                <h3 className="tw-uppercase tw-text-2xl">company</h3>
                <ul className="list-unstyled">
                  <li>
                    <Link href="/about" className='tw-no-underline text-secondary tw-inline-block tw-capitalize'>
                      About
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact" className='tw-no-underline text-secondary tw-inline-block tw-capitalize'>
                      contact
                    </Link>
                  </li>
                  <li>
                    <Link href="/terms" className='tw-no-underline text-secondary tw-inline-block tw-capitalize'>
                      terms
                    </Link>
                  </li>
                  <li>
                    <Link href="/cookie" className='tw-no-underline text-secondary tw-inline-block tw-capitalize'>
                      cookie policy
                    </Link>
                  </li>
                  <li>
                    <Link href="/privacy" className='tw-no-underline text-secondary tw-inline-block tw-capitalize'>
                      privacy
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="col-xl-3">
                <h3 className="tw-uppercase tw-text-2xl">PARTNERS</h3>
                <ul className="list-unstyled">
                  <li>
                    <a href="https://contrib.com" className='tw-no-underline text-secondary tw-inline-block'>
                      <Image
                        src="https://cdn.vnoc.com/logos/logo-new-contrib-06-wyt.png"
                        alt='contrib.com'
                        width={161}
                        height={50}
                        className='img-fluid'
                      />
                    </a>
                  </li>
                  <li>
                    <a href="https://realtydao.com" className='tw-no-underline text-secondary tw-inline-block'>
                      <Image
                        src="https://cdn.vnoc.com/logos/logo-RealtyDAO-light-1.png"
                        alt='realtydao.com'
                        width={227}
                        height={50}
                        className='img-fluid'
                      />
                    </a>
                  </li>
                </ul>
                <h3 className="tw-uppercase tw-text-2xl">socials</h3>
                <ul className="list-inline">
                  <li className="list-inline-item">
                    <a href={twitter_url} className='tw-no-underline text-secondary tw-inline-block'>
                      <FontAwesomeIcon icon={faTwitter} className="tw-w-8 tw-h-[2rem!important] text-secondary" />
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a href={fb_url} className='tw-no-underline text-secondary tw-inline-block'>
                      <FontAwesomeIcon icon={faFacebookF} className="tw-w-8 tw-h-[2rem!important] text-secondary" />
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a href={linkedin_url} className='tw-no-underline text-secondary tw-inline-block'>
                      <FontAwesomeIcon icon={faLinkedinIn} className="tw-w-8 tw-h-[2rem!important] text-secondary" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        <section className='tw-bg-[#111] tw-py-6'>
          <div className="container">
            <div className="row">
              <div className="col-xl-6">
              &copy; {new Date().getFullYear()} <span className="tw-capitalize">{domain}</span>. All Rights Reserved.
              </div>
              <div className="col-xl-6 lg:tw-text-right">
                <ul className="mb-0 list-inline">
                  <li className="list-inline-item">
                    <Link href="/about" className='tw-no-underline text-secondary tw-inline-block'>About</Link>
                  </li>
                  <li className="list-inline-item">
                    <Link href="/terms" className='tw-no-underline text-secondary tw-inline-block'>Terms</Link>
                  </li>
                  <li className="list-inline-item">
                    <Link href="/policy" className='tw-no-underline text-secondary tw-inline-block'>Policy</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </footer>
    </>
  )

}


