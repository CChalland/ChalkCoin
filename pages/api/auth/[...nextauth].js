import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import Adapters from "next-auth/adapters";
import prisma from "../../../contexts/prisma";

const authHandler = (req, res) => NextAuth(req, res, options);
export default authHandler;

const options = {
	providers: [
		Providers.Credentials({
			id: "credentials",
			name: "Login",
			async authorize(credentials) {
				const user = await prisma.users.findFirst({
					where: {
						email: credentials.email,
						password: credentials.password,
					},
				});

				if (user !== null) {
					userAccount = user;
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
	callbacks: {
		async jwt(token, user) {
			if (user) {
				token.accessToken = user.data.token;
			}
			return token;
		},
		async session(session, token) {
			delete token.password;
			session.user = token;

			return await session;
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
