import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import { useSession, signIn, signOut } from 'next-auth/react';
import { useState, useEffect } from 'react';

const Home: NextPage = () => {
	const [loggedIn, setLoggedIn] = useState<Boolean>(false);
	const { data: session } = useSession();
	useEffect(() => {
		if (session) setLoggedIn(true);
		else setLoggedIn(false);
	}, []);

	const handleSignInOut = () => {
		session ? signOut() : signIn(`discord`);
	};

	return (
		<div>
			<h1>Home Page</h1>
			<button
				className='border-2 text-2xl'
				onClick={() => handleSignInOut()}>
				{session ? `Sign out Here` : `Signin Here`}
			</button>
			<h1>{`discord username:` + session?.username}</h1>
			<h1>{`discord id:` + session?.id}</h1>
			<h1>{`discord discriminator:` + session?.discriminator}</h1>
		</div>
	);
};

export default Home;

export async function getServerSideProps() {
	return {
		props: {},
	};
}
