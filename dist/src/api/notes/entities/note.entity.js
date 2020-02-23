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
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../../users/entities/user.entity");
const class_transformer_1 = require("class-transformer");
let Note = class Note {
    constructor(partial) {
        Object.assign(this, partial);
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Note.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Note.prototype, "title", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Note.prototype, "content", void 0);
__decorate([
    typeorm_1.CreateDateColumn({ type: 'date' }),
    __metadata("design:type", Date)
], Note.prototype, "lastModificationDate", void 0);
__decorate([
    typeorm_1.ManyToOne(type => user_entity_1.User, { nullable: false }),
    class_transformer_1.Transform(author => author.email),
    __metadata("design:type", user_entity_1.User)
], Note.prototype, "author", void 0);
Note = __decorate([
    typeorm_1.Entity({ name: 'notes' }),
    __metadata("design:paramtypes", [Object])
], Note);
exports.Note = Note;
//# sourceMappingURL=note.entity.js.map