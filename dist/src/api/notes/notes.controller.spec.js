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
const notes_controller_1 = require("./notes.controller");
const typeorm_1 = require("@nestjs/typeorm");
const note_entity_1 = require("./entities/note.entity");
const typeorm_2 = require("typeorm");
const notes_service_1 = require("./notes.service");
const common_1 = require("@nestjs/common");
const constantDate = new Date('2019-06-01T05:41:20');
const _Date = Date;
global.Date = jest.fn(() => constantDate);
global.Date.UTC = _Date.UTC;
global.Date.parse = _Date.parse;
global.Date.now = _Date.now;
const notes = [
    {
        id: 1,
        title: 'title',
        content: 'content',
        lastModificationDate: new Date(),
        author: null,
    },
];
describe('Notes Controller', () => {
    let controller;
    let service;
    beforeEach(() => __awaiter(this, void 0, void 0, function* () {
        const module = yield testing_1.Test.createTestingModule({
            controllers: [notes_controller_1.NotesController],
            providers: [
                {
                    provide: typeorm_1.getRepositoryToken(note_entity_1.Note),
                    useClass: typeorm_2.Repository,
                },
                notes_service_1.NotesService,
            ],
        }).compile();
        controller = module.get(notes_controller_1.NotesController);
        service = module.get(notes_service_1.NotesService);
    }));
    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
    describe('findAllByUser', () => {
        it('should retrieve all notes for a user given user', () => __awaiter(this, void 0, void 0, function* () {
            jest.spyOn(service, 'findAllByUser').mockImplementation(() => Promise.resolve(notes));
            const request = { user: { id: 1 } };
            const retrievedNotes = yield controller.findAllByUser(request);
            expect(retrievedNotes).toEqual(notes);
        }));
        it('should throw an error when retrieve all notes for a user given user', () => __awaiter(this, void 0, void 0, function* () {
            jest.spyOn(service, 'findAllByUser').mockImplementation(() => Promise.resolve(null));
            const request = { user: { id: 1 } };
            let isErrorCatch = false;
            try {
                yield controller.findAllByUser(request);
            }
            catch (error) {
                isErrorCatch = true;
                expect(error).toEqual(new common_1.HttpException('unable to retrieve notes', common_1.HttpStatus.NOT_FOUND));
            }
            expect(isErrorCatch).toBeTruthy();
        }));
    });
    describe('create', () => {
        it('should create new note for a given user', () => __awaiter(this, void 0, void 0, function* () {
            const request = { user: { id: 1 } };
            const noteDto = Object.assign({}, notes[0], { id: null });
            const noteSetupForSave = Object.assign({}, noteDto, { author: request.user, lastModificationDate: constantDate });
            jest.spyOn(service, 'save').mockImplementation(() => Promise.resolve(noteSetupForSave));
            const savedNote = yield controller.create(request, noteDto);
            expect(service.save).toHaveBeenCalledWith(noteSetupForSave);
            expect(savedNote).toEqual(noteSetupForSave);
        }));
        it('should update note for a given user', () => __awaiter(this, void 0, void 0, function* () {
            const request = { user: { id: 1 } };
            const noteDto = Object.assign({}, notes[0]);
            const noteSetupForSave = Object.assign({}, noteDto, { author: request.user, lastModificationDate: constantDate });
            jest.spyOn(service, 'findOneByIdAndUser').mockImplementation(() => Promise.resolve(Object.assign({}, notes[0], { author: request.user })));
            jest.spyOn(service, 'save').mockImplementation(() => Promise.resolve(noteSetupForSave));
            const savedNote = yield controller.create(request, noteDto);
            expect(service.save).toHaveBeenCalledWith(noteSetupForSave);
            expect(savedNote).toEqual(noteSetupForSave);
        }));
        it('should throw an error when retrieve an existing note for a given user', () => __awaiter(this, void 0, void 0, function* () {
            jest.spyOn(service, 'findOneByIdAndUser').mockImplementation(() => Promise.resolve(null));
            const request = { user: { id: 1, email: 'user@user.com' } };
            const noteDto = Object.assign({}, notes[0]);
            let isErrorCatch = false;
            try {
                yield controller.create(request, noteDto);
            }
            catch (error) {
                isErrorCatch = true;
                expect(error).toEqual(new common_1.HttpException('note[noteId=1] for user[email=user@user.com] not found', common_1.HttpStatus.NOT_FOUND));
            }
            expect(isErrorCatch).toBeTruthy();
        }));
        it('should throw an error when create new note for a given user', () => __awaiter(this, void 0, void 0, function* () {
            jest.spyOn(service, 'save').mockImplementation(() => Promise.resolve(null));
            const request = { user: { id: 1 } };
            const noteDto = Object.assign({}, notes[0], { id: null });
            let isErrorCatch = false;
            try {
                yield controller.create(request, noteDto);
            }
            catch (error) {
                isErrorCatch = true;
                expect(error).toEqual(new common_1.HttpException('unable to create new note', common_1.HttpStatus.INTERNAL_SERVER_ERROR));
            }
            expect(isErrorCatch).toBeTruthy();
        }));
        it('should throw an error when save existing note for a given user', () => __awaiter(this, void 0, void 0, function* () {
            jest.spyOn(service, 'findOneByIdAndUser').mockImplementation(() => Promise.resolve(Object.assign({}, notes[0], { author: request.user })));
            jest.spyOn(service, 'save').mockImplementation(() => Promise.resolve(null));
            const request = { user: { id: 1 } };
            const noteDto = Object.assign({}, notes[0]);
            let isErrorCatch = false;
            try {
                yield controller.create(request, noteDto);
            }
            catch (error) {
                isErrorCatch = true;
                expect(error).toEqual(new common_1.HttpException('unable to save note[noteId=1]', common_1.HttpStatus.INTERNAL_SERVER_ERROR));
            }
            expect(isErrorCatch).toBeTruthy();
        }));
    });
    describe('delete', () => {
        it('should delete a note for a given user', () => __awaiter(this, void 0, void 0, function* () {
            jest.spyOn(service, 'findOneByIdAndUser').mockImplementation(() => Promise.resolve(notes[0]));
            jest.spyOn(service, 'delete').mockImplementation(() => Promise.resolve(notes[0]));
            const request = { user: { id: 1 } };
            const deletedNote = yield controller.delete(request, 1);
            expect(deletedNote).toEqual(notes[0]);
        }));
        it('should throw an error from NotesService.findOneByIdAndUser when delete a note for a given user', () => __awaiter(this, void 0, void 0, function* () {
            jest.spyOn(service, 'findOneByIdAndUser').mockImplementation(() => Promise.resolve(null));
            jest.spyOn(service, 'delete').mockImplementation(() => Promise.resolve(notes[0]));
            const request = { user: { id: 1, email: 'user@user.com' } };
            let isErrorCatch = false;
            try {
                yield controller.delete(request, 1);
            }
            catch (error) {
                isErrorCatch = true;
                expect(error).toEqual(new common_1.HttpException('note[noteId=1] for user[email=user@user.com] not found', common_1.HttpStatus.NOT_FOUND));
            }
            expect(isErrorCatch).toBeTruthy();
        }));
        it('should throw an error from NotesService.delete when delete a note for a given user', () => __awaiter(this, void 0, void 0, function* () {
            jest.spyOn(service, 'findOneByIdAndUser').mockImplementation(() => Promise.resolve(notes[0]));
            jest.spyOn(service, 'delete').mockImplementation(() => Promise.resolve(null));
            const request = { user: { id: 1 } };
            let isErrorCatch = false;
            try {
                yield controller.delete(request, 1);
            }
            catch (error) {
                isErrorCatch = true;
                expect(error).toEqual(new common_1.HttpException('unable to delete note[noteId=1]', common_1.HttpStatus.INTERNAL_SERVER_ERROR));
            }
            expect(isErrorCatch).toBeTruthy();
        }));
    });
});
//# sourceMappingURL=notes.controller.spec.js.map