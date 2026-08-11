import { signIn, signOut, useSession } from "next-auth/react";

const index = () => {
    const { data: session } = useSession();
    console.log(session);

    if (session) {
        return (
            <>
                Signed in as {session.user?.email} <br />
                <button onClick={() => signOut()}>Sign out</button>
            </>
        );
    }
    return (
        <>
            Not signed in <br />
            <button onClick={() => signIn()}>Sign in</button>
        </>
    );
};
export default index;
