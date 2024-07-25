'use client';

import {
	usePostLoginMutation,
	usePostRegistrationMutation
} from '@/redux/api/auth';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

interface IFormLogin {
	email: string;
	password: string;
}

const SignInPage = () => {
	const { register, handleSubmit } = useForm<IFormLogin>();
	const [PostLoginMutation] = usePostLoginMutation();
	const [errorGamil, setErrorGamil] = useState<string | null>('');
	const route = useRouter();

	const onSubmit: SubmitHandler<IFormLogin> = async (data) => {
		try {
			const { data: response, error } = await PostLoginMutation(data);
			if (response) {
				localStorage.setItem(
					'accessToken',
					JSON.stringify(response.accessToken)
				);
				route.push('/');
			} else {
				const errorMessage = error as { data: { message: string } };
				setErrorGamil(errorMessage.data.message);
			}
		} catch (e) {
			console.error('An error occurred:', e);
		}
	};

	return (
		<section>
			<form onSubmit={handleSubmit(onSubmit)}>
				<input
					type="text"
					{...register('email', { required: true })}
					placeholder="email"
				/>
				<input
					type="number"
					{...register('password', { required: true })}
					placeholder="password"
				/>
				<h4>{errorGamil}</h4>
				<button type="submit"> отправить</button>
			</form>
		</section>
	);
};
export default SignInPage;
