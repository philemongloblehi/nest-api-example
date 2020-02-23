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
const roles_service_1 = require("./roles.service");
const role_entity_1 = require("./entities/role.entity");
const role_enum_1 = require("./entities/role.enum");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const common_1 = require("@nestjs/common");
jest.mock('@nestjs/common', () => {
    var _a;
    return (Object.assign({}, jest.requireActual('@nestjs/common'), { Logger: (_a = class {
                constructor() {
                    this.log = jest.fn();
                }
            },
            _a.error = jest.fn(),
            _a.overrideLogger = jest.fn(),
            _a) }));
});
const roles = [
    {
        id: 1,
        code: role_enum_1.RoleCode.USER,
    },
];
describe('RolesService', () => {
    let service;
    let repository;
    beforeEach(() => __awaiter(this, void 0, void 0, function* () {
        const module = yield testing_1.Test.createTestingModule({
            providers: [
                {
                    provide: typeorm_2.getRepositoryToken(role_entity_1.Role),
                    useClass: typeorm_1.Repository,
                },
                roles_service_1.RolesService,
            ],
        }).compile();
        service = module.get(roles_service_1.RolesService);
        repository = module.get(typeorm_2.getRepositoryToken(role_entity_1.Role));
    }));
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
    describe('findAll', () => {
        it('should retrieve all roles', () => __awaiter(this, void 0, void 0, function* () {
            jest.spyOn(repository, 'find').mockImplementation(() => Promise.resolve(roles));
            const expectedRoles = yield service.findAll();
            expect(expectedRoles).toEqual(roles);
        }));
        it('should throw an error when retrieve all roles', () => __awaiter(this, void 0, void 0, function* () {
            jest.spyOn(repository, 'find').mockImplementation(() => Promise.reject('find_findAll_error'));
            const expectedRoles = yield service.findAll();
            expect(common_1.Logger.error).toHaveBeenCalledWith('find_findAll_error');
            expect(expectedRoles).toBeNull();
        }));
    });
    describe('findByRoleCode', () => {
        it('should retrieve a role by role code', () => __awaiter(this, void 0, void 0, function* () {
            jest.spyOn(repository, 'findOne').mockImplementation(() => Promise.resolve(roles[0]));
            const requestedRole = yield service.findByRoleCode(role_enum_1.RoleCode.USER);
            expect(repository.findOne).toHaveBeenCalled();
            expect(requestedRole).toEqual(roles[0]);
        }));
        it('should not retrieve a role', () => __awaiter(this, void 0, void 0, function* () {
            jest.spyOn(repository, 'findOne').mockImplementation(() => Promise.reject('findOne_findByRoleCode_error'));
            const requestedRole = yield service.findByRoleCode(role_enum_1.RoleCode.USER);
            expect(common_1.Logger.error).toHaveBeenCalledWith('findOne_findByRoleCode_error');
            expect(requestedRole).toBeNull();
        }));
    });
});
//# sourceMappingURL=roles.service.spec.js.map