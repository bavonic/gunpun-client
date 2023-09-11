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
exports.DemoPlayer = void 0;
const skills_module_1 = require("../skills/skills.module");
const matchs_room_1 = require("../matchs.room");
const matchs_types_1 = require("../matchs.types");
const platform_schema_1 = require("../schemas/platform.schema");
const player_schema_1 = require("../schemas/player.schema");
class DemoPlayer extends matchs_room_1.MatchRoom {
    onCreate(_) {
        this.mapConfig = DemoPlayer.config;
        this.ignoreAuth = true;
        return super.onCreate();
    }
    onAuth(client, params) {
        const _super = Object.create(null, {
            onAuth: { get: () => super.onAuth }
        });
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield _super.onAuth.call(this, client, params);
            if (user.isHost) {
                user.isReady = true;
            }
            return user;
        });
    }
    initialize() {
        const _super = Object.create(null, {
            initialize: { get: () => super.initialize }
        });
        return __awaiter(this, void 0, void 0, function* () {
            // Player
            const host = this.getHost();
            const playerSkills = yield skills_module_1.SkillModule.getPlayerSkills("1");
            this.player = new player_schema_1.PlayerSchema({
                id: "1",
                name: "Demo",
                x: 300,
                y: 1000,
                size: 3.5,
                totalHp: 2000,
                speed: 3,
                teamId: 'A',
                controller: host.userId,
                skillIds: playerSkills.map(v => v.id),
            });
            this.state.players.set(this.player.id, this.player);
            // Platforms
            const width = DemoPlayer.config.width;
            const height = 350;
            this.state.platforms.add(new platform_schema_1.PlatformSchema({
                id: 'platform',
                x: DemoPlayer.config.width / 2,
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
            // if ([this.monster.id].includes(player.id)) {
            //   let playerEffecteds: PlayerEffected[] = []
            //   const isCollide = NumberUtils.randomInt(0, 100) <= 70;
            //   if (isCollide) playerEffecteds.push({
            //     id: this.player.id,
            //     damage: NumberUtils.randomInt(300, 400),
            //   })
            //   return this.performNpcTurn(player, {
            //     playerEffecteds,
            //     skillId: NpcSkillId.NORMAL,
            //   });
            // }
            return _super.startPlayerTurn.call(this, player);
        });
    }
}
DemoPlayer.config = {
    id: "DemoPlayer",
    name: "Single Punions",
    assetUrl: '/demo/maps/1',
    width: 3400,
    height: 1500,
    backgroundMode: matchs_types_1.MapBackgroundMode.LIGHT,
    numberOfPlayers: 1,
    mode: matchs_types_1.MapMode.DEMO_PVE,
    totalTime: 60 * 60,
    totalTurnTime: 60 * 15,
};
exports.DemoPlayer = DemoPlayer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGVtb1BsYXllci5tYXAuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbW9kdWxlcy9tYXRjaHMvbWFwcy9EZW1vUGxheWVyLm1hcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFDQSwyREFBc0Q7QUFDdEQsZ0RBQTJDO0FBQzNDLGtEQUF3RTtBQUN4RSxnRUFBNEQ7QUFDNUQsNERBQXdEO0FBRXhELE1BQWEsVUFBVyxTQUFRLHVCQUFTO0lBZ0J2QyxRQUFRLENBQUMsQ0FBTztRQUNkLElBQUksQ0FBQyxTQUFTLEdBQUcsVUFBVSxDQUFDLE1BQU0sQ0FBQztRQUNuQyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztRQUN2QixPQUFPLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUMxQixDQUFDO0lBRUssTUFBTSxDQUFDLE1BQWMsRUFBRSxNQUFXOzs7OztZQUN0QyxNQUFNLElBQUksR0FBRyxNQUFNLE9BQU0sTUFBTSxZQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQztZQUVoRCxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7Z0JBQ2YsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7YUFDckI7WUFFRCxPQUFPLElBQUksQ0FBQztRQUNkLENBQUM7S0FBQTtJQUVLLFVBQVU7Ozs7O1lBQ2QsU0FBUztZQUNULE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUM1QixNQUFNLFlBQVksR0FBRyxNQUFNLDJCQUFXLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzVELElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSw0QkFBWSxDQUFDO2dCQUM3QixFQUFFLEVBQUUsR0FBRztnQkFDUCxJQUFJLEVBQUUsTUFBTTtnQkFDWixDQUFDLEVBQUUsR0FBRztnQkFDTixDQUFDLEVBQUUsSUFBSTtnQkFDUCxJQUFJLEVBQUUsR0FBRztnQkFDVCxPQUFPLEVBQUUsSUFBSTtnQkFDYixLQUFLLEVBQUUsQ0FBQztnQkFDUixNQUFNLEVBQUUsR0FBRztnQkFDWCxVQUFVLEVBQUUsSUFBSyxDQUFDLE1BQU07Z0JBQ3hCLFFBQVEsRUFBRSxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQzthQUN0QyxDQUFDLENBQUM7WUFFSCxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBRXBELFlBQVk7WUFDWixNQUFNLEtBQUssR0FBRyxVQUFVLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQztZQUN0QyxNQUFNLE1BQU0sR0FBRyxHQUFHLENBQUM7WUFFbkIsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLElBQUksZ0NBQWMsQ0FBQztnQkFDMUMsRUFBRSxFQUFFLFVBQVU7Z0JBQ2QsQ0FBQyxFQUFFLFVBQVUsQ0FBQyxNQUFNLENBQUMsS0FBSyxHQUFHLENBQUM7Z0JBQzlCLENBQUMsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7Z0JBQ3ZDLENBQUMsRUFBRSxLQUFLO2dCQUNSLENBQUMsRUFBRSxNQUFNO2FBQ1YsQ0FBQyxDQUFDLENBQUM7WUFFSixzQkFBc0I7WUFDdEIsTUFBTSxPQUFNLFVBQVUsV0FBRSxDQUFDO1FBQzNCLENBQUM7S0FBQTtJQUVLLGVBQWUsQ0FBQyxNQUFvQjs7Ozs7WUFDeEMsK0NBQStDO1lBQy9DLCtDQUErQztZQUUvQywyREFBMkQ7WUFDM0QsMENBQTBDO1lBQzFDLDBCQUEwQjtZQUMxQiwrQ0FBK0M7WUFDL0MsT0FBTztZQUVQLHlDQUF5QztZQUN6Qyx1QkFBdUI7WUFDdkIsa0NBQWtDO1lBQ2xDLFFBQVE7WUFDUixJQUFJO1lBRUosT0FBTyxPQUFNLGVBQWUsWUFBQyxNQUFNLEVBQUU7UUFDdkMsQ0FBQztLQUFBOztBQW5GTSxpQkFBTSxHQUFjO0lBQ3pCLEVBQUUsRUFBRSxZQUFZO0lBQ2hCLElBQUksRUFBRSxnQkFBZ0I7SUFDdEIsUUFBUSxFQUFFLGNBQWM7SUFDeEIsS0FBSyxFQUFFLElBQUk7SUFDWCxNQUFNLEVBQUUsSUFBSTtJQUNaLGNBQWMsRUFBRSxnQ0FBaUIsQ0FBQyxLQUFLO0lBQ3ZDLGVBQWUsRUFBRSxDQUFDO0lBQ2xCLElBQUksRUFBRSxzQkFBTyxDQUFDLFFBQVE7SUFDdEIsU0FBUyxFQUFFLEVBQUUsR0FBRyxFQUFFO0lBQ2xCLGFBQWEsRUFBRSxFQUFFLEdBQUcsRUFBRTtDQUN2QixDQUFBO0FBWlUsZ0NBQVUifQ==