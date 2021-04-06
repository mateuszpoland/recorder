import React, {useState, useEffect} from 'react';
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';

const AddNewCarrierForm = (props) => {
    const [carrierType, setCarrierType] = useState('CD');
    const [carrierTitle, setCarrierTitle] = useState(null);
    const [carrierArtist, setCarrierArtist] = useState(null);
    const [formData, setFormData] = useState([]);
    const { handleAddNewCarrier } = props;

    useEffect(() => {
        const formData = {
            title: carrierTitle,
            carrier_type: carrierType,
            artist: carrierArtist
        }
        setFormData(formData);
    }, [carrierType, carrierTitle, carrierArtist])

    const handleChangeCarrierType = (e) => {
        e.preventDefault();
        setCarrierType(e.target.value);
    }

    const changeCarrierName = (e) => {
        e.preventDefault();
        setCarrierTitle(e.target.value);
    }

    const changeCarrierArtist = (e) => {
        e.preventDefault();
        setCarrierArtist(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        handleAddNewCarrier(formData);
    }

    const flexContainer = {
        border: '2px solid white',
        padding: '0 2vw',
        margin: '2vh 0',
        width: '50%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
    return (
        <div>
            <FormControl style={flexContainer}>
                <TextField
                    id="input-title"
                    label="Nazwa nośnika"
                    onChange={e => changeCarrierName(e)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <AccountCircle />
                            </InputAdornment>
                        ),
                    }}
                />

                <TextField
                    id="input-title"
                    label="Artysta"
                    onChange={e => changeCarrierArtist(e)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <AccountCircle />
                            </InputAdornment>
                        ),
                    }}
                />
                <Select
                    label="typ nośnika"
                    id="select-carriertype"
                    value={carrierType}
                    onChange={e => handleChangeCarrierType(e)}
                >
                    <MenuItem value={"CD"}>CD</MenuItem>
                    <MenuItem value={"Vinyl"}>Vinyl</MenuItem>
                    <MenuItem value={"mp3"}>mp3</MenuItem>
                </Select>

                <Button
                    variant="contained"
                    onClick={e => handleSubmit(e)}
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

export default AddNewCarrierForm;
