"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatLobbyRouter = void 0;
const express_1 = require("express");
const chatLobby_module_1 = require("./chatLobby.module");
exports.chatLobbyRouter = (0, express_1.Router)();
exports.chatLobbyRouter.get(`/`, (req, res) => {
    chatLobby_module_1.ChatLobbyModule.getList(req.query)
        .then(result => res.send(result))
        .catch(res.onError);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhdExvYmJ5LnJvdXRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9tb2R1bGVzL2NoYXQtbG9iYnkvY2hhdExvYmJ5LnJvdXRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxxQ0FBaUM7QUFDakMseURBQXFEO0FBRXhDLFFBQUEsZUFBZSxHQUFHLElBQUEsZ0JBQU0sR0FBRSxDQUFDO0FBRXhDLHVCQUFlLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFRLEVBQUUsRUFBRTtJQUN6QyxrQ0FBZSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDO1NBQy9CLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDaEMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUN4QixDQUFDLENBQUMsQ0FBQSJ9