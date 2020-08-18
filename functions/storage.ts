import { FBstorage } from "./firebase";

export const saveUserImage = async(image, uid:string):Promise<[boolean, string]> => {
    const fullPath = "userPhoto/" + uid + image.name;
    const userImageRef = FBstorage.ref().child(fullPath);
    let bool:boolean;
    await userImageRef.put(image)
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