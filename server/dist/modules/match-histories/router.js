"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.matchHistoriesRouter = void 0;
const express_1 = require("express");
const module_1 = require("./module");
exports.matchHistoriesRouter = (0, express_1.Router)();
exports.matchHistoriesRouter.get(`/`, (req, res) => {
    module_1.MatchHistoriesModule.getList(req.query)
        .then(res.onResponse)
        .catch(res.onError);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL21vZHVsZXMvbWF0Y2gtaGlzdG9yaWVzL3JvdXRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxxQ0FBaUM7QUFFakMscUNBQWdEO0FBRW5DLFFBQUEsb0JBQW9CLEdBQUcsSUFBQSxnQkFBTSxHQUFFLENBQUM7QUFFN0MsNEJBQW9CLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFnQixFQUFFLEVBQUU7SUFDdEQsNkJBQW9CLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFZLENBQUM7U0FDM0MsSUFBSSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUM7U0FDcEIsS0FBSyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQTtBQUN2QixDQUFDLENBQUMsQ0FBQSJ9