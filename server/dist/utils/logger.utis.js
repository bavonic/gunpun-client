"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const module_1 = require("../modules/notifier/module");
const logger = (type, message, stack, isTracking = true) => {
    const icon = type === 'ERROR' ? '🔴🔴🔴' : '🤖🤖🤖';
    console.log(`${icon} [${type}] [${new Date().toLocaleString('en-US')}] > ${message}`, stack || '');
    if (type === 'ERROR' && isTracking)
        module_1.NotifierModule.trackingError(message, stack);
};
exports.logger = logger;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nZ2VyLnV0aXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdXRpbHMvbG9nZ2VyLnV0aXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsdURBQTREO0FBSXJELE1BQU0sTUFBTSxHQUFHLENBQUMsSUFBZ0IsRUFBRSxPQUFlLEVBQUUsS0FBVyxFQUFFLFVBQVUsR0FBRyxJQUFJLEVBQUUsRUFBRTtJQUMxRixNQUFNLElBQUksR0FBRyxJQUFJLEtBQUssT0FBTyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQTtJQUNuRCxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxLQUFLLElBQUksTUFBTSxJQUFJLElBQUksRUFBRSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsT0FBTyxPQUFPLEVBQUUsRUFBRSxLQUFLLElBQUksRUFBRSxDQUFDLENBQUM7SUFDbkcsSUFBSSxJQUFJLEtBQUssT0FBTyxJQUFJLFVBQVU7UUFBRSx1QkFBYyxDQUFDLGFBQWEsQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUM7QUFDbkYsQ0FBQyxDQUFBO0FBSlksUUFBQSxNQUFNLFVBSWxCIn0=