'use client';
import { usePosetResetPasswordMutation } from '@/redux/api/auth';
import { useSearchParams } from 'next/navigation';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

interface IFormResetPassword {
	newPassword: string;
}

const ResetPasswordPage = () => {
	const { register, handleSubmit } = useForm<IFormResetPassword>();
	const searchParams = useSearchParams();
	const token = searchParams.get('token');

	const [resetPasswordMutation] = usePosetResetPasswordMutation();

	const onSubmit: SubmitHandler<IFormResetPassword> = async (data) => {
		const newData = {
			token: token!,
			newPassword: data.newPassword
		};

		try {
			const { data: responseData, error } = await resetPasswordMutation(
				newData
			);
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
			<h1>Изменение пароля</h1>
			<form onSubmit={handleSubmit(onSubmit)}>
				<input
					placeholder="resetPassword"
					type="text"
					{...register('newPassword', { required: true })}
				/>
				<button type="submit">Изменить пароль</button>
			</form>
		</section>
	);
};

export default ResetPasswordPage;
