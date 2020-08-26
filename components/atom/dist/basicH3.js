"use strict";
exports.__esModule = true;
var core_1 = require("@material-ui/core");
var react_responsive_1 = require("react-responsive");
var containerStyles = core_1.makeStyles(function () { return core_1.createStyles({
    inlineBlock: {
        display: "inline-block"
    },
    container: {
        display: "inline-block",
        fontSize: "20px",
        fontWeight: "bold"
    },
    spContainer: {
        display: "inline-block",
        fontSize: "16px",
        fontWeight: "bold"
    }
}); });
var BasicHeader3 = function (props) {
    var classes = containerStyles();
    return (React.createElement("div", { className: classes.inlineBlock },
        React.createElement("div", { className: classes.inlineBlock },
            React.createElement(react_responsive_1["default"], { query: "(min-width: 768px)" },
                React.createElement("div", { className: classes.container }, props.children)),
            React.createElement(react_responsive_1["default"], { query: "(max-width: 767px)" },
                React.createElement("div", { className: classes.spContainer }, props.children)))));
};
exports["default"] = BasicHeader3;
