"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const monitor_1 = require("@colyseus/monitor");
const body_parser_1 = require("body-parser");
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const middlewares_1 = require("./middlewares");
const onResponse_middleware_1 = require("./middlewares/onResponse.middleware");
const modules_1 = require("./modules");
const redis_1 = require("./modules/redis");
const utils_1 = require("./utils");
const statusMonitor = require('express-status-monitor')();
exports.app = (0, express_1.default)();
exports.app.use(statusMonitor);
exports.app.use((0, cors_1.default)());
exports.app.use((0, body_parser_1.json)());
exports.app.use(middlewares_1.onError);
exports.app.use(onResponse_middleware_1.onResponse);
exports.app.get('/ping', (_, res) => res.json({ message: 'Welcome!' }));
exports.app.use('/api', modules_1.apiRouter);
exports.app.use('/colyseus', (0, monitor_1.monitor)());
exports.app.delete(`/redis`, (_, res) => {
    redis_1.RedisModule.reset()
        .then(() => res.json({ success: true }))
        .catch(res.onError);
});
exports.app.use((_, res) => res.status(404).json({ success: false, message: utils_1.ErrorMessage.INVALID_ROUTE }));
exports.app.use((error, req, res, next) => {
    (0, utils_1.logger)('ERROR', 'Internal Server Error', error.stack);
    res.status(500).json({ success: false, message: utils_1.ErrorMessage.INTERNAL_SERVER_ERROR });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2FwcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSwrQ0FBNEM7QUFDNUMsNkNBQW1DO0FBQ25DLGdEQUF3QjtBQUN4QixzREFBbUU7QUFDbkUsK0NBQXdDO0FBQ3hDLCtFQUFpRTtBQUNqRSx1Q0FBc0M7QUFDdEMsMkNBQThDO0FBQzlDLG1DQUErQztBQUMvQyxNQUFNLGFBQWEsR0FBRyxPQUFPLENBQUMsd0JBQXdCLENBQUMsRUFBRSxDQUFDO0FBRTdDLFFBQUEsR0FBRyxHQUFHLElBQUEsaUJBQU8sR0FBRSxDQUFDO0FBRTdCLFdBQUcsQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLENBQUM7QUFDdkIsV0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFBLGNBQUksR0FBRSxDQUFDLENBQUM7QUFDaEIsV0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFBLGtCQUFJLEdBQUUsQ0FBQyxDQUFDO0FBQ2hCLFdBQUcsQ0FBQyxHQUFHLENBQUMscUJBQU8sQ0FBQyxDQUFDO0FBQ2pCLFdBQUcsQ0FBQyxHQUFHLENBQUMsa0NBQVUsQ0FBQyxDQUFDO0FBRXBCLFdBQUcsQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxFQUFFLEdBQUcsRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLE9BQU8sRUFBRSxVQUFVLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDaEUsV0FBRyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsbUJBQVMsQ0FBQyxDQUFDO0FBQzNCLFdBQUcsQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLElBQUEsaUJBQU8sR0FBRSxDQUFDLENBQUM7QUFDaEMsV0FBRyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLEVBQUUsR0FBUSxFQUFFLEVBQUU7SUFDbkMsbUJBQVcsQ0FBQyxLQUFLLEVBQUU7U0FDaEIsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztTQUN2QyxLQUFLLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQ3hCLENBQUMsQ0FBQyxDQUFBO0FBRUYsV0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLEVBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsb0JBQVksQ0FBQyxhQUFhLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFFbkcsV0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQVksRUFBRSxHQUFZLEVBQUUsR0FBYSxFQUFFLElBQWtCLEVBQUUsRUFBRTtJQUN4RSxJQUFBLGNBQU0sRUFBQyxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3RELEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsb0JBQVksQ0FBQyxxQkFBcUIsRUFBRSxDQUFDLENBQUM7QUFDeEYsQ0FBQyxDQUFDLENBQUMifQ==