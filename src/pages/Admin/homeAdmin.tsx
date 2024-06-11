import React from 'react';
import { 
    IonContent, 
    IonHeader, 
    IonPage, 
    IonCardContent, 
    IonCard, 
    IonGrid, 
    IonRow, 
    IonCol, 
    IonText
} from '@ionic/react';
import './homeAdmin.css';
import ToolbarAdmin from '../../components/toolbar/toolbarAdmin';
import MenuSlideAdmin from '../../components/menu-Slide/menuSlideAdmin';
import { 
    BarChart, 
    CartesianGrid, 
    XAxis, 
    YAxis, 
    Bar, 
    Label, 
    LabelList 
} from 'recharts';

const HomeAdmin: React.FC = () => {
    const data = [
        { name: "Jan", numUMKM: 3 },
        { name: "Feb", numUMKM: 7 },
        { name: "Mar", numUMKM: 14 },
        { name: "Apr", numUMKM: 9 },
        { name: "May", numUMKM: 12 },
        { name: "Jun", numUMKM: 15 },
        { name: "Jul", numUMKM: 7 },
        { name: "Aug", numUMKM: 11 },
        { name: "Sep", numUMKM: 9 },
        { name: "Oct", numUMKM: 2 },
        { name: "Nov", numUMKM: 12 },
        { name: "Dec", numUMKM: 16 },
    ];

    return (
        <>
            <MenuSlideAdmin />
            <IonPage id="main-content">
                <IonHeader>
                    <ToolbarAdmin pageName="Admin" imageLink="https://www.pngmart.com/files/21/Admin-Profile-PNG-Photo.png" />
                </IonHeader>
                <IonContent fullscreen className="contentadmin">
                    <h2 className="text01">Dashboard</h2>
                    <h4 className="sapaan">Hi, Mentari</h4>
                    <IonGrid fixed>
                        <IonRow>
                            <IonCol size="12">
                                <IonCard className="informationCard">
                                    <IonCardContent>
                                        <IonText>
                                            <h3 className="text4" style={{ fontSize: "25px" }}>Informasi</h3>
                                            <ol>
                                                <li style={{ fontSize: "22px" }}>Mohon dimaklumi, sistem informasi kami sedang dalam tahap peningkatan. Kami mohon maaf jika ada ketidaknyamanan yang dialami.</li>
                                                <li style={{ fontSize: "22px" }}>Terima kasih kepada admin yang berperan aktif dalam menarik UMKM untuk bergabung dengan aplikasi ini. Partisipasi aktif Anda sangat penting untuk meningkatkan kualitas dan jangkauan platform kami.</li>
                                            </ol>
                                        </IonText>
                                        <IonCard style={{ width: '100%', height: '100%' }}>
                                            <BarChart
                                                width={730}
                                                height={250}
                                                data={data}
                                                margin={{ top: 15, right: 30, left: 20, bottom: 5 }}
                                            >
                                                <CartesianGrid strokeDasharray="3 3" />
                                                <XAxis dataKey="name">
                                                    <Label value="Months of the Year" offset={0} position="insideBottom" />
                                                </XAxis>
                                                <YAxis label={{ value: 'Total UMKM', angle: -90, position: 'insideLeft', textAnchor: 'middle' }} />
                                                <Bar dataKey="numUMKM" fill="#8884d8">
                                                    <LabelList dataKey="numUMKM" position="insideTop" />
                                                </Bar>
                                            </BarChart>
                                        </IonCard>
                                    </IonCardContent>
                                </IonCard>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                </IonContent>
            </IonPage>
        </>
    );
};

export default HomeAdmin;


// import React from 'react';
// import { IonContent, IonHeader, IonPage, IonCardContent, IonCard, IonGrid, IonRow, IonCol, IonText } from '@ionic/react';
// import './homeAdmin.css';
// import ToolbarAdmin from '../../components/toolbar/toolbarAdmin';
// import MenuSlideAdmin from '../../components/menu-Slide/menuSlideAdmin';
// import { BarChart, CartesianGrid, XAxis, YAxis, Bar, Label, LabelList } from 'recharts';

// const HomeAdmin: React.FC = () => {
//   const data = [
//     { name: "Jan", numUMKM: 3 },
//     { name: "Feb", numUMKM: 7 },
//     { name: "Mar", numUMKM: 14 },
//     { name: "Apr", numUMKM: 9 },
//     { name: "May", numUMKM: 12 },
//     { name: "Jun", numUMKM: 15 },
//     { name: "Jul", numUMKM: 7 },
//     { name: "Aug", numUMKM: 11 },
//     { name: "Sep", numUMKM: 9 },
//     { name: "Oct", numUMKM: 2 },
//     { name: "Nov", numUMKM: 12 },
//     { name: "Dec", numUMKM: 16 },
//   ];

//   return (
//     <>
//       <MenuSlideAdmin />
//       <IonPage id="main-content">
//         <IonHeader>
//           <ToolbarAdmin pageName="Admin" imageLink="https://www.pngmart.com/files/21/Admin-Profile-PNG-Photo.png" />
//         </IonHeader>

//         <IonContent fullscreen className="contentadmin">
//           <h2 className="text01">Dashboard</h2>
//           <h4 className="sapaan">Hi, Mentari</h4>
//           <IonGrid fixed>
//             <IonRow>
//               <IonCol size="12">
//                 <IonCard className="informationCard">
//                   <IonCardContent>
//                     <IonText>
//                       <h3 className="text4" style={{ fontSize: "25px" }}>Informasi</h3>
//                       <ol>
//                         <li style={{ fontSize: "22px" }}>Mohon dimaklumi, sistem informasi kami sedang dalam tahap peningkatan. Kami mohon maaf jika ada ketidaknyamanan yang dialami.</li>
//                         <li style={{ fontSize: "22px" }}>Terima kasih kepada admin yang berperan aktif dalam menarik UMKM untuk bergabung dengan aplikasi ini. Partisipasi aktif Anda sangat penting untuk meningkatkan kualitas dan jangkauan platform kami.</li>
//                       </ol>
//                     </IonText>
//                     <IonCard style={{ width: '100%', height: '100%' }}>
//                       <BarChart
//                         width={730}
//                         height={250}
//                         data={data}
//                         margin={{ top: 15, right: 30, left: 20, bottom: 5 }}
//                       >
//                         <CartesianGrid strokeDasharray="3 3" />
//                         <XAxis dataKey="name">
//                           <Label value="Months of the Year" offset={0} position="insideBottom" />
//                         </XAxis>
//                         <YAxis label={{ value: 'Total UMKM', angle: -90, position: 'insideLeft', textAnchor: 'middle' }} />
//                         <Bar dataKey="numUMKM" fill="#8884d8">
//                           <LabelList dataKey="numUMKM" position="insideTop" />
//                         </Bar>
//                       </BarChart>
//                     </IonCard>
//                   </IonCardContent>
//                 </IonCard>
//               </IonCol>
//             </IonRow>
//           </IonGrid>
//         </IonContent>
//       </IonPage>
//     </>
//   );
// };

// export default HomeAdmin;
