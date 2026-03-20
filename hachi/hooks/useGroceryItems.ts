"use client";

import { useEffect, useState } from "react";
import { 
  collection, 
  onSnapshot, 
  query, 
  orderBy, 
  addDoc, 
  updateDoc, 
  doc, 
  deleteDoc,
  Timestamp,
  where
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { GroceryItem, ItemStatus } from "@/types/grocery";

const COLLECTION_NAME = "grocery_items";

export function useGroceryItems(familyId: string = "default-family") {
  const [items, setItems] = useState<GroceryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Correct query: get all items for the family ordered by creation time
    const q = query(
      collection(db, COLLECTION_NAME),
      where("family_id", "==", familyId),
      orderBy("created_at", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newItems = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as GroceryItem[];
      
      setItems(newItems);
      setLoading(false);
    }, (error) => {
      console.error("Error listening to grocery items:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [familyId]);

  const addItem = async (name: string, quantity: string, addedBy: string) => {
    try {
      await addDoc(collection(db, COLLECTION_NAME), {
        name,
        quantity,
        status: "needed",
        added_by: addedBy,
        family_id: familyId,
        created_at: Timestamp.now(),
      });
    } catch (e) {
      console.error("Error adding item: ", e);
    }
  };

  const updateStatus = async (itemId: string, newStatus: ItemStatus) => {
    try {
      const itemRef = doc(db, COLLECTION_NAME, itemId);
      await updateDoc(itemRef, { status: newStatus });
    } catch (e) {
      console.error("Error updating status: ", e);
    }
  };

  const clearBoughtItems = async () => {
    const boughtItems = items.filter(item => item.status === "bought");
    for (const item of boughtItems) {
      await deleteDoc(doc(db, COLLECTION_NAME, item.id));
    }
  };

  return { items, loading, addItem, updateStatus, clearBoughtItems };
}
