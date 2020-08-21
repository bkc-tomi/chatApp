import Head      from "next/head";
import basicData from "./basicData";

export default function BasicHead() {
    return (
        <Head>
            <title>{ basicData.title }</title>
            <meta name="description" content={ basicData.description }/>
            <meta name="keywords" content={ basicData.content }/>
            <link rel="icon" href="/favicon.ico" />
        </Head>
    );
}