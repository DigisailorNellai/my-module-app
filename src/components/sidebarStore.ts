import { create } from 'zustand';
import { db } from '../../firebase.config';
import { collection, doc, getDoc, onSnapshot, query } from 'firebase/firestore';

interface Employee {
  name: string;
  email: string;
  phone: string;
  address: string;
}

interface SidebarState {
  sidebarOptions: string[];
  businessName: string;
  logoUrl: string | null;
  loading: boolean;
  employees: Employee[];
  error: string | null;
  fetchSidebarData: (userId: string) => Promise<void>;
  fetchEmployees: (userId: string) => void;
}

export const useSidebarStore = create<SidebarState>((set) => ({
  sidebarOptions: [],
  businessName: 'Loading...',
  logoUrl: null,
  loading: true,
  employees: [],
  error: null,
  fetchSidebarData: async (userId: string) => {
    try {
      const userDoc = await getDoc(doc(db, 'admins', userId));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        const businessId = userData?.businessId;

        if (businessId) {
          const businessDoc = await getDoc(doc(db, 'businesses', businessId));
          if (businessDoc.exists()) {
            const businessData = businessDoc.data();
            set({
              sidebarOptions: userData?.onboardingDetails?.selectedOptions || [],
              businessName: businessData?.businessName || 'No Business Name',
              logoUrl: businessData?.logoUrl || null,
              loading: false,
            });
          }
        }
      }
    } catch (error) {
      console.error("Error fetching sidebar data:", error);
      set({ loading: false });
    }
  },
  fetchEmployees: (userId: string) => {
    set({ loading: true, error: null });

    const fetch = async () => {
      try {
        const adminDocRef = doc(db, 'admins', userId);
        const adminDoc = await getDoc(adminDocRef);
        const adminData = adminDoc.data();
        const businessId = adminData?.businessId;

        if (businessId) {
          const employeesQuery = query(collection(db, `businesses/${businessId}/employees`));
          const unsubscribe = onSnapshot(employeesQuery, (querySnapshot) => {
            const employeesData = querySnapshot.docs.map((doc) => doc.data() as Employee);
            set({ employees: employeesData, loading: false });
          });

          return unsubscribe; // Return the unsubscribe function for cleanup
        } else {
          set({ error: 'Business ID not found.', loading: false });
        }
      } catch (e: any) {
        set({ error: e.message, loading: false });
      }
    };

    fetch();
  },
}));
