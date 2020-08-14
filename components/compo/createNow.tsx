import { FC } from "react";
import BasicParagraph from "../atom/basicP";
import { makeStyles, createStyles } from "@material-ui/core";
import { themeColor } from "../atom/styles";

const styles = makeStyles(() => createStyles({
    color:{
        color: themeColor.sub,
    }
}))
const CreateNow:FC = () => {
    const classes = styles();
    return (
        <BasicParagraph>
            <div className={ classes.color }>
                ただいまこのアプリは作成中です。
                <br/>
                もうしばらく、お待ちください。
            </div>
        </BasicParagraph>
    );
}

export default CreateNow;