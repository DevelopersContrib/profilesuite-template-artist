import { ArrowUpRight, Rocket } from 'lucide-react'

const Thanku = ({ domain, referralData }) => {
	const followLink = `https://www.contrib.com/signup/follow/${domain}`
	const referralLink = `/referral?email=${referralData.email}&name=${referralData.name}`

	return (
		<div className='tw-mx-auto tw-max-w-2xl tw-text-center tw-py-12'>
			<div className='tw-inline-flex tw-items-center tw-gap-2 tw-mb-6 tw-text-[#d6b878]'>
				<Rocket className='tw-h-5 tw-w-5' strokeWidth={1.75} />
				<span className='eyebrow'>You are on the list</span>
			</div>
			<h3 className='display tw-text-3xl md:tw-text-4xl tw-text-stone-50 tw-mb-4'>
				Welcome to <em>{domain}</em>
			</h3>
			<p className='tw-text-stone-300 tw-leading-relaxed tw-mb-4'>
				At {domain}, we are building an inclusive community where you can
				connect, collaborate, and discover new opportunities. Join other
				creators, founders, and specialists shaping what comes next.
			</p>
			<p className='tw-text-stone-400 tw-leading-relaxed tw-mb-8'>
				Sign up with Contrib, follow, and contribute to {domain} to earn
				tokens. Let&apos;s grow this brand together.
			</p>
			<div className='tw-flex tw-flex-col sm:tw-flex-row tw-items-center tw-justify-center tw-gap-3'>
				<a
					href={referralLink}
					className='tw-inline-flex tw-items-center tw-gap-2 tw-rounded-full tw-bg-[#d6b878] tw-text-stone-900 tw-px-6 tw-py-3 tw-text-sm tw-font-medium hover:tw-bg-stone-50 tw-transition-colors'
				>
					Refer {domain} · earn $5 in tokens
					<ArrowUpRight className='tw-h-4 tw-w-4' strokeWidth={2} />
				</a>
				<a
					href={followLink}
					className='tw-inline-flex tw-items-center tw-gap-2 tw-rounded-full tw-border tw-border-white/15 tw-text-stone-100 tw-px-6 tw-py-3 tw-text-sm hover:tw-border-[#d6b878] hover:tw-text-[#d6b878] tw-transition-colors'
				>
					Continue to Contrib
					<ArrowUpRight className='tw-h-4 tw-w-4' strokeWidth={2} />
				</a>
			</div>
		</div>
	)
}

export default Thanku
