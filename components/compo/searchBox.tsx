import { FC, useState } from "react";
import { useRouter } from "next/router";
import BasicParagraph from "../atom/basicP";
import BasicTextField from "../atom/textbox";
import BasicButton from "../atom/button";
import { makeStyles, createStyles } from "@material-ui/core";
import { getChatroomListWithUsername } from "../../functions/database";

const useStyles = makeStyles(() => createStyles({
    container: {
        width: "100%",
    },
    textfield: {
        position: "relative",
        display: "inline-block",
        boxSizing: "border-box",
        width: "75%",
    },
    btnBox: {
        position: "relative",
        display: "inline-block",
        width: "25%",
        textAlign: "center",
        top: "18px",
    },
    ulStyle: {
        listStyle: "none",
        padding: "0",
    }
}));

const SearchBox:FC = () => {
    const classes = useStyles();
    const router  = useRouter();

    const [searchWord, setSearchWord] = useState("");
    const [rooms, setRooms] = useState([]);

    const handleChangeWord = (event:React.ChangeEvent<{ value: unknown }>) => {
        setSearchWord(event.target.value as string);
    }

    const searchChatroom = async() => {
        const roomList = await getChatroomListWithUsername(searchWord);
        setRooms(roomList);
    }

    const searchResult = () => {
        if (rooms.length === 0) {
            return (
                <ul className={ classes.ulStyle }>
                    <li>
                        <BasicButton
                            fullWidth={ true }
                            onclick={() => router.push("/chatroom/[roomid]", `/chatroom/owner`) }
                        >
                            開発者のチャットルーム:感想・要望など
                        </BasicButton>
                    </li>
                </ul>
            );
        }
        return (
            <ul className={ classes.ulStyle }>
                <li>
                    <BasicButton
                        fullWidth={ true }
                        onclick={() => router.push("/chatroom/[roomid]", `/chatroom/owner`) }
                    >
                        開発者のチャットルーム:感想・要望など
                    </BasicButton>
                </li>
                { rooms.map((room, index) => {
                    return (
                        <li key={ index }>
                            <BasicButton
                                fullWidth={ true }
                                onclick={() => router.push("/chatroom/[roomid]", `/chatroom/${room.id}`) }
                            >
                                { room.owner　+ ": " + room.id }
                            </BasicButton>
                        </li>
                    );
                })}
            </ul>
        );
    }
    
    return (
        <div className={ classes.container }>
            <div className={classes.textfield }>
                <BasicTextField
                    label="チャットルームを検索"
                    value={ searchWord }
                    onchange={ handleChangeWord }
                    fullWidth={ true }
                />
            </div>

            <div className={ classes.btnBox }>
                <div>
                    <BasicButton
                        fullWidth={ true }
                        onclick={ searchChatroom }
                    >
                        検索
                    </BasicButton>
                </div>
            </div>
            <div>
                <br />
                <BasicParagraph>検索結果</BasicParagraph>
                { searchResult() }
            </div>
        </div>
    );
}

export default SearchBox;