import { getActiveUser } from "./auth";
import { deleteFirestoreChatroom } from "./database";
import { deleteUserImage } from "./storage";

export const scrollBottom = () => {
    const element = document.documentElement;
    const bottom = element.scrollHeight - element.clientHeight;
    window.scroll(0, bottom);
}

export const slicePhotoURL = (photoURL:string) => {
    const split1 = photoURL.split("/userPhoto%2F");
    const split2 = split1[1].split("?alt");
    const imagePath = "userPhoto/" + split2[0];
    // 正規表現で該当する全ての文字を置き換える。
    const replaced = imagePath.replace(/%20/g, ' ');
    return replaced;
}

export const logoutProcess = async() => {
    const result = window.confirm("ログアウトするとこのアカウントに関わる情報は削除されます。よろしいですか？");
    if (result) {
        const user = getActiveUser();
        if (user) {
            // チャットルームの削除
            const chatroomb = await deleteFirestoreChatroom(user.uid);
            // ユーザアイコンの削除
            const photoURL = user.photoURL;
            if (photoURL) {
                const imagePath = slicePhotoURL(photoURL);
                console.log(imagePath);
                const userImageb = await deleteUserImage(imagePath);
            }
            // ユーザアカウントの削除
            user.delete()
            .then(() => {
                console.log("success!");
            })
            .catch(error => {
                console.log(error);
            });
        }
    }
}