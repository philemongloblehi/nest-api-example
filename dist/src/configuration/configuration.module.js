"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const configuration_service_1 = require("./configuration.service");
let ConfigurationModule = class ConfigurationModule {
};
ConfigurationModule = __decorate([
    common_1.Module({
        providers: [
            {
                provide: configuration_service_1.ConfigurationService,
                useValue: new configuration_service_1.ConfigurationService(`environments/${process.env.NODE_ENV}.env`),
            },
        ],
        exports: [configuration_service_1.ConfigurationService],
    })
], ConfigurationModule);
exports.ConfigurationModule = ConfigurationModule;
//# sourceMappingURL=configuration.module.js.map