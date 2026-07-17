export interface IPlaceInterface {
    name: string;
    category: string;
    mainImg: string;
    gallery: string[];
    description: string[];
    address: string;
    phone?: string;
    mapUrl: string;
    menuUrl?: string;
    websiteUrl?: string;
    instagramUrl?: string;
}