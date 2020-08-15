import {TextField, makeStyles } from "@material-ui/core";
import { FC } from "react";
import { themeColor } from "./styles";

const TextStyles = makeStyles({
    root: {
        margin: "0",
        "& .MuiInput-underline:after":{
            borderBottom: `2px solid ${ themeColor.main }`,
        },
        "& .MuiFormLabel-root.Mui-focused": {
            color: themeColor.main,
        }
    },
});

type TextProps = {
    disabled?: boolean,
    fullWidth?: boolean,
    label: string,
    multiline?: boolean,
    onchange: Function,
    value: string,
}

const BasicTextField:FC<TextProps> = (props) => {
    const classes = TextStyles();
    return (
        <TextField
            disabled={ props.disabled }
            fullWidth={ props.fullWidth }
            label={ props.label }
            multiline={ props.multiline }
            onChange={ (event:React.ChangeEvent<{ value: unknown }>) => props.onchange(event) }
            value={ props.value }
            classes={{
                root: classes.root,
            }}
        />
    );
}

export default BasicTextField;