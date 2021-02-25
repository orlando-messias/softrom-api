// react
import React, { useEffect, useState, useContext } from 'react';

// material-ui
import { Box, Grid, Fab, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ErrorIcon from '@material-ui/icons/Error';
import AddIcon from '@material-ui/icons/Add';

// components and services
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import CompanyCard from '../components/CompanyCard';
import ModalInsert from '../components/ModalInsert';
import ModalEdit from '../components/ModalEdit';
import ModalDelete from '../components/ModalDelete';
import Newsletter from '../components/Newsletter';
import Footer from '../components/Footer';
import { AppContext } from '../context/AppContext';
import api from '../services/api';

const useStyles = makeStyles(() => ({
  box: {
    background: 'linear-gradient(to bottom, #5b7099, #e0e3fc )',
    padding: '20px 20px 40px 20px',
    marginTop: 15,
    minHeight: 100,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column'
  },
  grid: {
    width: 200,
  },
  btnInsert: {
    marginBottom: 20,
    marginTop: -40,
    backgroundColor: '#2E3B55',
    color: 'white',
    boxShadow: '0px 0px 2px white',
    '&:hover': {
      backgroundColor: 'white',
      border: '1px solid #2E3B55',
      color: '#2E3B55'
    }
  },
  boxNotFound: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 180,
    marginLeft: 10,
    fontSize: 16,
    fontWeight: 'bold',
    // color: 'red'
  },
  progressBar: {
    width: '50%',
    position: 'absolute',
    marginTop: 50,
    zIndex: 99999
  }
}));

const Home = () => {
  const { companies, setCompanies } = useContext(AppContext);
  const { onInsert, onEdit, onDelete, setEditCompany } = useContext(AppContext);
  const [showModalInsert, setShowModalInsert] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [company, setCompany] = useState(0);
  const [isEntering, setIsEntering] = useState(true);

  const classes = useStyles();

  useEffect(() => {
    // requests to endpoint '/empresa' everythime insert, edit or delete a company 
    api.get('/empresa')
      .then(response => {
        setCompanies(response.data);
      })
  }, [onDelete, onEdit, onInsert, setCompanies]);

  const handleModalInsert = () => {
    setShowModalInsert(!showModalInsert);
  };

  const handleModalEdit = (company) => {
    setEditCompany(company);
    setShowModalEdit(!showModalEdit);
  };

  const handleModalDelete = async (company) => {
    setCompany(company);
    setShowModalDelete(!showModalDelete);
  };

  setTimeout(() => {
    setIsEntering(false)
  }, 700);

  return (
    <div>
      <Header />
      <SearchBar />
      <Box className={classes.box}>

        {/* renders a Floating Action Button */}
        <Fab
          className={classes.btnInsert}
          color="primary"
          aria-label="add"
          onClick={handleModalInsert}
        >
          <AddIcon />
        </Fab>

        {/* Circular Loading everytime entering or refreshing the page  */}
        {(isEntering) && <CircularProgress className={classes.progressBar} />}

        <Grid container spacing={3}>
          {
            companies.map((company, i) => (
              <Grid key={i} className={classes.grid} item md={6} xs={12}>
                <CompanyCard
                  company={company}
                  handleModalDelete={handleModalDelete}
                  handleModalInsert={handleModalInsert}
                  handleModalEdit={handleModalEdit}
                />
              </Grid>
            ))
          }

          {/* renders a box everytime text on Search Bar does not match to any company name */}
          {
            companies.length === 0 && !isEntering && (
              <Grid item sm={12} xs={12}>
                <Box className={classes.boxNotFound}><ErrorIcon /> No companies found!</Box>
              </Grid>
            )
          }

        </Grid>
      </Box>

      <Newsletter />

      <ModalInsert
        handleModalInsert={handleModalInsert}
        showModalInsert={showModalInsert}
      />

      <ModalEdit
        handleModalEdit={handleModalEdit}
        showModalEdit={showModalEdit}
      />

      <ModalDelete
        handleModalDelete={handleModalDelete}
        showModalDelete={showModalDelete}
        company={company}
      />

      <Footer />

    </div>
  );
};

export default Home;