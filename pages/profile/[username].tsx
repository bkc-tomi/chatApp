import BasicHead from "../../components/atom/head";
import TitleLogo from "../../components/atom/logo";
import BasicH2 from "../../components/atom/basicH2";
import BasicParagraph from "../../components/atom/basicP";
import BasicTextField from "../../components/atom/textbox";
import BasicButton from "../../components/atom/button";
import ContainerDiv from "../../components/atom/containerDiv";

import Styles from "../../styles/profile.module.css";

export default function Profile() {
    return (
        <div>
            <BasicHead />
            <main>
                <div className={ Styles.title }>
                    <TitleLogo />
                </div>
            </main>
        </div>
    );
}