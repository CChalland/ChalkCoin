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

				if (user) {
					const passwordTrue = await compareSync(credentials.password, user.password);
					if (passwordTrue) {
						delete user.password;
						return user;
					} else {
						throw new Error("incorrectPassword");
					}
				} else {
					throw new Error("invalidEmail");
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
		jwt: true,
		maxAge: 30 * 24 * 60 * 60, // 30 days
		updateAge: 24 * 60 * 60, // 24 hours
	},
	callbacks: {
		async jwt(token, user, account, profile, isNewUser) {
			if (account) {
				token.accessToken = account.access_token;
			}
			if (user) {
				token.user = user;
			}
			return token;
		},
		async session(session, token, user) {
			session.accessToken = token.accessToken;
			session.user = token.user;

			return session;
		},
	},
	pages: {
		signIn: "/LoginRegister",
		error: "/LoginRegister",
		verifyRequest: "/LoginRegister?verifyRequest=true",
		newUser: "/UserPage?newUser=true",
	},
	// @ts-ignore
	adapter: Adapters.Prisma.Adapter({
		prisma,
	}),

	secret: process.env.SECRET,
};
