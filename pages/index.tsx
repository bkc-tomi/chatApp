import BasicHead from "../components/atom/head";
import basicData from "../components/atom/basicData";

import BasicButton from "../components/atom/button";
import BasicTextField from "../components/atom/textbox";
import ContainerDiv from "../components/atom/containerDiv";
import BasicParagraph from "../components/atom/basicP";
import BasicHeader1 from "../components/atom/basicH1";
import BasicHeader2 from "../components/atom/basicH2";


export default function Home() {

    const handleClick = () => {

    }
    const handleChange = () => {

    }
    return (
        <div>
            <BasicHead />
            <BasicHeader1>
                { basicData.title }
            </BasicHeader1>
            <ContainerDiv>
                <BasicButton
                    onclick={ handleClick }
                >
                    Button
                </BasicButton>
                <BasicButton
                    onclick={ handleClick }
                >
                    ボタン
                </BasicButton>
            </ContainerDiv>
            <ContainerDiv>
                <BasicHeader2>this is header</BasicHeader2>
                <BasicParagraph>
                The text size can be set with a vw unit, which means the "viewport width".
                That way the text size will follow the size of the browser window:
                </BasicParagraph>
            </ContainerDiv>
            <br/>
            <BasicTextField 
                onchange={ handleChange }
                value={ "string" }
                label={ "text box"}
            />
        </div>
    );
}