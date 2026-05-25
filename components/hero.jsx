import Image from 'next/image'
import { ArrowDownRight, MapPin, Camera } from 'lucide-react'

export default function Hero({ profile, links, gallery }) {
	const works = gallery?.length || 0
	const primaryLink = links?.[0]
	const nameParts = (profile.name || 'Artist').trim().split(/\s+/)
	const firstWord = nameParts[0]
	const restWords = nameParts.slice(1).join(' ')

	return (
		<section className='tw-relative tw-min-h-[100dvh] tw-w-full tw-overflow-hidden tw-bg-[#0b0b0c]'>
			<div className='tw-absolute tw-inset-0 tw-opacity-[0.04] tw-pointer-events-none [background-image:radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.6)_1px,transparent_0)] [background-size:32px_32px]' />

			<div className='section-shell tw-relative tw-z-10 tw-grid tw-grid-cols-1 lg:tw-grid-cols-12 tw-gap-10 lg:tw-gap-16 tw-pt-32 md:tw-pt-40 tw-pb-20'>
				<div className='lg:tw-col-span-7 tw-flex tw-flex-col tw-justify-center'>
					<div className='tw-flex tw-items-center tw-gap-3 tw-mb-8 fade-up' style={{ animationDelay: '0.1s' }}>
						<span className='tw-h-px tw-w-10 tw-bg-[#d6b878]' />
						<span className='eyebrow'>Visual Artist · Est. {new Date().getFullYear() - 8}</span>
					</div>

					<h1 className='display tw-text-[14vw] sm:tw-text-[10vw] lg:tw-text-[8.2vw] tw-text-stone-50 tw-mb-8 fade-up' style={{ animationDelay: '0.2s' }}>
						{firstWord}
						{restWords && (
							<>
								<br />
								<em>{restWords}</em>
							</>
						)}
					</h1>

					<p className='tw-max-w-[52ch] tw-text-base md:tw-text-lg tw-leading-relaxed tw-text-stone-300 tw-mb-10 fade-up' style={{ animationDelay: '0.35s' }}>
						{profile.slogan || profile.introduction || 'Light, shadow, and the small moments in between.'}
					</p>

					<div className='tw-flex tw-flex-wrap tw-items-center tw-gap-4 tw-mb-14 fade-up' style={{ animationDelay: '0.5s' }}>
						<a
							href='#works'
							className='tw-group tw-inline-flex tw-items-center tw-gap-3 tw-bg-stone-50 tw-text-stone-900 tw-px-6 tw-py-3.5 tw-rounded-full tw-text-sm tw-font-medium tw-tracking-wide hover:tw-bg-[#d6b878] tw-transition-colors active:tw-translate-y-px'
						>
							<span>Explore the work</span>
							<ArrowDownRight className='tw-h-4 tw-w-4 tw-transition-transform group-hover:tw-rotate-[-12deg]' strokeWidth={2} />
						</a>
						{primaryLink && (
							<a
								href={primaryLink.link}
								target='_blank'
								rel='noopener noreferrer'
								className='tw-inline-flex tw-items-center tw-gap-2 tw-text-sm tw-text-stone-300 link-underline'
							>
								{primaryLink.title || 'Featured'}
							</a>
						)}
					</div>

					<dl className='tw-grid tw-grid-cols-3 tw-gap-6 sm:tw-gap-10 tw-max-w-md tw-border-t tw-border-white/5 tw-pt-8 fade-up' style={{ animationDelay: '0.65s' }}>
						<div>
							<dt className='eyebrow tw-mb-2'>Works</dt>
							<dd className='tw-text-2xl md:tw-text-3xl tw-font-light tw-text-stone-50 tw-tabular-nums'>
								{String(works).padStart(2, '0')}
							</dd>
						</div>
						<div>
							<dt className='eyebrow tw-mb-2'>Based in</dt>
							<dd className='tw-text-sm tw-text-stone-200 tw-flex tw-items-center tw-gap-1.5 tw-leading-tight tw-pt-1.5'>
								<MapPin className='tw-h-3.5 tw-w-3.5 tw-text-[#d6b878]' strokeWidth={2} />
								<span className='tw-truncate'>{profile.location || profile.hometown || 'Worldwide'}</span>
							</dd>
						</div>
						<div>
							<dt className='eyebrow tw-mb-2'>Medium</dt>
							<dd className='tw-text-sm tw-text-stone-200 tw-flex tw-items-center tw-gap-1.5 tw-leading-tight tw-pt-1.5'>
								<Camera className='tw-h-3.5 tw-w-3.5 tw-text-[#d6b878]' strokeWidth={2} />
								<span>Mixed media</span>
							</dd>
						</div>
					</dl>
				</div>

				<div className='lg:tw-col-span-5 tw-relative tw-flex tw-items-center fade-up' style={{ animationDelay: '0.3s' }}>
					<div className='tw-relative tw-w-full tw-max-w-[440px] tw-mx-auto lg:tw-mx-0 lg:tw-ml-auto'>
						<div className='hero-portrait tw-relative tw-aspect-[3/4] tw-w-full tw-overflow-hidden tw-rounded-[2px] tw-bg-stone-900'>
							{profile.profile_image ? (
								<Image
									src={profile.profile_image}
									alt={profile.name || 'Artist portrait'}
									fill
									sizes='(max-width: 1024px) 80vw, 440px'
									className='tw-object-cover tw-grayscale-[15%]'
									priority
								/>
							) : (
								<div className='tw-absolute tw-inset-0 tw-flex tw-items-center tw-justify-center tw-text-stone-600 tw-text-xs tw-tracking-[0.3em] tw-uppercase'>
									Portrait
								</div>
							)}
						</div>

						<div className='tw-absolute tw-left-[-12px] tw-top-6 tw-rotate-[-90deg] tw-origin-top-left eyebrow tw-text-stone-400'>
							No. 001 · {new Date().getFullYear()}
						</div>

						<div className='tw-absolute tw-right-4 tw-bottom-4 tw-text-right'>
							<div className='eyebrow tw-text-stone-300 tw-mb-1'>Featured</div>
							<div className='tw-text-stone-50 tw-text-sm tw-font-medium'>
								{profile.artist_name || profile.name || 'Studio Portrait'}
							</div>
						</div>
					</div>
				</div>
			</div>

			<a
				href='#works'
				className='tw-absolute tw-bottom-8 tw-left-1/2 -tw-translate-x-1/2 tw-text-stone-400 hover:tw-text-[#d6b878] tw-transition-colors tw-text-[10px] tw-tracking-[0.3em] tw-uppercase tw-flex tw-flex-col tw-items-center tw-gap-2'
			>
				<span>Scroll</span>
				<span className='tw-h-10 tw-w-px tw-bg-gradient-to-b tw-from-stone-500 tw-to-transparent' />
			</a>
		</section>
	)
}
