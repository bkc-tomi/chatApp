import { makeStyles, createStyles } from "@material-ui/core";
import { FC } from "react";
import { themeColor } from "./styles";
import MediaQuery from "react-responsive";

const containerStyles = makeStyles(() => createStyles({
    inlineBlock: {
        display: "inline-block",
    },
    container: {
        display: "inline-block",
        fontSize: "28px",
        fontWeight: "bold",
    },
    spContainer: {
        display: "inline-block",
        fontSize: "24px",
        fontWeight: "bold",
    },
}));

type HeaderProps = {
    children?: React.ReactNode,
}

const BasicHeader2:FC<HeaderProps> = (props) => {
    const classes = containerStyles();
    return (
        <div className={ classes.inlineBlock }>
            <div className={ classes.inlineBlock }>
            <MediaQuery query="(min-width: 768px)">
                <div className={ classes.container }>
                    { props.children }
                </div>
            </MediaQuery>
            <MediaQuery query="(max-width: 767px)">
                <div className={ classes.spContainer }>
                    { props.children }
                </div>
            </MediaQuery>
        </div>
        </div>
    );
}

export default BasicHeader2;