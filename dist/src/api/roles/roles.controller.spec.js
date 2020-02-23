"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const roles_controller_1 = require("./roles.controller");
const role_entity_1 = require("./entities/role.entity");
const role_enum_1 = require("./entities/role.enum");
const roles_service_1 = require("./roles.service");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const roles = [
    {
        id: 1,
        code: role_enum_1.RoleCode.USER,
    },
];
describe('Roles Controller', () => {
    let controller;
    let service;
    beforeEach(() => __awaiter(this, void 0, void 0, function* () {
        const module = yield testing_1.Test.createTestingModule({
            controllers: [roles_controller_1.RolesController],
            providers: [
                {
                    provide: typeorm_1.getRepositoryToken(role_entity_1.Role),
                    useClass: typeorm_2.Repository,
                },
                roles_service_1.RolesService,
            ],
        }).compile();
        controller = module.get(roles_controller_1.RolesController);
        service = module.get(roles_service_1.RolesService);
    }));
    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
    describe('findAll', () => {
        it('should retrieve all roles', () => __awaiter(this, void 0, void 0, function* () {
            jest.spyOn(service, 'findAll').mockImplementation(() => Promise.resolve(roles));
            const retriveRoles = yield controller.findAll();
            expect(retriveRoles).toEqual(roles);
        }));
        it('should reject an error on roles retrieval', () => __awaiter(this, void 0, void 0, function* () {
            jest.spyOn(service, 'findAll').mockImplementation(() => Promise.resolve(null));
            let isErrorCatch = false;
            try {
                yield controller.findAll();
            }
            catch (error) {
                isErrorCatch = true;
                expect(error).toEqual(new common_1.HttpException('unable to retrieve roles', common_1.HttpStatus.INTERNAL_SERVER_ERROR));
            }
            expect(isErrorCatch).toBeTruthy();
        }));
    });
});
//# sourceMappingURL=roles.controller.spec.js.map