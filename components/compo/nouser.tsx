import { FC } from "react";
import { useRouter } from "next/router";
import BasicButton from "../atom/button";
import BasicH2 from "../atom/basicH2";

const NoUser:FC = () => {
    const router = useRouter();
    return (
        <div>
            <BasicH2>
                ログインしてください！
            </BasicH2>
            <BasicButton
                onclick   ={() => router.push("/") }
            >
                ホームに戻る
            </BasicButton>
        </div>
    );
}

export default NoUser;