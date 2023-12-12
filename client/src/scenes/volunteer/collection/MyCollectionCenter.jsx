import React from 'react'
import Typography from '@mui/material/Typography'
import { Button, Card, Container, Grid, Modal, Stack, TextField } from '@mui/material'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Box } from '@mui/system'
import { DataGrid } from '@mui/x-data-grid';
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import uuid from "react-uuid";
import Badge from '@mui/material/Badge';

function MyCollectionCenter() {


    // modal style
    const style = {
        position: 'absolute',
        top: '30%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: '#fff',
        boxShadow: 24,
        pt: 2,
        p: 4,
    };
    // modal states
    const [open, setOpen] = React.useState(false);
    const handleClose = () => setOpen(false);
    const [modalData, setModalData] = React.useState('')
    const [rows, setRows] = React.useState({});
    const [disRows, setDisRows] = React.useState({});
    const [phone, setPhone] = React.useState('')
    const [driverNo, setDriverNo] = React.useState('')
    const [table, setTable] = React.useState(true)


    const [collectionCenter, setCollectionCenter] = useState(false)
    const [collectionCenterData, setCollectionCenterData] = useState([])
    const userId = useSelector((state) => state.auth.id)
    console.log(userId)

    // creating relief center 
    const [collectionForm, setCollectionForm] = useState({
        CenterName: '',
        Phone: '',
        Address: ''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setCollectionForm({ ...collectionForm, [name]: value });
    };



    const loadData = async () => {
        await axios.get(`collection/getCollectionCenterById/${userId}`)
            .then((res) => {
                console.log("isID" + JSON.stringify(res.data))
                setCollectionCenterData(res.data)
                const dataArr = res.data
                if (dataArr.length === 0) {
                    setCollectionCenter(false)
                }
                else {
                    setCollectionCenter(true)
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => {
        loadData()
    }, []);



    // submit function of form
    const handleSubmit = (event) => {
        event.preventDefault();

        const form = {
            CenterName: collectionForm.CenterName,
            Phone: collectionForm.Phone,
            Address: collectionForm.Address,
            InCharge: userId
        };

        axios.post('collection/addCollectioncenter', form)
            .then((res) => {
                console.log("collectinon form " + res);
                toast.success('Collection Center Created');
                setCollectionForm({
                    CenterName: '',
                    Phone: '',
                    Address: ''
                });
                loadData()
            })
            .catch((err) => {
                console.log(err);
            });
    };


    // setting rows in datagrid
    function setRow() {
        axios
            .get(`relief/getreliefsupply`)
            .then((res) => {
                setRows(res.data);
            })
            .catch((err) => {
                console.error(err);
            });
    }


    // setting rows in datagrid
    function setDispatchRow() {
        axios
            .get(`relief/getSupplyReqbyAccepted/${userId}`)
            .then((res) => {
                setDisRows(res.data);
            })
            .catch((err) => {
                console.error(err);
            });
    }

    React.useEffect(() => {
        setRow();
        setDispatchRow();
    }, []);


    // function acceptdelivery
    function acceptDelivery(rowData) {
        const rowId = rowData._id
        console.log("rows" + rowId)
        const form = {
            Status: 'accepted',
            AcceptedBy: userId
        }
        axios.put(`collection/acceptDelivery/${rowId}`, form)
            .then((res) => {
                setRow();
                setDispatchRow();
                console.log(res)
                toast.success("Accepted Succesfully")
            })
            .catch((err) => {
                console.log(err)
            })
    }

    // function dispatch

    function dispatchDelivery(data) {
        const form = {
            phone
        }
        axios.put(`collection/dispatch/${data}`, form)
            .then((res) => {
                console.log(res)
                setRow();
                setDispatchRow();
                toast.success('Dispatched Succesfully')
                handleClose();
            })
            .catch((err) => {
                console.log(err)
            })
    }


    // dispatch modal
    function dispatchModal(data) {
        setOpen(true)
        setModalData(data)
        console.log('modal data' + JSON.stringify(data._id))
    }

    // accept delivery table
    const columns = [
        { field: '_id', headerName: 'ID', width: 70, hideable: 'false', hide: true },
        {
            field: 'id',
            headerName: 'Sl no',
            filterable: false,
            renderCell: (index) => index.api.getRowIndex(index.row.code) + 1,

        },
        { field: 'CenterName', headerName: 'Center Name', width: 150 },
        { field: 'ItemName', headerName: 'Item', width: 200 },
        { field: 'Quantity', headerName: 'Quantity', width: 130 },
        {
            field: 'Status',
            headerName: 'Status',
            width: 130,
        },
        {
            field: 'action',
            headerName: 'Action',
            width: 130,
            renderCell: (params) => (
                <Button variant="outlined" size="small" color="info" onClick={() => acceptDelivery(params.row)}>Accept</Button>
            )
        }
    ];


    // dispatch delevery table
    const dispatchColumns = [
        { field: '_id', headerName: 'ID', width: 70, hideable: 'false', hide: true },
        {
            field: 'id',
            headerName: 'Sl no',
            filterable: false,
            renderCell: (index) => index.api.getRowIndex(index.row.code) + 1,

        },
        { field: 'CenterName', headerName: 'Center Name', width: 150 },
        { field: 'ItemName', headerName: 'Item', width: 200 },
        { field: 'Quantity', headerName: 'Quantity', width: 130 },
        {
            field: 'Status',
            headerName: 'Status',
            width: 130,
        },
        {
            field: 'action',
            headerName: 'Action',
            width: 130,
            renderCell: (params) => (
                <Button variant="outlined" size="small" color="success" onClick={() => dispatchModal(params.row)}>Dispatch</Button>
            )
        }
    ];


    return (
        <>
            <Container maxWidth="lg" sx={{ mt: '-4rem' }}>
                {
                    collectionCenter ?
                        <Grid container spacing={2} alignItems="center" justifyContent="space-between" >
                            <Grid item sx={6}>
                                <Typography variant="h6" color="primary" sx={{ fontWeight: 600, fontSize: '15px' }}>
                                    My Collection Center
                                </Typography>
                            </Grid>


                            <Grid item xs={12}>
                                <Card sx={{ width: '100%', height: '20vh', borderRadius: '1rem', boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px', backgroundColor: '#0000800', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                    <Grid container alignItems="center" justifyContent="space-between">
                                        <Grid item xs={6} sx={{ pl: 2 }}  >
                                            <Typography variant="h6" color="initial" sx={{ mb: 1 }}>{collectionCenterData[0].CenterName}</Typography>
                                            <Stack direction="row" alignItems="center" justifyContent="start" spacing={2}>
                                                <Box>
                                                    <Typography variant="body2" color="initial">contact Info: </Typography>
                                                    <Typography variant="body2" color="initial">Address:</Typography>
                                                </Box>

                                                <Box>
                                                    <Typography variant="body2" color="initial">{collectionCenterData[0].Phone}</Typography>
                                                    <Typography variant="body1" color="primary">{collectionCenterData[0].Address}</Typography>
                                                </Box>
                                            </Stack>
                                        </Grid>
                                    </Grid>
                                </Card>
                            </Grid>

                            <Grid item sx={6}>
                                <Typography variant="h6" color="primary" sx={{ fontWeight: 600, fontSize: '15px' }}>
                                    {table ? 'New Requests' : 'Accepted Items'}
                                </Typography>
                            </Grid>

                            {
                                (disRows.length === 0 || !table) ? (
                                    <Grid item sx={6}>
                                        <Button variant='outlined' onClick={() => table ? setTable(false) : setTable(true)}>Switch {table ? 'Accepted Items' : 'New Requests'}</Button>
                                    </Grid>
                                )
                                    :
                                    (
                                        <Grid item sx={6}>
                                            <Badge badgeContent={table && disRows.length} color="primary"> <Button variant='outlined' onClick={() => table ? setTable(false) : setTable(true)}>Switch {table ? 'Accepted Items' : 'New Requests'}</Button></Badge>
                                        </Grid>
                                    )
                            }

                            {
                                table ?
                                    (
                                        <Grid item xs={12}>
                                            <Card sx={{ width: '100%', height: 'auto', borderRadius: '1rem', boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px', backgroundColor: '#0000800', p: 2 }}>
                                                <div style={{ height: 400, width: '100%' }}>
                                                    <DataGrid rows={rows} columns={columns} getRowId={(row: any) => uuid()} />
                                                </div>
                                            </Card>
                                        </Grid>
                                    )
                                    :
                                    (

                                        <Grid item xs={12}>
                                            <Card sx={{ width: '100%', height: 'auto', borderRadius: '1rem', boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px', backgroundColor: '#0000800', p: 2 }}>
                                                <div style={{ height: 400, width: '100%' }}>
                                                    <DataGrid rows={disRows} columns={dispatchColumns} getRowId={(row: any) => uuid()} />
                                                </div>
                                            </Card>
                                        </Grid>
                                    )
                            }
                        </Grid>



                        :

                        <Grid container spacing={3} direction="column" alignItems='center' justifyContent="center" sx={{ mt: 3 }}>
                            <Grid item>
                                <Typography variant="h5" color="initial">Create your Collection Center</Typography>
                            </Grid>

                            <Box component="form" sx={{ minWidth: '20rem', mt: 2, p: 3, width: '40vw', boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px' }} onSubmit={handleSubmit}>
                                <Grid container spacing={1}>

                                    <Grid item xs={12}>
                                        <TextField
                                            margin="normal"
                                            required
                                            fullWidth
                                            type="text"
                                            label="Center Name"
                                            name="CenterName"
                                            value={collectionForm.CenterName}
                                            size="small"
                                            onChange={handleChange}
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <TextField
                                            margin="normal"
                                            required
                                            fullWidth
                                            type="tel"
                                            label="Phone No"
                                            name="Phone"
                                            size="small"
                                            value={collectionForm.Phone}
                                            onChange={handleChange}
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <TextField
                                            margin="normal"
                                            required
                                            fullWidth
                                            type="text"
                                            label="Address"
                                            name="Address"
                                            size="small"
                                            value={collectionForm.Address}
                                            onChange={handleChange}
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <Button
                                            type="submit"
                                            fullWidth
                                            variant="contained"
                                            sx={{ mt: 3, mb: 2 }}
                                            onClick={(e) => handleSubmit}
                                        >
                                            Create
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Grid>
                }

                {/* modal for despatching the supply request */}
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style} >
                        <Box sx={{ display: 'flex', alignItems: 'start', justifyContent: 'center', flexDirection: 'column' }}>
                            <h4>Dispatch the Product</h4>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', minWidth: '10rem' }}>
                                <Typography id="modal-modal-title" variant="subtitle1">
                                    Item Name:
                                </Typography>
                                <Typography variant="subtitle1">
                                    {modalData.ItemName}
                                </Typography>
                            </Box>

                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', minWidth: '10rem' }}>
                                <Typography id="modal-modal-title" variant="subtitle1">
                                    Quantity:
                                </Typography>
                                <Typography variant="subtitle1">
                                    {modalData.Quantity}
                                </Typography>
                            </Box>


                            <TextField label='Driver Contact No' value={driverNo} onChange={(e) => setDriverNo(e.target.value)} size="small" sx={{ mt: 2 }} />
                            <Button type="submit" onClick={() => dispatchDelivery(modalData._id)} variant="contained" sx={{ mt: 1 }}>Submit</Button>
                        </Box>
                    </Box>
                </Modal>
            </Container>
        </>
    )
}

export default MyCollectionCenter