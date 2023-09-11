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
exports.SkillChecking = void 0;
const skills_module_1 = require("../skills/skills.module");
const matchs_room_1 = require("../matchs.room");
const matchs_types_1 = require("../matchs.types");
const player_schema_1 = require("../schemas/player.schema");
const user_schema_1 = require("../schemas/user.schema");
const types_1 = require("../../weapons/types");
const matchs_router_1 = require("../matchs.router");
class SkillChecking extends matchs_room_1.MatchRoom {
    onCreate(_) {
        this.mapConfig = SkillChecking.config;
        this.ignoreAuth = true;
        return super.onCreate();
    }
    onAuth(client, params) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = new user_schema_1.UserSchema({
                id: client.sessionId,
                userId: "EX",
                isHost: true,
                teamId: 'A',
                name: "Name",
                data: "",
                avatar: '',
            });
            this.state.users.set(user.id, user);
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
                id: "Tester",
                name: "Tester",
                variant: player_schema_1.PlayerVariant.PERSONAL_I,
                weaponVariant: types_1.WeaponVariant.PERSONAL_I,
                x: 300,
                y: 500,
                size: 5.5,
                totalHp: 2000,
                speed: 3,
                teamId: 'A',
                controller: host.id,
                skillIds: playerSkills.map(v => v.id),
            });
            this.state.players.set(this.player.id, this.player);
            // Monster
            this.monster = new player_schema_1.PlayerSchema({
                id: 'NPC',
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
            // // Platforms
            // const width = SkillChecking.config.width;
            // const height = 350;
            // this.state.platforms.add(new PlatformSchema({
            //   id: 'platform',
            //   x: SkillChecking.config.width / 2,
            //   y: this.mapConfig.height - (height / 2),
            //   w: width,
            //   h: height,
            // }));
            // Required IMPORTANT!
            yield _super.initialize.call(this);
            this.broadcast('MAP_CONFIG', { data: matchs_router_1.mapConfigs });
        });
    }
    control() {
        return __awaiter(this, void 0, void 0, function* () {
            this.player.isInTurn = true;
            this.broadcast(matchs_types_1.GameEvent.SERVER_PLAYER_TURN, this.player.id);
            this.emitter.on(matchs_types_1.GameEvent.USER_TEST_PLAYER_GET_SKILL_PARAMS, ({ client, payload }) => {
                const skillParams = this.player.getSkillParms({
                    matchRoom: this, strengthPercent: payload.strengthPercent,
                    targets: [this.monster],
                    dataPixel: payload.dataPixel,
                });
                client.send(matchs_types_1.GameEvent.SERVER_TEST_PLAYER_RESPONSE_SKILL_PARAMS, skillParams);
            });
            this.emitter.on(matchs_types_1.GameEvent.USER_TEST_PLAYER_PERFORM_SKILL, ({ payload }) => {
                this.monster.remainHp = this.monster.totalHp;
                this.player.useSkill({ skillId: payload.skillId, matchRoom: this });
                this.player.performSkill({
                    matchRoom: this,
                    strengthPercent: payload.strengthPercent,
                    dataPixel: payload.dataPixel,
                    onSkillCheckingResult: (result) => {
                        this.broadcast(matchs_types_1.GameEvent.SERVER_TEST_SKILL_CHECKING_RESULT, result);
                    }
                });
            });
            yield new Promise(() => { });
        });
    }
}
SkillChecking.config = {
    id: "SkillChecking",
    name: "SkillChecking",
    assetUrl: '/demo/maps/1',
    width: 2645,
    height: 1080,
    backgroundMode: matchs_types_1.MapBackgroundMode.LIGHT,
    numberOfPlayers: 1,
    mode: matchs_types_1.MapMode.DEMO_SKILL,
    totalTime: 60 * 15,
    totalTurnTime: 15,
};
exports.SkillChecking = SkillChecking;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2tpbGxDaGVja2luZy5tYXAuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbW9kdWxlcy9tYXRjaHMvbWFwcy9Ta2lsbENoZWNraW5nLm1hcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFDQSwyREFBc0Q7QUFDdEQsZ0RBQTJDO0FBQzNDLGtEQUFtRjtBQUVuRiw0REFBdUU7QUFDdkUsd0RBQW9EO0FBQ3BELCtDQUFvRDtBQUNwRCxvREFBOEM7QUFFOUMsTUFBYSxhQUFjLFNBQVEsdUJBQVM7SUFvQjFDLFFBQVEsQ0FBQyxDQUFPO1FBQ2QsSUFBSSxDQUFDLFNBQVMsR0FBRyxhQUFhLENBQUMsTUFBTSxDQUFDO1FBQ3RDLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO1FBQ3ZCLE9BQU8sS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQzFCLENBQUM7SUFFYyxNQUFNLENBQUMsTUFBYyxFQUFFLE1BQVk7O1lBQ2hELE1BQU0sSUFBSSxHQUFHLElBQUksd0JBQVUsQ0FBQztnQkFDMUIsRUFBRSxFQUFFLE1BQU0sQ0FBQyxTQUFTO2dCQUNwQixNQUFNLEVBQUUsSUFBSTtnQkFDWixNQUFNLEVBQUUsSUFBSTtnQkFDWixNQUFNLEVBQUUsR0FBRztnQkFDWCxJQUFJLEVBQUUsTUFBTTtnQkFDWixJQUFJLEVBQUUsRUFBRTtnQkFDUixNQUFNLEVBQUUsRUFBRTthQUNYLENBQUMsQ0FBQztZQUNILElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQ3BDLE9BQU8sSUFBSSxDQUFDO1FBQ2QsQ0FBQztLQUFBO0lBRUssVUFBVTs7Ozs7WUFDZCxTQUFTO1lBQ1QsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQzVCLE1BQU0sWUFBWSxHQUFHLE1BQU0sMkJBQVcsQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDNUQsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLDRCQUFZLENBQUM7Z0JBQzdCLEVBQUUsRUFBRSxRQUFRO2dCQUNaLElBQUksRUFBRSxRQUFRO2dCQUNkLE9BQU8sRUFBRSw2QkFBYSxDQUFDLFVBQVU7Z0JBQ2pDLGFBQWEsRUFBRSxxQkFBYSxDQUFDLFVBQVU7Z0JBQ3ZDLENBQUMsRUFBRSxHQUFHO2dCQUNOLENBQUMsRUFBRSxHQUFHO2dCQUNOLElBQUksRUFBRSxHQUFHO2dCQUNULE9BQU8sRUFBRSxJQUFJO2dCQUNiLEtBQUssRUFBRSxDQUFDO2dCQUNSLE1BQU0sRUFBRSxHQUFHO2dCQUNYLFVBQVUsRUFBRSxJQUFJLENBQUMsRUFBRTtnQkFDbkIsUUFBUSxFQUFFLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO2FBQ3RDLENBQUMsQ0FBQztZQUVILElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7WUFFcEQsVUFBVTtZQUNWLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSw0QkFBWSxDQUFDO2dCQUM5QixFQUFFLEVBQUUsS0FBSztnQkFDVCxJQUFJLEVBQUUsS0FBSztnQkFDWCxJQUFJLEVBQUUsR0FBRztnQkFDVCxNQUFNLEVBQUUsSUFBSTtnQkFDWixDQUFDLEVBQUUsSUFBSTtnQkFDUCxDQUFDLEVBQUUsR0FBRztnQkFDTixLQUFLLEVBQUUsQ0FBQztnQkFDUixPQUFPLEVBQUUsSUFBSTtnQkFDYixNQUFNLEVBQUUsR0FBRztnQkFDWCxVQUFVLEVBQUUsS0FBSztnQkFDakIsUUFBUSxFQUFFLEVBQUU7YUFDYixDQUFDLENBQUM7WUFDSCxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBRXRELGVBQWU7WUFDZiw0Q0FBNEM7WUFDNUMsc0JBQXNCO1lBRXRCLGdEQUFnRDtZQUNoRCxvQkFBb0I7WUFDcEIsdUNBQXVDO1lBQ3ZDLDZDQUE2QztZQUM3QyxjQUFjO1lBQ2QsZUFBZTtZQUNmLE9BQU87WUFFUCxzQkFBc0I7WUFDdEIsTUFBTSxPQUFNLFVBQVUsV0FBRSxDQUFDO1lBQ3pCLElBQUksQ0FBQyxTQUFTLENBQUMsWUFBWSxFQUFFLEVBQUUsSUFBSSxFQUFFLDBCQUFVLEVBQUUsQ0FBQyxDQUFBO1FBQ3BELENBQUM7S0FBQTtJQUVLLE9BQU87O1lBQ1gsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1lBQzVCLElBQUksQ0FBQyxTQUFTLENBQUMsd0JBQVMsQ0FBQyxrQkFBa0IsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBRTdELElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLHdCQUFTLENBQUMsaUNBQWlDLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFO2dCQUNuRixNQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQztvQkFDNUMsU0FBUyxFQUFFLElBQUksRUFBRSxlQUFlLEVBQUUsT0FBTyxDQUFDLGVBQWU7b0JBQ3pELE9BQU8sRUFBRSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7b0JBQ3ZCLFNBQVMsRUFBRSxPQUFPLENBQUMsU0FBUztpQkFDN0IsQ0FBQyxDQUFDO2dCQUNILE1BQU0sQ0FBQyxJQUFJLENBQUMsd0JBQVMsQ0FBQyx3Q0FBd0MsRUFBRSxXQUFXLENBQUMsQ0FBQztZQUMvRSxDQUFDLENBQUMsQ0FBQTtZQUVGLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLHdCQUFTLENBQUMsOEJBQThCLEVBQUUsQ0FBQyxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUU7Z0JBQ3hFLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDO2dCQUM3QyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxFQUFFLE9BQU8sRUFBRSxPQUFPLENBQUMsT0FBTyxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFBO2dCQUNuRSxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQztvQkFDdkIsU0FBUyxFQUFFLElBQUk7b0JBQ2YsZUFBZSxFQUFFLE9BQU8sQ0FBQyxlQUFlO29CQUN4QyxTQUFTLEVBQUUsT0FBTyxDQUFDLFNBQVM7b0JBQzVCLHFCQUFxQixFQUFFLENBQUMsTUFBTSxFQUFFLEVBQUU7d0JBQ2hDLElBQUksQ0FBQyxTQUFTLENBQUMsd0JBQVMsQ0FBQyxpQ0FBaUMsRUFBRSxNQUFNLENBQUMsQ0FBQTtvQkFDckUsQ0FBQztpQkFDRixDQUFDLENBQUE7WUFDSixDQUFDLENBQUMsQ0FBQTtZQUVGLE1BQU0sSUFBSSxPQUFPLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDL0IsQ0FBQztLQUFBOztBQXhITSxvQkFBTSxHQUFjO0lBQ3pCLEVBQUUsRUFBRSxlQUFlO0lBQ25CLElBQUksRUFBRSxlQUFlO0lBQ3JCLFFBQVEsRUFBRSxjQUFjO0lBQ3hCLEtBQUssRUFBRSxJQUFJO0lBQ1gsTUFBTSxFQUFFLElBQUk7SUFDWixjQUFjLEVBQUUsZ0NBQWlCLENBQUMsS0FBSztJQUN2QyxlQUFlLEVBQUUsQ0FBQztJQUNsQixJQUFJLEVBQUUsc0JBQU8sQ0FBQyxVQUFVO0lBQ3hCLFNBQVMsRUFBRSxFQUFFLEdBQUcsRUFBRTtJQUNsQixhQUFhLEVBQUUsRUFBRTtDQUNsQixDQUFBO0FBWlUsc0NBQWEifQ==