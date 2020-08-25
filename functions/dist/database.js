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
exports.setChatToFirestore = exports.deleteFirestoreChatroom = exports.getChatroomListWithUsername = exports.getChatroomFromFirestore = exports.setChatroomToFirestore = void 0;
var firebase_1 = require("./firebase");
/**
 * firestoreにチャットルームを保存する。
 * 保存の成功・失敗ごとにメッセージを返す。
 * @param chatroom :chatroomオブジェクトを指定
 * @param uid :documentを指定
 */
exports.setChatroomToFirestore = function (chatroom, uid) { return __awaiter(void 0, void 0, Promise, function () {
    var msg;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, firebase_1.FBdb.collection("chatrooms").doc(uid).set({
                    owner: chatroom.owner,
                    roomname: chatroom.roomname,
                    member: chatroom.member,
                    chats: chatroom.chats
                })
                    .then(function () {
                    return "set chatroom successfully!";
                })["catch"](function () {
                    return "set chatroom failed.";
                })];
            case 1:
                msg = _a.sent();
                return [2 /*return*/, msg];
        }
    });
}); };
/**
 * firestoreから指定されたchatroomオブジェクトを取ってくる。
 * 成功したらオブジェクトを返す。
 * 保存の成功・失敗ごとにメッセージを返す。
 * @param uid :uidを指定
 */
exports.getChatroomFromFirestore = function (uid) { return __awaiter(void 0, void 0, Promise, function () {
    var chatroom, msg;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                chatroom = {};
                return [4 /*yield*/, firebase_1.FBdb.collection("chatrooms").doc(uid).get()
                        .then(function (snapshot) {
                        chatroom = {
                            owner: snapshot.data().owner,
                            roomname: snapshot.data().roomname,
                            member: snapshot.data().member,
                            chats: snapshot.data().chats
                        };
                        return "get chatroom successfully!";
                    })["catch"](function (error) {
                        return "get chatroom failed.";
                    })];
            case 1:
                msg = _a.sent();
                return [2 /*return*/, [msg, chatroom]];
        }
    });
}); };
/**
 * firestoreからownerが指定されたusernameのdocument(chatroom)を全て取得する。
 * 取得したチャットルームを配列にして返す。
 * @param username
 */
exports.getChatroomListWithUsername = function (username) { return __awaiter(void 0, void 0, Promise, function () {
    var roomList;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                roomList = [];
                return [4 /*yield*/, firebase_1.FBdb.collection("chatrooms").where("owner", "==", username).get()
                        .then(function (snapshot) {
                        if (snapshot.empty) {
                            console.log('No matching documents.');
                            return;
                        }
                        snapshot.forEach(function (doc) {
                            // console.log(doc.id, '=>', doc.data());
                            var room = {
                                id: doc.id,
                                owner: doc.data().owner
                            };
                            roomList.push(room);
                        });
                    })["catch"](function (error) {
                        console.log(error);
                    })];
            case 1:
                _a.sent();
                return [2 /*return*/, roomList];
        }
    });
}); };
/**
 * 指定したuidのdocumentを削除する。
 * 成功したらtrue, 失敗したらfalseを返す。
 * @param uid
 */
exports.deleteFirestoreChatroom = function (uid) { return __awaiter(void 0, void 0, Promise, function () {
    var bool;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                bool = false;
                return [4 /*yield*/, firebase_1.FBdb.collection("chatrooms").doc(uid)["delete"]()
                        .then(function () {
                        bool = true;
                    })["catch"](function (error) {
                        console.log(error);
                        bool = false;
                    })];
            case 1:
                _a.sent();
                return [2 /*return*/, bool];
        }
    });
}); };
/**
 * userrooms/uid/chats[]にchatを追加する。
 * @param uid
 * @param chat
 */
exports.setChatToFirestore = function (uid, chat) { return __awaiter(void 0, void 0, Promise, function () {
    var bool, chatroom;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                bool = false;
                chatroom = firebase_1.FBdb.collection("chatrooms").doc(uid);
                return [4 /*yield*/, chatroom.update({
                        chats: firebase_1["default"].firestore.FieldValue.arrayUnion(chat)
                    })
                        .then(function () {
                        bool = true;
                    })["catch"](function (error) {
                        console.log(error);
                        bool = false;
                    })];
            case 1:
                _a.sent();
                return [2 /*return*/, bool];
        }
    });
}); };
