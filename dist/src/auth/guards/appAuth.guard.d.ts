import { ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
declare const AppAuthGuard_base: any;
export declare class AppAuthGuard extends AppAuthGuard_base {
    private readonly reflector;
    constructor(reflector: Reflector);
    canActivate(context: ExecutionContext): any;
    handleRequest(err: any, user: any, info: any): any;
}
export {};
