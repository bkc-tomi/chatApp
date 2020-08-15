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
        fontSize: "16px",
    },
    spContainer: {
        display: "inline-block",
        fontSize: "12px",
    },
}));

type ParagraphProps = {
    children?: React.ReactNode,
}

const BasicParagraph:FC<ParagraphProps> = (props) => {
    const classes = containerStyles();
    return (
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
    );
}

export default BasicParagraph;