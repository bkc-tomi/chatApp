import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import BasicHead from "../../components/atom/head";
import TitleLogo from "../../components/atom/logo";
import BasicButton from "../../components/atom/button";
import BasicParagraph from "../../components/atom/basicP";
import ContainerDiv from "../../components/atom/containerDiv";
import SearchBox from "../../components/compo/searchBox";
import UserField from "../../components/compo/userField";

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
                // ボタンを表示するcssクラスを付与
                console.log(msg);
                setRoomExist(true);
            } else {
                setRoomExist(false);
            }
        }
    }

    const createChatroom = async() => {
        const owner:string = user.displayName;
        const chatroom:ChatroomType = {
            owner:  owner,
            roomname: "",
            member: [],
            chats:  [],
        }
        const msg = await setChatroomToFirestore(chatroom, user.uid);
        console.log(msg);

        const [getmsg, temp] = await getChatroomFromFirestore(user.uid);
        if (getmsg === "get chatroom successfully!") {
            // ボタンを表示するcssクラスを付与
            setRoomExist(true);
        } else {
            setRoomExist(false);
        }
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
            <BasicButton
                fullWidth ={ true }
                onclick   ={ createChatroom }
            >
                チャットルーム初期化
            </BasicButton>
        );
    }

    useEffect(() => {
        (async() => {
            await getChatroom();
            await getUserData();
        })();
        console.log("set user, set room");
    }, [setUser, setRoomExist]);


    return (
        <div>
            <BasicHead />
            <main>
                <div className={ Styles.title }>
                    <TitleLogo />
                </div>

                <div　className={ Styles.maincontainer }>
                    <ContainerDiv>
                            { createRoomBtn() }
                            <div className={ Styles.span }></div>
                            <BasicButton
                                fullWidth ={ true }
                                disabled  ={ !roomExist }
                                onclick   ={() => router.push("/chatroom/[roomid]", `/chatroom/${user.uid}`) }
                            >
                                自分のチャットルームへ
                            </BasicButton>

                            <div className={ Styles.search }>
                                <BasicParagraph>
                                    他の人のチャットルームを検索する場合は以下の検索ボックスを使ってください。
                                </BasicParagraph>
                                <SearchBox />
                            </div>
                    </ContainerDiv>
                </div>

                <UserField 
                    user={ user }
                />
            </main>
        </div>
    );
}
