export interface IServiceGeneralInterface {
    id: string;
    title: string;
    shortDesc: string;
    backDesc: string;
    modalText: string;
    photos: string[];
    icon: React.ReactElement;
    videos?: string[];
}