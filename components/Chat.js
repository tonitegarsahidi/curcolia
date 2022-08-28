import { Avatar } from '@mui/material';
import React from 'react';
import styled from 'styled-components';
import { auth } from '../firebase';
import getRecipientEmail from '../utils/getRecipientEmail';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection } from 'react-firebase-hooks/firestore';
import { db } from '../firebase';

import { collection, addDoc, where, doc, getDoc, query } from 'firebase/firestore';
import { useRouter } from 'next/router';
import Head from 'next/head';



function Chat({id, users}) {
    const router = useRouter();

    const [user] = useAuthState(auth);

    const [recipientSnapshot] = useCollection(query(collection(db, 'users'), where('email', '==', getRecipientEmail(users, user))));

    const recipient = recipientSnapshot?.docs?.[0]?.data();

    const recipientEmail = getRecipientEmail(users, user);

    // console.log(recipient);

    const enterChat = () => {
        router.push(`/chat/${id}`);
    }


  return (
    <Container onClick={enterChat}>
        <Head>
                <meta name="referrer" content="no-referrer" />
        </Head>
        {
            recipient ? (
                <UserAvatar src={recipient?.photoURL} referrer-policy="no-referrer" />
            ) : (
                <UserAvatar>{recipientEmail[0]}</UserAvatar>
            )
        }
      <p>{recipientEmail}</p>
    </Container>
  );
}

export default Chat;

const Container = styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;
    padding:15px;
    word-break: break-word;

    :hover{
        background-color: #e9eaeb;
    }
`;

const UserAvatar = styled(Avatar)`
  margin: 8px;
  margin-right: 15px;
`;
