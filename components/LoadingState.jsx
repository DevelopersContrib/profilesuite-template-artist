import { Loader2 } from 'lucide-react'

export default function LoadingState() {
	return (
		<div className='tw-flex tw-items-center tw-justify-center tw-py-6'>
			<Loader2
				className='tw-h-6 tw-w-6 tw-animate-spin tw-text-stone-300'
				strokeWidth={1.75}
			/>
		</div>
	)
}
