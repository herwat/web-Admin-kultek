import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

/* Pages */
import HomeAdmin from './pages/Admin/homeAdmin';
import Setting from './pages/Setting';
import HalamanAwal from './pages/tampilanawal/HalamanAwal';
import Profile from './pages/Profile/profile';
import Dashboardadmin from './pages/Admin/DashboardAdmin/Dashboardadmin';;
import FormAdmin from './pages/Form/LoginAdmin';
import requestadmin from './pages/Admin/request/requestadmin';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route exact path="/formAdmin" component={FormAdmin} />
        <Route exact path="/myadmin" component={HomeAdmin} />
        <Route exact path="/dashboard" component={Dashboardadmin} />
        <Route exact path="/setting" component={Setting} />
        <Route exact path="/login" component={HalamanAwal} />
        <Route exact path="/Profile" component={Profile} />
        <Route exact path="/request" component={requestadmin} />
        <Route exact path="/">
          <Redirect to="/login" />
        </Route>
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
