import './globals.css'
import './custom.css'
import { Fraunces, Outfit } from 'next/font/google'
import { getProfile } from '@/lib/data'

const fraunces = Fraunces({
	subsets: ['latin'],
	display: 'swap',
	axes: ['SOFT', 'WONK', 'opsz'],
	variable: '--font-display',
})

const outfit = Outfit({
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-sans',
})

export async function generateMetadata() {
	const c = await getProfile()
	const profile = c.data.profile

	return {
		title: profile.name
			? `${profile.name} — Artist Portfolio`
			: 'Artist Portfolio',
		description: profile.introduction,
		keywords: profile.slogan,
	}
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html
			lang='en'
			className={`${fraunces.variable} ${outfit.variable}`}
		>
			<body className='tw-antialiased tw-text-stone-200'>
				{children}
			</body>
		</html>
	)
}
