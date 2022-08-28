import { collection, doc, query, orderBy, getDoc, getDocs } from 'firebase/firestore';
import Head from 'next/head';
import React from 'react'
import styled from 'styled-components';
import ChatScreen from '../../components/ChatScreen';
import Sidebar from '../../components/Sidebar';
import { db, auth } from '../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import getRecipientEmail from '../../utils/getRecipientEmail';


function Chat({chat, messages}) {

    const [user] = useAuthState(auth);
    
  return (
    <Container>
        <Head>
            <title>Chat with {getRecipientEmail(chat.users, user)}</title>
        </Head>
        <Sidebar />
        <ChatContainer>
            <ChatScreen chat={chat} messages={messages}/>
        </ChatContainer>
      
    </Container>
  )
}

export default Chat;

export async function getServerSideProps(context){
    const chatId  = context.query.id;
    const ref = doc(db, 'chats', chatId);

    //PREP THE MESSAGES ON THE SERVER
    // const messagesRes = await ref.collection('messages').order('timestamp', 'asc').get();
    const thequery = query(collection(ref, 'messages'), orderBy("timestamp", "asc"), );
    const messagesRes = await getDocs(thequery);
    // return "haha";
    

    const messages = messagesRes.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
    })).map(messages => ({
        ...messages,
        timestamp: messagesRes?.timestamp?.toDate().getTime()

    }));

    // console.log("SAYA SSR MESSAGES");
    //console.log(messages);

    //PREP THE CHATS HERE
    const chatRes = await getDoc(ref);
    const chat = {
        id: chatRes.id,
        ...chatRes.data()
    }

    // console.log(chat, messages); 

    return {props : {
        messages : JSON.stringify(messages),
        chat : chat,
    }};

}

const Container = styled.div`
    display: flex;
    width: 100%;
`;

const ChatContainer = styled.div`
    display: flex;
    flex:1;
    overflow: scroll;
    height:100vh;

    ::-webkit-scrollbar{
        display: none;
    }
    -ms-overflow-style: none;
    scrollbar-width: none;
`;


