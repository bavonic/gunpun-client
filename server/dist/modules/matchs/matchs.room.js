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
exports.MatchRoom = void 0;
const schema_1 = require("@colyseus/schema");
const colyseus_1 = require("colyseus");
const AppConfigs_1 = require("../../AppConfigs");
const emitter_1 = require("../../modules/emitter");
const blockchain_1 = require("../../shared/blockchain");
const utils_1 = require("../../utils");
const module_1 = require("../match-histories/module");
const module_2 = require("../users/module");
const matchs_types_1 = require("./matchs.types");
const platform_schema_1 = require("./schemas/platform.schema");
const player_schema_1 = require("./schemas/player.schema");
const user_schema_1 = require("./schemas/user.schema");
class State extends schema_1.Schema {
    constructor() {
        super(...arguments);
        this.name = '';
        this.users = new schema_1.MapSchema();
        this.players = new schema_1.MapSchema();
        this.platforms = new schema_1.CollectionSchema();
        this.preparingTime = ['develop', 'staging'].includes((0, AppConfigs_1.getEnv)('ENV')) ? 5 : 15;
        this.timeRemain = 0;
        this.turnTimeRemain = 0;
        this.turnTime = 0;
        this.windLevel = 0;
        this.winDirection = 'RIGHT';
    }
}
__decorate([
    (0, schema_1.type)('string'),
    __metadata("design:type", Object)
], State.prototype, "name", void 0);
__decorate([
    (0, schema_1.type)({ map: user_schema_1.UserSchema }),
    __metadata("design:type", Object)
], State.prototype, "users", void 0);
__decorate([
    (0, schema_1.type)({ map: player_schema_1.PlayerSchema }),
    __metadata("design:type", Object)
], State.prototype, "players", void 0);
__decorate([
    (0, schema_1.type)({ collection: platform_schema_1.PlatformSchema }),
    __metadata("design:type", Object)
], State.prototype, "platforms", void 0);
__decorate([
    (0, schema_1.type)('number'),
    __metadata("design:type", Object)
], State.prototype, "preparingTime", void 0);
__decorate([
    (0, schema_1.type)('number'),
    __metadata("design:type", Object)
], State.prototype, "timeRemain", void 0);
__decorate([
    (0, schema_1.type)('number'),
    __metadata("design:type", Object)
], State.prototype, "turnTimeRemain", void 0);
__decorate([
    (0, schema_1.type)('number'),
    __metadata("design:type", Object)
], State.prototype, "turnTime", void 0);
__decorate([
    (0, schema_1.type)('number'),
    __metadata("design:type", Object)
], State.prototype, "windLevel", void 0);
__decorate([
    (0, schema_1.type)('string'),
    __metadata("design:type", String)
], State.prototype, "winDirection", void 0);
class MatchRoom extends colyseus_1.Room {
    constructor() {
        super(...arguments);
        this.ignoreAuth = false;
    }
    onCreate(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            this.emitter = new emitter_1.Emitter();
            this.setState(new State());
            this.listenEventFromUsers();
            this.handler();
            this.setMetadata(Object.assign(Object.assign({}, this.metadata), { mapConfig: this.mapConfig }));
        });
    }
    onAuth(client, params) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!params || !params.auth)
                throw Error("UNAUTHORIZED");
            if (this.state.users.size >= this.mapConfig.numberOfPlayers)
                throw Error("ENOUGH_USERS");
            let teamASize = 0;
            let teamBSize = 0;
            this.state.users.forEach((u) => {
                if (u.teamId === 'A')
                    teamASize += 1;
                if (u.teamId === 'B')
                    teamBSize += 1;
            });
            const userData = yield module_2.UserModule.auth(params.auth);
            const user = new user_schema_1.UserSchema({
                id: client.sessionId,
                userId: userData._id,
                isHost: this.state.users.size === 0,
                teamId: teamASize <= teamBSize ? 'A' : 'B',
                name: userData.nickname || userData.name,
                avatar: userData.avatar,
            });
            this.state.users.set(user.id, user);
            if (user.isHost) {
                this.setMetadata(Object.assign(Object.assign({}, this.metadata), { hostAvatar: userData.avatar, hostName: userData.nickname, createdAt: utils_1.DateTimeUtils.timeToSeconds() }));
            }
            return user;
        });
    }
    onJoin(client) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`Client ${client.id} joined ${this.roomId}`);
            this.onMessage(matchs_types_1.GameEvent.JOIN_WAITING_ROOM, () => {
                this.broadcast(matchs_types_1.GameEvent.JOIN_WAITING_ROOM);
            });
        });
    }
    onLeave(client) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = this.getUser(client);
            if (!user)
                return;
            if (user.isHost) {
                this.broadcast(matchs_types_1.GameEvent.HOST_WAITING_ROOM);
                this.disconnect();
                return;
            }
            yield this.deleteUser(client);
            console.log(`Client ${client.id} leaved`);
            this.broadcast(matchs_types_1.GameEvent.OUT_WAITING_ROOM);
        });
    }
    onDispose() {
        return __awaiter(this, void 0, void 0, function* () {
            this.emitter.removeAllListeners();
            console.log(`Room ${this.roomId} dispose`);
        });
    }
    registerEvent(event) {
        this.onMessage(event, (client, payload) => {
            this.emitter.emit(event, { client, payload });
        });
    }
    listenEventFromUsers() {
        Object.values(matchs_types_1.GameEvent).map((event) => {
            const isUser = event.indexOf('USER_') === 0;
            if (isUser)
                this.registerEvent(event);
        });
    }
    handler() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            // ======================= Stage: Setup =======================
            // User change team
            this.emitter.on(matchs_types_1.GameEvent.USER_CHANGE_TEAM, ({ client, payload: teamId }) => {
                const user = this.getUser(client);
                if (!user || !['A', 'B'].includes(teamId))
                    return;
                let teamSize = 0;
                this.state.users.forEach((u) => {
                    if (u.teamId === teamId)
                        teamSize += 1;
                });
                if (teamSize >= this.mapConfig.numberOfPlayers / 2)
                    return;
                user.teamId = teamId;
                let users = [];
                this.state.users.forEach(u => users.push(u.toJSON()));
                this.broadcast(matchs_types_1.GameEvent.SERVER_UPDATE_USERS, users);
            });
            // User ready
            const listenerUserReady = this.emitter.on(matchs_types_1.GameEvent.USER_READY, ({ client, payload }) => {
                const user = this.getUser(client);
                if (user)
                    user.isReady = !!payload;
            });
            // Host start
            yield new Promise((resolve) => {
                const listener = this.emitter.on(matchs_types_1.GameEvent.USER_START, ({ client }) => {
                    // Make sure user is HOST
                    const user = this.getUser(client);
                    const isEnoughUsers = this.state.users.size >= this.mapConfig.numberOfPlayers;
                    if (!user || !user.isHost || !isEnoughUsers)
                        return;
                    // Make sure all user is ready
                    let isAllUserReady = true;
                    this.state.users.forEach((user) => isAllUserReady = user.isReady);
                    if (!isAllUserReady)
                        return;
                    listener.destroy();
                    listenerUserReady.destroy();
                    resolve(true);
                });
            });
            // ======================= Stage: User Preparing =======================
            yield new Promise((resolve) => {
                if (this.ignoreAuth)
                    return resolve(true);
                const listenerUserSelectSkills = this.emitter.on(matchs_types_1.GameEvent.USER_SELECT_SKILLS, ({ client, payload }) => {
                    const user = this.getUser(client);
                    if (user)
                        user.setSkills(payload);
                });
                const interval = setInterval(() => {
                    this.state.preparingTime -= 1;
                    if (this.state.preparingTime === 0) {
                        clearInterval(interval);
                        listenerUserSelectSkills.destroy();
                        resolve(true);
                    }
                }, 1000);
                this.broadcast(matchs_types_1.GameEvent.SERVER_START_USERS_PREPARING);
            });
            // ======================= Stage: Initialize Map =======================
            this.broadcast(matchs_types_1.GameEvent.SERVER_INITIALIZE_MATCH);
            yield this.initialize();
            // Preload assets
            yield new Promise((resolve) => {
                const listener = this.emitter.on(matchs_types_1.GameEvent.USER_PRELOAD_ASSETS_COMPLETED, ({ client, payload }) => __awaiter(this, void 0, void 0, function* () {
                    const user = this.getUser(client);
                    if (user)
                        user.isLoadedAssets = true;
                    // Make sure all users loaded assets
                    let isAllUserCompleted = true;
                    this.state.users.forEach((user) => isAllUserCompleted = user.isLoadedAssets);
                    if (!isAllUserCompleted)
                        return;
                    listener.destroy();
                    const positions = payload === null || payload === void 0 ? void 0 : payload.positions;
                    this.state.players.forEach((player) => {
                        const position = positions.find(v => v.id === player.id);
                        if (position) {
                            player.x = position.x;
                            player.y = position.y;
                        }
                    });
                    resolve(true);
                }));
                this.broadcast(matchs_types_1.GameEvent.SERVER_PRELOAD_ASSETS, { mapConfig: this.mapConfig });
            });
            // Perform intro
            let userCompletedCount = 0;
            yield new Promise((resolve) => {
                const listener = this.emitter.on(matchs_types_1.GameEvent.USER_PERFORM_INTRO_COMPLETED, ({ client }) => {
                    const user = this.getUser(client);
                    if (!user)
                        return;
                    // Make sure all users perform INTRO done
                    userCompletedCount += 1;
                    if (userCompletedCount !== this.state.users.size)
                        return;
                    listener.destroy();
                    resolve(true);
                });
                this.broadcast(matchs_types_1.GameEvent.SERVER_PERFORM_INTRO);
            });
            // ======================= Stage: Process =======================
            // Start match time
            this.state.timeRemain = this.mapConfig.totalTime;
            this.totalTimer = this.clock.setInterval(() => {
                var _a;
                if (this.state.timeRemain === 0) {
                    // End Time
                    this.totalTimer.pause();
                    (_a = this.turnTimer) === null || _a === void 0 ? void 0 : _a.pause();
                }
                else {
                    this.state.timeRemain -= 1;
                }
            }, 1000);
            this.clock.start();
            // Map Control
            yield this.control();
            // ======================= Stage: Finish =======================
            if (this.totalTimer)
                this.totalTimer.clear();
            if (this.turnTimer)
                (_a = this.turnTimer) === null || _a === void 0 ? void 0 : _a.clear();
        });
    }
    initialize() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.mapConfig)
                throw Error("MapConfig must be defined before.");
        });
    }
    control() {
        return __awaiter(this, void 0, void 0, function* () {
            let turnIndex = -1;
            const action = () => __awaiter(this, void 0, void 0, function* () {
                const result = this.checkResult();
                if (result) {
                    module_1.MatchHistoriesModule.capture({ roomId: this.roomId, map: this.mapConfig, result });
                    return this.broadcast(matchs_types_1.GameEvent.SERVER_MATCH_FINISHED, result);
                }
                this.state.turnTime += 1;
                let players = [];
                this.state.players.forEach(p => {
                    if (p.remainHp > 0)
                        players.push(p);
                });
                players = players.sort((a, b) => b.speed - a.speed);
                turnIndex += 1;
                this.state.players.forEach(p => p.recoverSkills());
                let player = players[turnIndex];
                if (!player) {
                    turnIndex = 0;
                    player = players[turnIndex];
                }
                yield this.startPlayerTurn(player);
                return action();
            });
            return action();
        });
    }
    getUser(client) {
        return this.state.users.get(client.sessionId);
    }
    deleteUser(client) {
        return this.state.users.delete(client.sessionId);
    }
    getPlayerInTurn() {
        let playerInTurn = undefined;
        this.state.players.forEach(p => {
            if (p.isInTurn)
                playerInTurn = p;
        });
        return playerInTurn;
    }
    getHost() {
        let userHost = undefined;
        this.state.users.forEach(user => {
            if (user.isHost)
                userHost = user;
        });
        return userHost;
    }
    checkResult() {
        if (this.state.timeRemain <= 0)
            return {
                isDraw: true,
                players: [],
                users: [],
            };
        let players = [];
        this.state.players.forEach(p => players.push(p));
        let users = [];
        this.state.users.forEach(p => users.push(p));
        let totalHpOfTeamA = 0;
        let totalHpOfTeamB = 0;
        players.map((p) => {
            if (p.teamId === 'A')
                totalHpOfTeamA += p.remainHp;
            if (p.teamId === 'B')
                totalHpOfTeamB += p.remainHp;
        });
        if (!!!totalHpOfTeamA || !!!totalHpOfTeamB) {
            const playerResult = players.map(v => (Object.assign(Object.assign({}, v), { isWin: v.teamId === 'A' ? !!!totalHpOfTeamB : !!!totalHpOfTeamA })));
            return {
                isDraw: false,
                players: playerResult.map((p) => ({
                    id: p.id,
                    isWin: p.isWin,
                    teamId: p.teamId,
                    controller: p.controller
                })),
                users: users.map(u => ({
                    id: u.userId,
                    teamId: u.teamId,
                    isWin: playerResult.filter(p => p.controller === u.userId).every(v => v.isWin),
                }))
            };
        }
        return undefined;
    }
    startPlayerTurn(player, delay = 2000) {
        return __awaiter(this, void 0, void 0, function* () {
            player.isInTurn = true;
            this.broadcast(matchs_types_1.GameEvent.SERVER_PLAYER_TURN, player.id);
            yield (0, blockchain_1.wait)(delay);
            yield new Promise((resolve) => {
                let listeners = [];
                const stopAllListeners = () => listeners.map(v => v.destroy());
                // ======================= Time Out =======================
                this.state.turnTimeRemain = this.mapConfig.totalTurnTime;
                this.turnTimer = this.clock.setInterval(() => {
                    var _a;
                    if (this.state.turnTimeRemain === 0) {
                        player.isInTurn = false;
                        (_a = this.turnTimer) === null || _a === void 0 ? void 0 : _a.clear();
                        this.broadcast(matchs_types_1.GameEvent.SERVER_PLAYER_TURN_TIMEOUT);
                        player.stopMove();
                        resolve(true);
                    }
                    else {
                        this.state.turnTimeRemain -= 1;
                    }
                }, 1000);
                // ======================= User Actions =======================
                listeners.push(this.emitter.on(matchs_types_1.GameEvent.USER_PLAYER_USE_SKILL, ({ client, payload: skillId }) => {
                    const playerInTurn = this.getPlayerInTurn();
                    const user = this.getUser(client);
                    if (!playerInTurn
                        || !user
                        || playerInTurn.controller !== user.userId)
                        return;
                    player.useSkill({ skillId, matchRoom: this });
                }));
                listeners.push(this.emitter.on(matchs_types_1.GameEvent.USER_PLAYER_MOVE, ({ client, payload }) => {
                    const user = this.getUser(client);
                    if (!player
                        || !user
                        || player.controller !== user.userId)
                        return;
                    player.move(payload);
                }));
                listeners.push(this.emitter.on(matchs_types_1.GameEvent.USER_PLAYER_STOP_MOVE, ({ client, payload }) => {
                    const user = this.getUser(client);
                    if (!player
                        || !user
                        || player.controller !== user.userId)
                        return;
                    player.stopMove();
                }));
                listeners.push(this.emitter.on(matchs_types_1.GameEvent.USER_PLAYER_INCREASE_RULER_ANGLE, ({ client }) => {
                    const playerInTurn = this.getPlayerInTurn();
                    const user = this.getUser(client);
                    if (!playerInTurn
                        || !user
                        || playerInTurn.controller !== user.userId)
                        return;
                    playerInTurn.increaseRulerAngle();
                }));
                listeners.push(this.emitter.on(matchs_types_1.GameEvent.USER_PLAYER_DECREASE_RULER_ANGLE, ({ client }) => {
                    const playerInTurn = this.getPlayerInTurn();
                    const user = this.getUser(client);
                    if (!playerInTurn
                        || !user
                        || playerInTurn.controller !== user.userId)
                        return;
                    playerInTurn.decreaseRulerAngle();
                }));
                listeners.push(this.emitter.once(matchs_types_1.GameEvent.USER_PLAYER_SHOT, (data) => __awaiter(this, void 0, void 0, function* () {
                    var _a;
                    const { client } = data;
                    const payload = data.payload;
                    const user = this.getUser(client);
                    // Validate
                    if (!player
                        || !user
                        || player.controller !== user.userId
                        || !payload
                        || typeof payload.strengthPercent !== 'number')
                        return;
                    (_a = this.turnTimer) === null || _a === void 0 ? void 0 : _a.pause();
                    stopAllListeners();
                    yield player.performSkill({
                        matchRoom: this,
                        strengthPercent: payload.strengthPercent,
                        dataPixel: payload.dataPixel,
                    });
                    resolve(true);
                })));
            });
            player.isInTurn = false;
            this.state.turnTimeRemain = 0;
        });
    }
    performNpcTurn(player, params) {
        return __awaiter(this, void 0, void 0, function* () {
            player.isInTurn = true;
            const performParams = Object.assign({ from: {
                    id: player.id, size: player.size, x: player.x, y: player.y,
                    teamId: player.teamId,
                } }, params);
            let userCompletedCount = 0;
            yield new Promise((resolve) => {
                const listener = this.emitter.on(matchs_types_1.GameEvent.USER_PERFORM_NPC_TURN_COMPLETED, ({ client }) => {
                    const user = this.getUser(client);
                    if (!user)
                        return;
                    userCompletedCount += 1;
                    if (userCompletedCount === this.state.users.size) {
                        params.playerEffecteds.map(({ id, damage }) => {
                            const player = this.state.players.get(id);
                            if (player)
                                player.minusHp(damage);
                        });
                        listener.destroy();
                        resolve(true);
                    }
                });
                this.broadcast(matchs_types_1.GameEvent.SERVER_PERFORM_NPC_TURN, performParams);
            });
            player.isInTurn = false;
        });
    }
}
exports.MatchRoom = MatchRoom;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0Y2hzLnJvb20uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbW9kdWxlcy9tYXRjaHMvbWF0Y2hzLnJvb20udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsNkNBQTZFO0FBQzdFLHVDQUFpRDtBQUNqRCxpREFBMEM7QUFFMUMsbURBQTZEO0FBQzdELHdEQUErQztBQUMvQyx1Q0FBNEM7QUFDNUMsc0RBQWlFO0FBQ2pFLDRDQUE2QztBQUM3QyxpREFBc0Q7QUFDdEQsK0RBQTJEO0FBQzNELDJEQUF1RDtBQUN2RCx1REFBbUQ7QUFHbkQsTUFBTSxLQUFNLFNBQVEsZUFBTTtJQUExQjs7UUFFRSxTQUFJLEdBQUcsRUFBRSxDQUFDO1FBR1YsVUFBSyxHQUFHLElBQUksa0JBQVMsRUFBYyxDQUFDO1FBR3BDLFlBQU8sR0FBRyxJQUFJLGtCQUFTLEVBQWdCLENBQUM7UUFHeEMsY0FBUyxHQUFHLElBQUkseUJBQWdCLEVBQWtCLENBQUM7UUFHbkQsa0JBQWEsR0FBRyxDQUFDLFNBQVMsRUFBRSxTQUFTLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBQSxtQkFBTSxFQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1FBR3hFLGVBQVUsR0FBRyxDQUFDLENBQUM7UUFHZixtQkFBYyxHQUFHLENBQUMsQ0FBQztRQUduQixhQUFRLEdBQUcsQ0FBQyxDQUFDO1FBR2IsY0FBUyxHQUFHLENBQUMsQ0FBQztRQUdkLGlCQUFZLEdBQWtCLE9BQU8sQ0FBQztJQUN4QyxDQUFDO0NBQUE7QUE1QkM7SUFEQyxJQUFBLGFBQUksRUFBQyxRQUFRLENBQUM7O21DQUNMO0FBR1Y7SUFEQyxJQUFBLGFBQUksRUFBQyxFQUFFLEdBQUcsRUFBRSx3QkFBVSxFQUFFLENBQUM7O29DQUNVO0FBR3BDO0lBREMsSUFBQSxhQUFJLEVBQUMsRUFBRSxHQUFH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