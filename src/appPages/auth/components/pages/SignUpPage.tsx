'use client';

import { usePostRegistrationMutation } from '@/redux/api/auth';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

interface userRegister {
	email: string;
	password: string;
	username: string;
	photo: string;
}

const SignUpPage = () => {
	const { register, handleSubmit } = useForm<userRegister>();
	const [postRegisterMutation] = usePostRegistrationMutation();
	const [errorGamil, setErrorGamil] = useState<string | null>('');
	const route = useRouter();

	const onSubmit: SubmitHandler<userRegister> = async (data) => {
		try {
			const { data: response, error } = await postRegisterMutation(data);
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
				<input
					type="text"
					{...register('username', { required: true })}
					placeholder="username"
				/>
				<input
					type="text"
					{...register('photo', { required: true })}
					placeholder="photo"
				/>
				<nav>
					<Link href={'auth/sign-in'}>у вас уже есть аккаунт?</Link>
				</nav>
				<h4>{errorGamil}</h4>
				<button type="submit"> отправить</button>
			</form>
		</section>
	);
};
export default SignUpPage;
