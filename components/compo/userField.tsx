import { FC } from "react";
import UserIcon from "../atom/userIcon";
import BasicH2 from "../atom/basicH2";
import { createStyles, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => createStyles({
    container: {
        position: "fixed",
        bottom: "10px",
        right: "10px",
        textAlign: "center",
        zIndex: 10000,
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
                <BasicH2>
                    { user?.displayName || "no user" }
                </BasicH2>
            </div>
        </div>
    );
}

export default UserField;