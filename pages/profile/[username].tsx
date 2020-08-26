import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import BasicHead from "../../components/atom/head";
import TitleLogo from "../../components/atom/logo";
import BasicButton from "../../components/atom/button";
import BasicH3 from "../../components/atom/basicH3";
import BasicParagraph from "../../components/atom/basicP";
import ContainerDiv from "../../components/atom/containerDiv";
import SearchBox from "../../components/compo/searchBox";
import UserField from "../../components/compo/userField";
import SignoutButton from "../../components/compo/signoutButton";
import NoUser from "../../components/compo/nouser";

import Styles from "../../styles/profile.module.css";

import { getActiveUser, activeUserExist } from "../../functions/auth";
import { ChatroomType, setChatroomToFirestore, getChatroomFromFirestore } from "../../functions/database";

export default function Profile() {
    const [user, setUser] = useState<firebase.User>();
    const [roomExist, setRoomExist] = useState(false);
    const router = useRouter();

    const getUserData = async() => {
        if (await activeUserExist()) {
            const temp = getActiveUser();
            setUser(temp);
        }
    }

    const getChatroom = async() => {
        if (await activeUserExist()) {
            // 最初に読み込むのでuser stateからだと間に合わないかも
            const usr = getActiveUser();
            const [msg, temp] = await getChatroomFromFirestore(usr.uid);
            if (msg === "get chatroom successfully!") {
                setRoomExist(true);
            } else {
                setRoomExist(false);
            }
        }
    }

    const createChatroom = async() => {
        const owner:string = user.displayName;
        const date = Date.now();
        const chatroom:ChatroomType = {
            owner:  owner,
            roomname: "",
            member: [],
            chats:  [
                {
                    text: `ここは、${ user.displayName }のチャットルームだよ！下のフォームから投稿してね！`,
                    date: date,
                    uid : "chat-bot",
                    username: "chat-bot",
                    photoURL: "/static/chat-bot.png",
                },
            ],
        }
        const msg = await setChatroomToFirestore(chatroom, user.uid);
        console.log(msg);

        const [getmsg, temp] = await getChatroomFromFirestore(user.uid);
        if (getmsg === "get chatroom successfully!") {
            setRoomExist(true);
        } else {
            setRoomExist(false);
        }
    }

    const copyURL = () => {
        const URL = document.getElementById("roomURL").textContent;
        navigator.clipboard.writeText(URL);
        console.log(URL);
    }
    
    const createRoomBtn = () => {
        if (!roomExist) {
            return (
                <BasicButton
                    fullWidth ={ true }
                    onclick   ={ createChatroom }
                >
                    チャットルーム作成
                </BasicButton>
            );
        }
        return (
            <div>
                <div className={ Styles.Roombtn }>
                    <BasicButton
                        fullWidth ={ true }
                        onclick   ={ createChatroom }
                    >
                        チャットルーム初期化
                    </BasicButton>
                </div>
                    <div>
                        <BasicH3>
                            以下のURLを教えてチャットルームに招待しよう！
                        </BasicH3>
                    </div>
                <div className={ Styles.copydiv }>
                    <div id="roomURL" className={ Styles.url }>
                        <BasicParagraph>
                            { location.host + `/chatroom/${user.uid}` }
                        </BasicParagraph>
                    </div>
                    <div className={ Styles.copyBtn }>
                        <BasicButton
                            fullWidth={ true }
                            onclick={ copyURL }
                        >
                            コピー
                        </BasicButton>
                    </div>
                </div>
            </div>

        );
    }

    useEffect(() => {
        (async() => {
            await getChatroom();
            await getUserData();
        })();
    }, [setRoomExist]);

    if (user) {
        return (
            <div>
                <BasicHead />
                <main>
                    <div className={ Styles.title }>
                        <TitleLogo />
                    </div>

                    <div　className={ Styles.maincontainer }>
                        <ContainerDiv>
                            <div>
                                <BasicH3>
                                    チャットルーム作成＆初期化
                                </BasicH3>
                                <BasicParagraph>
                                    まずは自分のチャットルームを作成しましょう。もし誰かのチャットルームに参加する場合は、
                                    下の検索ボックスから検索するかチャットルームのURLを教えて貰いましょう。
                                </BasicParagraph>
                            </div>
                            { createRoomBtn() }
                            <div className={ Styles.mychatroom }>
                                <BasicButton
                                    fullWidth ={ true }
                                    disabled  ={ !roomExist }
                                    onclick   ={() => router.push("/chatroom/[roomid]", `/chatroom/${user.uid}`) }
                                >
                                    自分のチャットルームへ
                                </BasicButton>
                            </div>

                            <div className={ Styles.search }>
                                <BasicH3>
                                    チャットルーム検索
                                </BasicH3>
                                <BasicParagraph>
                                    他の人のチャットルームを検索する場合は以下の検索ボックスを使ってください。
                                </BasicParagraph>
                                <SearchBox />
                            </div>
                        </ContainerDiv>
                    </div>
                    <div className={ Styles.userField }>
                        <UserField 
                            user={ user }
                        />
                    </div>
                </main>
                <SignoutButton />
            </div>
        );
    }

    return (
        <div className={ Styles.nouser }>
            <NoUser />
        </div>
    );
}
