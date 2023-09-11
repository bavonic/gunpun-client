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
exports.DemoPve1 = void 0;
const number_utils_1 = require("../../../utils/number.utils");
const types_1 = require("../../weapons/types");
const matchs_room_1 = require("../matchs.room");
const matchs_types_1 = require("../matchs.types");
const platform_schema_1 = require("../schemas/platform.schema");
const player_schema_1 = require("../schemas/player.schema");
const skills_types_1 = require("../skills/skills.types");
class DemoPve1 extends matchs_room_1.MatchRoom {
    onCreate(_) {
        this.mapConfig = DemoPve1.config;
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
                y: 500,
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
                id: 'mon',
                name: "NPC",
                size: 3.5,
                isFlip: true,
                x: 2300,
                y: 500,
                speed: 2,
                totalHp: 1000,
                teamId: 'B',
                controller: 'npc',
                skillIds: [],
            });
            this.state.players.set(this.monster.id, this.monster);
            // Platforms
            const width = DemoPve1.config.width;
            const height = 350;
            this.state.platforms.add(new platform_schema_1.PlatformSchema({
                id: 'platform',
                x: DemoPve1.config.width / 2,
                y: this.mapConfig.height - (height / 2),
                w: width,
                h: height,
            }));
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
DemoPve1.config = {
    id: "DemoPve1",
    name: "Single Punions",
    assetUrl: '/demo/maps/1',
    width: 2645,
    height: 1080,
    backgroundMode: matchs_types_1.MapBackgroundMode.LIGHT,
    numberOfPlayers: 1,
    mode: matchs_types_1.MapMode.DEMO_PVE,
    totalTime: 60 * 15,
    totalTurnTime: 15,
};
exports.DemoPve1 = DemoPve1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGVtb1B2ZTEubWFwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL21vZHVsZXMvbWF0Y2hzL21hcHMvRGVtb1B2ZTEubWFwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLDhEQUEwRDtBQUMxRCwrQ0FBb0Q7QUFDcEQsZ0RBQTJDO0FBQzNDLGtEQUF3RTtBQUN4RSxnRUFBNEQ7QUFDNUQsNERBQXVFO0FBQ3ZFLHlEQUFvRTtBQUVwRSxNQUFhLFFBQVMsU0FBUSx1QkFBUztJQW9CckMsUUFBUSxDQUFDLENBQU87UUFDZCxJQUFJLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUM7UUFDakMsT0FBTyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDMUIsQ0FBQztJQUVjLFVBQVU7Ozs7O1lBQ3ZCLFNBQVM7WUFDVCxNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7WUFFNUIsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLDRCQUFZLENBQUM7Z0JBQzdCLEVBQUUsRUFBRSxJQUFJLENBQUMsTUFBTTtnQkFDZixJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUk7Z0JBQ2YsT0FBTyxFQUFFLDZCQUFhLENBQUMsVUFBVTtnQkFDakMsYUFBYSxFQUFFLHFCQUFhLENBQUMsVUFBVTtnQkFDdkMsQ0FBQyxFQUFFLEdBQUc7Z0JBQ04sQ0FBQyxFQUFFLEdBQUc7Z0JBQ04sSUFBSSxFQUFFLENBQUM7Z0JBQ1AsT0FBTyxFQUFFLElBQUk7Z0JBQ2IsS0FBSyxFQUFFLENBQUM7Z0JBQ1IsTUFBTSxFQUFFLEdBQUc7Z0JBQ1gsVUFBVSxFQUFFLElBQUssQ0FBQyxNQUFNO2dCQUN4QixRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVE7Z0JBQ3ZCLElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQzthQUM5QyxD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