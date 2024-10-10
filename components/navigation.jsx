import Script from "next/script";


export default function Navigation({domain}) {
  const link = 'https://domaindirectory.com/servicepage/?domain='+domain;
  return (
    
    <section className="header-top-green-navbar tw-py-2 tw-text-white tw-text-[13px]">
      <div className="container text-center">
      This domain belongs to the Global Ventures network. We have interesting opportunities for work, sponsors and partnerships.
      <a href={link} target="_blank" className="btn btn-warning btn-sm ms-2 tw-py-[3px!important]">Inquire</a>
      </div>
    </section>
  )
}