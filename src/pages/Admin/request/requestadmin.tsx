import React, { useEffect, useState } from 'react';
import {
  IonHeader,
  IonPage,
  IonItem,
  IonLabel,
  IonImg,
  IonButton,
  IonContent,
} from '@ionic/react';
import ToolbarAdmin from '../../../components/toolbar/toolbarAdmin';
import MenuSlideAdmin from '../../../components/menu-Slide/menuSlideAdmin';
import './request.css';
import {
  MaterialReactTable,
  useMaterialReactTable,
  MRT_Row,
  createMRTColumnHelper,
} from 'material-react-table';
import {
  Box,
  Button,
  MenuItem,
  Select,
  Typography,
  TextField,
  Modal,
  FormControl,
  InputLabel,
} from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { getDownloadURL, uploadBytes, ref } from 'firebase/storage';
import { doc, updateDoc } from 'firebase/firestore';
import { Request } from './data';
import { getAllRequests } from './api';
import { firestore, storage } from '../../firebase/firebase';

const columnHelper = createMRTColumnHelper<Request>();
const columns = [
  columnHelper.accessor('name', {
    header: 'Nama',
    size: 300,
  }),
  columnHelper.accessor('type', {
    header: 'Jenis Bisnis',
    Cell: ({ row }: { row: MRT_Row<Request> }) => {
      const [jenisBisnis, setJenisBisnis] = useState<string | null>(
        row.original.type
      );
      return (
        <Select
          value={jenisBisnis || ''}
          onChange={(event) => setJenisBisnis(event.target.value as string)}
          fullWidth
        >
          <MenuItem value={'offline'}>Offline</MenuItem>
          <MenuItem value={'online'}>Online</MenuItem>
        </Select>
      );
    },
  }),
  columnHelper.accessor('status', {
    header: 'Status',
    size: 150,
    enableResizing: true,
    Cell: ({ row }: { row: MRT_Row<Request> }) => {
      const [status, setStatus] = useState<string>(row.original.status);

      const statusRender = () => {
        if (status === 'menunggu') {
          return 'Menunggu';
        } else if (status === 'diterima') {
          return 'Diterima';
        } else {
          return 'Ditolak';
        }
      };

      const getColor = (status: string) => {
        switch (status) {
          case 'menunggu':
            return 'inherit';
          case 'diterima':
            return 'success';
          case 'ditolak':
            return 'error';
        }
      };
      return (
        <Button variant='contained' color={getColor(status)}>
          {statusRender()}
        </Button>
      );
    },
  }),
  columnHelper.accessor('whatsapp', {
    header: 'Nomor HP',
    size: 150,
    Cell: ({ row }: { row: MRT_Row<Request> }) => {
      const [whatsapp, setWhatsapp] = useState<string>(row.original.whatsapp);
      return (
        <Button
          variant='contained'
          color={whatsapp ? 'success' : 'error'}
          onClick={() => setWhatsapp(whatsapp)}
        >
          0{whatsapp}
        </Button>
      );
    },
  }),
  columnHelper.accessor('address', {
    header: 'Alamat',
    size: 300,
    Cell: ({ row }: { row: MRT_Row<Request> }) => {
      const [address, setAddress] = useState(row.original.address.text);
      console.log(address);
      return (
        <Button
          variant='contained'
          color={address ? 'success' : 'error'}
          onClick={() => setAddress(address)}
        >
          {address}
        </Button>
      );
    },
  }),
  {
    accessorKey: 'aksi',
    header: 'Aksi',
    Cell: ({ row }: { row: MRT_Row<Request> }) => {
      const [open, setOpen] = useState(false);
      const [imageOpen, setImageOpen] = useState(false);
      const [imageName, setImageName] = useState<string | null>(null);
      const [image, setImage] = useState<string>('');

      const handleOpen = () => setOpen(true);
      const handleClose = () => setOpen(false);
      const handleImageOpen = () => setImageOpen(true);
      const handleImageClose = () => setImageOpen(false);

      const handleImageChange = async (
        event: React.ChangeEvent<HTMLInputElement>
      ) => {
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

      const handleApprove = async (id: string) => {
        try {
          const requestDocRef = doc(firestore, 'requests', id);
          await updateDoc(requestDocRef, {
            status: 'diterima',
          });
          console.log('Document updated with ID: ', id);
        } catch (error) {
          console.error('Error updating document: ', error);
        }

        handleClose();
        alert('request UMKM diterima');
      };

      const handleReject = async (id: string) => {
        try {
          const requestDocRef = doc(firestore, 'requests', id);
          await updateDoc(requestDocRef, {
            status: 'ditolak',
          });
          console.log('Document updated with ID: ', id);
        } catch (error) {
          console.error('Error updating document: ', error);
        }

        handleClose();
        alert('request UMKM ditolak');
      };

      return (
        <>
          <Button variant='contained' color='primary' onClick={handleOpen}>
            Lihat Detail
          </Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby='modal-modal-title'
            aria-describedby='modal-modal-description'
          >
            <Box sx={{ ...modalStyle }}>
              <Typography id='modal-modal-title' variant='h6' component='h2'>
                Detail Data
              </Typography>
              <TextField
                label='Nama Bisnis'
                defaultValue={row.original.name}
                fullWidth
                margin='normal'
              />
              <FormControl fullWidth margin='normal'>
                <InputLabel id='jenis-bisnis-label'>Jenis Bisnis</InputLabel>
                <Select
                  labelId='jenis-bisnis-label'
                  id='jenis-bisnis'
                  defaultValue={row.original.type}
                  label='Jenis Bisnis'
                >
                  <MenuItem value={'offline'}>Offline</MenuItem>
                  <MenuItem value={'online'}>Online</MenuItem>
                </Select>
              </FormControl>
              <TextField
                label='Alamat'
                defaultValue={row.original.address.text}
                fullWidth
                margin='normal'
                type='text'
              />
              <TextField
                label='Link Google Maps'
                defaultValue={row.original.address.gmap}
                fullWidth
                margin='normal'
                type='text'
              />
              <TextField
                label='No.Hp'
                defaultValue={`0${row.original.whatsapp}`}
                fullWidth
                margin='normal'
              />
              <IonItem>
                <IonLabel position='stacked'>Upload Image/Logo UMKM</IonLabel>
                <input
                  type='file'
                  accept='.png, .jpg, .jpeg, .gif'
                  onChange={handleImageChange}
                />
              </IonItem>
              {imageName && (
                <IonItem>
                  <IonLabel
                    onClick={handleImageOpen}
                    style={{ cursor: 'pointer', color: 'blue' }}
                  >
                    {imageName}
                  </IonLabel>
                </IonItem>
              )}
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginTop: 2,
                }}
              >
                <Button variant='contained' onClick={handleClose}>
                  Cancel
                </Button>
                <Button
                  variant='contained'
                  style={{ backgroundColor: 'red', color: 'white' }}
                  onClick={() => handleReject(row.original.id)}
                >
                  Ditolak
                </Button>
                <Button
                  variant='contained'
                  style={{ backgroundColor: 'green', color: 'white' }}
                  onClick={() => handleApprove(row.original.id)}
                >
                  Diterima
                </Button>
              </Box>
            </Box>
          </Modal>
          <Modal
            open={imageOpen}
            onClose={handleImageClose}
            aria-labelledby='image-modal-title'
            aria-describedby='image-modal-description'
          >
            <Box
              sx={{
                ...modalStyle,
                width: '80%',
                maxHeight: '80%',
                overflow: 'auto',
              }}
            >
              <Typography id='image-modal-title' variant='h6' component='h2'>
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
  const [data, setData] = useState<Request[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const requests = await getAllRequests();
      setData(requests);
    };

    fetchData();
  }, []);

  const handleExportRows = (rows: MRT_Row<Request>[]) => {
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
      <Box
        sx={{ display: 'flex', gap: '16px', padding: '8px', flexWrap: 'wrap' }}
      >
        <Button
          disabled={table.getPrePaginationRowModel().rows.length === 0}
          onClick={() =>
            handleExportRows(table.getPrePaginationRowModel().rows)
          }
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
          disabled={
            !table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()
          }
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
      <IonPage className='Dash'>
        <IonHeader>
          <ToolbarAdmin
            pageName='Request'
            imageLink='https://www.pngmart.com/files/21/Admin-Profile-PNG-Photo.png'
          />
        </IonHeader>
        <div className='table-container'>
          <MaterialReactTable table={table} />
        </div>
      </IonPage>
    </>
  );
};

export default requestadmin;
