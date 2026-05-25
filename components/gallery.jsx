import Image from 'next/image'

export default function Gallery({ gallery }) {
	return (
		<section
			id='works'
			className='tw-relative tw-py-24 md:tw-py-32 tw-bg-[#0b0b0c]'
		>
			<div className='section-shell'>
				<header className='tw-flex tw-flex-col md:tw-flex-row md:tw-items-end md:tw-justify-between tw-gap-6 tw-mb-14 md:tw-mb-20'>
					<div>
						<div className='tw-flex tw-items-center tw-gap-3 tw-mb-5'>
							<span className='tw-h-px tw-w-10 tw-bg-[#d6b878]' />
							<span className='eyebrow'>Selected Works</span>
						</div>
						<h2 className='display tw-text-5xl md:tw-text-7xl tw-text-stone-50 tw-max-w-[14ch]'>
							A <em>quiet</em> archive of seeing.
						</h2>
					</div>
					<div className='tw-flex tw-items-baseline tw-gap-3 tw-text-stone-400'>
						<span className='tw-text-5xl md:tw-text-6xl tw-font-light tw-text-stone-100 tw-tabular-nums'>
							{String(gallery.length).padStart(2, '0')}
						</span>
						<span className='eyebrow'>Pieces</span>
					</div>
				</header>

				<div className='masonry'>
					{gallery.map((item, index) => (
						<figure key={item.id ?? index} className='tile'>
							<Image
								src={item.filename}
								alt={`Work ${String(index + 1).padStart(3, '0')}`}
								width={800}
								height={1100}
								sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
								className='tw-h-auto tw-w-full'
								priority={index < 3}
							/>
							<figcaption className='tile__index'>
								No. {String(index + 1).padStart(3, '0')}
							</figcaption>
						</figure>
					))}
				</div>

				<div className='tw-mt-20 tw-flex tw-items-center tw-justify-center'>
					<div className='tw-flex tw-items-center tw-gap-4 tw-text-stone-400'>
						<span className='tw-h-px tw-w-16 tw-bg-white/10' />
						<span className='eyebrow'>End of archive</span>
						<span className='tw-h-px tw-w-16 tw-bg-white/10' />
					</div>
				</div>
			</div>
		</section>
	)
}
