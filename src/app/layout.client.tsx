'use client';
import React, { FC, ReactNode } from 'react';
import { ReduxProvider } from '@/providers/ReduxProvider';
import { SessionProvider } from '@/providers/SessionProvider';

interface RootLayoutClientProps {
	children: ReactNode;
}

const RootLayoutClient: FC<RootLayoutClientProps> = ({ children }) => {
	return (
		<>
			<ReduxProvider>
				<SessionProvider>{children}</SessionProvider>
			</ReduxProvider>
		</>
	);
};

export default RootLayoutClient;
