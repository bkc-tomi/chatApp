import { useState, useEffect } from "react";

import BasicHead from "../../components/atom/head";
import TitleLogo from "../../components/atom/logo";
import BasicButton from "../../components/atom/button";
import BasicParagraph from "../../components/atom/basicP";
import ContainerDiv from "../../components/atom/containerDiv";
import SearchBox from "../../components/compo/searchBox";
import UserField from "../../components/compo/userField";

import Styles from "../../styles/profile.module.css";

import { getActiveUser, activeUserExist } from "../../functions/auth";

export default function Profile() {
    const [user, setUser] = useState<firebase.User>();

    const getUserData = async() => {
        if (await activeUserExist()) {
            const temp = getActiveUser();
            setUser(temp);
        }
    }

    useEffect(() => {
        getUserData();
    }, [getUserData, setUser]);


    return (
        <div>
            <BasicHead />
            <main>
                <div className={ Styles.title }>
                    <TitleLogo />
                </div>

                <div　className={ Styles.maincontainer }>
                    <ContainerDiv>
                            <BasicButton
                                fullWidth={ true }
                            >
                                チャットルームを作成
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
