import { useState } from "react";
import { useRouter } from "next/router";

import BasicHead from "../components/atom/head";
import TitleLogo from "../components/atom/logo";
import BasicH2 from "../components/atom/basicH2";
import BasicParagraph from "../components/atom/basicP";
import BasicButton from "../components/atom/button";
import ContainerDiv from "../components/atom/containerDiv";

import basicData from "../components/atom/basicData";

import Styles from "../styles/signin.module.css";

import { signinAnonymous } from "../functions/auth";


export default function SignIn() {
    const router = useRouter();
    const [ disable, setDisable ] = useState(false);

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