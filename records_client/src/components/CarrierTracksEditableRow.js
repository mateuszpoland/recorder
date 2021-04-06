import React, {useEffect, useState} from "react";
import {Paper, TableBody, TableContainer, TableRow} from "@material-ui/core";
import TableCell from '@material-ui/core/TableCell';
import TableHead from "@material-ui/core/TableHead";
import Table from "@material-ui/core/Table";
import CircularProgress from '@material-ui/core/CircularProgress'
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import AddNewTrackForm from "./AddNewTrackForm";


export const CarrierTracksEditableRow = (props) => {
    const { carrierId, carrierTracksData } = props;
    const [carriers, setCarriers] = useState(carrierTracksData);
    const [isRequestRunning, setIsRequestRunning] = useState(false);
    const [trackAdded, setTrackAdded] = useState(false);
    const [trackRemoved, setTrackRemoved] = useState(false);

    useEffect(  () => {
        const fetchTracksForCarrier =  async () => {
            const raw = await fetch ('http://localhost/recorder/tracks/getByCarrier/' + carrierId, {
                method: 'GET'
            });
            const resp = await raw.json();
            setCarriers(resp);
        }
        fetchTracksForCarrier();
        setIsRequestRunning(false);
        if(trackAdded) setTrackAdded(false);
        if(trackRemoved) setTrackRemoved(false);
    }, [trackAdded === true, trackRemoved === true]);


    const handleAddNewTrack = async (formData, carrierId) => {
        setIsRequestRunning(true);
        const rawResponse = await fetch('http://localhost/recorder/tracks/' + carrierId + '/add', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        const resp =  await rawResponse.json();
        setTrackAdded(true);
    }

    const handleTrackDelete = async (trackId) => {
        setIsRequestRunning(true);
        await fetch('http://localhost/recorder/tracks/' + trackId + '/delete', {
            method: 'DELETE'
        });
        setTrackRemoved(true);
    }

    return(
        <div>
            <TableContainer component={Paper}>
                Lista tracków
                <Table style={{minWidth: "100%"}}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Artysta</TableCell>
                            <TableCell align="right">Tytuł</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    {isRequestRunning ? (
                        <CircularProgress />
                    ) : (
                        <TableBody>
                            {carriers.map(track => (
                                <TableRow key={track.id}>
                                    <TableCell align="right">{track.artist}</TableCell>
                                    <TableCell align="right">{track.title}</TableCell>
                                    <TableCell align="right">
                                        <Button
                                            key={ track.id }
                                            onClick={ e => handleTrackDelete(track.id) }
                                            variant="contained"
                                            color="secondary"
                                            startIcon={<DeleteIcon />}
                                        >
                                            usuń
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    )}

                </Table>
            </TableContainer>

            <AddNewTrackForm
                handleAddNewTrack={handleAddNewTrack}
                carrierId={carrierId}
            />
        </div>
    );
}
