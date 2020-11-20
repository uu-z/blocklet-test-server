import { PartialType } from '@nestjs/mapped-types';
import { CreateForgeDto } from './create-forge.dto';

export class UpdateForgeDto extends PartialType(CreateForgeDto) {}
