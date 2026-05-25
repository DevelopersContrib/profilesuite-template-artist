'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

const SECTIONS = [
	{ id: 'works', label: 'Works' },
	{ id: 'about', label: 'About' },
	{ id: 'contact', label: 'Contact' },
]

const HEADER_OFFSET = 72

function smoothScrollToId(id) {
	if (typeof window === 'undefined') return
	const target = document.getElementById(id)
	if (!target) return

	const prefersReduced = window.matchMedia(
		'(prefers-reduced-motion: reduce)',
	).matches
	const top =
		target.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET

	window.scrollTo({
		top,
		behavior: prefersReduced ? 'auto' : 'smooth',
	})

	if (window.history?.replaceState) {
		window.history.replaceState(null, '', `#${id}`)
	}
}

export default function Navigation({ domain, profile }) {
	const [scrolled, setScrolled] = useState(false)
	const [activeId, setActiveId] = useState('')
	const observerRef = useRef(null)

	const initials = useMemo(() => {
		const src = profile?.name || domain || 'AR'
		return src
			.split(/\s+/)
			.map((s) => s[0])
			.slice(0, 2)
			.join('')
			.toUpperCase()
	}, [profile?.name, domain])

	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 8)
		onScroll()
		window.addEventListener('scroll', onScroll, { passive: true })
		return () => window.removeEventListener('scroll', onScroll)
	}, [])

	useEffect(() => {
		const targets = SECTIONS
			.map(({ id }) => document.getElementById(id))
			.filter(Boolean)

		if (!targets.length || typeof IntersectionObserver === 'undefined') {
			return
		}

		const observer = new IntersectionObserver(
			(entries) => {
				const inView = entries
					.filter((entry) => entry.isIntersecting)
					.sort(
						(a, b) =>
							b.intersectionRatio - a.intersectionRatio ||
							a.target.getBoundingClientRect().top -
								b.target.getBoundingClientRect().top,
					)

				if (inView[0]) {
					setActiveId(inView[0].target.id)
				}
			},
			{
				rootMargin: '-45% 0px -45% 0px',
				threshold: [0, 0.15, 0.4, 0.7],
			},
		)

		targets.forEach((target) => observer.observe(target))
		observerRef.current = observer

		return () => observer.disconnect()
	}, [])

	useEffect(() => {
		if (typeof window === 'undefined') return
		const hash = window.location.hash.replace('#', '')
		if (!hash) return
		const id = window.requestAnimationFrame(() => smoothScrollToId(hash))
		return () => window.cancelAnimationFrame(id)
	}, [])

	const handleNavClick = useCallback((event, id) => {
		event.preventDefault()
		smoothScrollToId(id)
	}, [])

	return (
		<header
			className={`tw-fixed tw-top-0 tw-left-0 tw-right-0 tw-z-50 tw-transition-all tw-duration-500 ${
				scrolled
					? 'tw-bg-[#0b0b0c]/80 tw-backdrop-blur-xl tw-border-b tw-border-white/5'
					: 'tw-bg-transparent'
			}`}
		>
			<nav
				className='section-shell tw-flex tw-items-center tw-justify-between tw-py-5 md:tw-py-6'
				aria-label='Primary'
			>
				<a
					href='#top'
					onClick={(event) => {
						event.preventDefault()
						window.scrollTo({
							top: 0,
							behavior: window.matchMedia(
								'(prefers-reduced-motion: reduce)',
							).matches
								? 'auto'
								: 'smooth',
						})
					}}
					className='tw-flex tw-items-center tw-gap-3 tw-group'
				>
					<span className='tw-flex tw-h-9 tw-w-9 tw-items-center tw-justify-center tw-rounded-full tw-border tw-border-white/15 tw-text-[10px] tw-tracking-[0.18em] tw-font-medium tw-text-stone-100 group-hover:tw-border-[#d6b878] tw-transition-colors'>
						{initials}
					</span>
					<span className='eyebrow tw-hidden sm:tw-inline'>
						{profile?.name || domain}
					</span>
				</a>

				<ul className='tw-hidden md:tw-flex tw-items-center tw-gap-10 tw-text-sm tw-text-stone-300'>
					{SECTIONS.map(({ id, label }) => {
						const isActive = activeId === id
						return (
							<li key={id}>
								<a
									href={`#${id}`}
									onClick={(event) => handleNavClick(event, id)}
									aria-current={isActive ? 'true' : undefined}
									className={`link-underline tw-transition-colors ${
										isActive
											? 'tw-text-[#d6b878]'
											: 'hover:tw-text-stone-50'
									}`}
								>
									{label}
								</a>
							</li>
						)
					})}
				</ul>

				<a
					href='#contact'
					onClick={(event) => handleNavClick(event, 'contact')}
					className='tw-group tw-inline-flex tw-items-center tw-gap-2 tw-text-xs tw-tracking-[0.18em] tw-uppercase tw-text-stone-100 tw-border tw-border-white/15 tw-rounded-full tw-px-4 tw-py-2 hover:tw-border-[#d6b878] hover:tw-text-[#d6b878] tw-transition-colors'
				>
					<span>Commission</span>
					<span
						aria-hidden
						className='tw-h-1 tw-w-1 tw-rounded-full tw-bg-[#d6b878] tw-shadow-[0_0_8px_#d6b878] tw-transition-transform group-hover:tw-scale-125'
					/>
				</a>
			</nav>
		</header>
	)
}
