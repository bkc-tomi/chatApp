import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import BasicHead from "../../../components/atom/head";
import TitleLogo from "../../../components/atom/logo";
import BasicButton from "../../../components/atom/button";
import BasicH2 from "../../../components/atom/basicH2";
import UserField from "../../../components/compo/userField";
import ChatContainer from "../../../components/compo/chatContainer";
import ChatForm from "../../../components/compo/chatform";

import Styles from "../../../styles/chatroom.module.css";

import { activeUserExist, getActiveUser } from "../../../functions/auth";
import { getChatroomFromFirestore, ChatroomType } from "../../../functions/database";
import { scrollBottom } from "../../../functions/window";

export default function Room() {
    const [ user, setUser] = useState<firebase.User>();
    const [ room, setRoom] = useState<ChatroomType>();
    const router = useRouter();

    // userの存在を確認
    const checkUser = async() => {
        if (await activeUserExist()) {
            const usr = getActiveUser();
            setUser(usr);
        } else {
            console.log("no user");
        }
    }
    // roomの存在を確認
    const checkroom = async() => {
        const path = location.pathname.split("/chatroom/")[1];
        const [msg, rm] = await getChatroomFromFirestore(path);
        if (msg === "get chatroom successfully!") {
            setRoom(rm);
        }      
    }

    useEffect(() => {
        (async() => {
            await checkUser();
            await checkroom();
            scrollBottom();     
        })();
    }, []);

    const chatArea = () => {
        if (room) {
            return (
                <>
                    <div className={ Styles.roomname }>
                        <BasicH2>{ room.owner } のチャットルーム</BasicH2>
                    </div>
                    <div className={ Styles.chatarea }>
                        <div className={ Styles.chatareaInner }>
                            <div>
                                <ChatContainer
                                    chats={ room.chats }
                                    user={ user.uid }
                                />
                            </div>
                        </div>
                    </div>
                </>
            );
        }
        return (
            <div className={ Styles.chatareaInner }>
                <BasicH2>
                    このチャットルームは存在しないか、オーナーがログアウトして消去された可能性があります。
                </BasicH2>
            </div>
        );
    }

    if (!user) {
        return (
            <div>
                <BasicHead />
                <div className={ Styles.title }>
                    <TitleLogo />
                </div>

                <div className={ Styles.container }>
                    <BasicH2>どうやらあなたはログインが済んでいないようです。ここから匿名ログインをしてください</BasicH2>
                    <BasicButton
                        fullWidth ={ true }
                        onclick   ={ () => router.push("/chatroom/[roomid]/signin", location.pathname + "/signin") }
                    >匿名ログイン</BasicButton>
                </div>
            </div>
        );
    }

    return (
        <div>
            <BasicHead />
            <main>
                <div className={ Styles.title }>
                    <TitleLogo />
                </div>

                <div className={ Styles.toProfile }>
                    <BasicButton
                        onclick={ () => router.push("/profile/[username]", "/profile/" + user.displayName) }
                    >
                        プロフィールページへ
                    </BasicButton>
                </div>
                <div className={ Styles.area }>
                    { chatArea() }
                </div>

                <div className={ Styles.userArea }>
                    <div className={ Styles.chatform }>
                        <ChatForm 
                            roomid={ location.pathname.split("/chatroom/")[1] }
                            user={ user }
                        />
                    </div>
                    <div className={ Styles.userField }>
                        <UserField
                            user={ user }
                        />
                    </div>
                </div>
            </main>
        </div>
    );
}
