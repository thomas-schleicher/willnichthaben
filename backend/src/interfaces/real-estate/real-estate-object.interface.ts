export interface Address {
    province: string;
    city: string;
    postalCode: string;
    streetAddress: string;
}

export interface RealEstateListing {
    id: number;
    listing_id: number;
    name: string;
    description?: string;
    // This field distinguishes between the two top-level categories.
    topLevelCategory: 'houses' | 'rooms/apartments';
    // The specific type within the top-level category, e.g. "room", "apartment", "penthouse", "villa", etc.
    type: string;
    address: Address;
    price_per_month: number;
    renting_period: string;
    advance_payment?: number;
    immediate_availability: boolean;
    owner_id: number;
    status: 'open' | 'rented';
    // Merged additional properties:
    balcony?: boolean;
    balcony_size?: number;
    garden?: boolean;
    parking?: boolean;
    storage_room?: boolean;
    land_plot_size?: number;
    num_floors?: number;
}