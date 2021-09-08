import React, { useState } from "react";
import { getSession } from "next-auth/client";
// import prisma from "../contexts/prisma";

function NewUser(props) {
	console.log(props);

	return (
		<div>
			<div>New User</div>
		</div>
	);
}

export default NewUser;

export async function getServerSideProps(context) {
	const session = await getSession(context);

	return { props: { session } };
}
