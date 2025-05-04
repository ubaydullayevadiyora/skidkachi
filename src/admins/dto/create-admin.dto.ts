export class CreateAdminDto {
  fullname: string;
  username: string;
  email: string;
  hashed_password: string;
  hashed_refresh_token: string;
  is_creator: boolean;
  is_active: boolean;
}
