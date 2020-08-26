import { FC } from "react";
import UserIcon from "../atom/userIcon";
import BasicParagraph from "../atom/basicP";
import { createStyles, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => createStyles({
    container: {
        textAlign: "center",
    },
    username: {
        textAlign: "center",
    }
}));

type UF = {
    user:    firebase.User,
    width?:  number,
    height?: number,
}

const UserField:FC<UF> = ({
    user, width, height,
}) => {
    const classes = useStyles();
    return (
        <div className={ classes.container }>
            <div >
                <UserIcon
                    image  ={ user?.photoURL || "/static/default-user-image.png" }
                    alt    ="user icon"
                    width  ={ width }
                    height ={ height }
                    />
            </div>

            <div className={ classes.username }>
                <BasicParagraph>
                    { user?.displayName || "no user" }
                </BasicParagraph>
            </div>
        </div>
    );
}

export default UserField;