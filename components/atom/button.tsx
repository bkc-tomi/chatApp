import {Button, makeStyles } from "@material-ui/core";
import { FC } from "react";
import { themeColor, Shadow } from "./styles";

const buttonStyles = makeStyles({
    root: {
        color: themeColor.textWhite,
        background: themeColor.bgGrad,
        paddingLeft: "30px",
        paddingRight: "30px",
        margin: "0px 5px",
        boxShadow: Shadow.style2,
        "&:hover": {
            background: themeColor.bgGrad,
            boxShadow: Shadow.style3,
        },
    }
})

type BtnProps = {
    onclick: Function,
    children?: React.ReactNode,
}

const BasicButton:FC<BtnProps> = (props) => {
    const classes = buttonStyles();
    return (
        <Button
            variant="contained"
            onClick={ () => props.onclick() }
            classes={{
                root: classes.root
            }}
        >
            { props.children }
        </Button>
    );
}

export default BasicButton;