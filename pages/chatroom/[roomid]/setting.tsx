import { useRouter } from "next/router";
import { useState } from "react";

import BasicHead from "../../../components/atom/head";
import TitleLogo from "../../../components/atom/logo";
import BasicH2 from "../../../components/atom/basicH2";
import BasicParagraph from "../../../components/atom/basicP";
import BasicTextField from "../../../components/atom/textbox";
import BasicButton from "../../../components/atom/button";
import ContainerDiv from "../../../components/atom/containerDiv";

import { activeUserExist, getActiveUser, signinAnonymous } from "../../../functions/auth";
import { validationUsername } from "../../../functions/validation";
import { saveUserImage, getUserImageUrl } from "../../../functions/storage";

import Styles from "../../../styles/setting.module.css";

export default function SettingProfile() {
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [UMessage, setUMessage] = useState(["ユーザネームを決めてください。", "#000000"]);
    const [photo   , setPhoto   ] = useState();
    const [disable , setDisable ] = useState(false);

    const handleUsernameChange = (event:React.ChangeEvent<{ value: unknown }>) => {
        setUsername(event.target.value as string);
        if (validationUsername(event.target.value as string)) {
            setUMessage(["OK!!", "#55c501"]);
        } else {
            setUMessage(["ユーザネームは１文字以上で指定してください。", "#ff0000"]);
        }
    }
    
    const handlePhoto = (event:React.ChangeEvent<{files: unknown}>) => {
        setPhoto(event.target.files[0]);
    }

    const saveUserdata = (user:firebase.User, fullPath:string) => {
        user.updateProfile({
            displayName: username,
            photoURL   : fullPath,
        })
        .then(() => {
            console.log("save userdata success!!");
        })
        .catch(error => {
            console.log(error);
        });
    }

    const handleSaveUserData = async() => {
        if (UMessage[0] === "OK!!") {
            setDisable(true);
            const bool = await signinAnonymous();
            if (bool) {
                if (await activeUserExist()) {
                    const user = await getActiveUser();
                    if (photo) {
                        const [bool, fullPath] = await saveUserImage(photo, user.uid);
                        if (bool) {
                            const [url, ] = await getUserImageUrl(fullPath);
                            saveUserdata(user, url);
                        }
                    } else {
                        saveUserdata(user, "");
                    }
                    await activeUserExist();
                    const path = location.pathname.split("/setting")[0]
                    router.push("/chatroom/[roomid]", path);
                } else {
                    alert("不具合でログインしていない状態になっているようです。もう一度登録処理からお願いします。");
                    setDisable(false);
                }
            } else {
                alert("不具合でログインしていない状態になっているようです。もう一度登録処理からお願いします。");
                setDisable(false);
            }
        }
    }

    return (
        <div>
            <BasicHead />

            <main>
                <div className={ Styles.title }>
                    <TitleLogo />
                </div>
                <div className={ Styles.box }>
                    <ContainerDiv>
                        <div className={ Styles.register }>
                            <BasicH2>ユーザー設定</BasicH2>
                        </div>
                        <div　className={ Styles.paragraph }>
                            <BasicParagraph>
                                まず、ここでユーザネームとプロフィール写真を設定してください。ユーザネームは必ず指定してください。
                            </BasicParagraph>
                        </div>

                        <div className={ Styles.innerbox }>
                            <BasicTextField
                                label     ="username"
                                value     ={ username }
                                onchange  ={ handleUsernameChange }
                                fullWidth ={ true }
                            />
                            <div style={{color: UMessage[1] }}>
                                <BasicParagraph>
                                    { UMessage[0] }
                                </BasicParagraph>
                            </div>
                        </div>

                        <div className={ Styles.innerbox }>
                            <BasicButton  
                                fullWidth ={ true } 
                            >
                                <input 
                                    id        = "photoFile"
                                    type      ="file"
                                    accept    ="image/*"
                                    className ={ Styles.inputFile }
                                    onChange  ={ handlePhoto }
                                />
                            </BasicButton>
                        </div>

                        <div className={ Styles.innerbox }>
                            <BasicButton
                                fullWidth ={ true }
                                disabled  ={ disable }
                                onclick   ={ handleSaveUserData }
                            >
                                登録
                            </BasicButton>
                        </div>
                    </ContainerDiv>
                </div>
            </main>
        </div>
    );
}
