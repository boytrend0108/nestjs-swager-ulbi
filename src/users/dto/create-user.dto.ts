import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsEmail, Length } from "class-validator";

export class CreateUserDto {
  @ApiProperty({ example: 'еmail@test.com', description: 'Email address' })
  @IsString({ message: 'Should be string' })
  @IsEmail({}, { message: 'Invalid email message' })
  readonly email: string;

  @ApiProperty({ example: 'sdf64sdfnoiLk', description: 'User password' })
  @IsString({ message: 'Should be string' })
  @Length(4, 6, { message: "4- 16 chars" })
  readonly password: string;
}