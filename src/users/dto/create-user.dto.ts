import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
  @ApiProperty({ example: 'еmail@test.com', description: 'Email address' })
  readonly email: string;

  @ApiProperty({ example: 'sdf64sdfnoiLk', description: 'User password' })
  readonly password: string;
}