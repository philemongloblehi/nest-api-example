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
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const roles_service_1 = require("./roles.service");
const roles_guard_1 = require("../../auth/guards/roles.guard");
const role_decorator_1 = require("../../auth/decorators/role.decorator");
const role_enum_1 = require("./entities/role.enum");
const swagger_1 = require("@nestjs/swagger");
let RolesController = class RolesController {
    constructor(roleService) {
        this.roleService = roleService;
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const roles = yield this.roleService.findAll();
            if (!roles) {
                throw new common_1.HttpException('unable to retrieve roles', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
            return roles;
        });
    }
};
__decorate([
    common_1.Get(),
    common_1.UseGuards(roles_guard_1.RolesGuard),
    role_decorator_1.Roles(role_enum_1.RoleCode.ADMIN, role_enum_1.RoleCode.USER),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RolesController.prototype, "findAll", null);
RolesController = __decorate([
    swagger_1.ApiBearerAuth(),
    swagger_1.ApiUseTags('roles'),
    common_1.Controller('api/roles'),
    __metadata("design:paramtypes", [roles_service_1.RolesService])
], RolesController);
exports.RolesController = RolesController;
//# sourceMappingURL=roles.controller.js.map