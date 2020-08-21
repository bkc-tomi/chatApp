import { FBstorage } from "./firebase";

export const saveUserImage = async(image, uid:string):Promise<[boolean, string]> => {
    const fullPath = "userPhoto/" + uid + image.name;
    const ImageRef = FBstorage.ref().child(fullPath);
    let bool:boolean;
    await ImageRef.put(image)
    .then(() => {
        bool = true;
    })
    .catch(error => {
        console.log(error);
        bool = false;
    });
    return [bool, fullPath];
}

export const getUserImageUrl = async(imagePath:string):Promise<[any, boolean]> => {
    let Url:any, bool = false;
    const ImageRef = FBstorage.ref();
    await ImageRef.child(imagePath).getDownloadURL()
    .then(url => {
        Url = url;
        bool = true;
    });
    return [Url, bool]
}

/**
 * 取得したパスの画像をfire storageから削除する。
 * 成功したらtrue, 失敗したらfalseを返す。
 * @param imagePath 
 */
export const deleteUserImage = async(imagePath:string):Promise<boolean> => {
    const ImageRef = FBstorage.ref().child(imagePath);

    let bool:boolean = false;
    ImageRef.delete()
    .then(() => {
        bool = true;
    })
    .catch(error => {
        console.log(error);
        bool = false;
    });
    return bool;
}