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
const auth_service_1 = require("./auth.service");
const public_decorator_1 = require("./decorators/public.decorator");
const userRegistration_dto_1 = require("../api/users/dtos/userRegistration.dto");
const userLogin_dto_1 = require("../api/users/dtos/userLogin.dto");
const swagger_1 = require("@nestjs/swagger");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    login(userLoginDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const validatedUser = yield this.authService.validate(userLoginDto);
            if (!validatedUser) {
                throw new common_1.HttpException('user not found', common_1.HttpStatus.NOT_FOUND);
            }
            return this.authService.login(validatedUser);
        });
    }
    register(userRegistrationDto) {
        return __awaiter(this, void 0, void 0, function* () {
            if (userRegistrationDto.password !== userRegistrationDto.confirmPassword) {
                throw new common_1.HttpException('passwords do not match', common_1.HttpStatus.BAD_REQUEST);
            }
            const userRegistered = yield this.authService.register(userRegistrationDto);
            if (!userRegistered) {
                throw new common_1.HttpException(`error while registering user[Email=${userRegistrationDto.email}]`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
            return this.authService.register(userRegistrationDto);
        });
    }
};
__decorate([
    public_decorator_1.Public(),
    common_1.Post('login'),
    common_1.UseInterceptors(common_1.ClassSerializerInterceptor),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [userLogin_dto_1.UserLoginDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    public_decorator_1.Public(),
    common_1.Post('register'),
    common_1.UseInterceptors(common_1.ClassSerializerInterceptor),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [userRegistration_dto_1.UserRegistrationDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
AuthController = __decorate([
    swagger_1.ApiUseTags('authentification'),
    common_1.Controller('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map