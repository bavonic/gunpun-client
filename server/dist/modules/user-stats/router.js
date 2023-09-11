"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userStatsRouter = void 0;
const express_1 = require("express");
const module_1 = require("./module");
exports.userStatsRouter = (0, express_1.Router)();
exports.userStatsRouter.get(`/ranking`, (req, res) => {
    module_1.UserStatsModule.getRanking(req.query)
        .then(res.onResponse)
        .catch(res.onError);
});
exports.userStatsRouter.get(`/ranking/:userId`, (req, res) => {
    module_1.UserStatsModule.getUserRanking(req.params.userId, req.query.type)
        .then(res.onResponse)
        .catch(res.onError);
});
exports.userStatsRouter.get(`/:userId`, (req, res) => {
    module_1.UserStatsModule.get(req.params.userId, req.query.forceUpdate === 'true')
        .then(res.onResponse)
        .catch(res.onError);
});
exports.userStatsRouter.post(`/re-calculate`, (req, res) => {
    module_1.UserStatsModule.reCalculate()
        .then(res.onResponse)
        .catch(res.onError);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL21vZHVsZXMvdXNlci1zdGF0cy9yb3V0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEscUNBQWlDO0FBRWpDLHFDQUEyQztBQUU5QixRQUFBLGVBQWUsR0FBRyxJQUFBLGdCQUFNLEdBQUUsQ0FBQztBQUV4Qyx1QkFBZSxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBZ0IsRUFBRSxFQUFFO0lBQ3hELHdCQUFlLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxLQUFZLENBQUM7U0FDekMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUM7U0FDcEIsS0FBSyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUN4QixDQUFDLENBQUMsQ0FBQTtBQUVGLHVCQUFlLENBQUMsR0FBRyxDQUFDLGtCQUFrQixFQUFFLENBQUMsR0FBRyxFQUFFLEdBQWdCLEVBQUUsRUFBRTtJQUNoRSx3QkFBZSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsS0FBSyxDQUFDLElBQVcsQ0FBQztTQUNyRSxJQUFJLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQztTQUNwQixLQUFLLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQ3hCLENBQUMsQ0FBQyxDQUFBO0FBRUYsdUJBQWUsQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQWdCLEVBQUUsRUFBRTtJQUN4RCx3QkFBZSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsS0FBSyxDQUFDLFdBQVcsS0FBSyxNQUFNLENBQUM7U0FDckUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUM7U0FDcEIsS0FBSyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUN4QixDQUFDLENBQUMsQ0FBQTtBQUVGLHVCQUFlLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFnQixFQUFFLEVBQUU7SUFDOUQsd0JBQWUsQ0FBQyxXQUFXLEVBQUU7U0FDMUIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUM7U0FDcEIsS0FBSyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUN4QixDQUFDLENBQUMsQ0FBQSJ9