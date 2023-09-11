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
exports.UserStatEntity = void 0;
const typeorm_1 = require("typeorm");
const types_1 = require("../users/types");
let UserStatEntity = class UserStatEntity {
};
__decorate([
    (0, typeorm_1.ObjectIdColumn)(),
    __metadata("design:type", typeorm_1.ObjectId)
], UserStatEntity.prototype, "_id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], UserStatEntity.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", types_1.UserEntity)
], UserStatEntity.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], UserStatEntity.prototype, "matchs", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], UserStatEntity.prototype, "winRate", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], UserStatEntity.prototype, "pvePoints", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], UserStatEntity.prototype, "pveMatchs", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], UserStatEntity.prototype, "pveWinRate", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], UserStatEntity.prototype, "pvpPoints", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], UserStatEntity.prototype, "pvpMatchs", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], UserStatEntity.prototype, "pvpWinRate", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], UserStatEntity.prototype, "pvp1vs1Points", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], UserStatEntity.prototype, "pvp1vs1Matchs", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], UserStatEntity.prototype, "pvp1vs1WinRate", void 0);
UserStatEntity = __decorate([
    (0, typeorm_1.Entity)('user-stats'),
    (0, typeorm_1.Unique)('user-stats-unique', ['userId'])
], UserStatEntity);
exports.UserStatEntity = UserStatEntity;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW50aXR5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL21vZHVsZXMvdXNlci1zdGF0cy9lbnRpdHkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEscUNBQTBFO0FBQzFFLDBDQUEyQztBQUszQyxJQUFhLGNBQWMsR0FBM0IsTUFBYSxjQUFjO0NBMEMxQixDQUFBO0FBeENDO0lBREMsSUFBQSx3QkFBYyxHQUFFOzhCQUNaLGtCQUFROzJDQUFBO0FBR2I7SUFEQyxJQUFBLGdCQUFNLEdBQUU7OzhDQUNLO0FBR2Q7SUFEQyxJQUFBLGdCQUFNLEdBQUU7OEJBQ0gsa0JBQVU7NENBQUE7QUFHaEI7SUFEQyxJQUFBLGdCQUFNLEdBQUU7OzhDQUNLO0FBR2Q7SUFEQyxJQUFBLGdCQUFNLEdBQUU7OytDQUNNO0FBR2Y7SUFEQyxJQUFBLGdCQUFNLEdBQUU7O2lEQUNRO0FBR2pCO0lBREMsSUFBQSxnQkFBTSxHQUFFOztpREFDUTtBQUdqQjtJQURDLElBQUEsZ0JBQU0sR0FBRTs7a0RBQ1M7QUFHbEI7SUFEQyxJQUFBLGdCQUFNLEdBQUU7O2lEQUNRO0FBR2pCO0lBREMsSUFBQSxnQkFBTSxHQUFFOztpREFDUTtBQUdqQjtJQURDLElBQUEsZ0JBQU0sR0FBRTs7a0RBQ1M7QUFHbEI7SUFEQyxJQUFBLGdCQUFNLEdBQUU7O3FEQUNZO0FBR3JCO0lBREMsSUFBQSxnQkFBTSxHQUFFOztxREFDWTtBQUdyQjtJQURDLElBQUEsZ0JBQU0sR0FBRTs7c0RBQ2E7QUF6Q1gsY0FBYztJQUgxQixJQUFBLGdCQUFNLEVBQUMsWUFBWSxDQUFDO0lBQ3BCLElBQUEsZ0JBQU0sRUFBQyxtQkFBbUIsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0dBRTNCLGNBQWMsQ0EwQzFCO0FBMUNZLHdDQUFjIn0=