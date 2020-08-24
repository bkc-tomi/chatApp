import { FC, useEffect } from "react";

import { ChatType } from "../../functions/database";
import ChatBalloon from "./chatballoon";
import { makeStyles, createStyles } from "@material-ui/core";
import { FBdb } from "../../functions/firebase";

const useStyles = makeStyles(() => createStyles({
    container: {
        
    }
}))

type Props = {
    chats: ChatType[],
    user:  string,
    roomid: string,
}

/**
 * 一つ一つの書き込みを順番に表示する領域
 * @param param0 
 */
const ChatContainer:FC<Props> = ({ chats, user, roomid }) => {
    const classes = useStyles();

    useEffect(() => {
        const unsubscribe = FBdb.collection("chatrooms").doc(roomid).collection("chats")
        .onSnapshot(snapshots => {
            snapshots.docChanges().forEach(change => {
                console.log(change.doc.data());
            });
        }, error => {
            console.log(error);
        });
        return () => unsubscribe();

    }, []);

    return (
        <div className={ classes.container }>
            { chats.map((chat, index) => {
                if (chat.uid === user) {
                    return (
                        <ChatBalloon 
                            chat ={ chat }
                            who  ={ "me" }
                            key  ={ index }
                        />
                    );
                } else {
                    return (
                        <ChatBalloon
                            chat ={ chat }
                            who  ={ "you" }
                            key  ={ index }
                        />
                    );
                }
            })}
        </div>
    );
}

export default ChatContainer;