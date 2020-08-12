import BasicHead from "../components/atom/head";
import basicData from "../components/atom/basicData";

// firebaseを試すために読み込む
import { useState } from "react";
import { setData, getData } from "../functions/databaseFunctions";


export default function Home() {
    // 入力されたテキスト
    const [text, setText]       = useState("");
    // DBに保存した結果の表示
    const [message, setMessage] = useState("");
    // DBに保存するテキストのリスト
    const [texts, setTexts]     = useState<string[]>([]);
    // DBから読み込んだデータのリスト(textsと一致する)
    const [datas, setDatas]     = useState([]);

    // 入力された文字を変数textに反映
    const handleChange = (event:React.ChangeEvent<HTMLInputElement>) => {
        setText(event.target.value);
    }

    // DBに保存を実行
    const handleClick = async() => {
        const tempTexts = [...texts];
        tempTexts.push(text);
        setTexts(tempTexts);
        const msg = await setData(tempTexts);
        setMessage(`${msg}: ${text}`);
    }

    // DBからデータを読み込む
    const reloadData = async() => {
        const tempData = await getData();
        console.log(tempData);
        setDatas(tempData.texts);
    }

    return (
        <div>
            <BasicHead />
            <h1>{ basicData.title }</h1>
            <input 
                type="text" 
                value={ text } 
                onChange={ handleChange }
            />
            <button 
                type="button"
                onClick={ handleClick }
            >保存</button>
            <button 
                type="button"
                onClick={ reloadData }
            >リロード</button>
            <p>{ message }</p>
            <ul>
                { datas.map((data, index) => (
                    <li key={ index }>{ data }</li>
                ))}
            </ul>
        </div>
    );
}