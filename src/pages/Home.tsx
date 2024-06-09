import React from 'react';
import { IonContent, IonHeader, IonPage } from '@ionic/react';
import './Home.css';
import Toolbar from '../components/toolbar/toolbar';
import MenuSlideAdmin from '../components/menu-Slide/menuSlideAdmin';
import SearchBar from '../components/searchBar/searchBar';

const Home: React.FC = () => {
  return (
    <>
      <MenuSlideAdmin></MenuSlideAdmin>
      <IonPage id='main-content'>
        <IonHeader>
          <Toolbar pageName='Home' imageLink='https://i.pinimg.com/564x/83/bc/8b/83bc8b88cf6bc4b4e04d153a418cde62.jpg' />
        </IonHeader>
        <IonContent fullscreen>
          <div style={{ display: 'flex', flexFlow: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <img style={{ margin: '0px', width: '400px', marginTop: '120px' }} alt="LogoPublikasi" src="LogoPublikasi.jpg" />
            <SearchBar />
          </div>
        </IonContent>
      </IonPage>
    </>
  );
};

export default Home;
