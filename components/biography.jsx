import {
	ChevronRight,
	MapPin,
	Briefcase,
	Languages,
	Award,
	Quote,
} from 'lucide-react'

function VitalRow({ label, value }) {
	if (!value) return null
	return (
		<div className='tw-grid tw-grid-cols-[100px_1fr] sm:tw-grid-cols-[120px_1fr] tw-gap-4 tw-py-4 tw-border-b tw-border-white/5'>
			<dt className='eyebrow tw-text-stone-400'>{label}</dt>
			<dd className='tw-text-stone-100 tw-text-sm tw-leading-relaxed'>{value}</dd>
		</div>
	)
}

export default function Biography({ profile, experiences, social, links }) {
	const hasExperience = experiences?.length > 0

	return (
		<section
			id='about'
			className='tw-relative tw-bg-[#0b0b0c] tw-py-24 md:tw-py-32 tw-border-t tw-border-white/5'
		>
			<div className='section-shell'>
				<div className='tw-grid tw-grid-cols-1 lg:tw-grid-cols-12 tw-gap-12 lg:tw-gap-16'>
					<aside className='lg:tw-col-span-4'>
						<div className='lg:tw-sticky lg:tw-top-32'>
							<div className='tw-flex tw-items-center tw-gap-3 tw-mb-6'>
								<span className='tw-h-px tw-w-10 tw-bg-[#d6b878]' />
								<span className='eyebrow'>Profile · 02</span>
							</div>
							<h2 className='display tw-text-5xl md:tw-text-6xl tw-text-stone-50 tw-mb-8'>
								The <em>artist</em>,<br />
								unfiltered.
							</h2>
							<p className='tw-text-stone-400 tw-text-sm tw-leading-relaxed tw-max-w-sm'>
								A short dossier of work, place, and influence. Compiled for press,
								collectors, and curators.
							</p>
						</div>
					</aside>

					<div className='lg:tw-col-span-8'>
						{profile.introduction && (
							<div className='tw-mb-12'>
								<Quote
									className='tw-h-7 tw-w-7 tw-text-[#d6b878] tw-mb-5'
									strokeWidth={1.5}
								/>
								<p className='tw-text-xl md:tw-text-2xl tw-leading-snug tw-text-stone-100 tw-font-light tw-max-w-[55ch]' style={{ fontFamily: 'var(--font-display)' }}>
									{profile.introduction}
								</p>
							</div>
						)}

						<dl className='tw-mb-14'>
							<VitalRow label='Name' value={profile.name} />
							<VitalRow
								label='Hometown'
								value={profile.hometown}
							/>
							<VitalRow label='Located' value={profile.location} />
							<VitalRow label='Languages' value={profile.languages} />
							<VitalRow
								label='Recognition'
								value={profile.achievements}
							/>
							<VitalRow
								label='Affiliations'
								value={profile.affiliations}
							/>
							<VitalRow
								label='Discography'
								value={profile.discography}
							/>
						</dl>

						{hasExperience && (
							<div className='tw-mb-14'>
								<div className='tw-flex tw-items-center tw-gap-3 tw-mb-6'>
									<Briefcase
										className='tw-h-4 tw-w-4 tw-text-[#d6b878]'
										strokeWidth={2}
									/>
									<h3 className='tw-text-base tw-font-medium tw-text-stone-100 tw-tracking-wide' style={{ fontFamily: 'var(--font-sans)' }}>
										Selected Experience
									</h3>
								</div>
								<ul className='tw-divide-y tw-divide-white/5'>
									{experiences.map((exp, index) => (
										<li
											key={exp.id ?? index}
											className='tw-grid tw-grid-cols-[auto_1fr] tw-gap-5 tw-py-5 tw-group'
										>
											<span className='tw-flex tw-h-6 tw-items-center tw-text-stone-500 tw-font-mono tw-text-xs tw-tabular-nums'>
												{String(index + 1).padStart(2, '0')}
											</span>
											<div>
												<div className='tw-flex tw-items-center tw-gap-2 tw-text-[#d6b878] tw-text-xs tw-tracking-[0.18em] tw-uppercase tw-mb-2'>
													<MapPin className='tw-h-3 tw-w-3' strokeWidth={2} />
													{exp.location}
												</div>
												<p className='tw-text-stone-100 tw-text-base tw-leading-snug'>
													{exp.description}
												</p>
											</div>
										</li>
									))}
								</ul>
							</div>
						)}

						{links?.length > 0 && (
							<div id='contact' className='tw-mt-20 tw-pt-12 tw-border-t tw-border-white/10'>
								<div className='tw-flex tw-items-center tw-gap-3 tw-mb-8'>
									<Award
										className='tw-h-4 tw-w-4 tw-text-[#d6b878]'
										strokeWidth={2}
									/>
									<h3 className='tw-text-base tw-font-medium tw-text-stone-100 tw-tracking-wide' style={{ fontFamily: 'var(--font-sans)' }}>
										Index of Links
									</h3>
								</div>
								<ul className='tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-x-10 tw-gap-y-3'>
									{links.map((link, index) => (
										<li key={link.id ?? index}>
											<a
												href={link.link}
												target='_blank'
												rel='noopener noreferrer'
												className='tw-group tw-flex tw-items-center tw-justify-between tw-gap-3 tw-py-3 tw-border-b tw-border-white/5 hover:tw-border-[#d6b878]/40 tw-transition-colors'
											>
												<span className='tw-text-stone-200 tw-text-sm tw-truncate group-hover:tw-text-[#d6b878] tw-transition-colors'>
													{link.title || link.link}
												</span>
												<ChevronRight
													className='tw-h-3.5 tw-w-3.5 tw-text-stone-500 group-hover:tw-text-[#d6b878] group-hover:tw-translate-x-0.5 tw-transition-all'
													strokeWidth={2}
												/>
											</a>
										</li>
									))}
								</ul>
							</div>
						)}
					</div>
				</div>
			</div>
		</section>
	)
}
