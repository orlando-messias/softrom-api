// react
import React, { useContext } from 'react';
import { toast } from 'react-toastify';

// material-ui
import { Modal, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

// components and services
import { AppContext } from '../context/AppContext';
import api from '../services/api';

const useStyles = makeStyles((theme) => ({
  modal: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: '40%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  },
  span: {
    fontWeight: 'bold'
  }
}));

const ModalDelete = ({ handleModalDelete, showModalDelete, company }) => {
  const { onDelete, setOnDelete } = useContext(AppContext);

  const classes = useStyles();

  const deleteCompany = () => {
    api.delete(`/empresa/${company.id}`)
      .then(() => {
        handleModalDelete();
        setOnDelete(!onDelete);
        toast.success(`${company.nome} successfully removed`)
      }).catch((error) => {
        toast.error('An error occured', error);
        handleModalDelete();
      });
  };

  return (
    <Modal
      open={showModalDelete}
      onClose={handleModalDelete}
    >
      <div className={classes.modal}>
        <h3>Delete Company</h3>
        {company &&
          <p>
            Are you sure you want to delete the company &nbsp;
            <span className={classes.span}>
              {company.nome}
            </span>?
          </p>
        }

        <div>
          <Button color="primary" onClick={deleteCompany}>Yes</Button>
          <Button onClick={handleModalDelete} color="primary">Cancel</Button>
        </div>

      </div>
    </Modal>
  );
};

export default ModalDelete;