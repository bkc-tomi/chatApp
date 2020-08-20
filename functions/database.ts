import { FBdb } from "./firebase";

// firestoreから読み込み
export const getData = async() => {
    const data = await FBdb.collection("foo").doc("bar").get()
    .then(result => {
        return result.data();
    });
    return data;
}

export type ChatType = {
    text:     string,
    date:     string,
    username: string,
    photoURL: string,
}

export type ChatroomType = {
    owner:  string,
    member: string[],
    chats:  ChatType[],
}

/**
 * firestoreにチャットルームを保存する。
 * 保存の成功・失敗ごとにメッセージを返す。
 * @param chatroom :chatroomオブジェクトを指定
 */
export const setChatroomToFirestore = async(chatroom:ChatroomType):Promise<string> => {
    const doc:string = chatroom.owner;
    const msg:string = await FBdb.collection("chatrooms").doc(doc).set({
        owner:  chatroom.owner,
        member: chatroom.member,
        chats:  chatroom.chats,
    })
    .then(() => {
        return "set chatroom successfully!";
    })
    .catch(() => {
        return "set chatroom failed.";
    });
    return msg;
}

/**
 * firestoreから指定されたchatroomオブジェクトを取ってくる。
 * 成功したらオブジェクトを返す。
 * 保存の成功・失敗ごとにメッセージを返す。
 * @param doc :username+uidを指定
 */
export const getChatroomFromFirestore = async(doc:string):Promise<[string, any]> => {
    let chatroom = {};
    const msg:string = await FBdb.collection("chatrooms").doc(doc).get()
    .then(result => {
        chatroom = {
            owner: result.data().owner,
            member: result.data().member,
            chats: result.data().chats,
        }
        return "get chatroom successfully!";
    })
    .catch(error => {
        return "get chatroom failed.";
    });
    return [msg, chatroom];
}