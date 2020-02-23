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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("./entities/user.entity");
const typeorm_2 = require("typeorm");
const crypto = require("crypto");
const roles_service_1 = require("../roles/roles.service");
const role_enum_1 = require("../roles/entities/role.enum");
let UsersService = class UsersService {
    constructor(roleService, userRepository) {
        this.roleService = roleService;
        this.userRepository = userRepository;
    }
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.userRepository.findOne({
                    where: {
                        email,
                    },
                });
            }
            catch (error) {
                common_1.Logger.error(error);
                return null;
            }
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.userRepository.findOne({
                    where: {
                        id,
                    },
                });
            }
            catch (error) {
                common_1.Logger.error(error);
                return null;
            }
        });
    }
    create(user) {
        return __awaiter(this, void 0, void 0, function* () {
            user.id = null;
            user.password = this.encryptPassword(user.password);
            user.isActive = false;
            try {
                const userRole = yield this.roleService.findByRoleCode(role_enum_1.RoleCode.USER);
                user.roles = [userRole];
                return yield this.userRepository.save(user);
            }
            catch (error) {
                common_1.Logger.error(error);
                return null;
            }
        });
    }
    save(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.userRepository.save(user);
            }
            catch (error) {
                common_1.Logger.error(error);
                return null;
            }
        });
    }
    encryptPassword(password) {
        return crypto.createHmac('sha256', password).digest('hex');
    }
};
UsersService = __decorate([
    common_1.Injectable(),
    __param(1, typeorm_1.InjectRepository(user_entity_1.User)),
    __metadata("design:paramtypes", [roles_service_1.RolesService,
        typeorm_2.Repository])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map