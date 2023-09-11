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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DemoPve4 = void 0;
const number_utils_1 = require("../../../utils/number.utils");
const types_1 = require("../../weapons/types");
const matchs_room_1 = require("../matchs.room");
const matchs_types_1 = require("../matchs.types");
const player_schema_1 = require("../schemas/player.schema");
const skills_types_1 = require("../skills/skills.types");
class DemoPve4 extends matchs_room_1.MatchRoom {
    onCreate(_) {
        this.mapConfig = DemoPve4.config;
        return super.onCreate();
    }
    initialize() {
        const _super = Object.create(null, {
            initialize: { get: () => super.initialize }
        });
        return __awaiter(this, void 0, void 0, function* () {
            // Player
            const host = this.getHost();
            this.player = new player_schema_1.PlayerSchema({
                id: host.userId,
                name: host.name,
                variant: player_schema_1.PlayerVariant.PERSONAL_I,
                weaponVariant: types_1.WeaponVariant.PERSONAL_I,
                x: 300,
                y: 300,
                size: 4,
                totalHp: 2000,
                speed: 3,
                teamId: 'A',
                controller: host.userId,
                skillIds: host.skillIds,
                data: JSON.stringify({ avatar: host.avatar }),
            });
            this.state.players.set(this.player.id, this.player);
            // Monster
            this.monster = new player_schema_1.PlayerSchema({
                x: 2300,
                y: 300,
                skillIds: [],
                id: 'monster_raidboss',
                name: "RaidBoss",
                size: 10,
                isFlip: true,
                speed: 2,
                totalHp: 2650,
                teamId: 'B',
                controller: 'npc',
            });
            this.state.players.set(this.monster.id, this.monster);
            // // Platforms
            // const width = DemoPve4.config.width;
            // const height = 350;
            // this.state.platforms.add(new PlatformSchema({
            //   id: 'platform',
            //   x: DemoPve4.config.width / 2,
            //   y: this.mapConfig.height - (height / 2),
            //   w: width,
            //   h: height,
            // }));
            // Required IMPORTANT!
            yield _super.initialize.call(this);
        });
    }
    startPlayerTurn(player) {
        const _super = Object.create(null, {
            startPlayerTurn: { get: () => super.startPlayerTurn }
        });
        return __awaiter(this, void 0, void 0, function* () {
            if ([this.monster.id].includes(player.id)) {
                let playerEffecteds = [];
                const isCollide = number_utils_1.NumberUtils.randomInt(0, 100) <= 70;
                // const isCollide = false;
                if (isCollide)
                    playerEffecteds.push({
                        id: this.player.id,
                        damage: number_utils_1.NumberUtils.randomInt(300, 400),
                    });
                return this.performNpcTurn(player, {
                    playerEffecteds,
                    skillId: skills_types_1.NpcSkillId.NORMAL,
                });
            }
            return _super.startPlayerTurn.call(this, player);
        });
    }
}
DemoPve4.config = {
    id: "DemoPve3",
    name: "Hard Core",
    assetUrl: '/demo/maps/3',
    width: 2645,
    height: 1080,
    backgroundMode: matchs_types_1.MapBackgroundMode.LIGHT,
    numberOfPlayers: 1,
    mode: matchs_types_1.MapMode.DEMO_PVE,
    totalTime: 60 * 15,
    totalTurnTime: 15,
};
exports.DemoPve4 = DemoPve4;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGVtb1B2ZTQubWFwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL21vZHVsZXMvbWF0Y2hzL21hcHMvRGVtb1B2ZTQubWFwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLDhEQUEwRDtBQUMxRCwrQ0FBb0Q7QUFDcEQsZ0RBQTJDO0FBQzNDLGtEQUF3RTtBQUV4RSw0REFBdUU7QUFDdkUseURBQW9FO0FBRXBFLE1BQWEsUUFBUyxTQUFRLHVCQUFTO0lBb0JyQyxRQUFRLENBQUMsQ0FBTztRQUNkLElBQUksQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQztRQUNqQyxPQUFPLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUMxQixDQUFDO0lBRWMsVUFBVTs7Ozs7WUFDdkIsU0FBUztZQUNULE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUU1QixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksNEJBQVksQ0FBQztnQkFDN0IsRUFBRSxFQUFFLElBQUksQ0FBQyxNQUFNO2dCQUNmLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSTtnQkFDZixPQUFPLEVBQUUsNkJBQWEsQ0FBQyxVQUFVO2dCQUNqQyxhQUFhLEVBQUUscUJBQWEsQ0FBQyxVQUFVO2dCQUN2QyxDQUFDLEVBQUUsR0FBRztnQkFDTixDQUFDLEVBQUUsR0FBRztnQkFDTixJQUFJLEVBQUUsQ0FBQztnQkFDUCxPQUFPLEVBQUUsSUFBSTtnQkFDYixLQUFLLEVBQUUsQ0FBQztnQkFDUixNQUFNLEVBQUUsR0FBRztnQkFDWCxVQUFVLEVBQUUsSUFBSyxDQUFDLE1BQU07Z0JBQ3hCLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUTtnQkFDdkIsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO2FBQzlDLENBQUMsQ0FBQztZQUVI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