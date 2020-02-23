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
const users_controller_1 = require("./users.controller");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("./entities/user.entity");
const typeorm_2 = require("typeorm");
const role_entity_1 = require("../roles/entities/role.entity");
const users_service_1 = require("./users.service");
const roles_service_1 = require("../roles/roles.service");
const role_enum_1 = require("../roles/entities/role.enum");
const common_1 = require("@nestjs/common");
const userId = 1;
const user = {
    id: 1,
    email: 'user@user.com',
    isActive: true,
    password: 'user',
    roles: [],
};
const usersRolesDto = {
    roles: [
        {
            id: 1,
            code: role_enum_1.RoleCode.USER,
        },
    ],
};
describe('Users Controller', () => {
    let controller;
    let service;
    beforeEach(() => __awaiter(this, void 0, void 0, function* () {
        const module = yield testing_1.Test.createTestingModule({
            controllers: [users_controller_1.UsersController],
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
        controller = module.get(users_controller_1.UsersController);
    }));
    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
    describe('setUsersRole', () => {
        it('should update roles of a user', () => __awaiter(this, void 0, void 0, function* () {
            jest.spyOn(service, 'findById').mockImplementation(() => Promise.resolve(user));
            jest.spyOn(service, 'save').mockImplementation(() => Promise.resolve(user));
            const updatedUser = yield controller.setUsersRole(userId, usersRolesDto);
            expect(service.findById).toHaveBeenCalledWith(userId);
            expect(service.save).toHaveBeenCalledWith(user);
            expect(updatedUser).toEqual(Object.assign({}, user, { roles: usersRolesDto.roles }));
        }));
        it('should throw an error from UsersService.findById when update roles of a user', () => __awaiter(this, void 0, void 0, function* () {
            let isErrorCatch = false;
            jest.spyOn(service, 'findById').mockImplementation(() => Promise.resolve(null));
            try {
                yield controller.setUsersRole(userId, usersRolesDto);
            }
            catch (error) {
                isErrorCatch = true;
                expect(error).toEqual(new common_1.HttpException(`User [ID=1] not found`, common_1.HttpStatus.NOT_FOUND));
            }
            expect(isErrorCatch).toBeTruthy();
        }));
        it('should throw an error from UsersService.save when update roles of a user', () => __awaiter(this, void 0, void 0, function* () {
            let isErrorCatch = false;
            jest.spyOn(service, 'findById').mockImplementation(() => Promise.resolve(user));
            jest.spyOn(service, 'save').mockImplementation(() => Promise.resolve(null));
            try {
                yield controller.setUsersRole(userId, usersRolesDto);
            }
            catch (error) {
                isErrorCatch = true;
                expect(error).toEqual(new common_1.HttpException(`Error while updating User [ID=1]`, common_1.HttpStatus.INTERNAL_SERVER_ERROR));
            }
            expect(isErrorCatch).toBeTruthy();
        }));
    });
    describe('setActivation', () => {
        it('should change user activation', () => __awaiter(this, void 0, void 0, function* () {
            jest.spyOn(service, 'findById').mockImplementation(() => Promise.resolve(user));
            jest.spyOn(service, 'save').mockImplementation(() => Promise.resolve(user));
            const updatedUser = yield controller.setActivation(userId, 'false');
            expect(service.findById).toHaveBeenCalledWith(userId);
            expect(service.save).toHaveBeenCalledWith(user);
            expect(updatedUser).toEqual(Object.assign({}, user, { isActive: false }));
        }));
        it('should throw an error from UsersService.findById when update activation of a user', () => __awaiter(this, void 0, void 0, function* () {
            let isErrorCatch = false;
            jest.spyOn(service, 'findById').mockImplementation(() => Promise.resolve(null));
            try {
                yield controller.setActivation(userId, 'false');
            }
            catch (error) {
                isErrorCatch = true;
                expect(error).toEqual(new common_1.HttpException(`User [ID=1] not found`, common_1.HttpStatus.NOT_FOUND));
            }
            expect(isErrorCatch).toBeTruthy();
        }));
        it('should throw an error from UsersService.save when update activation of a user', () => __awaiter(this, void 0, void 0, function* () {
            let isErrorCatch = false;
            jest.spyOn(service, 'findById').mockImplementation(() => Promise.resolve(user));
            jest.spyOn(service, 'save').mockImplementation(() => Promise.resolve(null));
            try {
                yield controller.setActivation(userId, 'false');
            }
            catch (error) {
                isErrorCatch = true;
                expect(error).toEqual(new common_1.HttpException(`Error while updating User [ID=1]`, common_1.HttpStatus.INTERNAL_SERVER_ERROR));
            }
            expect(isErrorCatch).toBeTruthy();
        }));
        it('should throw an error when activation param. is null', () => __awaiter(this, void 0, void 0, function* () {
            let isErrorCatch = false;
            try {
                yield controller.setActivation(userId, null);
            }
            catch (error) {
                isErrorCatch = true;
                expect(error).toEqual(new common_1.HttpException(`The active query param must be set to \'true\' or \'false\'`, common_1.HttpStatus.BAD_REQUEST));
            }
            expect(isErrorCatch).toBeTruthy();
        }));
        it('should throw an error when activation param. is not a boolean', () => __awaiter(this, void 0, void 0, function* () {
            let isErrorCatch = false;
            try {
                yield controller.setActivation(userId, '');
            }
            catch (error) {
                isErrorCatch = true;
                expect(error).toEqual(new common_1.HttpException(`The active query param must be set to \'true\' or \'false\'`, common_1.HttpStatus.BAD_REQUEST));
            }
            expect(isErrorCatch).toBeTruthy();
        }));
    });
});
//# sourceMappingURL=users.controller.spec.js.map