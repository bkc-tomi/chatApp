import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import BasicHead from "../../../components/atom/head";
import TitleLogo from "../../../components/atom/logo";
import BasicButton from "../../../components/atom/button";
import BasicH2 from "../../../components/atom/basicH2";
import UserField from "../../../components/compo/userField";

import Styles from "../../../styles/chatroom.module.css";

import { activeUserExist, getActiveUser } from "../../../functions/auth";
import { getChatroomFromFirestore, ChatroomType } from "../../../functions/database";

export default function Room() {
    const [ user, setUser] = useState<firebase.User>();
    const [ room, setRoom] = useState<ChatroomType>();
    const router = useRouter();

    // userの状態を確認
    const checkUser = async() => {
        if (await activeUserExist()) {
            const usr = getActiveUser();
            setUser(usr);
        } else {
            console.log("no user");
        }
    }

    const checkroom = async() => {
        const path = location.pathname.split("/chatroom/")[1];
        console.log(path);
        const [msg, rm] = await getChatroomFromFirestore(path);

        if (msg === "get chatroom successfully!") {
            setRoom(rm);
            console.log(rm);
        }
    }

    useEffect(() => {
        (async() => {
            await checkUser();
            await checkroom();
            console.log("checked");
        })();
    }, []);

    const chatArea = () => {
        if (room) {
            return (
                <div className={ Styles.chatareaInner }>
                    <BasicH2>{ room.owner } のチャットルーム</BasicH2>
                </div>
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
                        onclick   ={ () => router.push("/chatroom/[roomid]/setting", location.pathname + "/setting") }
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
                    <div className={ Styles.chatarea }>
                            { chatArea() }
                    </div>

                </div>

                <div className={ Styles.userField }>
                    <UserField
                        user={ user }
                    />
                </div>
            </main>
        </div>
    );
}
