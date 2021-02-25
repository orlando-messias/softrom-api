// react
import React from 'react';

// material-ui
import {
  Card,
  CardActions,
  CardContent,
  Typography,
  Box,
  FormControlLabel,
  Checkbox,
  Switch,
  Grid
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Edit, Delete } from '@material-ui/icons/';


const useStyles = makeStyles(() => ({
  root: {
    minWidth: 275,
  },
  cardTitle: {
    width: '95%',
    display: 'flex',
    justifyContent: 'space-between'
  },
  doc: {
    marginBottom: 12,
  },
  boxControlLabel: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: 10
  },
  inactiveControl: {
    cursor: 'default',
    display: 'flex',
    justifyContent: 'center',
    '&:hover': {
      cursor: 'default'
    }
  },
  icon: {
    marginLeft: 10,
    cursor: 'pointer',
    padding: 2
  },
  line: {
    borderBottom: '2px solid #D3CBCB',
    width: '85%',
    display: 'flex',
    justifyContent: 'center',
    margin: '0 auto',
    marginBottom: 5
  }
}));

export default function CompanyCard({ company, handleModalDelete, handleModalEdit }) {

  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h5" component="h2">
          <Box className={classes.cardTitle}>
            {company.nome}
            <Box>
              <Edit className={classes.icon} color='primary' onClick={() => handleModalEdit(company)} />
              
              {company.id === 2 ?
                <Delete className={classes.icon} color='disabled' /> :
                <Delete className={classes.icon} color='error' onClick={() => handleModalDelete(company)} />
              }
            </Box>
          </Box>

        </Typography>
        <Typography className={classes.doc} color="textSecondary">
          {company.tipo_doc}
        </Typography>
        <Typography className={classes.doc} color="textSecondary">
          {company.documento}
        </Typography>
        <Typography>
          {company.obs}
        </Typography>

        <Grid container className={classes.boxControlLabel}>
          <Grid item sm={4} xs={6}>
            <FormControlLabel
              className={classes.inactiveControl}
              control={
                <Checkbox
                  checked={company.gerar_nf}
                  name="gerar_nf"
                  color="primary"
                  className={classes.inactiveControl}
                />
              }
              label="Gera NF"
            />
          </Grid>

          <Grid item sm={4} xs={6}>
            <FormControlLabel
              className={classes.inactiveControl}
              control={
                <Checkbox
                  checked={company.retem_iss}
                  name="retem_iss"
                  color="primary"
                  className={classes.inactiveControl}
                />
              }
              label="Retém ISS"
            />
          </Grid>

          <Grid item sm={4} xs={12}>
            <FormControlLabel
              className={classes.inactiveControl}
              control={
                <Switch
                  checked={company.agrupar_fatura_contrato}
                  name="agrupar_fatura_contrato"
                  color="primary"
                  className={classes.inactiveControl}
                />
              }
              label="Por Contrato"
            />
          </Grid>
        </Grid>

      </CardContent>

      <CardActions>
        <Box className={classes.line} />
      </CardActions>

    </Card>
  );
};

