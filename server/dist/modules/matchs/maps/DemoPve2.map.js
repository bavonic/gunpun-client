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
exports.DemoPve2 = void 0;
const number_utils_1 = require("../../../utils/number.utils");
const types_1 = require("../../weapons/types");
const matchs_room_1 = require("../matchs.room");
const matchs_types_1 = require("../matchs.types");
const platform_schema_1 = require("../schemas/platform.schema");
const player_schema_1 = require("../schemas/player.schema");
const skills_types_1 = require("../skills/skills.types");
class DemoPve2 extends matchs_room_1.MatchRoom {
    onCreate(_) {
        this.mapConfig = DemoPve2.config;
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
                y: 800,
                size: 4,
                totalHp: 2000,
                speed: 10,
                teamId: 'A',
                controller: host.userId,
                skillIds: host.skillIds,
                data: JSON.stringify({ avatar: host.avatar }),
            });
            this.state.players.set(this.player.id, this.player);
            // Monsters
            this.monster_1 = new player_schema_1.PlayerSchema({
                id: 'monster_1',
                name: "NPC 1",
                size: 3.5,
                isFlip: true,
                x: 1800,
                y: 800,
                speed: 3,
                totalHp: 1000,
                teamId: 'B',
                controller: 'npc',
            });
            this.state.players.set(this.monster_1.id, this.monster_1);
            // Monster
            this.monster_2 = new player_schema_1.PlayerSchema({
                id: 'monster_2',
                name: "NPC 2",
                size: 3.5,
                isFlip: true,
                x: 2200,
                y: 300,
                speed: 2,
                totalHp: 1000,
                teamId: 'B',
                controller: 'npc',
            });
            this.state.players.set(this.monster_2.id, this.monster_2);
            this.monster_3 = new player_schema_1.PlayerSchema({
                id: 'monster_3',
                name: "NPC 3",
                size: 5,
                isFlip: true,
                x: 2600,
                y: 300,
                speed: 1,
                totalHp: 1000,
                teamId: 'B',
                controller: 'npc',
            });
            this.state.players.set(this.monster_3.id, this.monster_3);
            // Platforms
            const width = DemoPve2.config.width;
            const height = 350;
            this.state.platforms.add(new platform_schema_1.PlatformSchema({
                id: 'platform',
                x: DemoPve2.config.width / 2,
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
            if ([this.monster_1.id, this.monster_2.id, this.monster_3.id].includes(player.id)) {
                let playerEffecteds = [];
                const isCollide = number_utils_1.NumberUtils.randomInt(0, 100) <= 80;
                if (isCollide)
                    playerEffecteds.push({
                        id: this.player.id,
                        damage: number_utils_1.NumberUtils.randomInt(150, 300),
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
DemoPve2.config = {
    id: "DemoPve2",
    name: "Multi Punions",
    assetUrl: '/demo/maps/2',
    width: 2645,
    height: 1080,
    backgroundMode: matchs_types_1.MapBackgroundMode.LIGHT,
    numberOfPlayers: 1,
    mode: matchs_types_1.MapMode.DEMO_PVE,
    totalTime: 60 * 15,
    totalTurnTime: 15,
};
exports.DemoPve2 = DemoPve2;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGVtb1B2ZTIubWFwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL21vZHVsZXMvbWF0Y2hzL21hcHMvRGVtb1B2ZTIubWFwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLDhEQUEwRDtBQUMxRCwrQ0FBb0Q7QUFDcEQsZ0RBQTJDO0FBQzNDLGtEQUF3RTtBQUN4RSxnRUFBNEQ7QUFDNUQsNERBQXVFO0FBQ3ZFLHlEQUFvRTtBQUVwRSxNQUFhLFFBQVMsU0FBUSx1QkFBUztJQW1CckMsUUFBUSxDQUFDLENBQU87UUFDZCxJQUFJLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUM7UUFDakMsT0FBTyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDMUIsQ0FBQztJQUVjLFVBQVU7Ozs7O1lBQ3ZCLFNBQVM7WUFDVCxNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDNUIsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLDRCQUFZLENBQUM7Z0JBQzdCLEVBQUUsRUFBRSxJQUFJLENBQUMsTUFBTTtnQkFDZixJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUk7Z0JBQ2YsT0FBTyxFQUFFLDZCQUFhLENBQUMsVUFBVTtnQkFDakMsYUFBYSxFQUFFLHFCQUFhLENBQUMsVUFBVTtnQkFDdkMsQ0FBQyxFQUFFLEdBQUc7Z0JBQ04sQ0FBQyxFQUFFLEdBQUc7Z0JBQ04sSUFBSSxFQUFFLENBQUM7Z0JBQ1AsT0FBTyxFQUFFLElBQUk7Z0JBQ2IsS0FBSyxFQUFFLEVBQUU7Z0JBQ1QsTUFBTSxFQUFFLEdBQUc7Z0JBQ1gsVUFBVSxFQUFFLElBQUssQ0FBQyxNQUFNO2dCQUN4QixRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVE7Z0JBQ3ZCLElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQzthQUM5QyxD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