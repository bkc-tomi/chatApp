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