export class CreatePanierDto {
  userId: number;
  items: {
    menuId: number;
    quantity: number;
  }[];
}
