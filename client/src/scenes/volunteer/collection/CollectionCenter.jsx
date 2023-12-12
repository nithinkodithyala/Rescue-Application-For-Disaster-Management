import React, { useEffect } from 'react';
import { Box, Container } from '@mui/system';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Fade, Grid, Modal, Stack, Typography } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import axios from 'axios';
import uuid from 'react-uuid';

function ReliefCenter() {
  // Modal style
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

  // Modal states
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [modalData, setModalData] = React.useState('');
  const [rows, setRows] = React.useState({});

  // Demo data
  const columns = [
    { field: '_id', headerName: 'ID', width: 300 },
    { field: 'CenterName', headerName: 'Center', width: 300 },
    { field: 'Phone', headerName: 'Help Line', width: 300 },
    { field: 'Address', headerName: 'Address', width: 300, hideable: false, hide: true },
    {
      field: 'action',
      headerName: 'Action',
      sortable: false,
      renderCell: (params) => {
        const onClick = (e) => {
          e.stopPropagation(); // Don't select this row after clicking

          const api = params.api;
          const thisRow = {};

          api
            .getAllColumns()
            .filter((c) => c.field !== '__check__' && !!c)
            .forEach((c) => (thisRow[c.field] = params.getValue(params.id, c.field)));

          setModalData(thisRow);
          handleOpen();
        };

        return <Button variant="outlined" onClick={onClick} size="small">View More</Button>;
      },
    },
  ];

  function loadData() {
    axios.get('collection/getCollectionCenter')
      .then((res) => {
        setRows(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <Box sx={{ mt: 8 }}>
      <Container>
        <Stack container direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 3 }}>
          <Typography variant="h5" color="initial">All Collection Centers</Typography>
        </Stack>

        <Box sx={{ height: '80vh', maxHeight: '70vh', width: '90vw' }}>
          <DataGrid
            columns={columns}
            rows={rows}
            getRowId={(row) => uuid()}
          />
        </Box>
      </Container>

      <Modal
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

            <Grid container alignItems="center" justifyContent="space-between">
              <Grid item xs={12}>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                  <Box>
                    <Typography variant="subtitle1" color="initial">{modalData.CenterName}</Typography>
                    <Box sx={{ width: '70%' }}>
                      <Typography variant="caption" color="secondary">{modalData.Address}</Typography>
                    </Box>
                    <Typography variant="caption" color="initial">+91 {modalData.Phone}</Typography>
                  </Box>
                </Stack>
              </Grid>
            </Grid>
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
}

export default ReliefCenter;
