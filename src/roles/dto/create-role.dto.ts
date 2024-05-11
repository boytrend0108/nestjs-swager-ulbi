import { IsNumber, IsString } from "class-validator";

export class CreateRoleDTO {
  @IsString({ message: "value shoulb be a string" })
  readonly value: string;
  @IsNumber({}, { message: "value should be a number" })
  readonly description: string;
}