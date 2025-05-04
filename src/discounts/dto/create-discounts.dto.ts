export class CreateDiscountDto {
  storeId: number;
  title: string;
  description: string;
  discount_percent: number;
  start_date: Date;
  end_date: Date;
  categoryId: number;
  discount_value: number;
  special_link: string;
  is_active: boolean;
  type_id: number;
}
