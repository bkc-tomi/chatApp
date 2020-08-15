import { useState } from "react";

import BasicHead from "../components/atom/head";
import TitleLogo from "../components/atom/logo";
import BasicH2 from "../components/atom/basicH2";
import BasicParagraph from "../components/atom/basicP";
import BasicTextField from "../components/atom/textbox";
import BasicButton from "../components/atom/button";
import ContainerDiv from "../components/atom/containerDiv";

import Styles from "../styles/signin.module.css";

import { validationEmail, validationPassword } from "../functions/validation";


export default function SignIn() {
    const [email   , setEmail]    = useState("");
    const [password, setPassword] = useState("");

    const [emailMessage   , setEM] = useState(["メールアドレスを入力してください。", "#000000"]);
    const [passwordMessage, setPM] = useState(["パスワードは半角のアルファベット・数字をそれぞれ１文字以上を含む８文字以上１００文字以内です。", "#000000"]);

    const handleChangeEmail = (event:React.ChangeEvent<{ value: unknown }>) => {
        setEmail(event.target.value as string);
        if (validationEmail(event.target.value as string)) {
            setEM(["OK!!", "#55c501"]);
        } else { 
            setEM(["無効なメールアドレスです", "#ff0000"]);
        }
    }
    const handleChangePassword = (event:React.ChangeEvent<{ value: unknown }>) => {
        setPassword(event.target.value as string);
        if (validationPassword(event.target.value as string)) {
            setPM(["OK!!", "#55c501"]);
        } else {
            setPM(["パスワードは半角のアルファベット・数字をそれぞれ１文字以上を含む８文字以上１００文字以内です。", "#ff0000"]);
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
                            <BasicH2>ログイン</BasicH2>
                        </div>
                        <div　className={ Styles.paragraph }>
                            <BasicParagraph>
                                登録が済まれている方はこちらからログインしてください。
                            </BasicParagraph>
                        </div>
                        <div className={ Styles.innerbox }>
                        <BasicTextField
                            label     ="email"
                            value     ={ email }
                            onchange  ={ handleChangeEmail }
                            fullWidth ={ true }
                        />
                        <div style={{color: emailMessage[1]}}>
                            <BasicParagraph>
                                { emailMessage[0] }
                            </BasicParagraph>
                        </div>
                        </div>
                        <div className={ Styles.innerbox }>
                        <BasicTextField
                            label     ="password"
                            value     ={ password }
                            onchange  ={ handleChangePassword }
                            fullWidth ={ true }
                        />
                        <div style={{color: passwordMessage[1]}}>
                            <BasicParagraph>
                                { passwordMessage[0] }
                            </BasicParagraph>
                        </div>
                        </div>
                        <div className={ Styles.innerbox }>
                        <BasicButton
                            fullWidth={ true }
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