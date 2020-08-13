import { makeStyles, createStyles } from "@material-ui/core";
import { FC } from "react";
import { themeColor } from "./styles";
import MediaQuery from "react-responsive";

const containerStyles = makeStyles(() => createStyles({
    container: {
        color: themeColor.textBlack,
        fontSize: "20px",
    },
    spContainer: {
        color: themeColor.textBlack,
        fontSize: "16px",
    },
}));

type ParagraphProps = {
    children?: React.ReactNode,
}

const BasicParagraph:FC<ParagraphProps> = (props) => {
    const classes = containerStyles();
    return (
        <div>
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