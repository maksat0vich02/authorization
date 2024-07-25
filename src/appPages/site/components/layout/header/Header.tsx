import React, { FC, useEffect, useState } from 'react';
import scss from './Header.module.scss';
import Image from 'next/image';
import logo from '@/assets/logo.png';
import Link from 'next/link';
import { useGetMeQuery } from '@/redux/api/auth';

const links = [
	{
		name: 'Home',
		href: '/'
	}
];

const Header: FC = () => {
	const { data } = useGetMeQuery();
	return (
		<header className={scss.Header}>
			<div className="container">
				<div className={scss.content}>
					<div className={scss.logo}>
						<Image src={logo} alt="logo" />
					</div>
					<nav className={scss.nav}>
						<ul>
							{links.map((item, index) => (
								<li key={index}>
									<Link className={scss.link} href={item.href}>
										{item.name}
									</Link>
								</li>
							))}
						</ul>
						<h6>{data?.profile.email}</h6>
					</nav>
				</div>
			</div>
		</header>
	);
};

export default Header;
