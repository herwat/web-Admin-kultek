import React, { useState } from 'react';
import { IonHeader, IonPage, IonItem, IonLabel, IonImg, IonButton } from '@ionic/react';
import ToolbarAdmin from '../../../components/toolbar/toolbarAdmin';
import MenuSlideAdmin from '../../../components/menu-Slide/menuSlideAdmin';
import './request.css';
import {
  MaterialReactTable,
  useMaterialReactTable,
  MRT_Row,
  createMRTColumnHelper,
} from 'material-react-table';
import { Box, Button, MenuItem, Select, Typography, TextField, Modal, FormControl, InputLabel } from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Person, data } from './data';
import { getDownloadURL, getStorage, uploadBytes, ref } from "firebase/storage";
import { getFirestore, collection, addDoc } from 'firebase/firestore';

const columnHelper = createMRTColumnHelper<Person>();
const storage = getStorage();
const firestore = getFirestore(); // Inisialisasi Firestore

const columns = [
  columnHelper.accessor('Nama', {
    header: 'Nama',
    size: 120,
  }),
  columnHelper.accessor('JenisBisnis', {
    header: 'Jenis Bisnis',
    size: 20,
    Cell: ({ row }: { row: MRT_Row<Person> }) => {
      const [jenisBisnis, setJenisBisnis] = useState<string | null>(row.original.JenisBisnis);
      return (
        <Select
          value={jenisBisnis || ''}
          onChange={(event) => setJenisBisnis(event.target.value as string)}
          fullWidth
        >
          <MenuItem value={'Warung Makanan'}>Warung Makanan</MenuItem>
          <MenuItem value={'Warung Berjalan'}>Warung Berjalan</MenuItem>
        </Select>
      );
    },
  }),
  columnHelper.accessor('Status', {
    header: 'Status',
    size: 300,
    Cell: ({ row }: { row: MRT_Row<Person> }) => {
      const [status, setStatus] = useState<boolean>(row.original.Status);
      return (
        <Button
          variant="contained"
          color={status ? 'success' : 'error'}
          onClick={() => setStatus(!status)}
        >
          {status ? 'Diterima' : 'Ditolak'}
        </Button>
      );
    },
  }),
  columnHelper.accessor('email', {
    header: 'Email',
  }),
  {
    accessorKey: 'aksi',
    header: 'Aksi',
    Cell: ({ row }: { row: MRT_Row<Person> }) => {
      const [open, setOpen] = useState(false);
      const [imageOpen, setImageOpen] = useState(false);
      const [imageName, setImageName] = useState<string | null>(null);
      const [image, setImage] = useState<string>('');

      const handleOpen = () => setOpen(true);
      const handleClose = () => setOpen(false);
      const handleImageOpen = () => setImageOpen(true);
      const handleImageClose = () => setImageOpen(false);

      const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
          setImageName(file.name);
          const storageRef = ref(storage, 'admin_upload/' + file.name);
          
          try {
            await uploadBytes(storageRef, file);
            const downloadURL = await getDownloadURL(storageRef);
            setImage(downloadURL);
          } catch (error) {
            console.error('Error uploading image: ', error);
          }
        }
      };

      const handleSave = async () => {
        // Simpan data ke Firestore
        try {
          const docRef = await addDoc(collection(firestore, 'requests'), {
            Nama: row.original.Nama,
            JenisBisnis: row.original.JenisBisnis,
            Status: row.original.Status,
            email: row.original.email,
          });
          console.log('Document written with ID: ', docRef.id);
        } catch (error) {
          console.error('Error adding document: ', error);
        }

        handleClose();
        alert('request UMKM diterima');
      };

      const handleDelete = () => {
        handleClose();
        alert('request UMKM ditolak');
      };

      function setPhoto(result: string) {
        throw new Error('Function not implemented.');
      }

      return (
        <>
          <Button variant="contained" color="primary" onClick={handleOpen}>
            Lihat Detail
          </Button>
          <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
            <Box sx={{ ...modalStyle }}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Detail Data
              </Typography>
              <TextField label="Nama Bisnis" defaultValue={row.original.Nama} fullWidth margin="normal" />
              <FormControl fullWidth margin="normal">
                <InputLabel id="jenis-bisnis-label">Jenis Bisnis</InputLabel>
                <Select
                  labelId="jenis-bisnis-label"
                  id="jenis-bisnis"
                  defaultValue={row.original.JenisBisnis}
                  label="Jenis Bisnis"
                >
                  <MenuItem value="Warung Makanan">Warung Makanan</MenuItem>
                  <MenuItem value="Warung Berjalan">Warung Berjalan</MenuItem>
                </Select>
              </FormControl>
              <TextField label="Products" defaultValue={row.original.Nama} fullWidth margin="normal" />
              <TextField label="Alamat" defaultValue={row.original.Status} fullWidth margin="normal" />
              <TextField label="No.Hp" defaultValue={row.original.email} fullWidth margin="normal" />
              <TextField label="Email" defaultValue={row.original.email} fullWidth margin="normal" />
              <IonItem>
                <IonLabel position="stacked">Upload Image/Logo UMKM</IonLabel>
                <input 
                type="file"
                accept=".png, .jpg, .jpeg, .gif"
                onChange={(e) => {
                  const file = e.target.files && e.target.files[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                      if (e.target && typeof e.target.result === 'string') {
                        setPhoto(e.target.result);
                      }
                    };
                    reader.readAsDataURL(file);
                  }
                }}
                />
              </IonItem>
              {imageName && (
                <IonItem>
                  <IonLabel onClick={handleImageOpen} style={{ cursor: 'pointer', color: 'blue' }}>
                    {imageName}
                  </IonLabel>
                </IonItem>
              )}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
                <Button 
                  variant="contained" 
                  style={{ backgroundColor: 'red', color: 'white' }} 
                  onClick={handleDelete}
                >
                  Ditolak
                </Button>

                <Button 
                  variant="contained" 
                  style={{ backgroundColor: 'blue', color: 'white' }} 
                  onClick={handleSave}
                >
                  Diterima
                </Button>
              </Box>
            </Box>
          </Modal>
          <Modal open={imageOpen} onClose={handleImageClose} aria-labelledby="image-modal-title" aria-describedby="image-modal-description">
            <Box sx={{ ...modalStyle, width: '80%', maxHeight: '80%', overflow: 'auto' }}>
              <Typography id="image-modal-title" variant="h6" component="h2">
                Image Detail
              </Typography>
              <IonImg src={image} />
              <IonButton onClick={handleImageClose}>Close</IonButton>
            </Box>
          </Modal>
        </>
      );
    },
  },
];

const modalStyle = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const requestadmin: React.FC = () => {
  const handleExportRows = (rows: MRT_Row<Person>[]) => {
    const doc = new jsPDF();
    const tableData = rows.map((row) => Object.values(row.original));
    const tableHeaders = columns.map((c) => c.header as string);

    autoTable(doc, {
      head: [tableHeaders],
      body: tableData,
    });

    doc.save('mrt-pdf-example.pdf');
  };

  const table = useMaterialReactTable({
    columns,
    data,
    enableRowSelection: true,
    columnFilterDisplayMode: 'popover',
    paginationDisplayMode: 'pages',
    positionToolbarAlertBanner: 'bottom',
    renderTopToolbarCustomActions: ({ table }) => (
      <Box sx={{ display: 'flex', gap: '16px', padding: '8px', flexWrap: 'wrap' }}>
        <Button
          disabled={table.getPrePaginationRowModel().rows.length === 0}
          onClick={() => handleExportRows(table.getPrePaginationRowModel().rows)}
          startIcon={<FileDownloadIcon />}
        >
          Export All Rows
        </Button>
        <Button
          disabled={table.getRowModel().rows.length === 0}
          onClick={() => handleExportRows(table.getRowModel().rows)}
          startIcon={<FileDownloadIcon />}
        >
          Export Page Rows
        </Button>
        <Button
          disabled={!table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()}
          onClick={() => handleExportRows(table.getSelectedRowModel().rows)}
          startIcon={<FileDownloadIcon />}
        >
          Export Selected Rows
        </Button>
      </Box>
    ),
  });

  return (
    <>
    <MenuSlideAdmin />
    <IonPage className="Dash">
      <IonHeader>
        <ToolbarAdmin pageName="Request" imageLink="https://www.pngmart.com/files/21/Admin-Profile-PNG-Photo.png" />
      </IonHeader>
      <div className="table-container">
        <MaterialReactTable table={table} />
      </div>
    </IonPage>
  </>
  );
};

export default requestadmin;
