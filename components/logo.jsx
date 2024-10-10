import Image from 'next/image'

export default function Logo({domain,logo}) {
  if(logo!=null && logo!=''){
    return (
        <Image 
              src={logo}
              width={300}
              height={300}
              alt=""
              className='d-inline-flex img-fluid mb-3'
            />
    )
  }else{
    return(
        <h1 className="tw-text-5xl font-800 tw-capitalize">{domain}</h1>
    )
  }
}
