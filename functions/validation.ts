/**
 * メールアドレスのバリデーションチェック関数
 * 真偽を返す。
 * @param value email address
 */
export const validationEmail = (value:string):boolean => {
    let bool:boolean = false;
    const reg = /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/;
    if (reg.test(value)) {
        bool = true;
    }
    return bool;
}

/**
 * パスワードのバリデーションチェック関数
 * パスワードは半角のアルファベット・数字をそれぞれ１文字以上を含む８文字以上100文字以内で指定
 * 真偽を返す。
 * @param value password
 */
export const validationPassword = (value:string):boolean => {
    let bool:boolean = false;
    const reg = /^(?=.*?[a-z])(?=.*?\d)[a-z\d]{8,100}$/i;
    if (reg.test(value)) {
        bool = true;
    }
    return bool;
}

/**
 * ユーザネームのバリデーションチェック関数
 * ユーザネームは１文字以上で指定する。
 * 真偽を返す。
 * @param value username
 */
export const validationUsername = (value:string):boolean => {
    let bool:boolean = false;
    if (value.length >= 1) {
        bool = true;
    }
    return bool;
}