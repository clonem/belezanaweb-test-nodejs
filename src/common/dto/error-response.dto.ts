import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class ErrorResponseDTO {
  @ApiProperty({ example: HttpStatus.NOT_FOUND })
  readonly statusCode!: number;

  @ApiProperty({ example: 'Sample with ID 9478 not found!' })
  readonly message!: string | string[];

  @ApiProperty({ example: 'Not Found' })
  readonly error!: HttpStatus;
}
