import { FC, useState } from "react";
import BasicTextField from "../atom/textbox";
import BasicButton from "../atom/button";
import { makeStyles, createStyles } from "@material-ui/core";
import { themeColor } from "../atom/styles";

const useStyles = makeStyles(() => createStyles({
    container: {
        width: "100%",
    },
    textfield: {
        position: "relative",
        display: "inline-block",
        boxSizing: "border-box",
        width: "70%",
    },
    btnBox: {
        position: "relative",
        display: "inline-block",
        width: "30%",
        textAlign: "center",
        top: "18px",
    }
}));

const SearchBox:FC = () => {
    const classes = useStyles();
    const [word, setWord] = useState("");

    const handleChangeWord = (event:React.ChangeEvent<{ value: unknown }>) => {
        setWord(event.target.value as string);
    }

    // 検索ワードを元に部分一致するチャットルームをfirebaseから検索して表示する関数
    const searchRoomFromFirebase = () => {
        alert("searching");
    }
    return (
        <div className={ classes.container }>
            <div className={classes.textfield }>
                <BasicTextField
                    label="チャットルームを検索"
                    value={ word }
                    onchange={ handleChangeWord }
                    fullWidth={ true }
                />
            </div>

            <div className={ classes.btnBox }>
                <div>
                    <BasicButton
                        onclick={ searchRoomFromFirebase }
                    >
                        検索
                    </BasicButton>
                </div>
            </div>
        </div>
    );
}

export default SearchBox;