import { FC } from "react";
import { useRouter } from "next/router";
import BasicButton from "../atom/button";
import { makeStyles, createStyles } from "@material-ui/core";
import { getActiveUser } from "../../functions/auth";
import { deleteFirestoreChatroom } from "../../functions/database";
import { deleteUserImage } from "../../functions/storage";

const useStyles = makeStyles(() => createStyles({
    pos: {
        position: "fixed",
        top: "10px",
        right: "10px",
        zIndex: 10000,
    }
}))

const SignoutButton:FC = () => {
    const classes = useStyles();
    const router = useRouter();

    const slicePhotoURL = (photoURL:string) => {
        const split1 = photoURL.split("/userPhoto%2F");
        const split2 = split1[1].split("?alt");
        const imagePath = "userPhoto/" + split2[0];
        // 正規表現で該当する全ての文字を置き換える。
        const replaced = imagePath.replace(/%20/g, ' ');
        return replaced;
    }

    const handleSignout = async() => {
        const user = getActiveUser();
        // チャットルームの削除
        const chatroomb = await deleteFirestoreChatroom(user.uid);
        // ユーザアイコンの削除
        const photoURL = user.photoURL;
        if (photoURL) {
            const imagePath = slicePhotoURL(photoURL);
            console.log(imagePath);
            const userImageb = await deleteUserImage(imagePath);
        }
        
        user.delete()
        .then(() => {
            router.push("/");
        })
        .catch(error => {
            console.log(error);
            router.push("/");
        })
        /**

         * userIDの削除とログアウト
         */
    }
    return (
        <div className={ classes.pos }>
            <BasicButton
                onclick={ handleSignout }
            >
                ログアウト
            </BasicButton>
        </div>
    );
}

export default SignoutButton;