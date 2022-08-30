import NextAuth from 'next-auth';
import DiscordProvider from 'next-auth/providers/discord';
import { addUserToDB } from '../../../utils/supabaseClient';

export default NextAuth({
	// Configure one or more authentication providers
	providers: [
		DiscordProvider({
			clientId: process.env.DISCORD_CLIENT_ID,
			clientSecret: process.env.DISCORD_CLIENT_SECRET,
			authorization: `https://discord.com/api/oauth2/authorize?client_id=1013579889540087869&redirect_uri=https%3A%2F%2Fsupabase-playaround.vercel.app%2Fapi%2Fauth%2Fcallback%2Fdiscord&response_type=code&scope=identify%20email`,
			secret: process.env.NEXTAUTH_SECRET,
		}),
		// ...add more providers here
	],
	callbacks: {
		async signIn({ user, account, profile, email, credentials }) {
			const ggs = await addUserToDB({
				id: profile.id,
				username: profile.username,
				discriminator: profile.discriminator,
			});

			console.log(`ggs:`, ggs);

			return true;
		},
		async jwt({ token, user, account, profile, isNewUser }) {
			console.log(profile);
			if (profile) {
				token.username = profile.username;
				token.id = profile.id;
				token.discriminator = profile.discriminator;
			}
			return token;
		},
		async session({ session, user, token }) {
			session.username = token.username;
			session.id = token.id;
			session.discriminator = token.discriminator;
			return session;
		},
	},
});
