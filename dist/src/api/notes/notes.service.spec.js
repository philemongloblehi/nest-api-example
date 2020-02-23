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
const notes_service_1 = require("./notes.service");
const typeorm_1 = require("@nestjs/typeorm");
const note_entity_1 = require("./entities/note.entity");
const typeorm_2 = require("typeorm");
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
const notes = [
    {
        id: 1,
        title: 'title',
        content: 'content',
        lastModificationDate: new Date(),
        author: null,
    },
];
describe('NotesService', () => {
    let service;
    let repository;
    beforeEach(() => __awaiter(this, void 0, void 0, function* () {
        const module = yield testing_1.Test.createTestingModule({
            providers: [
                {
                    provide: typeorm_1.getRepositoryToken(note_entity_1.Note),
                    useClass: typeorm_2.Repository,
                },
                notes_service_1.NotesService,
            ],
        }).compile();
        service = module.get(notes_service_1.NotesService);
        repository = module.get(typeorm_1.getRepositoryToken(note_entity_1.Note));
    }));
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
    describe('findAllByUser', () => {
        it('should retrieve all notes for a given user', () => __awaiter(this, void 0, void 0, function* () {
            jest.spyOn(repository, 'find').mockImplementation(() => Promise.resolve(notes));
            const user = { id: 1, email: null, password: null, isActive: null, roles: null };
            const retrievedNotes = yield service.findAllByUser(user);
            expect(retrievedNotes).toEqual(notes);
            expect(repository.find).toHaveBeenCalledWith({ where: { author: user } });
        }));
        it('should throw an error when retrieve all notes for a given user', () => __awaiter(this, void 0, void 0, function* () {
            jest.spyOn(repository, 'find').mockImplementation(() => Promise.reject('find_findAllByUser_error'));
            const user = { id: 1, email: null, password: null, isActive: null, roles: null };
            const retrievedNotes = yield service.findAllByUser(user);
            expect(common_1.Logger.error).toHaveBeenCalledWith('find_findAllByUser_error');
            expect(retrievedNotes).toBeNull();
        }));
    });
    describe('save', () => {
        it('should save a note for a given user', () => __awaiter(this, void 0, void 0, function* () {
            const note = Object.assign({}, notes[0]);
            jest.spyOn(repository, 'save').mockImplementation(() => Promise.resolve(note));
            const savedNote = yield service.save(note);
            expect(repository.save).toHaveBeenCalledWith(note);
            expect(savedNote).toEqual(note);
        }));
        it('should throw an error when save a note for a given user', () => __awaiter(this, void 0, void 0, function* () {
            jest.spyOn(repository, 'save').mockImplementation(() => Promise.reject('save_save_error'));
            const note = Object.assign({}, notes[0]);
            const savedNote = yield service.save(note);
            expect(common_1.Logger.error).toHaveBeenCalledWith('save_save_error');
            expect(savedNote).toEqual(null);
        }));
    });
    describe('findOneByIdAndUser', () => {
        it('should retrieve a note for a given user', () => __awaiter(this, void 0, void 0, function* () {
            jest.spyOn(repository, 'findOneOrFail').mockImplementation(() => Promise.resolve(notes[0]));
            const user = { id: 1, email: null, password: null, isActive: null, roles: null };
            const retrieveNote = yield service.findOneByIdAndUser(user, 1);
            expect(retrieveNote).toEqual(notes[0]);
            expect(repository.findOneOrFail).toHaveBeenCalledWith({ where: { id: 1, author: user } });
        }));
        it('should retrieve a note for a given user', () => __awaiter(this, void 0, void 0, function* () {
            jest.spyOn(repository, 'findOneOrFail').mockImplementation(() => Promise.reject('findOneOrFail_findOneByIdAndUser_error'));
            const user = { id: 1, email: null, password: null, isActive: null, roles: null };
            const retrieveNote = yield service.findOneByIdAndUser(user, 1);
            expect(common_1.Logger.error).toHaveBeenCalledWith('findOneOrFail_findOneByIdAndUser_error');
            expect(retrieveNote).toEqual(null);
        }));
    });
    describe('delete', () => {
        it('should delete a note', () => __awaiter(this, void 0, void 0, function* () {
            jest.spyOn(repository, 'remove').mockImplementation(() => Promise.resolve(notes[0]));
            const deletedNote = yield service.delete(notes[0]);
            expect(deletedNote).toEqual(notes[0]);
            expect(repository.remove).toHaveBeenCalledWith(notes[0]);
        }));
        it('should throw an error when delete a note', () => __awaiter(this, void 0, void 0, function* () {
            jest.spyOn(repository, 'remove').mockImplementation(() => Promise.reject('remove_delete_error'));
            const deletedNote = yield service.delete(notes[0]);
            expect(common_1.Logger.error).toHaveBeenCalledWith('remove_delete_error');
            expect(deletedNote).toEqual(null);
        }));
    });
});
//# sourceMappingURL=notes.service.spec.js.map