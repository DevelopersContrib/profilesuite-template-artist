import { ArrowUpRight } from 'lucide-react'
import {
	FaInstagram,
	FaFacebookF,
	FaYoutube,
	FaLinkedinIn,
	FaSoundcloud,
	FaSpotify,
	FaPinterestP,
} from 'react-icons/fa6'
import { FaXTwitter } from 'react-icons/fa6'

const SOCIAL_MAP = [
	{ key: 'instagram', label: 'Instagram', Icon: FaInstagram },
	{ key: 'twitter', label: 'X / Twitter', Icon: FaXTwitter },
	{ key: 'facebook', label: 'Facebook', Icon: FaFacebookF },
	{ key: 'youtube', label: 'YouTube', Icon: FaYoutube },
	{ key: 'linkedin', label: 'LinkedIn', Icon: FaLinkedinIn },
	{ key: 'pinterest', label: 'Pinterest', Icon: FaPinterestP },
	{ key: 'soundcloud', label: 'SoundCloud', Icon: FaSoundcloud },
	{ key: 'spotify', label: 'Spotify', Icon: FaSpotify },
]

export default function Footer({ domain, social = {} }) {
	const activeSocials = SOCIAL_MAP.filter((s) => social?.[s.key])

	return (
		<footer className='tw-relative tw-bg-[#0b0b0c] tw-border-t tw-border-white/5'>
			<div className='section-shell tw-py-16 md:tw-py-20'>
				<div className='tw-grid tw-grid-cols-1 md:tw-grid-cols-12 tw-gap-10 md:tw-gap-12 tw-mb-16'>
					<div className='md:tw-col-span-5'>
						<div className='tw-flex tw-items-center tw-gap-3 tw-mb-5'>
							<span className='tw-h-px tw-w-10 tw-bg-[#d6b878]' />
							<span className='eyebrow'>Get in touch</span>
						</div>
						<h3 className='display tw-text-4xl md:tw-text-5xl tw-text-stone-50 tw-mb-4'>
							Commissions, exhibitions,<br />
							or just to <em>say hello.</em>
						</h3>
						<p className='tw-text-stone-400 tw-text-sm tw-leading-relaxed tw-max-w-md'>
							The studio reads every message. Expect a reply within
							two business days.
						</p>
					</div>

					<div className='md:tw-col-span-3 md:tw-col-start-7'>
						<div className='eyebrow tw-mb-5'>Studio</div>
						<ul className='tw-space-y-3 tw-text-stone-200 tw-text-sm'>
							<li>
								<a href='#works' className='link-underline'>
									Selected Works
								</a>
							</li>
							<li>
								<a href='#about' className='link-underline'>
									Biography
								</a>
							</li>
							<li>
								<a href='#contact' className='link-underline'>
									Contact
								</a>
							</li>
						</ul>
					</div>

					<div className='md:tw-col-span-3'>
						<div className='eyebrow tw-mb-5'>Elsewhere</div>
						{activeSocials.length > 0 ? (
							<ul className='tw-space-y-3'>
								{activeSocials.map(({ key, label, Icon }) => (
									<li key={key}>
										<a
											href={social[key]}
											target='_blank'
											rel='noopener noreferrer'
											className='tw-group tw-inline-flex tw-items-center tw-gap-3 tw-text-stone-200 tw-text-sm hover:tw-text-[#d6b878] tw-transition-colors'
										>
											<Icon className='tw-h-4 tw-w-4' />
											<span>{label}</span>
											<ArrowUpRight
												className='tw-h-3 tw-w-3 tw-opacity-0 group-hover:tw-opacity-100 group-hover:tw-translate-x-0.5 tw-transition-all'
												strokeWidth={2}
											/>
										</a>
									</li>
								))}
							</ul>
						) : (
							<p className='tw-text-stone-500 tw-text-sm'>
								No social channels yet.
							</p>
						)}
					</div>
				</div>

				<div className='tw-flex tw-flex-col-reverse md:tw-flex-row md:tw-items-end md:tw-justify-between tw-gap-6 tw-pt-10 tw-border-t tw-border-white/5'>
					<div className='tw-flex tw-flex-col sm:tw-flex-row sm:tw-items-center tw-gap-3 sm:tw-gap-6 tw-text-xs tw-text-stone-500 tw-tracking-wide'>
						<span>
							© {new Date().getFullYear()} {domain}
						</span>
						<span className='tw-hidden sm:tw-inline tw-h-3 tw-w-px tw-bg-white/10' />
						<span>All works and writing the property of the artist.</span>
					</div>

					<div
						aria-hidden
						className='display tw-text-[18vw] md:tw-text-[10vw] tw-leading-none tw-text-stone-50/[0.04] tw-tracking-tighter tw-select-none tw-pointer-events-none'
					>
						{domain?.split('.')?.[0]?.toUpperCase() || 'STUDIO'}
					</div>
				</div>
			</div>
		</footer>
	)
}
