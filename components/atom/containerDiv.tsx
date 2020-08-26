import { makeStyles, createStyles } from "@material-ui/core";
import { FC } from "react";
import { themeColor, Shadow } from "./styles";

const containerStyles = makeStyles(() => createStyles({
    container: {
        position: "relative",
        display: "inline-block",
        padding: "0.5rem",
        borderRadius: "5px",
        margin: "0rem",
        background: themeColor.bgWhite,
        boxShadow: Shadow.style3,
        boxSizing: "border-box",
    }
}));

type ContainerProps = {
    children?: React.ReactNode,
    fullwidth?: boolean,
}

const ContainerDiv:FC<ContainerProps> = (props) => {
    const classes = containerStyles();
    if (props.fullwidth) {
        return (
            <div 
                className={ classes.container }
                style={{ width: "100%" }}
            >
                { props.children }
            </div>
        );
    }
    return (
        <div 
            className={ classes.container }
        >
            { props.children }
        </div>
    );
}

export default ContainerDiv;