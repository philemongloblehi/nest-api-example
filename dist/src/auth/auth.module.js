"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
const jwt_1 = require("@nestjs/jwt");
const passport_1 = require("@nestjs/passport");
const auth_controller_1 = require("./auth.controller");
const auth_service_1 = require("./auth.service");
const jwt_strategy_1 = require("./strategies/jwt.strategy");
const users_module_1 = require("../api/users/users.module");
const appAuth_guard_1 = require("./guards/appAuth.guard");
const core_1 = require("@nestjs/core");
const roles_guard_1 = require("./guards/roles.guard");
const configuration_service_1 = require("../configuration/configuration.service");
let AuthModule = class AuthModule {
};
AuthModule = __decorate([
    common_1.Module({
        imports: [
            users_module_1.UsersModule,
            passport_1.PassportModule.register({ defaultStrategy: 'jwt' }),
            jwt_1.JwtModule.registerAsync({
                useFactory: (configService) => __awaiter(this, void 0, void 0, function* () {
                    return ({
                        secret: configService.get('JWT_SECRET_KEY'),
                        expiresIn: configService.get('JWT_EXPIRATION_DELAY'),
                    });
                }),
                inject: [configuration_service_1.ConfigurationService],
            }),
        ],
        controllers: [auth_controller_1.AuthController],
        providers: [
            {
                provide: core_1.APP_GUARD,
                useClass: appAuth_guard_1.AppAuthGuard,
            },
            auth_service_1.AuthService,
            jwt_strategy_1.JwtStrategy,
            appAuth_guard_1.AppAuthGuard,
            roles_guard_1.RolesGuard,
        ],
    })
], AuthModule);
exports.AuthModule = AuthModule;
//# sourceMappingURL=auth.module.js.map