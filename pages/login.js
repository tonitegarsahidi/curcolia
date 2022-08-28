import Head from "next/head";
import styled from "styled-components";
import { Button } from "@mui/material";

import {auth, db, provider} from "../firebase";
import { signInWithPopup } from "firebase/auth";


export default function login(){

    const signInGoogle = () => {

        signInWithPopup(auth, provider)
        .then((result) => {

            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            console.log(user);


        })
        .catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            // const email = error.customData.email;
            // The AuthCredential type that was used.
            // const credential = GoogleAuthProvider.credentialFromError(error);
            console.log(errorCode, errorMessage);
        });

    };

    return(
        <Container>
            <Head>
                <title>Login dulu</title>
            </Head>

            <LoginContainer>
                <Logo src="img/conversation.png" />
                <Button onClick={signInGoogle} variant="outlined">Login pake Google</Button>

            </LoginContainer>

        </Container>
    );
}

const Container = styled.div`
    display: grid;
    place-items: center;
    height: 100vh;
    background-color: whitesmoke;
`;

const LoginContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding:100px;
    align-items: center;
    background-color: white;
    border-radius: 15px;
    box-shadow: 0px 4px 14px -3px rgba(0,0,0,0.7);
`;

const Logo = styled.img`
    height: 100px;
    width: 100px;
    margin: auto;
    margin-bottom:50px;
    
`;

