'use client'

import { useState, useEffect } from 'react'
import LoadingState from './LoadingState'
import ErrorBlock from './ErrorBlock'
import { removeSpecialCharacters } from '../lib/utils'

function LeadForm({ domain, setSuccess, setReferralData }) {
	const initialValues = {
		isLoading: false,
		domain,
		email: '',
	}

	const initialErrors = {
		validate: false,
		emailError: '',
	}

	const [data, setData] = useState(initialValues)
	const [errors, setErrors] = useState(initialErrors)

	useEffect(() => {
		const dataErrors = {
			emailError:
				(data.email ? '' : 'Email is required') ||
				(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)
					? ''
					: 'Invalid Email'),
		}
		setErrors((prev) => ({ ...prev, ...dataErrors }))
	}, [data])

	const handleChange = (e) => {
		setData({ ...data, [e.target.name]: e.target.value })
	}

	const handleSubmit = async (event) => {
		event.preventDefault()

		const isValid = !Object.values(errors).some((v) => v)
		setErrors({ ...errors, validate: true })

		if (!isValid) return

		setData({ ...data, isLoading: true })
		try {
			const response = await fetch('/api/lead', {
				method: 'POST',
				body: JSON.stringify(data),
			})
			setData({ ...data, isLoading: false })

			if (response.ok) {
				const res = await response.json()
				if (res.status) {
					const emailReferral = data.email
					const emailSplit = emailReferral.split('@')
					const name = removeSpecialCharacters(emailSplit[0])
					setReferralData({
						...data,
						email: emailReferral,
						name,
					})
					setSuccess(true)
				}
			} else {
				alert('An error occurred')
			}
		} catch (err) {
			console.error(err)
		}
	}

	if (data.isLoading) return <LoadingState />

	return (
		<form onSubmit={handleSubmit} className='tw-w-full tw-max-w-xl'>
			<div className='tw-flex tw-flex-col sm:tw-flex-row tw-gap-2 tw-mb-3'>
				<input
					type='email'
					name='email'
					onChange={handleChange}
					placeholder='you@studio.com'
					className='tw-flex-1 tw-rounded-full tw-bg-white/5 tw-border tw-border-white/10 tw-px-5 tw-py-3 tw-text-stone-100 tw-text-sm focus:tw-outline-none focus:tw-border-[#d6b878] tw-transition-colors'
				/>
				<button
					type='submit'
					className='tw-rounded-full tw-bg-stone-50 tw-text-stone-900 tw-px-8 tw-py-3 tw-text-sm tw-font-medium hover:tw-bg-[#d6b878] tw-transition-colors active:tw-translate-y-px'
				>
					Submit
				</button>
			</div>
			{errors.validate ? <ErrorBlock msg={errors.emailError} /> : null}
		</form>
	)
}

export default LeadForm
