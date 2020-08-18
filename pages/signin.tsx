import { useState } from "react";
import { useRouter } from "next/router";

import BasicHead from "../components/atom/head";
import TitleLogo from "../components/atom/logo";
import BasicH2 from "../components/atom/basicH2";
import BasicParagraph from "../components/atom/basicP";
import BasicTextField from "../components/atom/textbox";
import BasicButton from "../components/atom/button";
import ContainerDiv from "../components/atom/containerDiv";

import basicData from "../components/atom/basicData";

import Styles from "../styles/signin.module.css";

import { validationEmail, validationPassword } from "../functions/validation";
import { signinUser, signinWithGoogle, signinWithTwitter, signinAnonymous, getActiveUser } from "../functions/auth";


export default function SignIn() {
    const router = useRouter();
    const [email   , setEmail]    = useState("");
    const [password, setPassword] = useState("");
    const [ disable, setDisable ] = useState(false);

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

    const handleSignin = async() => {
        setDisable(true);
        if (emailMessage[0] === "OK!!" && passwordMessage[0] === "OK!!") {
            const bool:boolean = await signinUser(email, password);
            if (bool) {
                console.log("successfully!");
                const activeUser = await getActiveUser()
                router.push("/profile/[username]", `/profile/${ activeUser.displayName }`);
            } else {
                console.log("failed.");
            }
            setDisable(false);
        } else {
            alert("メールアドレス・パスワードを入力してください。");
            setDisable(false);
        }
    }
    
    const handleSigninWithGoogle = async() => {
        setDisable(true);
        const bool:boolean = await signinWithGoogle();
        if (bool) {
            console.log("successfully!");
            const activeUser = await getActiveUser()
            router.push("/profile/[username]", `/profile/${ activeUser.displayName }`);
        } else {
            console.log("failed.");
        }
        setDisable(false);
    }

    const handleSigninWithTwitter = async() => {
        setDisable(true);
        const bool:boolean = await signinWithTwitter();
        if (bool) {
            console.log("successfully!");
            const activeUser = await getActiveUser()
            router.push("/profile/[username]", `/profile/${ activeUser.displayName }`);
        } else {
            console.log("failed.");
        }
        setDisable(false);
    }

    const handleSigninAnonymous = async() => {
        setDisable(true);
        const bool:boolean = await signinAnonymous();
        if (bool) {
            console.log("successfully!");
            router.push("/profile/setting");
        } else {
            console.log("failed.");
        }
        setDisable(false);
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
                                { basicData.signin }
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
                            fullWidth ={ true }
                            disabled  ={ disable }
                            onclick   ={ handleSignin }
                        >
                            ログイン
                        </BasicButton>
                        </div>
                        <div className={ Styles.innerbox }>
                        <BasicButton
                            fullWidth ={ true }
                            disabled  ={ disable }
                            onclick   ={ handleSigninWithGoogle }
                        >
                            Googleでログイン
                        </BasicButton>
                        </div>
                        <div className={ Styles.innerbox }>
                        <BasicButton
                            fullWidth ={ true }
                            disabled  ={ disable }
                            onclick   ={ handleSigninWithTwitter }
                        >
                            Twitterでログイン
                        </BasicButton>
                        </div>
                        <div className={ Styles.innerbox }>
                        <BasicButton
                            fullWidth ={ true }
                            disabled  ={ disable }
                            onclick   ={ handleSigninAnonymous }
                        >
                            匿名ログイン
                        </BasicButton>
                        </div>
                    </ContainerDiv>
                </div>
            </main>
        </div>
    );
}