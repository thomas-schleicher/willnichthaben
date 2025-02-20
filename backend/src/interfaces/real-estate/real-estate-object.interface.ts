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
    topLevelCategory: 'houses' | 'rooms/apartments';
    type: string;
    address: Address;
    price_per_month: number;
    renting_period: string;
    advance_payment?: number;
    immediate_availability: boolean;
    owner_id: number;
    status: 'open' | 'rented';
    // Adding missing fields from database
    living_area?: number;
    room_count?: number;
    availability?: Date;
    term_type?: string;
    kitchen?: boolean;
    cellar?: boolean;
    // Existing additional properties
    balcony?: boolean;
    balcony_size?: number;
    garden?: boolean;
    parking?: boolean;
    storage_room?: boolean;
    land_plot_size?: number;
    num_floors?: number;
}