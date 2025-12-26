export type Vertical = 'flights' | 'hotels' | 'trains' | 'visas' | 'destinations';

export interface SearchState {
  vertical: Vertical;
  from: string;
  to: string;
  date: Date | undefined;
  returnDate?: Date | undefined;
  travelers: number;
}

export interface BookingItem {
  id: string;
  type: Vertical;
  title: string;
  subtitle: string;
  price: number;
  image?: string;
  details: any; // Flexible for now to store flight/hotel specific details
}

export interface GuestDetails {
  fullName: string;
  email: string;
  phone: string;
}

export interface BookingContextType {
  search: SearchState;
  setSearch: (search: SearchState) => void;
  cart: BookingItem | null;
  addToCart: (item: BookingItem) => void;
  removeFromCart: () => void;
  guestDetails: GuestDetails;
  updateGuestDetails: (details: Partial<GuestDetails>) => void;
}
