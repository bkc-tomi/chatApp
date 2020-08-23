"use strict";
exports.__esModule = true;
var chatballoon_1 = require("./chatballoon");
var core_1 = require("@material-ui/core");
var useStyles = core_1.makeStyles(function () { return core_1.createStyles({
    container: {}
}); });
/**
 * 一つ一つの書き込みを順番に表示する領域
 * @param param0
 */
var ChatContainer = function (_a) {
    var chats = _a.chats, user = _a.user;
    var classes = useStyles();
    return (React.createElement("div", { className: classes.container }, chats.map(function (chat) {
        if (chat.uid === user) {
            return (React.createElement(chatballoon_1["default"], { chat: chat, who: "me" }));
        }
        else {
            return (React.createElement(chatballoon_1["default"], { chat: chat, who: "you" }));
        }
    })));
};
exports["default"] = ChatContainer;
