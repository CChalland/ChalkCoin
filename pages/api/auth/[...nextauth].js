import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import Adapters from "next-auth/adapters";
import DiscordProvider from "next-auth/providers/discord";
import LinkedInProvider from "next-auth/providers/linkedin";
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
						requester: {
							select: { id: true },
						},
						accepter: {
							select: { id: true },
						},
						recipient: {
							select: { id: true },
						},
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
		DiscordProvider({
			clientId: process.env.DISCORD_CLIENT_ID,
			clientSecret: process.env.DISCORD_CLIENT_SECRET,
		}),
		LinkedInProvider({
			clientId: process.env.LINKEDIN_CLIENT_ID,
			clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
		}),
	],
	session: {
		jwt: true,
		maxAge: 30 * 24 * 60 * 60, // 30 days
		updateAge: 24 * 60 * 60, // 24 hours
	},
	callbacks: {
		async jwt(token, user, account, profile, isNewUser) {
			// console.log("jwt token", token);
			// console.log("jwt user", user);
			// console.log("jwt account", account);
			// console.log("jwt profile", profile);
			// console.log("jwt isNewUser", isNewUser);
			if (account) {
				token.accessToken = account.access_token;
			}
			if (user) {
				if (!("accepter" in user) || !("recipient" in user) || !("requester" in user)) {
					const currentUser = await prisma.user.findFirst({
						where: {
							id: parseInt(user.id),
						},
						include: {
							requester: {
								select: { id: true },
							},
							accepter: {
								select: { id: true },
							},
							recipient: {
								select: { id: true },
							},
						},
					});
					delete currentUser.password;
					token.user = await currentUser;
				} else {
					token.user = user;
				}
			}
			return token;
		},
		async session(session, token, user) {
			// console.log("session session", session);
			// console.log("session user", user);
			// console.log("session token", token);
			session.accessToken = token.accessToken;
			session.user = token.user;

			return session;
		},
	},
	pages: {
		signIn: "/login",
		error: "/login",
		verifyRequest: "/login?verifyRequest=true",
		newUser: "/user?newUser=true",
	},
	// @ts-ignore
	adapter: Adapters.Prisma.Adapter({
		prisma,
	}),

	secret: process.env.SECRET,
};
