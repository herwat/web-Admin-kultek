import React from 'react';
import { IonButton, IonContent, IonHeader, IonIcon, IonList, IonMenu, IonMenuToggle, IonTitle } from '@ionic/react';
import "./menuSlideAdmin.css";
import { chevronBackOutline, home, speedometer, paperPlane } from "ionicons/icons";
import MenuItem from './menu-Item/menuItem';
import Buttons from '../button/buttons';

const MenuSlideAdmin: React.FC = () => {
    return (
        <IonMenu contentId='main-content' className='menu-slide'>
            <IonHeader id='menu-slide-header'>
                <IonMenuToggle>
                    <IonButton fill='clear' id='toggle-button'>
                        <IonIcon id='toggle-button-icon' icon={chevronBackOutline} />
                    </IonButton>
                </IonMenuToggle>
                <IonTitle id='menu-slide-title'>MENU</IonTitle>
            </IonHeader>
            <IonContent>
                <IonList>
                    <MenuItem iconItem={home} iconItemFill={home} content='Home' route='/myadmin' />
                    <MenuItem iconItem={speedometer} iconItemFill={speedometer} content='Dashboard' route='/dashboard' />
                    <MenuItem iconItem={paperPlane} iconItemFill={paperPlane} content='Request' route='/request' />
                </IonList>
                <div className="Log">
                    <Buttons style={{width: "200%"}}
                        buttonName="log out"
                        fillType="solid"
                        shape="round"
                        path="formAdmin"
                    />
                </div>
            </IonContent>
        </IonMenu>
    );
}

export default MenuSlideAdmin;


// import React, { useEffect, useState } from 'react';
// import { IonButton, IonContent, IonHeader, IonIcon, IonList, IonMenu, IonMenuToggle, IonTitle } from '@ionic/react';
// import "./menuSlideAdmin.css"
// import {  chevronBackOutline, homeOutline, home, speedometer, paperPlane } from "ionicons/icons"
// import MenuItem from './menu-Item/menuItem';
// import Buttons from '../button/buttons';

// function MenuSlideAdmin() {
    


//     return (
//         <>
//             <IonMenu contentId='main-content' className='menu-slide'>
//             <IonHeader id='menu-slide-header'>
//             <IonMenuToggle>
//                         <IonButton fill='clear' id='toogle-button'>
//                             <IonIcon id='toggle-button-icon' icon={chevronBackOutline} />
//                         </IonButton>
//                     </IonMenuToggle>
//                     <IonTitle id='menu-slide-title'>MENU</IonTitle>
//                 </IonHeader>
//                 <IonContent >
//                     <IonList>     
//                          <MenuItem iconItem={home} iconItemFill={home} content='Home' route='/myadmin' />
//                          <MenuItem iconItem={speedometer} iconItemFill={speedometer} content='Dashboard' route='dashboard' />
//                          <MenuItem iconItem={paperPlane} iconItemFill={paperPlane} content='Request' route='request' />
                       
//                     </IonList> 
//                     <div className="Log">
//                     <Buttons style={{width:"200%"}}
//                          buttonName="log out" 
//                          fillType= "solid" 
//                          shape= "round" 
//                          path= "formAdmin"
//                          />
//                     </div> 
//                 </IonContent>
//             </IonMenu >
//         </>
//     );
// };

// export default MenuSlideAdmin;