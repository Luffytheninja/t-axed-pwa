export type ItemStatus = "needed" | "buying" | "bought";

export interface GroceryItem {
  id: string;
  name: string;
  quantity: string | number;
  status: ItemStatus;
  added_by: string;
  family_id: string;
  assigned_to?: string | null;
  created_at: any; // Firestore timestamp
}

export interface FamilyMember {
  id: string;
  name: string;
  role: "parent" | "child";
}
