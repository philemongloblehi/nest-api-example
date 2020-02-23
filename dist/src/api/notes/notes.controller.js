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
var _a;
const common_1 = require("@nestjs/common");
const role_decorator_1 = require("../../auth/decorators/role.decorator");
const roles_guard_1 = require("../../auth/guards/roles.guard");
const role_enum_1 = require("../roles/entities/role.enum");
const notes_service_1 = require("./notes.service");
const note_entity_1 = require("./entities/note.entity");
const Note_dto_1 = require("./dtos/Note.dto");
const swagger_1 = require("@nestjs/swagger");
let NotesController = class NotesController {
    constructor(noteService) {
        this.noteService = noteService;
    }
    findAllByUser(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const userNotes = yield this.noteService.findAllByUser(request.user);
            if (!userNotes) {
                throw new common_1.HttpException('unable to retrieve notes', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
            return userNotes;
        });
    }
    create(request, noteDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = request.user;
            let userNote = Object.assign({}, noteDto, { lastModificationDate: null, author: null });
            if (noteDto.id) {
                userNote = yield this.noteService.findOneByIdAndUser(user, userNote.id);
                if (!userNote) {
                    throw new common_1.HttpException(`note[noteId=${noteDto.id}] for user[email=${user.email}] not found`, common_1.HttpStatus.NOT_FOUND);
                }
            }
            else {
                userNote.author = user;
            }
            userNote.lastModificationDate = new Date();
            userNote = yield this.noteService.save(userNote);
            if (!userNote) {
                const message = noteDto.id ? `unable to save note[noteId=${noteDto.id}]` : 'unable to create new note';
                throw new common_1.HttpException(message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
            return new note_entity_1.Note(Object.assign({}, userNote));
        });
    }
    delete(request, noteId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = request.user;
            const userNote = yield this.noteService.findOneByIdAndUser(user, noteId);
            if (!userNote) {
                throw new common_1.HttpException(`note[noteId=${noteId}] for user[email=${user.email}] not found`, common_1.HttpStatus.NOT_FOUND);
            }
            const deletedNote = yield this.noteService.delete(userNote);
            if (!deletedNote) {
                throw new common_1.HttpException(`unable to delete note[noteId=${noteId}]`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
            return deletedNote;
        });
    }
};
__decorate([
    common_1.Get(),
    common_1.UseGuards(roles_guard_1.RolesGuard),
    role_decorator_1.Roles(role_enum_1.RoleCode.USER, role_enum_1.RoleCode.ADMIN),
    __param(0, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NotesController.prototype, "findAllByUser", null);
__decorate([
    common_1.Post(),
    common_1.UseGuards(roles_guard_1.RolesGuard),
    role_decorator_1.Roles(role_enum_1.RoleCode.USER, role_enum_1.RoleCode.ADMIN),
    common_1.UseInterceptors(common_1.ClassSerializerInterceptor),
    __param(0, common_1.Req()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, typeof (_a = typeof Note_dto_1.NoteDto !== "undefined" && Note_dto_1.NoteDto) === "function" ? _a : Object]),
    __metadata("design:returntype", Promise)
], NotesController.prototype, "create", null);
__decorate([
    common_1.Delete(':noteId'),
    common_1.UseGuards(roles_guard_1.RolesGuard),
    role_decorator_1.Roles(role_enum_1.RoleCode.USER, role_enum_1.RoleCode.ADMIN),
    __param(0, common_1.Req()), __param(1, common_1.Param('noteId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], NotesController.prototype, "delete", null);
NotesController = __decorate([
    swagger_1.ApiBearerAuth(),
    swagger_1.ApiUseTags('notes'),
    common_1.Controller('api/notes'),
    __metadata("design:paramtypes", [notes_service_1.NotesService])
], NotesController);
exports.NotesController = NotesController;
//# sourceMappingURL=notes.controller.js.map