import { useState, useEffect } from "react";

import BasicHead from "../../components/atom/head";
import TitleLogo from "../../components/atom/logo";
import BasicParagraph from "../../components/atom/basicP";

import Styles from "../../styles/profile.module.css";

import { getActiveUser } from "../../functions/auth";

export default function Profile() {
    const [user, setUser] = useState<firebase.User>();

    useEffect(() => {
        const temp = getActiveUser();
        setUser(temp);
    },[user]);

    return (
        <div>
            <BasicHead />
            <main>
                <div className={ Styles.title }>
                    <TitleLogo />
                </div>
                <BasicParagraph>
                    { user?.displayName || "no user" }
                </BasicParagraph>
                <img src={ user?.photoURL } />
            </main>
        </div>
    );
}
