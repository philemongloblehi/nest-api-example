import { RolesService } from './roles.service';
import { Role } from './entities/role.entity';
export declare class RolesController {
    private readonly roleService;
    constructor(roleService: RolesService);
    findAll(): Promise<Role[]>;
}
