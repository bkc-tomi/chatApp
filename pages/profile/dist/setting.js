"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var router_1 = require("next/router");
var react_1 = require("react");
var head_1 = require("../../components/atom/head");
var logo_1 = require("../../components/atom/logo");
var basicH2_1 = require("../../components/atom/basicH2");
var basicP_1 = require("../../components/atom/basicP");
var textbox_1 = require("../../components/atom/textbox");
var button_1 = require("../../components/atom/button");
var containerDiv_1 = require("../../components/atom/containerDiv");
var auth_1 = require("../../functions/auth");
var validation_1 = require("../../functions/validation");
var storage_1 = require("../../functions/storage");
var setting_module_css_1 = require("../../styles/setting.module.css");
function SettingProfile() {
    var _this = this;
    var router = router_1.useRouter();
    var _a = react_1.useState(""), username = _a[0], setUsername = _a[1];
    var _b = react_1.useState(["ユーザネームを決めてください。", "#000000"]), UMessage = _b[0], setUMessage = _b[1];
    var _c = react_1.useState(), photo = _c[0], setPhoto = _c[1];
    var _d = react_1.useState(false), disable = _d[0], setDisable = _d[1];
    var handleUsernameChange = function (event) {
        setUsername(event.target.value);
        if (validation_1.validationUsername(event.target.value)) {
            setUMessage(["OK!!", "#55c501"]);
        }
        else {
            setUMessage(["ユーザネームは１文字以上で指定してください。", "#ff0000"]);
        }
    };
    var handlePhoto = function (event) {
        setPhoto(event.target.files[0]);
    };
    var saveUserdata = function (user, fullPath) {
        user.updateProfile({
            displayName: username,
            photoURL: fullPath
        })
            .then(function () {
            console.log("save userdata success!!");
        })["catch"](function (error) {
            console.log(error);
        });
    };
    var handleSaveUserData = function () { return __awaiter(_this, void 0, void 0, function () {
        var user, _a, bool, fullPath, url;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!(UMessage[0] === "OK!!")) return [3 /*break*/, 10];
                    setDisable(true);
                    return [4 /*yield*/, auth_1.activeUserExist()];
                case 1:
                    if (!_b.sent()) return [3 /*break*/, 9];
                    return [4 /*yield*/, auth_1.getActiveUser()];
                case 2:
                    user = _b.sent();
                    if (!photo) return [3 /*break*/, 6];
                    return [4 /*yield*/, storage_1.saveUserImage(photo, user.uid)];
                case 3:
                    _a = _b.sent(), bool = _a[0], fullPath = _a[1];
                    if (!bool) return [3 /*break*/, 5];
                    return [4 /*yield*/, storage_1.getUserImageUrl(fullPath)];
                case 4:
                    url = (_b.sent())[0];
                    saveUserdata(user, url);
                    _b.label = 5;
                case 5: return [3 /*break*/, 7];
                case 6:
                    saveUserdata(user, "");
                    _b.label = 7;
                case 7: return [4 /*yield*/, auth_1.activeUserExist()];
                case 8:
                    _b.sent();
                    router.push("/profile/[username]", "/profile/" + username);
                    return [3 /*break*/, 10];
                case 9:
                    alert("不具合でログインしていない状態になっているようです。もう一度登録処理からお願いします。");
                    setDisable(false);
                    router.push("/signin");
                    _b.label = 10;
                case 10: return [2 /*return*/];
            }
        });
    }); };
    var checkUserdata = function () { return __awaiter(_this, void 0, void 0, function () {
        var user;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, auth_1.activeUserExist()];
                case 1:
                    if (!_a.sent()) return [3 /*break*/, 3];
                    return [4 /*yield*/, auth_1.getActiveUser()];
                case 2:
                    user = _a.sent();
                    if (user.displayName) {
                        router.push("[username]", "" + user.displayName);
                    }
                    _a.label = 3;
                case 3: return [2 /*return*/];
            }
        });
    }); };
    react_1.useEffect(function () {
        checkUserdata();
    });
    return (React.createElement("div", null,
        React.createElement(head_1["default"], null),
        React.createElement("main", null,
            React.createElement("div", { className: setting_module_css_1["default"].title },
                React.createElement(logo_1["default"], null)),
            React.createElement("div", { className: setting_module_css_1["default"].box },
                React.createElement(containerDiv_1["default"], null,
                    React.createElement("div", { className: setting_module_css_1["default"].register },
                        React.createElement(basicH2_1["default"], null, "\u30E6\u30FC\u30B6\u30FC\u8A2D\u5B9A")),
                    React.createElement("div", { className: setting_module_css_1["default"].paragraph },
                        React.createElement(basicP_1["default"], null, "\u307E\u305A\u3001\u3053\u3053\u3067\u30E6\u30FC\u30B6\u30CD\u30FC\u30E0\u3068\u30D7\u30ED\u30D5\u30A3\u30FC\u30EB\u5199\u771F\u3092\u8A2D\u5B9A\u3057\u3066\u304F\u3060\u3055\u3044\u3002\u30E6\u30FC\u30B6\u30CD\u30FC\u30E0\u306F\u5FC5\u305A\u6307\u5B9A\u3057\u3066\u304F\u3060\u3055\u3044\u3002 \u30D7\u30ED\u30D5\u30A3\u30FC\u30EB\u5199\u771F\u306F\u767B\u9332\u3059\u308B\u5FC5\u8981\u306F\u3042\u308A\u307E\u305B\u3093\u304C\u3001\u30C1\u30E3\u30C3\u30C8\u76F8\u624B\u304C\u308F\u304B\u308A\u3084\u3059\u3044\u3088\u3046\u767B\u9332\u3059\u308B\u3053\u3068\u3092\u52E7\u3081\u3066\u3044\u307E\u3059\u3002")),
                    React.createElement("div", { className: setting_module_css_1["default"].innerbox },
                        React.createElement(textbox_1["default"], { label: "username", value: username, onchange: handleUsernameChange, fullWidth: true }),
                        React.createElement("div", { style: { color: UMessage[1] } },
                            React.createElement(basicP_1["default"], null, UMessage[0]))),
                    React.createElement("div", { className: setting_module_css_1["default"].innerbox },
                        React.createElement(button_1["default"], { fullWidth: true },
                            React.createElement("input", { id: "photoFile", type: "file", accept: "image/*", className: setting_module_css_1["default"].inputFile, onChange: handlePhoto }))),
                    React.createElement("div", { className: setting_module_css_1["default"].innerbox },
                        React.createElement(button_1["default"], { fullWidth: true, disabled: disable, onclick: handleSaveUserData }, "\u767B\u9332")))))));
}
exports["default"] = SettingProfile;
