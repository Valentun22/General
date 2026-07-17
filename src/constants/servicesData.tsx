import {GiMountains, GiHotSurface, GiCampfire, GiWaves, GiWoodPile, GiTreeSwing, GiKnifeFork} from 'react-icons/gi';
import {
    MdOutlineWifi, MdOutlineLocalParking,
    MdTv, MdPets, MdSoap, MdVpnKey, MdEco, MdOutdoorGrill, MdOutlineCoffeeMaker
} from 'react-icons/md';
import {
    TbFence, TbWind, TbFridge, TbCoffee, TbFlame, TbLeaf, TbDroplet,
    TbMap, TbWindow, TbHanger, TbBrightness, TbTemperature, TbTemperaturePlus,
    TbShoe, TbPuzzle, TbArmchair, TbVolume, TbHome, TbBolt
} from 'react-icons/tb';
import React from 'react';

export interface ServiceItem {
    icon: React.ReactElement;
    label: string;
}

const iconMap: Record<string, Record<string, React.ReactElement>> = {
    house: {
        wifi: <MdOutlineWifi/>, ac: <TbWind/>, power: <TbBolt/>, tv: <MdTv/>,
        windows: <TbWindow/>, games: <TbPuzzle/>, checkin: <MdVpnKey/>, pets: <MdPets/>,
    },
    kitchen: {
        fridge: <TbFridge/>, kettle: <TbCoffee/>, coffee: <MdOutlineCoffeeMaker/>, microwave: <TbFlame/>,
        spices: <TbLeaf/>, drinks: <TbDroplet/>, stove: <TbFlame/>, dishes: <GiKnifeFork/>,
    },
    bathroom: {
        dryer: <TbWind/>, towels: <TbHanger/>, shower: <TbDroplet/>, robes: <TbHanger/>,
        hygiene: <MdSoap/>, dental: <TbDroplet/>, slippers: <TbShoe/>, mirror: <TbBrightness/>,
        floor: <TbTemperature/>, wall: <TbTemperaturePlus/>,
    },
    territory: {
        tub: <GiHotSurface/>, wood: <GiWoodPile/>, lake: <GiWaves/>, grill: <MdOutdoorGrill/>,
        parking: <MdOutlineLocalParking/>, gazebo: <TbHome/>, area: <TbMap/>, swing: <GiTreeSwing/>,
        hammock: <TbArmchair/>, fenced: <TbFence/>, eco: <MdEco/>, mountains: <GiMountains/>,
        quiet: <TbVolume/>, loungers: <TbArmchair/>, fire: <GiCampfire/>,
    },
};

export const getItems = (t: any, category: 'house' | 'kitchen' | 'bathroom' | 'territory'): ServiceItem[] => {
    const labels = t(`services.${category}Items`, {returnObjects: true}) as Record<string, string>;
    const icons = iconMap[category];
    return Object.entries(labels).map(([key, label]) => ({
        icon: icons[key],
        label,
    }));
};

export const houseItems: ServiceItem[] = [];
export const kitchenItems: ServiceItem[] = [];
export const bathroomItems: ServiceItem[] = [];
export const territoryItems: ServiceItem[] = [];
