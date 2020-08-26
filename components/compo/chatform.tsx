import { FC, useState } from "react";

import BasicTextField from "../atom/textbox";
import ContainerDiv from "../atom/containerDiv";
import BasicButton from "../atom/button";
import { makeStyles, createStyles } from "@material-ui/core";

import { setChatToFirestore, ChatType } from "../../functions/database";

const useStyles = makeStyles(() => createStyles({
    span: {
        height: "5px",
    }
}))

type Props = {
    roomid: string,
    user: firebase.User,
}

const ChatForm:FC<Props> = (props) => {
    const classes = useStyles();
    const [text, setText] = useState("");

    const handleChangeText = (event:React.ChangeEvent<{ value: unknown }>) => {
        setText(event.target.value as string);
    }

    const handleSendMessage = async() => {
        const date = Date.now();
        const chat:ChatType = {
            text: text,
            uid: props.user.uid,
            date: date,
            username: props.user.displayName,
            photoURL: props.user.photoURL,
        }
        const bool = await setChatToFirestore(props.roomid, chat);
        if (bool) {
            console.log("set data successfully!");
            setText("");
        }
    }
    
    return (
        <div>
            <ContainerDiv
                fullwidth={ true }
            >
                    <BasicTextField
                        label="メッセージ"
                        value={ text }
                        onchange={ handleChangeText }
                        multiline={ true }
                        fullWidth={ true }
                        rows={ 3 }
                        variant={ "outlined" }
                    />
                    <div className={ classes.span }></div>
                    <BasicButton
                        fullWidth={ true }
                        onclick={ handleSendMessage }
                    >
                        送る
                    </BasicButton>
            </ContainerDiv>
        </div>
    );
}

export default ChatForm;