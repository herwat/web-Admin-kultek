import React, { useMemo } from 'react';
import {IonHeader} from '@ionic/react';
import ToolbarAdmin from '../../../components/toolbar/toolbarAdmin';
import MenuSlideAdmin from '../../../components/menu-Slide/menuSlideAdmin';
import {
    MaterialReactTable,
    useMaterialReactTable,
    type MRT_Row,
    createMRTColumnHelper,
  } from 'material-react-table';
  import { Box, Button } from '@mui/material';
  import FileDownloadIcon from '@mui/icons-material/FileDownload';
  import { jsPDF } from 'jspdf'; //or use your library of choice here
  import autoTable from 'jspdf-autotable';
  import { data, type Person } from './DataNotif';
  
  const columnHelper = createMRTColumnHelper<Person>();
  
  const columns = [
    columnHelper.accessor('pemberitahuan', {
      header: 'Pemberitahuan',
      size: 120,
    }),
    columnHelper.accessor('waktu', {
    header: 'Waktu',
    size: 120,
    }),

   
  ];
  
  const DafDos = () => {
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
        
        </Box>
      ),
    });
  
    return (
        <>
         
          <MenuSlideAdmin></MenuSlideAdmin>
    
          
          <IonHeader className="info">
            <ToolbarAdmin
              pageName="Pemberitahuan"
              imageLink="https://i.pinimg.com/564x/83/bc/8b/83bc8b88cf6bc4b4e04d153a418cde62.jpg"
            />
          </IonHeader>
    
          <MaterialReactTable table={table} />
        </>
      );
  };
  
  export default DafDos;
  