export class CreateUserDto {
  name: string;
  phone: string;
  email: string;
  hashed_password: string;
  hashed_refresh_token: string;
  is_active: boolean;
  is_owner: boolean;
  location: string;
  regionId: number;
}
