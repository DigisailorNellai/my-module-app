import create from 'zustand';
import { db, auth } from '../../firebase.config';
import { doc, getDoc } from 'firebase/firestore';

type BusinessType = 'company' | 'course';

interface AdminData {
  businessId: string;
}

interface BusinessData {
  businessType: BusinessType;
}

interface AdminStore {
  businessType: BusinessType | null;
  loading: boolean;
  error: string | null;
  fetchBusinessType: () => void;
  reset: () => void;
}

export const useAdminStore = create<AdminStore>((set, get) => ({
  businessType: null,
  loading: true,
  error: null,
  fetchBusinessType: async () => {
    if (get().businessType !== null) return; // Avoid re-fetching if data is already present

    try {
      set({ loading: true, error: null });
      
      // Use onAuthStateChanged to handle authentication state changes
      const unsubscribe = auth.onAuthStateChanged(async (user) => {
        if (user) {
          try {
            const adminDocRef = doc(db, 'admins', user.uid);
            const adminDoc = await getDoc(adminDocRef);
            const adminData = adminDoc.data() as AdminData;

            if (adminData && adminData.businessId) {
              const businessDocRef = doc(db, 'businesses', adminData.businessId);
              const businessDoc = await getDoc(businessDocRef);
              const businessData = businessDoc.data() as BusinessData;

              if (businessData) {
                set({ businessType: businessData.businessType, loading: false });
              } else {
                set({ error: 'Business data not found.', loading: false });
              }
            } else {
              set({ error: 'Admin data not found.', loading: false });
            }
          } catch (err) {
            console.error('Error fetching business type:', err);
            set({ error: 'Failed to load business data.', loading: false });
          }
        } else {
          set({ error: 'User not authenticated.', loading: false });
        }
      });

      // Clean up subscription on component unmount
      return () => unsubscribe();
    } catch (err) {
      console.error('Error fetching business type:', err);
      set({ error: 'Failed to load business data.', loading: false });
    }
  },
  reset: () => set({ businessType: null, loading: true, error: null }),
}));
