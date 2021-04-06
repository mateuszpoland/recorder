import React, {useState, useEffect} from 'react';
import MUIDataTable from "mui-datatables";
import {CarrierTracksEditableRow} from "./CarrierTracksEditableRow";
import AddNewCarrierForm from "./AddNewCarrierForm";
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import CircularProgress from '@material-ui/core/CircularProgress'
import TextField from "@material-ui/core/TextField";
import SaveIcon from "@material-ui/icons/Save";

const DisplayCarriersView = (props) => {
    const [isRequestRunning, setIsRequestRunning] = useState(false);
    const [carriersRemote, setCarriersRemote] = useState([]);
    const [carrierAddedOrRemoved, setCarrierAddedOrRemoved] = useState(false);

    // editing row stata
    const [carrierIdCurrentlyEdited, setCarrierIdCurrentlyEdited] = useState(null);
    const [editedRow, setEditedRow] = useState(null);
    const [editRowPayload, setEditRowPayload] = useState(null);

    async function fetchData() {
        let resp =  await fetch('http://localhost/recorder/carrier/getAll');
        resp = await resp.json();
        setCarriersRemote(resp);
        setIsRequestRunning(false);
    }
    // load carriers on initial load
    useEffect(  () => {
        setIsRequestRunning(true)
        fetchData();
    }, []);

    // load and add/remove new carrier when new carrier added/removed
    useEffect(() => {
        setIsRequestRunning(true)
        fetchData();
        setCarrierAddedOrRemoved(false);
    }, [carrierAddedOrRemoved]);

    useEffect(  () => {
        if(null !== editedRow) {
            const rowEditForm = {
                title: editedRow[1],
                artist: editedRow[0],
            }
            setEditRowPayload(rowEditForm);
        }
    }, [editedRow]);

    const handleAddNewCarrier = async (formData) => {
        setIsRequestRunning(true);

        const rawResponse = await fetch('http://localhost/recorder/carrier/add', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        const resp =  await rawResponse.json();
        setCarrierAddedOrRemoved(true);
        setIsRequestRunning(false);
    }

    const handleDelete = async (e, carrierId) => {
        e.stopPropagation();

        setIsRequestRunning(true);
        const url = 'http://localhost/recorder/carrier/' + carrierId + '/delete';
        const response = await fetch(url, {
            method: 'DELETE'
        });

        setIsRequestRunning(false);
        setCarrierAddedOrRemoved(true);
    }

    const handleEditRow = (e, carrierId, editableRowData) => {
        e.stopPropagation();
        // format edit to fit
        setCarrierIdCurrentlyEdited(carrierId);
        setEditedRow(editableRowData);
    }

    // submit edit form
    const handleRowUpdate = async (e, carrierId) => {
        e.stopPropagation();
        setIsRequestRunning(true);
        const url = 'http://localhost/recorder/carrier/' + carrierIdCurrentlyEdited + '/edit';

        const resp = await fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(editRowPayload)
        })
        setCarrierAddedOrRemoved(true);
        finalizeEdit();
    }

    const finalizeEdit = () => {
        setEditedRow(null);
        setEditRowPayload(null);
        setCarrierIdCurrentlyEdited(null);
    }

    const columns = [
        {
            name: 'artist',
            label: 'Artysta',
            options: {
                customBodyRender: (value, tableMeta, updateValue) => {
                    let currentId = tableMeta.rowData;
                    currentId = currentId[3];
                    const isRowEditable = (carrierIdCurrentlyEdited === currentId);
                    return (
                        <div>
                            {isRowEditable
                                ?
                                (<TextField defaultValue={value} onChange={(e) => {
                                    setEditRowPayload({...editRowPayload, artist: e.target.value})
                                }
                                }/>)
                                :
                                (<TextField variant="filled" InputProps={{
                                    readOnly: true,
                                }} defaultValue={value}/>)}
                        </div>
                    );
                }
            }
        },
        {
            name: 'title',
            label: 'Tytuł',
            options: {
                customBodyRender: (value, tableMeta, updateValue) => {
                    let currentId = tableMeta.rowData;
                    currentId = currentId[3];
                    const isRowEditable = (carrierIdCurrentlyEdited === currentId);
                    return (
                        <div>
                            {isRowEditable
                                ?
                                (<TextField defaultValue={value} onChange={(e) => {
                                    setEditRowPayload({...editRowPayload, title: e.target.value})
                                }
                                }/>)
                                :
                                (<TextField variant="filled" InputProps={{
                                    readOnly: true,
                                }} defaultValue={value}/>)}
                        </div>
                    );

                }
            }
        },
        {
            name: 'carrierType',
            label: 'Rodzaj Nośnika',
            options: {
                customBodyRender: (value, tableMeta, updateValue) => {
                    let currentId = tableMeta.rowData;
                    currentId = currentId[3];
                    const isRowEditable = (carrierIdCurrentlyEdited === currentId);
                    return (<div>{value}</div>);
                }
            }
        },
        {
            name: 'id',
            options: {display: false}
        },
        {
            name: 'Akcje',
            options: {
                filter: false,
                display: true,
                customBodyRender: (value, tableMeta, updateValue) => {
                    let carrierId = tableMeta.rowData;
                    const editableRowData = tableMeta.rowData;
                    carrierId = carrierId[3];
                    return (
                        <div>
                            {carrierIdCurrentlyEdited === carrierId ? (
                                <Button
                                    key={ carrierId }
                                    onClick={ event => handleRowUpdate(event, carrierId) }
                                    variant="contained"
                                    color="default"
                                    endIcon={<SaveIcon />}
                                >
                                    ZAPISZ
                                </Button>
                            ) : (
                                <Button
                                    key={ carrierId }
                                    onClick={ event => handleEditRow(event, carrierId, editableRowData) }
                                    variant="contained"
                                    color="primary"
                                    endIcon={<EditIcon/>}
                                >
                                    EDYTUJ
                                </Button>
                            )}

                            <Button
                                key={ carrierId }
                                onClick={event => handleDelete(event, carrierId)}
                                variant="contained"
                                color="secondary"
                                startIcon={<DeleteIcon />}
                            >
                                USUŃ
                            </Button>
                        </div>
                    );
                }
            }
        },
    ];
    const options = {
        caseSensitive: true,
        filter: true,
        filterType: "dropdown",
        responsive: "standard",
        expandableRowsOnClick: true,
        expandableRows: true,
        renderExpandableRow: (rowData, rowMeta) => {
            const tracks = carriersRemote[rowMeta.rowIndex].tracks;
            const carrierId = carriersRemote[rowMeta.rowIndex].id;
            return (
                <div>
                    <CarrierTracksEditableRow
                        style={{float: "left"}}
                        carrierId={carrierId}
                        carrierTracksData={tracks}
                    />
                </div>
            );
        },
    };


    return (
        <div>
            {isRequestRunning ? (
                <div>
                    <AddNewCarrierForm
                    handleAddNewCarrier={e => handleAddNewCarrier(e)}
                    disabled={true}
                    />
                    <CircularProgress />
                </div>
            ) : (
                <div>
                    <AddNewCarrierForm
                        handleAddNewCarrier={e => handleAddNewCarrier(e)}
                        disabled={false}
                    />
                    <MUIDataTable
                        title={"Manager Nośników"}
                        data={carriersRemote}
                        columns={columns}
                        options={options}
                    />
                </div>
            )}
        </div>
    );
}

export default DisplayCarriersView;
