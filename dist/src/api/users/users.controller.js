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
const users_service_1 = require("./users.service");
const roles_guard_1 = require("../../auth/guards/roles.guard");
const role_decorator_1 = require("../../auth/decorators/role.decorator");
const role_enum_1 = require("../roles/entities/role.enum");
const usersRoles_dto_1 = require("./dtos/usersRoles.dto");
const swagger_1 = require("@nestjs/swagger");
let UsersController = class UsersController {
    constructor(usersService) {
        this.usersService = usersService;
    }
    setUsersRole(userId, usersRolesDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.usersService.findById(userId);
            if (!user) {
                throw new common_1.HttpException(`User [ID=${userId}] not found`, common_1.HttpStatus.NOT_FOUND);
            }
            user.roles = usersRolesDto.roles;
            const updatedUser = yield this.usersService.save(user);
            if (!updatedUser) {
                throw new common_1.HttpException(`Error while updating User [ID=${userId}]`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
            return updatedUser;
        });
    }
    setActivation(userId, active) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!active || (active !== 'true' && active !== 'false')) {
                throw new common_1.HttpException(`The active query param must be set to \'true\' or \'false\'`, common_1.HttpStatus.BAD_REQUEST);
            }
            const isActive = active === 'true';
            const user = yield this.usersService.findById(userId);
            if (!user) {
                throw new common_1.HttpException(`User [ID=${userId}] not found`, common_1.HttpStatus.NOT_FOUND);
            }
            user.isActive = isActive;
            const updatedUser = yield this.usersService.save(user);
            if (!updatedUser) {
                throw new common_1.HttpException(`Error while updating User [ID=${userId}]`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
            return updatedUser;
        });
    }
};
__decorate([
    common_1.Post(':userId/roles'),
    common_1.UseGuards(roles_guard_1.RolesGuard),
    role_decorator_1.Roles(role_enum_1.RoleCode.ADMIN),
    __param(0, common_1.Param('userId')), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, usersRoles_dto_1.UsersRolesDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "setUsersRole", null);
__decorate([
    common_1.Get(':userId/activation'),
    common_1.UseGuards(roles_guard_1.RolesGuard),
    role_decorator_1.Roles(role_enum_1.RoleCode.ADMIN),
    __param(0, common_1.Param('userId')), __param(1, common_1.Query('active')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "setActivation", null);
UsersController = __decorate([
    swagger_1.ApiBearerAuth(),
    swagger_1.ApiUseTags('users'),
    common_1.Controller('api/users'),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
exports.UsersController = UsersController;
//# sourceMappingURL=users.controller.js.map