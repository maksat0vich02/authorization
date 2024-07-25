namespace AUTH {
	type GetMeResponse = {
		profile: User;
	};
	type GetMeRequest = void;

	type PostLoginResponse = {
		accessToken: string;
		accessTokenExpiration: number;
	};
	type PostLoginRequest = {
		email: string;
		password: string;
	};

	type PostRegistrationResponse = {
		message: string;
		accessToken: string;
		accessTokenExpiration: number;
	};
	type PostRegistrationRequest = {
		email: string;
		password: string;
		username: string;
		photo: string;
	};
	type PostForgotRespone = {
		message: string;
	};

	type PostForgoatRequest = {
		email: string;
		frontEndUrl: string;
	};
	type PostResetPasswordRespone = {
		message: string;
	};

	type PostResetPasswordRequest = {
		token: string;
		newPassword: string;
	};
}
