export class CreateAdminDto {
  email: string;
  is_creator: boolean;
  hashed_password: string;
  username: string;
  hashed_refresh_token: string;
  is_active: boolean;
}
