import { makeStyles, createStyles } from "@material-ui/core";
import { FC } from "react";
import { themeColor, Shadow } from "./styles";

const containerStyles = makeStyles(() => createStyles({
    container: {
        display: "inline-block",
        padding: "0.5rem",
        borderRadius: "5px",
        margin: "0.5rem",
        background: themeColor.bgWhite,
        boxShadow: Shadow.style1
    }
}))

type ContainerProps = {
    children?: React.ReactNode,
}

const ContainerDiv:FC<ContainerProps> = (props) => {
    const classes = containerStyles();
    return (
        <div className={ classes.container }>
            { props.children }
        </div>
    );
}

export default ContainerDiv;