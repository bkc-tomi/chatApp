import Head      from "next/head";
import basicData from "./basicData";

export default function BasicHead() {
    return (
        <Head>
            <title>{ basicData.title }</title>
            <meta name="description" content="このアプリは作者がNEXT.jsの練習のためだけに作ったチャットアプリです。\
                                              チャットルームの作成し、チャットをすることが出来ます。しかし、セキュリティ\
                                              機能をつけるかどうか迷っているので、今のところチャットルームには誰でも入れます。\
                                              そういう意味ではもはや掲示板です。ちゃちゃっと(素早く)出来る掲示板です。\
                                              だから適当に使ってくれたら幸いです。"/>
            <meta name="keywords" content="chat, チャット, ちゃちゃっと, アプリ, App"/>
            <link rel="icon" href="/favicon.ico" />
        </Head>
    );
}