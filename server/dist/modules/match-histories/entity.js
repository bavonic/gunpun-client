"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MatchHistoryEntity = void 0;
const typeorm_1 = require("typeorm");
let MatchHistoryEntity = class MatchHistoryEntity {
};
__decorate([
    (0, typeorm_1.ObjectIdColumn)(),
    __metadata("design:type", typeorm_1.ObjectId)
], MatchHistoryEntity.prototype, "_id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], MatchHistoryEntity.prototype, "roomId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Object)
], MatchHistoryEntity.prototype, "map", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], MatchHistoryEntity.prototype, "time", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Array)
], MatchHistoryEntity.prototype, "userIds", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Object)
], MatchHistoryEntity.prototype, "result", void 0);
MatchHistoryEntity = __decorate([
    (0, typeorm_1.Entity)('match-histories'),
    (0, typeorm_1.Unique)('match-histories-unique', ['roomId'])
], MatchHistoryEntity);
exports.MatchHistoryEntity = MatchHistoryEntity;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW50aXR5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL21vZHVsZXMvbWF0Y2gtaGlzdG9yaWVzL2VudGl0eS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSxxQ0FBMEU7QUFPMUUsSUFBYSxrQkFBa0IsR0FBL0IsTUFBYSxrQkFBa0I7Q0FrQjlCLENBQUE7QUFoQkM7SUFEQyxJQUFBLHdCQUFjLEdBQUU7OEJBQ1osa0JBQVE7K0NBQUE7QUFHYjtJQURDLElBQUEsZ0JBQU0sR0FBRTs7a0RBQ0s7QUFHZDtJQURDLElBQUEsZ0JBQU0sR0FBRTs7K0NBQ0s7QUFHZDtJQURDLElBQUEsZ0JBQU0sR0FBRTs7Z0RBQ0c7QUFHWjtJQURDLElBQUEsZ0JBQU0sR0FBRTs7bURBQ1E7QUFHakI7SUFEQyxJQUFBLGdCQUFNLEdBQUU7O2tEQUNVO0FBakJSLGtCQUFrQjtJQUg5QixJQUFBLGdCQUFNLEVBQUMsaUJBQWlCLENBQUM7SUFDekIsSUFBQSxnQkFBTSxFQUFDLHdCQUF3QixFQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7R0FFaEMsa0JBQWtCLENBa0I5QjtBQWxCWSxnREFBa0IifQ==