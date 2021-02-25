// react
import React, { useState, useContext } from 'react';
import { toast } from 'react-toastify';

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
    marginBottom: 15,
  },
  floatingLabelFocusStyle: {
    fontSize: 14,
    color: '#c0c0c0'
  }
}));

const ModalInsert = ({ handleModalInsert, showModalInsert }) => {
  const { onInsert, setOnInsert } = useContext(AppContext);
  const [companyData, setCompanyData] = useState({
    nome: '',
    tipo_doc: '',
    documento: '',
    gerar_nf: false,
    retem_iss: false,
    obs: '',
    agrupar_fatura_contrato: false
  });

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

    setCompanyData(prevState => ({
      ...prevState,
      [name]: value
    }))

  };

  const insert = () => {
    handleModalInsert();
    api.post(`/empresa/`, { empresa: companyData })
      // expecting a response
      .then(() => console.log('response expected...'));

    // simulates a delay to reload the companies after inserting
    setTimeout(() => {
      setOnInsert(!onInsert);
      setCompanyData({
        nome: '',
        tipo_doc: '',
        documento: '',
        gerar_nf: false,
        retem_iss: false,
        obs: '',
        agrupar_fatura_contrato: false
      });
      toast.success(`${companyData.nome} was successfully added!`);
    }, 1000);
  };

  return (
    <Modal
      open={showModalInsert}
      onClose={handleModalInsert}
    >
      <div className={classes.modal}>
        <h3>Add new Company</h3>

        <TextField
          name="nome"
          label="Name"
          autoFocus={true}
          required
          error={!validations.fieldRequired(companyData.nome)}
          className={classes.inputModal}
          onChange={handleCompanyDataChange}
          InputLabelProps={{
            className: classes.floatingLabelFocusStyle,
          }}
        />
        <TextField
          name="tipo_doc"
          label="Type"
          required
          error={!validations.fieldRequired(companyData.tipo_doc)}
          className={classes.inputModal}
          onChange={handleCompanyDataChange}
          InputLabelProps={{
            className: classes.floatingLabelFocusStyle,
          }}
        />
        <TextField
          name="documento"
          label="Document"
          required
          error={!validations.cnpj(companyData.documento)}
          className={classes.inputModal}
          onChange={handleCompanyDataChange}
          value={companyData.documento}
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
          error={!validations.fieldRequired(companyData.obs)}
          onChange={handleCompanyDataChange}
        />

        <FormControlLabel
          control={
            <Switch
              name="agrupar_fatura_contrato"
              color="primary"
              onChange={handleCompanyDataChange}
            />
          }
          label="Agrupar Fatura por Contrato"
          className={classes.controls}
        />

        <div align="right">
          <Button
            color="primary"
            onClick={insert}
            // button Insert turns enable only if passess all the validations 
            disabled={!
              (validations.fieldRequired(companyData.nome) &&
                (validations.fieldRequired(companyData.documento)) &&
                (validations.fieldRequired(companyData.tipo_doc)) &&
                (validations.fieldRequired(companyData.obs)) &&
                (validations.cnpj(companyData.documento)))
            }
          >
            Insert
          </Button>
          <Button onClick={handleModalInsert} color="primary">Cancel</Button>
        </div>
      </div>
    </Modal>
  );
};

export default ModalInsert;