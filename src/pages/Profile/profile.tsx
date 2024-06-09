import React, { useEffect, useState } from "react";
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonImg,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonRow,
  IonText,
} from "@ionic/react";
import "./profile.css";
import userIcon from "../../Assets/man.png";
import Toolbar from "../../components/toolbar/toolbar";

const Profile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState<any>({username: '', password: ''}); 
  const [tempUser, setTempUser] = useState<any>(user); 

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleEditClick = () => {
    if (isEditing) {
      alert('Update profil berhasil');
      setUser(tempUser); 
      localStorage.setItem("user", JSON.stringify(tempUser));
    } else {
      setTempUser(user);
    }
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e: any) => {
    setTempUser({...tempUser, [e.target.name]: e.target.value}); 
  };

  return (
    <IonPage>
      <IonHeader>
        <Toolbar
          pageName="Pengaturan Profile"
          imageLink="https://i.pinimg.com/564x/83/bc/8b/83bc8b88cf6bc4b4e04d153a418cde62.jpg"
        />
      </IonHeader>
      <IonContent className="isi">
        <IonGrid>
          <IonRow className="ContentWrapper">
            <IonCol className="profil" size="auto">
              <IonImg className="imgprofile" src={userIcon}></IonImg>
              <IonRow className="name">
                <IonText>{user.username}</IonText>
              </IonRow>
              <IonRow>
                <IonText>Member</IonText>
              </IonRow>
            </IonCol>
            <IonCol className="wrap2">
              <IonCard>
                <IonCardContent>
                  <IonItem className="ubah">
                    <IonLabel>Ubah Profile</IonLabel>
                  </IonItem>
                  <IonList>
                    <IonText className="text">Username/Email</IonText>
                    <IonItem className="item">
                      {isEditing ? (
                        <IonInput name="username" value={tempUser.username} onIonChange={handleInputChange}></IonInput>
                      ) : (
                        <IonLabel>M Thezar</IonLabel>
                      )}
                    </IonItem>
                    <IonText className="text">Password</IonText>
                    <IonItem className="item">
                      {isEditing ? (
                        <IonInput name="password" type="password" value={tempUser.password} onIonChange={handleInputChange}></IonInput>
                      ) : (
                        <IonLabel>********</IonLabel>
                      )}
                    </IonItem>
                  </IonList>
                  <IonButton onClick={handleEditClick} className="Edit">
                    {isEditing ? "Simpan" : "Edit"}
                  </IonButton>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Profile;
