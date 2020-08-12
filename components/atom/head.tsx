import Head      from "next/head";
import basicData from "./basicData";

export default function BasicHead() {
    return (
        <Head>
            <title>{ basicData.title }</title>
            <link rel="icon" href="/favicon.ico" />
        </Head>
    );
}