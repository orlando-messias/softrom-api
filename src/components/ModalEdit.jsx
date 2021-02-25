// react
import React, { useContext, useState } from 'react';

// material-ui
import {
  Modal,
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
  Switch
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

// components, services and third-party tools
import { AppContext } from '../context/AppContext';
import validations from '../services/validations';
import api from '../services/api';
import { mask } from 'remask';
import { toast } from 'react-toastify';

const useStyles = makeStyles((theme) => ({
  modal: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  },
  inputModal: {
    width: '100%',
    marginBottom: 18
  },
  controls: {
    marginBottom: 15
  },
  floatingLabelFocusStyle: {
    fontSize: 14,
    color: '#c0c0c0'
  }
}));

const ModalEdit = ({ handleModalEdit, showModalEdit }) => {
  const { editCompany, setEditCompany } = useContext(AppContext);
  const { onEdit, setOnEdit } = useContext(AppContext);
  const [modified, setModified] = useState(false);

  const classes = useStyles();

  const handleCompanyDataChange = (e) => {
    let { name, value, checked } = e.target;
    if (
      name === 'gerar_nf' ||
      name === 'retem_iss' ||
      name === 'agrupar_fatura_contrato') {
      value = checked;
    };

    // implements mask on field documento
    if (name === 'documento') {
      value = mask(value, ['99.999.999/9999-99']);
    };

    setEditCompany(prevState => ({
      ...prevState,
      [name]: value
    }));

    setModified(true);
  };

  const handleCancel = (editCompany) => {
    handleModalEdit(editCompany);
    setModified(false);
  }

  const update = () => {
    handleModalEdit(editCompany);
    // response fails here
    api.put('/empresa', { empresa: editCompany });
    // .then(() => console.log('response expected...'));

    // simulates a delay to reload the companies after updating
    setTimeout(() => {
      setOnEdit(!onEdit);
      toast.success('PLEASE, WAIT! Update in a few seconds');
      setModified(false);
    }, 1000);

  };

  return (
    <Modal
      open={showModalEdit}
      onClose={handleModalEdit}
    >
      <div className={classes.modal}>

        {/* personalized modal title */}
        {editCompany && <h3>Updating {(editCompany.nome).toUpperCase()}</h3>}

        <TextField
          name="nome"
          label="Name"
          autoFocus={editCompany && true}
          required
          error={!validations.fieldRequired(editCompany.nome)}
          className={classes.inputModal}
          onChange={handleCompanyDataChange}
          value={editCompany && editCompany.nome}
          InputLabelProps={{
            className: classes.floatingLabelFocusStyle,
          }}
        />
        <TextField
          name="tipo_doc"
          label="Type"
          required
          error={!validations.fieldRequired(editCompany.tipo_doc)}
          className={classes.inputModal}
          onChange={handleCompanyDataChange}
          value={editCompany && editCompany.tipo_doc}
          InputLabelProps={{
            className: classes.floatingLabelFocusStyle,
          }}
        />
        <TextField
          name="documento"
          label="Document"
          required
          error={!validations.cnpj(editCompany.documento)}
          className={classes.inputModal}
          onChange={handleCompanyDataChange}
          value={editCompany && editCompany.documento}
          InputLabelProps={{
            className: classes.floatingLabelFocusStyle,
          }}
        />

        <FormControlLabel
          control={
            <Checkbox
              name="gerar_nf"
              color="primary"
              onChange={handleCompanyDataChange}
              checked={editCompany && editCompany.gerar_nf}
            />
          }
          label="Gerar NF"
          className={classes.controls}
        />

        <FormControlLabel
          control={
            <Checkbox
              name="retem_iss"
              color="primary"
              onChange={handleCompanyDataChange}
              checked={editCompany && editCompany.retem_iss}
            />
          }
          label="Retém ISS"
          className={classes.controls}
        />

        <TextField
          name="obs"
          required
          label="Obs"
          className={classes.inputModal}
          error={!validations.fieldRequired(editCompany.obs)}
          onChange={handleCompanyDataChange}
          value={editCompany && editCompany.obs}
        />

        <FormControlLabel
          control={
            <Switch
              name="agrupar_fatura_contrato"
              color="primary"
              onChange={handleCompanyDataChange}
              checked={editCompany && editCompany.agrupar_fatura_contrato}
            />
          }
          label="Agrupar Fatura por Contrato"
          className={classes.controls}
        />

        <div align="right">
          <Button
            color="primary"
            onClick={update}
            // button Update turns enable only if passess all the validations 
            disabled={!
              (validations.fieldRequired(editCompany.nome) &&
                (validations.fieldRequired(editCompany.documento)) &&
                (validations.fieldRequired(editCompany.tipo_doc)) &&
                (validations.fieldRequired(editCompany.obs)) &&
                (validations.cnpj(editCompany.documento)) &&
                modified)
            }
          >
            Update
          </Button>

          <Button onClick={() => handleCancel(editCompany)} color="primary">Cancel</Button>

        </div>
      </div>
    </Modal>
  );
};

export default ModalEdit;