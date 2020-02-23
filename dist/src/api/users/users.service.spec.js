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
const users_service_1 = require("./users.service");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./entities/user.entity");
const roles_service_1 = require("../roles/roles.service");
const role_entity_1 = require("../roles/entities/role.entity");
const role_enum_1 = require("../roles/entities/role.enum");
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
const user = {
    id: 1,
    email: 'user@user.com',
    isActive: false,
    password: 'user',
    roles: [],
};
const role = { id: 1, code: role_enum_1.RoleCode.USER };
const encryptedPassword = 'fa2a968f6fb053f4edf9a0fc19b95e543eff5324395fd26e983cad9be7f114e5';
describe('UsersService', () => {
    let service;
    let repository;
    let roleService;
    beforeEach(() => __awaiter(this, void 0, void 0, function* () {
        const module = yield testing_1.Test.createTestingModule({
            providers: [
                {
                    provide: typeorm_1.getRepositoryToken(user_entity_1.User),
                    useClass: typeorm_2.Repository,
                },
                {
                    provide: typeorm_1.getRepositoryToken(role_entity_1.Role),
                    useClass: typeorm_2.Repository,
                },
                users_service_1.UsersService,
                roles_service_1.RolesService,
            ],
        }).compile();
        service = module.get(users_service_1.UsersService);
        roleService = module.get(roles_service_1.RolesService);
        repository = module.get(typeorm_1.getRepositoryToken(user_entity_1.User));
    }));
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
    describe('findByEmail', () => {
        it('should retrieve a user by email', () => __awaiter(this, void 0, void 0, function* () {
            jest.spyOn(repository, 'findOne').mockImplementation(() => Promise.resolve(user));
            const requestedUser = yield service.findByEmail(user.email);
            expect(repository.findOne).toHaveBeenCalledWith({ where: { email: user.email } });
            expect(requestedUser).toEqual(user);
        }));
        it('should throw an error when retrieve a user by email', () => __awaiter(this, void 0, void 0, function* () {
            jest.spyOn(repository, 'findOne').mockImplementation(() => Promise.reject('findOne_findByEmail_error'));
            const userCreated = yield service.findByEmail(user.email);
            expect(common_1.Logger.error).toHaveBeenCalledWith('findOne_findByEmail_error');
            expect(userCreated).toBeNull();
        }));
    });
    describe('findById', () => {
        it('should retrieve a user by id', () => __awaiter(this, void 0, void 0, function* () {
            jest.spyOn(repository, 'findOne').mockImplementation(() => Promise.resolve(user));
            const requestedUser = yield service.findById(user.id);
            expect(repository.findOne).toHaveBeenCalledWith({ where: { id: user.id } });
            expect(requestedUser).toEqual(user);
        }));
        it('should throw an error when retrieve a user by email', () => __awaiter(this, void 0, void 0, function* () {
            jest.spyOn(repository, 'findOne').mockImplementation(() => Promise.reject('findOne_findById_error'));
            const userCreated = yield service.findById(user.id);
            expect(common_1.Logger.error).toHaveBeenCalledWith('findOne_findById_error');
            expect(userCreated).toBeNull();
        }));
    });
    describe('create', () => {
        it('should create a user', () => __awaiter(this, void 0, void 0, function* () {
            jest.spyOn(roleService, 'findByRoleCode').mockImplementation(() => Promise.resolve(role));
            jest.spyOn(repository, 'save').mockImplementation(() => Promise.resolve(user));
            const userSettedForCreation = Object.assign({}, user, { id: null, roles: [role], password: encryptedPassword });
            const userCreated = yield service.create(user);
            expect(roleService.findByRoleCode).toHaveBeenCalledWith(role_enum_1.RoleCode.USER);
            expect(repository.save).toHaveBeenCalledWith(userSettedForCreation);
            expect(userCreated).toEqual(userSettedForCreation);
        }));
        it('should throw an error from repository when create a user', () => __awaiter(this, void 0, void 0, function* () {
            jest.spyOn(roleService, 'findByRoleCode').mockImplementation(() => Promise.resolve(role));
            jest.spyOn(repository, 'save').mockImplementation(() => Promise.reject('save_create_error'));
            const userCreated = yield service.create(user);
            expect(common_1.Logger.error).toHaveBeenCalledWith('save_create_error');
            expect(userCreated).toBeNull();
        }));
        it('should throw an error from roleService when create a user', () => __awaiter(this, void 0, void 0, function* () {
            jest.spyOn(roleService, 'findByRoleCode').mockImplementation(() => Promise.reject('findByRoleCode_create_error'));
            const userCreated = yield service.create(user);
            expect(common_1.Logger.error).toHaveBeenCalledWith('findByRoleCode_create_error');
            expect(userCreated).toBeNull();
        }));
    });
    describe('save', () => {
        it('should save a user', () => __awaiter(this, void 0, void 0, function* () {
            jest.spyOn(repository, 'save').mockImplementation(() => Promise.resolve(user));
            const userCreated = yield service.save(user);
            expect(repository.save).toHaveBeenCalledWith(user);
            expect(userCreated).toEqual(user);
        }));
        it('should throw an error from repository when save a user', () => __awaiter(this, void 0, void 0, function* () {
            jest.spyOn(repository, 'save').mockImplementation(() => Promise.reject('save_save_error'));
            const userCreated = yield service.create(user);
            expect(common_1.Logger.error).toHaveBeenCalledWith('save_save_error');
            expect(userCreated).toBeNull();
        }));
    });
});
//# sourceMappingURL=users.service.spec.js.map