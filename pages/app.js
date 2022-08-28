import Head from "next/head";
import Sidebar from "../components/Sidebar";

function chat(){
    return (
        <div>
            <Head>
                <title>Chat now in Curcolia</title>
            </Head>
            <Sidebar />
        </div>
    );
}

export default chat;