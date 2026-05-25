'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'

const BlogSection = () => {
	const [blogPosts, setBlogs] = useState([])

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch('/api/blogs', {
					next: { revalidate: 0 },
				})
				if (response.ok) {
					const res = await response.json()
					setBlogs(res.blogs)
				}
			} catch (error) {
				console.error('Error fetching blogs:', error)
			}
		}
		fetchData()
	}, [])

	if (!blogPosts.length) return null

	return (
		<section className='section-shell tw-py-16'>
			<header className='tw-mb-10'>
				<div className='tw-flex tw-items-center tw-gap-3 tw-mb-4'>
					<span className='tw-h-px tw-w-10 tw-bg-[#d6b878]' />
					<span className='eyebrow'>Journal</span>
				</div>
				<h2 className='display tw-text-4xl md:tw-text-5xl tw-text-stone-50'>
					Latest <em>writing</em>
				</h2>
			</header>

			<div className='tw-grid tw-grid-cols-1 md:tw-grid-cols-3 tw-gap-6 md:tw-gap-8'>
				{blogPosts.map((post, index) => (
					<a
						key={index}
						href={`/blog/${post.slug + '---' + post.id}`}
						className='tw-group tw-flex tw-flex-col tw-overflow-hidden tw-rounded-md tw-bg-white/[0.02] tw-border tw-border-white/5 hover:tw-border-[#d6b878]/30 tw-transition-colors'
					>
						<div className='tw-relative tw-aspect-[4/3] tw-overflow-hidden'>
							<Image
								src={post.image_url}
								alt={post.image_caption || post.title}
								width={600}
								height={400}
								className='tw-h-full tw-w-full tw-object-cover tw-transition-transform tw-duration-700 group-hover:tw-scale-[1.04]'
							/>
						</div>
						<div className='tw-p-6 tw-flex tw-items-start tw-justify-between tw-gap-3'>
							<h5 className='tw-text-stone-100 tw-text-base tw-font-medium tw-leading-snug'>
								{post.title}
							</h5>
							<ArrowUpRight
								className='tw-h-4 tw-w-4 tw-text-stone-500 group-hover:tw-text-[#d6b878] group-hover:tw-translate-x-0.5 tw-transition-all tw-shrink-0 tw-mt-0.5'
								strokeWidth={2}
							/>
						</div>
					</a>
				))}
			</div>
		</section>
	)
}

export default BlogSection
