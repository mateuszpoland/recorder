import React, {useState, useEffect} from 'react';
import {FormControl} from "@material-ui/core";
import InputAdornment from "@material-ui/core/InputAdornment";
import AccountCircle from "@material-ui/icons/AccountCircle";
import TextField from "@material-ui/core/TextField";
import SaveIcon from "@material-ui/icons/Save";
import Button from "@material-ui/core/Button";

const AddNewTrackForm = (props) => {
    const [title, setTitle] = useState(null);
    const [artist, setArtist] = useState(null);
    const [formData, setFormData] = useState({});
    const { handleAddNewTrack, carrierId } = props;

    useEffect(() => {
        const formData = {
            title: title,
            artist: artist
        }
        setFormData(formData);
    }, [title, artist])

    const changeTrackName = (name) => {
        setTitle(name)
    }

    const changeTrackArtist = (name) => {
        setArtist(name);
    }

    return (
        <div>
            <FormControl>
                <TextField
                    id="input-title"
                    label="Nazwa utworu"
                    onChange={e => changeTrackName(e.target.value)}
                />

                <TextField
                    id="input-title"
                    label="Artysta"
                    onChange={e => changeTrackArtist(e.target.value)}
                />

                <Button
                    variant="contained"
                    onClick={e => handleAddNewTrack(formData, carrierId)}
                    color="primary"
                    size="small"
                    startIcon={<SaveIcon />}
                >
                    Dodaj
                </Button>
            </FormControl>
        </div>
    );
}

export default AddNewTrackForm;
