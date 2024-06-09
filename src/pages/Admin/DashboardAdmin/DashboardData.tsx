import {
    MaterialReactTable,
    useMaterialReactTable,
    type MRT_Row,
    createMRTColumnHelper,
  } from 'material-react-table';
  import { Box, Button, Link, MenuItem, Select } from '@mui/material';
  import FileDownloadIcon from '@mui/icons-material/FileDownload';
  import { jsPDF } from 'jspdf'; //or use your library of choice here
  import autoTable from 'jspdf-autotable';
  import { data, type Person } from './data';
import { useState } from 'react';
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
        const history = useHistory();
        return (
          <Button
            variant="contained"
            color="primary"
            onClick={() => history.push('/home')}
          >
            Detail
          </Button>
        );
      },
    }),
  ];

  const Example = () => {
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
  
  export default Example;
  



