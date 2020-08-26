import { FC } from "react";
import ContainerDiv from "../atom/containerDiv";
import BasicParagraph from "../atom/basicP";
import UserIcon from "../atom/userIcon";

import { ChatType } from "../../functions/database";

import { makeStyles, createStyles } from "@material-ui/core";

const useStyles = makeStyles(() => createStyles({
    container: {
        display: "inline-block",
        marginTop: "1rem",
        marginBottom: "1rem",
        width: "97%",
        height: "auto",
        boxSizing: "border-box",
    },
    pContainer: {
        width: "calc(100% - 100px)",
        float: "left",
        boxSizing: "border-box",
    },
    userArea: {
        width: "100px",
        float: "left",
        textAlign: "center",
    },
    date: {
        marginTop: "10px",
        float: "right",
    },
}));

type Props = {
    chat: ChatType,
    who: "me" | "you",
}
/**
 * ユーザアイコン、チャットの内容を表示するコンポーネント
 * @param param0 
 */
const ChatBalloon:FC<Props> = ({
    chat, who
}) => {
    const classes = useStyles();

    const date    = new Date(chat.date);
    if (who === "you") {
        return (
            <div className={ classes.container }>
            <div className={ classes.userArea }>
                <UserIcon
                    image={ chat.photoURL }
                    alt  ={ chat.username }
                    width={ 70 }
                    height={ 70 }
                />
                { chat.username }
            </div>

            <div className={ classes.pContainer }>
                <ContainerDiv
                    fullwidth={ true }
                >
                    <BasicParagraph>
                        { chat.text }
                    </BasicParagraph>
                </ContainerDiv>
                <div className={ classes.date }>
                    <BasicParagraph>
                        { date.toLocaleString() }
                    </BasicParagraph>
                </div>
            </div>
        </div>
        );
    }
    return (
        <div className={ classes.container }>
            <div className={ classes.pContainer }>
                <ContainerDiv
                    fullwidth={ true }
                >
                    <BasicParagraph>
                        { chat.text }
                    </BasicParagraph>
                </ContainerDiv>
                <div className={ classes.date }>
                    <BasicParagraph>
                        { date.toLocaleString() }
                    </BasicParagraph>
                </div>
            </div>
            <div className={ classes.userArea }>
                <UserIcon
                    image={ chat.photoURL }
                    alt  ={ chat.username }
                    width={ 70 }
                    height={ 70 }
                />
                { chat.username }
            </div>
        </div>
    );
}

export default ChatBalloon;