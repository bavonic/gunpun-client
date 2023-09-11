"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapConfigs = exports.matchsRouter = void 0;
const express_1 = require("express");
const DemoPVP1Vs1_map_1 = require("./maps/DemoPVP1Vs1.map");
const DemoPve1_map_1 = require("./maps/DemoPve1.map");
const DemoPve2_map_1 = require("./maps/DemoPve2.map");
const DemoPVP2Vs2_map_1 = require("./maps/DemoPVP2Vs2.map");
const DemoPVP3Vs3_map_1 = require("./maps/DemoPVP3Vs3.map");
const DemoPve4_map_1 = require("./maps/DemoPve4.map");
exports.matchsRouter = (0, express_1.Router)();
exports.mapConfigs = [
    DemoPve1_map_1.DemoPve1.config,
    DemoPve2_map_1.DemoPve2.config,
    // DemoPve3.config,
    DemoPve4_map_1.DemoPve4.config,
    DemoPVP1Vs1_map_1.DemoPVP1Vs1.config,
    DemoPVP2Vs2_map_1.DemoPVP2Vs2.config,
    DemoPVP3Vs3_map_1.DemoPVP3Vs3.config,
];
exports.matchsRouter.get(`/maps`, (_, res) => {
    res.send({ data: exports.mapConfigs });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0Y2hzLnJvdXRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9tb2R1bGVzL21hdGNocy9tYXRjaHMucm91dGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHFDQUFpQztBQUVqQyw0REFBcUQ7QUFDckQsc0RBQStDO0FBQy9DLHNEQUErQztBQUcvQyw0REFBcUQ7QUFDckQsNERBQXFEO0FBQ3JELHNEQUErQztBQUVsQyxRQUFBLFlBQVksR0FBRyxJQUFBLGdCQUFNLEdBQUUsQ0FBQztBQUV4QixRQUFBLFVBQVUsR0FBZ0I7SUFDckMsdUJBQVEsQ0FBQyxNQUFNO0lBQ2YsdUJBQVEsQ0FBQyxNQUFNO0lBQ2YsbUJBQW1CO0lBQ25CLHVCQUFRLENBQUMsTUFBTTtJQUNmLDZCQUFXLENBQUMsTUFBTTtJQUNsQiw2QkFBVyxDQUFDLE1BQU07SUFDbEIsNkJBQVcsQ0FBQyxNQUFNO0NBQ25CLENBQUE7QUFFRCxvQkFBWSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLEVBQUUsR0FBZ0IsRUFBRSxFQUFFO0lBQ2hELEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsa0JBQVUsRUFBRSxDQUFDLENBQUE7QUFDaEMsQ0FBQyxDQUFDLENBQUEifQ==