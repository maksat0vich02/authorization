'use client';
import { SubmitHandler, useForm } from 'react-hook-form';
import Link from 'next/link';
import { usePostForgotMutation } from '@/redux/api/auth';

interface IForgotPassword {
	email: string;
	frontEndUrl: string;
}

const ForgotPasswordPage = () => {
	const { register, handleSubmit } = useForm<IForgotPassword>();
	const [ForgotMutation] = usePostForgotMutation();

	const onSubmit: SubmitHandler<IForgotPassword> = async (data) => {
		const newData = {
			email: data.email,
			frontEndUrl: window.location.href
		};
		try {
			const { data: responseData, error } = await ForgotMutation(newData);
			if (responseData) {
				alert(responseData.message);
			} else {
				const messageError = error as { data: { message: string } };
				alert(messageError.data.message);
			}
		} catch (e) {
			console.log(e);
		}
	};

	return (
		<section>
			<h1>Сбрасывание пароля</h1>
			<form onSubmit={handleSubmit(onSubmit)}>
				<input
					placeholder="email"
					type="text"
					{...register('email', {
						required: true,
						pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
					})}
				/>
				<button type="submit">Отправить</button>
			</form>
			<Link href="/auth/sign-in">Вспомнили пароль?</Link>
		</section>
	);
};

export default ForgotPasswordPage;
