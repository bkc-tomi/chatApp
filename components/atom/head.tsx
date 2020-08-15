import Head      from "next/head";
import basicData from "./basicData";

export default function BasicHead() {
    return (
        <Head>
            <title>{ basicData.title }</title>
            <meta name="description" content={ basicData.description }/>
            <meta name="keywords" content={ basicData.content }/>
            <link rel="icon" href="/favicon.ico" />
            <script src="https://kit.fontawesome.com/1a97c90b78.js"></script>
        </Head>
    );
}