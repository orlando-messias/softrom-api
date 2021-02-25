// react
import React, { useState, useEffect, useContext } from 'react';

// material-ui
import { Box, Grid, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';

// components and services
import { AppContext } from '../context/AppContext';
import api from '../services/api';

const useStyles = makeStyles((theme) => ({
  box: {
    marginBottom: 20,
    marginLeft: 20
  },
  searchInput: {
    paddingLeft: 5
  },
  searchIcon: {
    fontSize: 30
  },
  floatingLabelFocusStyle: {
    color: '#c0c0c0',
    paddingLeft: 5,
  }
}));

const SearchBar = () => {
  const { setCompanies, onInsert, onEdit, onDelete } = useContext(AppContext);
  const [companiesCopy, setCompaniesCopy] = useState([]);

  const classes = useStyles();

  useEffect(() => {
    api.get('/empresa')
      .then(response => {
        setCompaniesCopy(response.data);
      })
  }, [onDelete, onInsert, onEdit]);

  // verifies if text on search bar matches to any company name
  const handleSearch = (companyName) => {

    // filter and makes a copy of the companies to perform to the best
    const isThereAnyCompany = companiesCopy
      .filter(company => company.nome === companyName);

    if (!isThereAnyCompany) setCompanies([]);

    if (isThereAnyCompany) setCompanies(isThereAnyCompany);

    if (companyName === '') setCompanies(companiesCopy);

  };

  return (
    <Box className={classes.box}>

      <Grid container alignItems="flex-end">
        <Grid item>
          <SearchIcon color='primary' className={classes.searchIcon} />
        </Grid>
        <Grid item>
          <TextField
            id="input-with-icon-grid"
            label="Search Company Name"
            onChange={(e) => handleSearch(e.target.value)}
            className={classes.searchInput}
            InputLabelProps={{
              className: classes.floatingLabelFocusStyle,
            }}
          />
        </Grid>
      </Grid>

    </Box>
  )
};

export default SearchBar;