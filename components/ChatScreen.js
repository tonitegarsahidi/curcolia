import { Avatar } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import styled from 'styled-components';
import {auth, db} from '../firebase';
import { AttachFile, MoreVert } from '@mui/icons-material';
import {IconButton} from '@mui/material';
import { useCollection } from 'react-firebase-hooks/firestore';
import { doc, query, collection, orderBy, getDocs } from 'firebase/firestore';

function ChatScreen({chat, messages}) {
  const [user] = useAuthState(auth)
  const router = useRouter();

  const messageRef = doc(db, 'chats', router.query.id);

  const queryMessage = query(collection(messageRef, 'messages'), orderBy("timestamp", "asc"), );
  const messageSnapshot = useCollection(queryMessage);

  console.log(messageSnapshot);

  const showMessages = () => {
    if(messageSnapshot){
      return getDocs
    }
    

  };


  return (
    <Container>
       <Header>
        <Avatar />
        <HeaderInformation>
          <h3>Recipient Email</h3>
          <p>Last Seen...</p>
        </HeaderInformation>

        <HeaderIcons>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>

        </HeaderIcons>
       </Header>

       <MessageContainer>
        {/* show messages here */}
        <EndOfMessage />
       </MessageContainer>
    </Container>
  );
}

export default ChatScreen;

const Container = styled.div`
  width: 100%;

`;

const Header = styled.div`
  position: sticky;
  background-color: white;
  z-index: 100;
  top: 0;
  display: flex;
  padding: 11px;
  height: 80px;
  align-items: center;
  border-bottom: 1px solid whitesmoke;
`;

const HeaderInformation = styled.div`
  margin-left: 15px;
  flex: 1;
  > h3 {
    margin-bottom: 3px;
  }

  > p {
    font-size: 14px;
    color:gray;
  }
`;

const MessageContainer = styled.div`
`;


const EndOfMessage = styled.div``;


const HeaderIcons = styled.div`

`;
