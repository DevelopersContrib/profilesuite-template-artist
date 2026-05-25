import Image from 'next/image'

export default function Logo({ domain, logo }) {
	if (logo) {
		return (
			<Image
				src={logo}
				width={300}
				height={300}
				alt={domain || 'Logo'}
				className='tw-inline-flex tw-max-w-full tw-h-auto tw-mb-3'
			/>
		)
	}

	return (
		<h1 className='tw-text-5xl tw-font-extrabold tw-capitalize'>
			{domain}
		</h1>
	)
}
