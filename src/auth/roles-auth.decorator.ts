import { SetMetadata } from "@nestjs/common";

export const ROLES_KEY = 'roles';

export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);

// create decorator
// usage 
// @ApiOperation({ summary: 'Get all users', }) // for swagger
// @ApiResponse({ status: 200, type: [User] })
// @Roles("ADMIN") <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
// @UseGuards(RolesGuard)
// @Get()
// getAll() {
//   return this.userService.getAllUsers();
// }