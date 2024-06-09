import React from 'react';
import { IonHeader, IonToolbar, IonTitle } from '@ionic/react';
import './Header.css'; 

const Header: React.FC = () => {
  const titleStyle: React.CSSProperties = { 
    fontSize: '24px',
    fontFamily: 'Merriweather Sans',
  };


  return (
    <IonHeader className= "ion-header custom-header">
      <IonToolbar>
        <IonTitle style={titleStyle} className="marquee-text">
          Sistem Informasi Penelitian dan Publikasi Teknik Informatika
        </IonTitle>
      </IonToolbar>
    </IonHeader>
  );
};

export default Header;
