import { Exclude } from 'class-transformer';
import { Document } from 'mongoose';

import { Caption } from './caption.interface';

export class User extends Document {
  readonly username: string;
  readonly email: string;
  @Exclude() readonly password: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly verified: boolean;
  captionEditCount?: number;
  captionEdit?: [Caption];
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly lastLogin: Date;
}