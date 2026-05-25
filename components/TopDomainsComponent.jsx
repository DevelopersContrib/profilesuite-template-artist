'use client'

import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import { ArrowUpRight } from 'lucide-react'
import LoadingState from './LoadingState'

const TopDomainsComponent = ({ domains }) => {
	if (!domains) return <LoadingState />

	return (
		<section className='section-shell tw-py-24'>
			<header className='tw-mb-12 tw-text-center'>
				<div className='tw-inline-flex tw-items-center tw-gap-3 tw-mb-4'>
					<span className='tw-h-px tw-w-10 tw-bg-[#d6b878]' />
					<span className='eyebrow'>Featured</span>
					<span className='tw-h-px tw-w-10 tw-bg-[#d6b878]' />
				</div>
				<h2 className='display tw-text-4xl md:tw-text-6xl tw-text-stone-50'>
					Our top <em>brands</em>
				</h2>
			</header>

			<Swiper
				slidesPerView={1}
				spaceBetween={24}
				pagination={{ clickable: true }}
				breakpoints={{
					1024: { slidesPerView: 3, spaceBetween: 32 },
				}}
				modules={[Pagination]}
				className='tw-pb-12'
			>
				{domains.data.domains.map((domain) => (
					<SwiperSlide
						key={domain.domain}
						className='tw-rounded-md tw-border tw-border-white/5 tw-bg-white/[0.02] tw-p-8'
					>
						<a
							href={domain.brand_link}
							className='tw-block tw-mb-5'
						>
							<Image
								src={domain.logo}
								width={300}
								height={120}
								sizes='100vw'
								className='tw-h-auto tw-max-w-full tw-object-contain'
								alt={domain.domain}
								priority
							/>
						</a>
						<h4 className='tw-capitalize tw-text-stone-50 tw-text-xl tw-font-medium tw-mb-2'>
							{domain.domain}
						</h4>
						<p className='tw-text-stone-400 tw-text-sm tw-mb-6'>
							Join our exclusive community of like-minded people.
						</p>
						<div className='tw-flex tw-gap-3'>
							<a
								href={domain.site_link}
								className='tw-inline-flex tw-items-center tw-gap-1.5 tw-rounded-full tw-bg-stone-50 tw-text-stone-900 tw-px-5 tw-py-2 tw-text-sm tw-font-medium hover:tw-bg-[#d6b878] tw-transition-colors'
							>
								Visit <ArrowUpRight className='tw-h-3.5 tw-w-3.5' strokeWidth={2} />
							</a>
							<a
								href={domain.brand_link}
								className='tw-inline-flex tw-items-center tw-gap-1.5 tw-rounded-full tw-border tw-border-white/15 tw-text-stone-100 tw-px-5 tw-py-2 tw-text-sm hover:tw-border-[#d6b878] hover:tw-text-[#d6b878] tw-transition-colors'
							>
								Details
							</a>
						</div>
					</SwiperSlide>
				))}
			</Swiper>
		</section>
	)
}

export default TopDomainsComponent
