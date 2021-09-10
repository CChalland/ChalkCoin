import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import Adapters from "next-auth/adapters";
import prisma from "../../../contexts/prisma";
import { compareSync } from "bcrypt";

const authHandler = (req, res) => NextAuth(req, res, options);
export default authHandler;

const options = {
	providers: [
		Providers.Credentials({
			id: "credentials",
			name: "Login",
			async authorize(credentials) {
				const user = await prisma.user.findFirst({
					where: {
						email: credentials.email,
					},
					include: {
						requester: true,
						accepter: true,
						recipient: true,
					},
				});
				const passwordTrue = await compareSync(credentials.password, user.password);
				if (user && passwordTrue) {
					return user;
				} else {
					return null;
				}
			},
		}),
		Providers.Email({
			server: {
				host: process.env.SMTP_HOST,
				port: Number(process.env.SMTP_PORT),
				auth: {
					user: process.env.SMTP_USER,
					pass: process.env.SMTP_PASSWORD,
				},
			},
			from: process.env.SMTP_FROM,
		}),
		Providers.GitHub({
			clientId: process.env.GITHUB_ID,
			clientSecret: process.env.GITHUB_SECRET,
		}),
	],
	session: {
		// Use JSON Web Tokens for session instead of database sessions.
		// This option can be used with or without a database for users/accounts.
		// Note: `jwt` is automatically set to `true` if no database is specified.
		jwt: true,

		// Seconds - How long until an idle session expires and is no longer valid.
		maxAge: 30 * 24 * 60 * 60, // 30 days

		// Seconds - Throttle how frequently to write to database to extend a session.
		// Use it to limit write operations. Set to 0 to always update the database.
		// Note: This option is ignored if using JSON Web Tokens
		updateAge: 24 * 60 * 60, // 24 hours
	},
	callbacks: {
		async jwt(token, user, account, profile, isNewUser) {
			console.log("jwt token", token);
			console.log("jwt user", user);
			console.log("jwt account", account);
			console.log("jwt profile", profile);
			console.log("jwt isNewUser", isNewUser);

			// Persist the OAuth access_token to the token right after signin
			if (account) {
				token.accessToken = account.access_token;
			}
			if (user) {
				token.user = user;
				// token.username = user.username;
				// token.email = user.email;
				// token.password = user.password;
				// token.name = user.name;
				// token.picture = user.image;
				// token.paypal = user.paypal
			}
			return token;
		},
		async session(session, token, user) {
			console.log("session session", session);
			console.log("session user", user);
			console.log("session token", token);

			// Send properties to the client, like an access_token from a provider.
			session.accessToken = token.accessToken;
			session.user = token.user;

			// delete token.password;
			// session.user = token;

			return session;
		},
	},
	pages: {
		signIn: "/LoginRegister",
		verifyRequest: "/VerifyRequest",
		newUser: "/NewUser",
	},
	// @ts-ignore
	adapter: Adapters.Prisma.Adapter({
		prisma,
	}),

	secret: process.env.SECRET,
};
