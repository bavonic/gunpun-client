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
exports.DemoPve3 = void 0;
const number_utils_1 = require("../../../utils/number.utils");
const types_1 = require("../../weapons/types");
const matchs_room_1 = require("../matchs.room");
const matchs_types_1 = require("../matchs.types");
const platform_schema_1 = require("../schemas/platform.schema");
const player_schema_1 = require("../schemas/player.schema");
const skills_types_1 = require("../skills/skills.types");
class DemoPve3 extends matchs_room_1.MatchRoom {
    onCreate(_) {
        this.mapConfig = DemoPve3.config;
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
                y: 1000,
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
                id: 'monster_raidboss',
                name: "RaidBoss",
                size: 10,
                isFlip: true,
                x: 2750,
                y: 800,
                speed: 2,
                totalHp: 2650,
                teamId: 'B',
                controller: 'npc',
            });
            this.state.players.set(this.monster.id, this.monster);
            // Platforms
            const width = DemoPve3.config.width;
            const height = 350;
            this.state.platforms.add(new platform_schema_1.PlatformSchema({
                id: 'platform',
                x: DemoPve3.config.width / 2,
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
                const isCollide = true;
                const damage = number_utils_1.NumberUtils.randomInt(420, 620);
                if (isCollide)
                    playerEffecteds.push({
                        id: this.player.id,
                        damage,
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
DemoPve3.config = {
    id: "DemoPve3",
    name: "Hard Core",
    assetUrl: '/demo/maps/3',
    width: 3400,
    height: 1500,
    backgroundMode: matchs_types_1.MapBackgroundMode.LIGHT,
    numberOfPlayers: 1,
    mode: matchs_types_1.MapMode.DEMO_PVE,
    totalTime: 60 * 15,
    totalTurnTime: 15,
};
exports.DemoPve3 = DemoPve3;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGVtb1B2ZTMubWFwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL21vZHVsZXMvbWF0Y2hzL21hcHMvRGVtb1B2ZTMubWFwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLDhEQUEwRDtBQUMxRCwrQ0FBb0Q7QUFDcEQsZ0RBQTJDO0FBQzNDLGtEQUF3RTtBQUN4RSxnRUFBNEQ7QUFDNUQsNERBQXVFO0FBQ3ZFLHlEQUFvRTtBQUVwRSxNQUFhLFFBQVMsU0FBUSx1QkFBUztJQWlCckMsUUFBUSxDQUFDLENBQU87UUFDZCxJQUFJLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUM7UUFDakMsT0FBTyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDMUIsQ0FBQztJQUVjLFVBQVU7Ozs7O1lBQ3ZCLFNBQVM7WUFDVCxNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7WUFFNUIsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLDRCQUFZLENBQUM7Z0JBQzdCLEVBQUUsRUFBRSxJQUFJLENBQUMsTUFBTTtnQkFDZixJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUk7Z0JBQ2YsT0FBTyxFQUFFLDZCQUFhLENBQUMsVUFBVTtnQkFDakMsYUFBYSxFQUFFLHFCQUFhLENBQUMsVUFBVTtnQkFDdkMsQ0FBQyxFQUFFLEdBQUc7Z0JBQ04sQ0FBQyxFQUFFLElBQUk7Z0JBQ1AsSUFBSSxFQUFFLENBQUM7Z0JBQ1AsT0FBTyxFQUFFLElBQUk7Z0JBQ2IsS0FBSyxFQUFFLENBQUM7Z0JBQ1IsTUFBTSxFQUFFLEdBQUc7Z0JBQ1gsVUFBVSxFQUFFLElBQUssQ0FBQyxNQUFNO2dCQUN4QixRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVE7Z0JBQ3ZCLElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQzthQUM5QyxD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