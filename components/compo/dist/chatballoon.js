"use strict";
exports.__esModule = true;
var containerDiv_1 = require("../atom/containerDiv");
var basicP_1 = require("../atom/basicP");
var userIcon_1 = require("../atom/userIcon");
var core_1 = require("@material-ui/core");
var useStyles = core_1.makeStyles(function () { return core_1.createStyles({
    container: {
        display: "inline-block",
        marginTop: "1rem",
        marginBottom: "1rem",
        width: "97%",
        height: "auto",
        boxSizing: "border-box"
    },
    pContainer: {
        width: "calc(100% - 100px)",
        float: "left",
        boxSizing: "border-box"
    },
    userArea: {
        width: "100px",
        float: "left",
        textAlign: "center"
    },
    date: {
        marginTop: "10px",
        float: "right"
    }
}); });
/**
 * ユーザアイコン、チャットの内容を表示するコンポーネント
 * @param param0
 */
var ChatBalloon = function (_a) {
    var chat = _a.chat, who = _a.who;
    var classes = useStyles();
    var date = new Date(chat.date);
    if (who === "you") {
        return (React.createElement("div", { className: classes.container },
            React.createElement("div", { className: classes.userArea },
                React.createElement(userIcon_1["default"], { image: chat.photoURL, alt: chat.username, width: 70, height: 70 }),
                chat.username),
            React.createElement("div", { className: classes.pContainer },
                React.createElement(containerDiv_1["default"], { fullwidth: true },
                    React.createElement(basicP_1["default"], null, chat.text)),
                React.createElement("div", { className: classes.date },
                    React.createElement(basicP_1["default"], null, date.toLocaleString())))));
    }
    return (React.createElement("div", { className: classes.container },
        React.createElement("div", { className: classes.pContainer },
            React.createElement(containerDiv_1["default"], { fullwidth: true },
                React.createElement(basicP_1["default"], null, chat.text)),
            React.createElement("div", { className: classes.date },
                React.createElement(basicP_1["default"], null, date.toLocaleString()))),
        React.createElement("div", { className: classes.userArea },
            React.createElement(userIcon_1["default"], { image: chat.photoURL, alt: chat.username, width: 70, height: 70 }),
            chat.username)));
};
exports["default"] = ChatBalloon;
