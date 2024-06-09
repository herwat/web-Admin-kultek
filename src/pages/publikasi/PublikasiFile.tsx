import React, { useEffect, useState } from 'react';
import { IonCard, IonHeader, IonCardContent, IonPage, IonButton } from '@ionic/react';
import Toolbar from '../../components/toolbar/toolbar';
import { db, storage } from '../firebase/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes } from 'firebase/storage';
import './PublikasiFile.css';

const Publikasi: React.FC = () => {

  const [newAuthor, setNewAuthor] = useState("");
  const [newYear, setNewYear] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [newTags, setNewTags] = useState("");
  const [newDoc, setNewDoc] = useState<File | null>(null);
  const [inputKey, setInputKey] = useState(Date.now());

  const [isLoading, setIsLoading] = useState(false);

  const userCollectionRef = collection(db, 'documents')

  const createData = async () => {
    if (newDoc == null || newAuthor == "" || Number(newYear) === 0 || newTitle == "") return;
    setIsLoading(true);
    try {
      await addDoc(userCollectionRef, { authors: newAuthor, year: newYear, title: newTitle, tags: newTags });
      const docRef = ref(storage, `documents/${newAuthor + "-" + newTitle}`);
      await uploadBytes(docRef, newDoc);
      alert("Dokumen Terupload");

      setNewAuthor("");
      setNewYear("");
      setNewTitle("");
      setNewTags("");
      setNewDoc(null);
      setInputKey(Date.now());

    } catch (error) {
      console.error(error);
      alert(collection(db, 'documents'));
    }

    setIsLoading(false);
  }

  useEffect(() => {
    console.log(userCollectionRef)
  }, []);
  return (
    <>
      <IonPage className="publish">

        <IonHeader>
          <Toolbar
            pageName="Publikasi Saya"
            imageLink="https://i.pinimg.com/564x/83/bc/8b/83bc8b88cf6bc4b4e04d153a418cde62.jpg"
          />
        </IonHeader>
        <IonCard className="publikasi">
          <IonCardContent className="bagian">
            <div style={{ height: '42px' }}>
              <h1 style={{ width: '100%', textAlign: 'center', fontWeight: "500", margin: '0px' }}>UNGGAH DOKUMEN</h1>
            </div>
            <div className='input-container'>
              <p className='labels'>Authors <span style={{ color: 'rgb(223, 66, 66)', fontSize: '12px !important' }}>*</span></p>
              <input className='input-box' value={newAuthor} onChange={(e) => setNewAuthor(e.target.value)} type="text" placeholder="  Masukkan nama-nama penulis..." />
            </div>
            <div className='input-container'>
              <p className='labels'>Year <span style={{ color: 'rgb(223, 66, 66)', fontSize: '12px !important' }}>*</span></p>
              <input className='input-box' value={newYear} onChange={(e) => setNewYear(e.target.value)} type="number" placeholder="  Masukkan tahun..." />
            </div>
            <div className='input-container'>
              <p className='labels'>Judul <span style={{ color: 'rgb(223, 66, 66)', fontSize: '12px !important' }}>*</span></p>
              <input className='input-box' value={newTitle} onChange={(e) => setNewTitle(e.target.value)} type="text" placeholder="  Masukkan judul..." />
            </div>
            <div className='input-container'>
              <p className='labels'>Kata Kunci</p>
              <input className='input-box' value={newTags} onChange={(e) => setNewTags(e.target.value)} type="text" placeholder="  Masukkan kata kunci untuk dokumen..." />
            </div>
            <div className='input-container'>
              <p className='labels'>File <span style={{ color: 'rgb(223, 66, 66)', fontSize: '12px !important' }}>*</span></p>
              <div id='file-box'>
                <input key={inputKey} type="file" onChange={(e) => {
                  if (e.target.files) {
                    setNewDoc(e.target.files[0]);
                  }
                }} />
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '12px' }}>
              <IonButton id='submit-button' onClick={createData} disabled={isLoading}>
                {isLoading ? "Sedang Mengirim..." : "KIRIM"}
              </IonButton>
            </div>
          </IonCardContent>
        </IonCard>
      </IonPage>
    </>
  );
};

export default Publikasi;