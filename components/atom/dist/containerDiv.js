"use strict";
exports.__esModule = true;
var core_1 = require("@material-ui/core");
var styles_1 = require("./styles");
var containerStyles = core_1.makeStyles(function () { return core_1.createStyles({
    container: {
        position: "relative",
        display: "inline-block",
        padding: "0.5rem",
        borderRadius: "5px",
        margin: "0rem",
        background: styles_1.themeColor.bgWhite,
        boxShadow: styles_1.Shadow.style3,
        boxSizing: "border-box"
    }
}); });
var ContainerDiv = function (props) {
    var classes = containerStyles();
    if (props.fullwidth) {
        return (React.createElement("div", { className: classes.container, style: { width: "100%" } }, props.children));
    }
    return (React.createElement("div", { className: classes.container }, props.children));
};
exports["default"] = ContainerDiv;
