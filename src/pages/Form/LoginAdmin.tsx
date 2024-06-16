import React, { useState } from 'react';
import {
  IonPage,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonInput,
  IonAlert,
  IonCheckbox,
  IonButton,
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import './LoginAdmin.css';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../pages/firebase/firebase';

interface FormAdminProps {}

const FormAdmin: React.FC<FormAdminProps> = () => {
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [isRegister, setIsRegister] = useState<boolean>(false);
  const [reminder, setReminder] = useState<boolean>(false);
  const [alertWrong, setAlertWrong] = useState<boolean>(false);
  const [emailValue, setEmailValue] = useState<string>('');
  const [passwordValue, setPasswordValue] = useState<string>('');
  const history = useHistory();

  const handleLogin = async () => {
    setIsRegister(false);
    try {
      await signInWithEmailAndPassword(auth, emailValue, passwordValue);

      if (reminder) {
        console.log('Reminder activated!');
      }

      setShowAlert(true);
    } catch (error) {
      setAlertWrong(true);
      console.error('Error signing in:', error);
    }
  };

  return (
    <IonPage className="formAdmin">
      <IonCard className="centered-card-Admin">
        <div className="login-container-Admin">
          <div>
            <IonCardHeader className="headerAdmin">
              <p>
                <IonCardTitle className="tittleAdmin">
                  <strong>{isRegister ? 'Register' : 'Admin Login'}</strong>
                </IonCardTitle>
              </p>
            </IonCardHeader>
            <IonCardContent className="contentAdmin">
              <div>
                <p className="EmailAdmin">
                  <strong>Email Address</strong>
                </p>
                <IonInput
                  placeholder="Email/Username"
                  style={{ border: '1px solid grey', width: '500px', height: '50px' }}
                  onIonChange={(e) => setEmailValue(e.detail.value! as string)}
                />
              </div>
              <div>
                <p className="passwordAdmin">
                  <strong>Password</strong>
                </p>
                <IonInput
                  placeholder="Password"
                  type="password"
                  style={{ border: '1px solid grey', width: '500px', height: '50px' }}
                  onIonChange={(e) => setPasswordValue(e.detail.value! as string)}
                />
              </div>
              <div className="remembermeAdmin">
                <IonCheckbox checked={reminder} onIonChange={(e) => setReminder(e.detail.checked)}> Remember Me </IonCheckbox>
              </div>
              <p className="buttonAdmin">
                <IonButton
                  onClick={handleLogin}
                  style={{ width: 'auto' }}
                >
                  {isRegister ? 'Register' : 'Login'}
                </IonButton>
              </p>
            </IonCardContent>
            <IonAlert
              isOpen={showAlert}
              onDidDismiss={() => {
                setShowAlert(false);
                history.push('/myadmin');
              }}
              header="Login Successful"
              message="You have successfully logged in."
              buttons={[
                {
                  text: 'OK',
                  handler: () => {
                    history.push('/myadmin');
                  }
                }
              ]}
            />
            <IonAlert
              isOpen={alertWrong}
              onDidDismiss={() => setAlertWrong(false)}
              header="Login Failed"
              message="Invalid email or password. Please try again."
              buttons={['OK']}
            />
          </div>
          <div className='imageAdmin'>
            <img src="https://png.pngtree.com/png-vector/20221124/ourmid/pngtree-recruitment-job-for-social-media-admin-png-image_6478542.png" alt='' />
          </div>
        </div>
      </IonCard>
    </IonPage>
  );
};

export default FormAdmin;

