import React, { useState } from 'react';
import { IonCard, IonCardHeader, IonCardSubtitle, IonPage } from '@ionic/react';
import './HalamanAwal.css';
import Buttons from '../../components/button/buttons';

const PageFirst: React.FC = () => {
  const [showCard, setShowCard] = useState({ card1: true, card2: false });
  const [, setAdminType] = useState<string>('');

  const handleNext = () => {
    setShowCard({ card1: false, card2: true });
  };

  const handleAdminSelection = (type: string) => {
    setAdminType(type);
  };

  return (
    <IonPage className="pagefirst">
      <div className="container">
        {showCard.card1 && (
          <IonCard className="pembuka">
            <img className="logoUH" alt="Logo_UH" src="Logo_UH.png" />
            <IonCardHeader>
              <IonCardSubtitle className="intro">
                Selamat Datang di Pusat Layanan Informasi Admin Kuliner Teknik
              </IonCardSubtitle>
              <Buttons
                className="Button1"
                buttonName="next"
                maxWidth="60px"
                fillType="solid"
                shape="round"
                color="light"
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  margin: 'auto'
                }}
                onClick={handleNext}
              />
            </IonCardHeader>
          </IonCard>
        )}

        {showCard.card2 && (
          <IonCard className="card2">
            <img className="pict2" alt="pictInfor" src="pictInfor.png" />
            <IonCardHeader>
              <IonCardSubtitle className="intro2">
                Silakan login untuk memulai pekerjaan hari ini
              </IonCardSubtitle>
              <div className="admin-buttons">
                <Buttons
                  className="Button2"
                  buttonName="Admin Kultek"
                  maxWidth="150px"
                  fillType="solid"
                  shape="round"
                  path="formAdmin"
                  color="light"
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    margin: 'auto',
                    textDecoration: 'none'
                  }}
                  onClick={() => handleAdminSelection('admin kultek')}
                />
              </div>
            </IonCardHeader>
          </IonCard>
        )}
      </div>
    </IonPage>
  );
};

export default PageFirst;
