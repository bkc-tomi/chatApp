"use strict";
exports.__esModule = true;
var core_1 = require("@material-ui/core");
var useStyles = core_1.makeStyles(function () { return core_1.createStyles({
    image: {
        width: "100px",
        height: "100px",
        borderRadius: "50%"
    },
    container: {
        display: "block"
    }
}); });
var UserIcon = function (_a) {
    var image = _a.image, alt = _a.alt, width = _a.width, height = _a.height;
    var classes = useStyles();
    return (React.createElement("div", { className: classes.container },
        React.createElement("img", { src: image || "/static/default-user-image.png", alt: alt, className: classes.image, style: { width: width, height: height } })));
};
exports["default"] = UserIcon;
