export class User {
  name?: string;
  password?: string;
  role?: number;
  isActive?: boolean;
  isDeleted?: boolean;
  isResetRequired?: boolean;
  username!: string;
  email!: string;
  whatsAppNumber?: string;
  phoneNumber?: string;
}
