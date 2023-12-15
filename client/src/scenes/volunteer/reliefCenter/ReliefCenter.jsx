import React, {  useEffect } from 'react';
import { Box, Container } from '@mui/system'
import { DataGrid } from '@mui/x-data-grid';
import { Button, Fade, Grid, Modal, Stack, Typography } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import uuid from "react-uuid";
import { useState } from 'react';
import axios from 'axios'
import Maps from './Maps.js';
// import EventEmitter from '../../../components/MapComponents/EventEmitter.js';

function ReliefCenter() {


  // modal style
  const style = {
    position: 'absolute',
    top: '30%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    bgcolor: '#fff',
    boxShadow: 24,
    pt: 2,
    p: 4,
  };

  // modal states
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [modalData, setModalData] = React.useState('')
  const [rows, setRows] = React.useState({});
  const [output, setOutput] = useState('')


  function setRow() {
    axios
      .get(`relief/reliefcenters`)
      .then((res) => {
        setRows(res.data);
        console.log(res);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  React.useEffect(() => {
    setRow();
  }, []);


  // demo data
  const columns = [
    { field: "_id", headerName: "Id", width: 300, hideable: false, hide: true },
    { field: 'CenterName', headerName: 'Center name', width: 300 },
    { field: 'Phone', headerName: 'Phone no', width: 300 },
    { field: 'Capacity', headerName: 'Capacity', width: 300 },
    { field: 'Admission', headerName: 'Admission', width: 300, hideable: false, hide: true },
    { field: 'Address', headerName: 'Address', width: 300, hideable: false, hide: true },
    {
      field: 'Vaccancy',
      headerName: 'Vaccancy',
      width: 160,
      valueGetter: (params: GridValueGetterParams) =>
        `${params.row.Capacity - params.row.Admission}`,
      hideable: false, hide: true
    },
    {
      field: 'InCharge',
      headerName: 'Incharge',
      width: 160,
      hideable: false, hide: true
    },

    {
      field: 'action',
      headerName: 'Action',
      sortable: false,
      renderCell: (params) => {

        const onClick = (e) => {
          e.stopPropagation(); // don't select this row after clicking

          const api: GridApi = params.api;
          const thisRow: Record<string, GridCellValue> = {};

          api
            .getAllColumns()
            .filter((c) => c.field !== '__check__' && !!c)
            .forEach(
              (c) => (thisRow[c.field] = params.getValue(params.id, c.field)),
            );

          // alert(JSON.stringify(thisRow));
          setModalData((thisRow));
          handleOpen()
          console.log(modalData)
        };

        return <Button variant='outlined' onClick={onClick} size="small" >View More</Button>;
      },
    },
  ];



  return (
 
    
    <Box sx={{ mt: 5 }}>
      <Container>
        <Stack container direction='row' alignItems="center" justifyContent="space-between" sx={{ mb: 3 }}>
          <Typography variant="h5" color="initial">Releif Center</Typography>
          {/* <Button variant="outlined" onClick={handleOpen}>Add Center</Button> */}
        </Stack>
        
        <Box sx={{ height: '80vh', maxHeight: '70vh', width: '80vw' }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            getRowId={(row: any) => uuid()}
            disableSelectionOnClick
          />
        </Box>
        <Typography variant="h6" color="initial" sx={{ mb: 1 }}>
               Location of all rescue centers
        </Typography>
      <Grid container spacing={2}>
          <Grid item xs={14}>
            <Maps></Maps>
          </Grid>
        </Grid>
      </Container>


      {/* modal */}
      <Modal
        // aria-labelledby="transition-modal-title"
        // aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 3 }}>
              <Typography variant="h6" color="primary" sx={{ fontWeight: '600', fontSize: '1rem' }}>Center Details</Typography>
            </Stack>


            <Grid container alignItems='center' justifyContent='space-between' >
              <Grid item xs={12}>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                  <Box>
                    <Typography variant="subtitle1" color="initial">
                      {modalData.CenterName}
                    </Typography>
                    <Box sx={{ width: '70%' }}>
                      <Typography variant="caption" color="secondary">
                        {modalData.Address}
                      </Typography>
                    </Box>
                    <Typography variant="caption" color="initial">
                      +91 {modalData.Phone}
                    </Typography>
                  </Box>

                  <Box>
                    <Stack direction="row" alignItems="baseLine" justifContent="center">
                      <Typography variant="h3" color="secondary">
                        {modalData.Vaccancy}
                      </Typography>
                      <Typography variant="h6" color="secondary">Slots</Typography>
                    </Stack>

                    <Typography variant="body2" color="">
                      {/* In Charge: {modalData.userName} */}Available
                    </Typography>
                  </Box>
                </Stack>
              </Grid>

              <Grid item xs={12}>

              </Grid>

              <Grid item>

              </Grid>
            </Grid>
          </Box>
        </Fade>
      </Modal>
    </Box>
  )
}

export default ReliefCenter