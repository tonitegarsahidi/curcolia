
import styled from "styled-components";
import { CircularProgress, Typography } from "@mui/material";

export default function Loading(){
    return(
        <center style={{display:'grid', placeItems: 'center', height:'100vh' }}>
            
            <div>
                
                
                <Logo src="img/conversation.png" />
                {/* <LinearProgress color="secondary" /> */}
                {/* <h1 style={{marginTop:'5px'}}>Please wait chat is Loading</h1> */}
                <Typography style={{marginTop:'5px'}}>hahaa</Typography>
                <CircularProgress color="primary" />
                
                {/* <Progress color="secondary" /> */}

                
            </div>
        </center>
    );
};

const Logo = styled.img`
    height: 75px;
    width: 75px;
    margin: auto;
    margin-bottom:10px;
`;

// const Progress = styled(CircularProgress)`
//     margin:auto;
//     /* border: 1px solid #ccc; */
// `;