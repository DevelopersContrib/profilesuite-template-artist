import Navigation from '../components/navigation'
import Hero from '../components/hero'
import Gallery from '../components/gallery'
import Biography from '../components/biography'
import Footer from '../components/footer'
import { getDomain, getProfile, updateProfile } from '../lib/data'

export const dynamic = 'force-dynamic'

export default async function Home() {
	await updateProfile()
	const c = await getProfile()
	const domain = await getDomain()
	const { profile, experience, gallery, links, socials: social } = c.data

	return (
		<main className='tw-relative tw-min-h-[100dvh] tw-bg-[#0b0b0c] tw-text-stone-200'>
			<div className='grain-overlay' aria-hidden />
			<Navigation domain={domain} profile={profile} />
			<Hero profile={profile} links={links} gallery={gallery} />
			{gallery.length > 0 && <Gallery gallery={gallery} />}
			<Biography
				profile={profile}
				experiences={experience}
				social={social}
				links={links}
			/>
			<Footer domain={domain} social={social} />
		</main>
	)
}
