import { FC } from "react";

import { ChatType } from "../../functions/database";
import ChatBalloon from "./chatballoon";
import { makeStyles, createStyles } from "@material-ui/core";

const useStyles = makeStyles(() => createStyles({
    container: {
        
    }
}))

type Props = {
    chats: ChatType[],
    user:  string,
}

/**
 * 一つ一つの書き込みを順番に表示する領域
 * @param param0 
 */
const ChatContainer:FC<Props> = ({ chats, user }) => {
    const classes = useStyles();
    return (
        <div className={ classes.container }>
            { chats.map(chat => {
                if (chat.uid === user) {
                    return (
                        <ChatBalloon 
                            chat ={ chat }
                            who  ={ "me" }
                        />
                    );
                } else {
                    return (
                        <ChatBalloon
                            chat ={ chat }
                            who  ={ "you" }
                        />
                    );
                }
            })}
        </div>
    );
}

export default ChatContainer;