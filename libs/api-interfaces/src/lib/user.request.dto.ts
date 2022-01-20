import { Prop, Schema } from '@nestjs/mongoose';
@Schema()
export class User {
  id!: string;
  @Prop()
  name?: string;
  @Prop()
  password?: string;
  @Prop()
  role?: number;
  @Prop()
  isActive?: boolean;
  @Prop()
  isDeleted?: boolean;
  @Prop()
  isResetRequired?: boolean;
  // passwordValidity?: Date;
  @Prop()
  username!: string;
  @Prop()
  email!: string;
  @Prop()
  whatsAppNumber?: string;
  @Prop()
  phoneNumber?: string;
  // loginFailedAttempts?: number;
  // lastLoginDate?: Date;
  // isLoggedIn?: boolean;
  // token?: string;
  // tokenExpirationDate?: Date;
  // createdBy?: number;
  // createdOn?: Date;
  // modifiedBy?: number;
  // modifiedOn?: Date;
}
export class CreateUser {
  name?: string;
  code?: string;
  password!: string;
  role?: number;
  username!: string;
  email!: string;
  whatsAppNumber?: string;
  phoneNumber?: string;
}
