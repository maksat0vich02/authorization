import { api as index } from '..';

const api = index.injectEndpoints({
	endpoints: (build) => ({
		getMe: build.query<AUTH.GetMeResponse, AUTH.GetMeRequest>({
			query: () => ({
				url: 'auth/user',
				method: 'GET'
			}),
			providesTags: ['auth']
		}),
		postLogin: build.mutation<AUTH.PostLoginResponse, AUTH.PostLoginRequest>({
			query: (data) => ({
				url: '/auth/sign-in',
				method: 'POST',
				body: data
			}),
			invalidatesTags: ['auth']
		}),
		postRegistration: build.mutation<
			AUTH.PostRegistrationResponse,
			AUTH.PostRegistrationRequest
		>({
			query: (data) => ({
				url: '/auth/sign-up',
				method: 'POST',
				body: data
			}),
			invalidatesTags: ['auth']
		}),
		postForgot: build.mutation<AUTH.PostForgotRespone, AUTH.PostForgoatRequest>(
			{
				query: (forgotData) => ({
					url: '/auth/forgot',
					method: 'POST',
					body: forgotData
				}),
				invalidatesTags: ['auth']
			}
		),
		posetResetPassword: build.mutation<
			AUTH.PostResetPasswordRespone,
			AUTH.PostResetPasswordRequest
		>({
			query: (resetPassword) => ({
				url: 'auth/reset-password',
				method: 'PATCH',
				body: resetPassword
			})
		})
	})
});
export const {
	useGetMeQuery,
	usePostRegistrationMutation,
	usePostLoginMutation,
	usePostForgotMutation,
	usePosetResetPasswordMutation
} = api;
