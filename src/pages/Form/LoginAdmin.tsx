// import React, { useState } from 'react';
// import {
//   IonPage,
//   IonCard,
//   IonCardHeader,
//   IonCardTitle,
//   IonCardContent,
//   IonInput,
//   IonAlert,
//   IonCheckbox,
// } from '@ionic/react';
// import Buttons from '../../components/button/buttons';
// import { useHistory } from 'react-router-dom';
// import './LoginAdmin.css';
// import { signInWithEmailAndPassword } from 'firebase/auth';
// import { auth } from '../firebase/firebase';
// import { UserProvider, useUser } from '../../components/UserContext';

// interface LoginAdminProps { }

// const FormAdmin: React.FC<LoginAdminProps> = () => {
//   const [showAlert, setShowAlert] = useState<boolean>(false);
//   const [isRegister, setIsRegister] = useState<boolean>(false);
//   const [reminder, setReminder] = useState<boolean>(false);
//   const [alertWrong, setAlertWrong] = useState<boolean>(false);
//   const [emailValue, setEmailValue] = useState<string>('');
//   const [passwordValue, setPasswordValue] = useState<string>('');
//   const history = useHistory();
//   const { setEmail } = useUser();  // Get setEmail from context

//   const handleLogin = async () => {
//     setIsRegister(false);
//     try {
//       // Perform Firebase login
//       await signInWithEmailAndPassword(auth, emailValue, passwordValue);

//       if (reminder) {
//         // Implement your reminder logic here
//         console.log('Reminder activated!');
//       }

//       setEmail(emailValue);  // Save email to context
//       setShowAlert(true);
//     } catch (error) {
//       setAlertWrong(true);
//       console.error('Error signing in:', error);
//     }
//   };

//   return (
//     <IonPage className="formAdmin">
//       <IonCard className="centered-card-Admin">
//         <div className="login-container-Admin">
//           <div>
//             <IonCardHeader className="headerAdmin">
//               <p>
//                 <IonCardTitle className="tittleAdmin">
//                   <strong>{isRegister ? 'Register' : 'Admin Login'}</strong>
//                 </IonCardTitle>
//               </p>
//             </IonCardHeader>
//             <IonCardContent className="contentAdmin">
//               <div>
//                 <p className="EmailAdmin">
//                   <strong>Email Address</strong>
//                 </p>
//                 <IonInput
//                   placeholder=" Email/Username"
//                   style={{ border: '1px solid grey', width: '500px', height: '50px' }}
//                   onIonChange={(e) => setEmailValue(e.detail.value!)}
//                 />
//               </div>
//               <div>
//                 <p className="passwordAdmin">
//                   <strong>Password</strong>
//                 </p>
//                 <IonInput
//                   placeholder=" Password"
//                   type="password"
//                   style={{ border: '1px solid grey', width: '500px', height: '50px' }}
//                   onIonChange={(e) => setPasswordValue(e.detail.value!)}
//                 />
//               </div>
//               <div className="remembermeAdmin">
//                 <IonCheckbox checked={reminder} onIonChange={(e) => setReminder(e.detail.checked as boolean)}> Remember Me </IonCheckbox>
//               </div>
//               <p className="buttonAdmin">
//                 <Buttons
//                   buttonName={isRegister ? 'Register' : 'Login'}
//                   maxWidth={isRegister ? '70px' : '100px'}
//                   fillType="solid"
//                   shape="round"
//                   onClick={handleLogin}
//                   style={{ width: '100%' }}
//                 />
//               </p>
//             </IonCardContent>
//             <IonAlert
//               isOpen={showAlert}
//               onDidDismiss={() => {
//                 setShowAlert(false);
//                 history.push('/admin');
//               }}
//               header="Login Successful"
//               message="You have successfully logged in."
//               buttons={['OK']}
//             />
//             <IonAlert
//               isOpen={alertWrong}
//               onDidDismiss={() => setAlertWrong(false)}
//               header="Login Failed"
//               message="Invalid email or password. Please try again."
//               buttons={['OK']}
//             />
//           </div>
//           <div className='imageAdmin'>
//             <img src="https://png.pngtree.com/png-vector/20221124/ourmid/pngtree-recruitment-job-for-social-media-admin-png-image_6478542.png" alt=''/>
//           </div>
//         </div>
//       </IonCard>
//     </IonPage>
//   );
// };


// export default LoginAdminProps;




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
} from '@ionic/react';
import Buttons from '../../components/button/buttons';
import { useHistory } from 'react-router-dom';
import './LoginAdmin.css';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../pages/firebase/firebase';

interface FormAdminProps { }

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
      // Perform Firebase login
      await signInWithEmailAndPassword(auth, emailValue, passwordValue);

      if (reminder) {
        // Implement your reminder logic here
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
                  placeholder=" Email/Username"
                  style={{ border: '1px solid grey', width: '500px', height: '50px' }}
                  onIonChange={(e) => setEmailValue(e.detail.value!)}
                />
              </div>
              <div>
                <p className="passwordAdmin">
                  <strong>Password</strong>
                </p>
                <IonInput
                  placeholder=" Password"
                  type="password"
                  style={{ border: '1px solid grey', width: '500px', height: '50px' }}
                  onIonChange={(e) => setPasswordValue(e.detail.value!)}
                />
              </div>
              <div className="remembermeAdmin">
                <IonCheckbox checked={reminder} onIonChange={(e) => setReminder(e.detail.checked)}> Remember Me </IonCheckbox>
              </div>
              <p className="buttonAdmin">
                <Buttons
                  buttonName={isRegister ? 'Register' : 'Login'}
                  maxWidth={isRegister ? '100px' : '100px'}
                  fillType="solid"
                  shape="round"
                  onClick={handleLogin}
                  style={{ width: 'auto' }}
                />
              </p>
            </IonCardContent>
            <IonAlert
              isOpen={showAlert}
              onDidDismiss={() => setShowAlert(false)}
              header="Login Successful"
              message="You have successfully logged in."
              buttons={[
                {
                  text: 'OK',
                  handler: () => {
                    history.push('/admin');
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
            <img src="https://png.pngtree.com/png-vector/20221124/ourmid/pngtree-recruitment-job-for-social-media-admin-png-image_6478542.png" alt=''/>
          </div>
        </div>
      </IonCard>
    </IonPage>
  );
};

export default FormAdmin;
