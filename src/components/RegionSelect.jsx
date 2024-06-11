import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Autocomplete, TextField, CircularProgress, InputLabel, Select} from '@mui/material';
import { fetchRegions, clearRegions } from '../states/region/regionSlice.js';
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";

export default function RegionSelect({ onSelectRegion }) {
    const dispatch = useDispatch();
    const { regions, isLoading } = useSelector((state) => state.region);
    const [query, setQuery] = useState('');
    const [searchTimeout, setSearchTimeout] = useState(null);

    useEffect(() => {
        return () => {
            clearTimeout(searchTimeout);
        };
    }, [query]);

    useEffect(() => {
        if (query.length > 2) {
            clearTimeout(searchTimeout);
            setSearchTimeout(
                setTimeout(() => {
                    dispatch(fetchRegions(query));
                }, 3000)
            );
        } else {
            dispatch(clearRegions());
        }
    }, [query, dispatch]);

    const handleInputChange = (event, newInputValue) => {
        setQuery(newInputValue);
    };

    const handleRegionChange = (event, selectedRegion) => {
        onSelectRegion(selectedRegion?.text || '');
    };

    return (
        <FormControl fullWidth margin="normal">
            <Autocomplete
                onInputChange={handleInputChange}
                onChange={handleRegionChange}
                getOptionLabel={(option) => option.text}
                options={regions}
                loading={isLoading}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Search Region"
                        variant="outlined"
                        InputProps={{
                            ...params.InputProps,
                            endAdornment: (
                                <>
                                    {isLoading ? <CircularProgress color="inherit" size={20} /> : null}
                                    {params.InputProps.endAdornment}
                                </>
                            ),
                        }}
                    />
                )}
            />
        </FormControl>
    )
}
