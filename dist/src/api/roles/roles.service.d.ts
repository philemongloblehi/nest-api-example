import { Repository } from 'typeorm';
import { Role } from './entities/role.entity';
import { RoleCode } from './entities/role.enum';
export declare class RolesService {
    private readonly roleRepository;
    constructor(roleRepository: Repository<Role>);
    findAll(): Promise<Role[]>;
    findByRoleCode(roleCode: RoleCode): Promise<Role>;
}
