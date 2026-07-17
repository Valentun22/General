import {createBrowserRouter} from 'react-router-dom';
import {MainLayout} from '../layouts/MainLayout';
import {HomePage} from "../pages/HomePage";
import {ParashkaPage} from "../pages/ParashkaPage";
import {KamyankaPage} from "../pages/KamyankaPage";
import {ZakharBerkutPage} from "../pages/ZakharBerkutPage";
import {TustanPage} from "../pages/TustanPage";
import {OpirPage} from "../pages/OpirPage";
import {LopataPage} from "../pages/LopataPage";
import {ZhuravlynePage} from "../pages/ZhuravlynePage";
import {NotFoundPage} from "../pages/NotFoundPage";
import {PavlivPotikPage} from "../pages/PavlivPotikPage";

const router = createBrowserRouter([
    {
        path: '',
        element: <MainLayout/>,
        children: [
            {index: true, element: <HomePage/>},
            {path: 'parashka', element: <ParashkaPage/>},
            {path: 'kamyanka', element: <KamyankaPage/>},
            {path: 'zakhar-berkut', element: <ZakharBerkutPage/>},
            {path: 'tustan', element: <TustanPage/>},
            {path: 'opir', element: <OpirPage/>},
            {path: 'lopata', element: <LopataPage/>},
            {path: 'zhuravlyne', element: <ZhuravlynePage/>},
            {path: 'pavliv-potik', element: <PavlivPotikPage/>},

            {path: '*', element: <NotFoundPage/>},
        ],
    },
]);

export {router};
