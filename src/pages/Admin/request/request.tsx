import React, { useState } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_Row,
  createMRTColumnHelper,
} from 'material-react-table';
import { Box, Button, Link, MenuItem, Select, Modal, TextField, Typography } from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { jsPDF } from 'jspdf'; //or use your library of choice here
import autoTable from 'jspdf-autotable';
import { data, type Person } from './data';
import { useHistory } from 'react-router';

const columnHelper = createMRTColumnHelper<Person>();

const columns = [
  columnHelper.accessor('Nama', {
    header: 'Nama',
    size: 120,
  }),
  columnHelper.accessor('JenisBisnis', {
    header: 'Jenis Bisnis',
    size: 20,
    Cell: ({ row }) => {
      const [jenisBisnis, setJenisBisnis] = useState<string | null>(row.original.JenisBisnis);
      return (
        <Select
          value={jenisBisnis || ''}
          onChange={(event) => setJenisBisnis(event.target.value)}
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
    Cell: ({ row }) => {
      const [status, setStatus] = useState(row.original.Status);
      return (
        <Button
          variant="contained"
          color={status ? 'success' : 'error'}
          onClick={() => setStatus(!status)}
        >
          {status ? 'Aktif' : 'Tidak Aktif'}
        </Button>
      );
    },
  }),
  columnHelper.accessor('email', {
    header: 'Email',
  }),
  columnHelper.accessor('email', {
    header: 'Aksi',
    Cell: ({ row }) => {
      const [open, setOpen] = useState(false);

      const handleOpen = () => setOpen(true);
      const handleClose = () => setOpen(false);

      const [confirmOpen, setConfirmOpen] = useState(false);
      const handleConfirmOpen = () => setConfirmOpen(true);
      const handleConfirmClose = () => setConfirmOpen(false);

      const handleSave = () => {
        // Implement save logic here
        handleClose();
        alert('Data berhasil diperbarui');
      };

      const handleDelete = () => {
        // Implement delete logic here
        handleConfirmClose();
        handleClose();
      };

      return (
        <>
          <Button
            variant="contained"
            color="primary"
            onClick={handleOpen}
          >
            Detail
          </Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={{ ...modalStyle }}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Detail Data
              </Typography>
              <TextField label="Nama" defaultValue={row.original.Nama} fullWidth margin="normal" />
              <TextField label="Jenis Bisnis" defaultValue={row.original.JenisBisnis} fullWidth margin="normal" />
              <TextField label="Status" defaultValue={row.original.Status ? 'Aktif' : 'Tidak Aktif'} fullWidth margin="normal" />
              <TextField label="Email" defaultValue={row.original.email} fullWidth margin="normal" />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
                <Button variant="contained" color="primary" onClick={handleSave}>
                  Save
                </Button>
                <Button variant="contained" color="secondary" onClick={handleConfirmOpen}>
                  Delete
                </Button>
                <Button variant="contained" onClick={handleClose}>
                  Cancel
                </Button>
              </Box>
              <Modal
                open={confirmOpen}
                onClose={handleConfirmClose}
                aria-labelledby="confirm-modal-title"
                aria-describedby="confirm-modal-description"
              >
                <Box sx={{ ...modalStyle }}>
                  <Typography id="confirm-modal-title" variant="h6" component="h2">
                    Konfirmasi Hapus
                  </Typography>
                  <Typography id="confirm-modal-description" sx={{ mt: 2 }}>
                    Apakah Anda yakin ingin menghapus data baris ini?
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
                    <Button variant="contained" color="secondary" onClick={handleDelete}>
                      Yes
                    </Button>
                    <Button variant="contained" onClick={handleConfirmClose}>
                      No
                    </Button>
                  </Box>
                </Box>
              </Modal>
            </Box>
          </Modal>
        </>
      );
    },
  }),
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

const requestadmin = () => {
  const handleExportRows = (rows: MRT_Row<Person>[]) => {
    const doc = new jsPDF();
    const tableData = rows.map((row) => Object.values(row.original));
    const tableHeaders = columns.map((c) => c.header);

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
        sx={{
          display: 'flex',
          gap: '16px',
          padding: '8px',
          flexWrap: 'wrap',
        }}
      >
        <Button
          disabled={table.getPrePaginationRowModel().rows.length === 0}
          //export all rows, including from the next page, (still respects filtering and sorting)
          onClick={() =>
            handleExportRows(table.getPrePaginationRowModel().rows)
          }
          startIcon={<FileDownloadIcon />}
        >
          Export All Rows
        </Button>
        <Button
          disabled={table.getRowModel().rows.length === 0}
          //export all rows as seen on the screen (respects pagination, sorting, filtering, etc.)
          onClick={() => handleExportRows(table.getRowModel().rows)}
          startIcon={<FileDownloadIcon />}
        >
          Export Page Rows
        </Button>
        <Button
          disabled={
            !table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()
          }
          //only export selected rows
          onClick={() => handleExportRows(table.getSelectedRowModel().rows)}
          startIcon={<FileDownloadIcon />}
        >
          Export Selected Rows
        </Button>
      </Box>
    ),
  });

  return <MaterialReactTable table={table} />;
};

export default requestadmin;