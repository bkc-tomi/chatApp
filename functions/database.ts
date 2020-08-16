import { FBdb } from "./firebase";

// firestoreに書き込み
export const setData = async(texts: string[]):Promise<string> => {
    const message:string = await FBdb.collection("foo").doc("bar").set({
        texts: texts
    })
    .then(() => {
        return "set data successfully!";
    })
    .catch(() => {
        return "error has occured!";
    });
    return message;
}

// firestoreから読み込み
export const getData = async() => {
    const data = await FBdb.collection("foo").doc("bar").get()
    .then(result => {
        return result.data();
    });
    return data;
}