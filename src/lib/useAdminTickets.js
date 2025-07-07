"use client";
import { useEffect, useState } from "react";
import { getFirestore, collection, query, where, onSnapshot, getDoc, doc } from "firebase/firestore";
import { auth } from "./firebase";

const db = getFirestore();

export function useAdminTickets() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) {
      setTickets([]);
      setLoading(false);
      return;
    }

    const q = query(collection(db, "tickets"));

    const unsubscribe = onSnapshot(q, async (querySnapshot) => {
      const rawTickets = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));


      const uids = [
        ...new Set(
          rawTickets.flatMap(ticket =>
            [ticket.uid, ticket.technician_uid].filter(Boolean)
          )
        )
      ];

      const userDocs = await Promise.all(
        uids.map(uid => getDoc(doc(db, "users", uid)))
      );
      const userMap = {};
      userDocs.forEach(userDoc => {
        if (userDoc.exists()) {
          userMap[userDoc.id] = userDoc.data().displayName;
        }
      });

      const ticketsWithNames = rawTickets.map(ticket => ({
        ...ticket,
        userDisplayName: userMap[ticket.uid] || "Unknown",
        technicianDisplayName: userMap[ticket.technician_uid] || "-",
      }));

      setTickets(ticketsWithNames);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [auth.currentUser?.uid]);

  return { tickets, loading };
}

