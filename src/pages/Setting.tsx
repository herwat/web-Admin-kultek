import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, IonItem, IonLabel, IonSelect, IonSelectOption, IonRadioGroup, IonRadio, IonToggle, IonButton } from '@ionic/react';

const Setting: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Pengaturan</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <IonItem>
            <IonLabel>Hasil Per Halaman</IonLabel>
            <IonSelect>
              <IonSelectOption value="10">10</IonSelectOption>
              <IonSelectOption value="20">20</IonSelectOption>
              <IonSelectOption value="30">30</IonSelectOption>
            </IonSelect>
          </IonItem>
          
          <IonRadioGroup>
            <IonItem>
              <IonLabel>Tab Baru</IonLabel>
              <IonRadio slot="start" value="new-tab"></IonRadio>
            </IonItem>
            <IonItem>
              <IonLabel>Tab Saat Ini</IonLabel>
              <IonRadio slot="start" value="current-tab"></IonRadio>
            </IonItem>
          </IonRadioGroup>
          <IonItem>
            <IonLabel>Pengelola Bibliografi</IonLabel>
            <IonToggle slot="end"></IonToggle>
          </IonItem>
        </IonList>
        <IonButton expand="block">Simpan</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Setting;