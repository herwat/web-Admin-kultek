import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

/* Pages */
import Home from './pages/Home';
import Admin from './pages/Admin/homeAdmin';
import Setting from './pages/Setting';
import LibraryMember from './pages/Library/LibraryMember';
import HalamanAwal from './pages/tampilanawal/HalamanAwal';
import Trash from './pages/Trash/Trash';
import PublikasiFile from './pages/publikasi/PublikasiFile';
import Profile from './pages/Profile/profile';
import Publikasiadmin from './pages/Admin/DashboardAdmin/Dashboardadmin';
import DataNotif from './pages/Admin/Pemberitahuan/DaftarNotif';
import LoginAdminProps from './pages/Form/LoginAdmin';



setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route exact path="/home" component={Home} />
        <Route exact path="/formAdmin" component={LoginAdminProps} />
        <Route exact path="/sampah" component={Trash} />
        <Route exact path="/admin" component={Admin} />
        <Route exact path="/infopemberitahuan" component={DataNotif} />
        <Route exact path="/publikasiadmin" component={Publikasiadmin} />
        <Route exact path="/publikasiSaya" component={PublikasiFile} />
        <Route exact path="/setting" component={Setting} />
        <Route exact path="/login" component={HalamanAwal} />
        <Route exact path="/PerpustakaanSaya" component={LibraryMember} />
        <Route exact path="/Profile" component={Profile} />
        <Route exact path="/">
          <Redirect to="/login" />
        </Route>
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
