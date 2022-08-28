import styled from 'styled-components';
import { Avatar, Button, IconButton } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';
import * as EmailValidator from 'email-validator';
import { auth, db } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection } from 'react-firebase-hooks/firestore';
import Chat from './Chat';

import { collection, addDoc, where, doc, getDoc, query } from 'firebase/firestore';
import Head from 'next/head';

export default function Sidebar() {

    const [user] = useAuthState(auth);
    const dbChatRef = collection(db, "chats");
    const userChatRef = query(dbChatRef, where("users", 'array-contains', user.email));

    const [chatsSnapshot] = useCollection(userChatRef);

    // console.log(getDocs(chatsSnapshot));

    const createChat = () => {
        const input = prompt('masukkan email kamu mau chat sama siapa');

        if (!input) return null;

        //check if the email is valid, not exiost, and not users own email
        if (EmailValidator.validate(input) && 
            !chatAlreadyExist(input) &&
            input !== user.email
        ) {
            //we need to add the chat into the DB 'chats' collection
            const newChat = addDoc(dbChatRef, {
                users: [user.email, input],
            });

        }
    };

    /* Check if chat with recipient email is already happen in the past */
    const chatAlreadyExist = (recipientEmail) => {
        return !!chatsSnapshot?.docs.find(
            (chat) => {
                chat.data().users.find((user) => user === recipientEmail)?.length > 0;
            }
        );
    };

    const signOut = () => {
        auth.signOut();
    };

    return (
        <Container>
            <Head>
                <meta name="referrer" content="no-referrer" />
            </Head>
            <Header>
                <UserAvatar src={user.photoURL} onClick={signOut}/>

                <IconsContainer>
                    <IconButton>
                        <ChatIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </IconsContainer>
            </Header>

            <Search>
                <SearchIcon />
                <SearchInput placeholder='Cari Chat' />
            </Search>

            <SidebarButton onClick={createChat}>Start a new Chat</SidebarButton>

            {/* List of chats later */}
            {
                // console.log(chatsSnapshot)
                chatsSnapshot?.docs.map((chat) => (
                     <Chat key={chat.id} id={chat.id} users={chat.data().users} />
                 ))
            }
        </Container>
    );

}

const Container = styled.div`
`;

const Search = styled.div`
    display: flex;
    align-items: center;
    padding: 20px;
    border-radius: 12px;
`;

const SidebarButton = styled(Button)`
    width: 100%;

    &&&{
        border-top: 1px solid whitesmoke;
        border-bottom: 1px solid whitesmoke;
    }
`;

const SearchInput = styled.input`
    outline-width: 0;
    border:none;
    flex: 1;
`;

const Header = styled.div`
    display: flex;
    position: sticky;
    top: 0;
    background-color: white;
    z-index: 1;
    justify-content: space-between;
    align-items: center;
    padding: 15px;
    height: 80px;
    border-bottom: 1px solid whitesmoke;
`;

const UserAvatar = styled(Avatar)`
    cursor: pointer;

    :hover{
        opacity: 0.8;
    }
`;

const IconsContainer = styled.div``;
