// react
import React from 'react';

// material-ui
import { Box, TextField, Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import EmailIcon from '@material-ui/icons/Email';


const useStyles = makeStyles(() => ({
  mainBox: {
    backgroundColor: '#3e4669',
    padding: '50px 0px 60px 0px',
    margin: '30px 0px'
  },
  boxTitle: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '0 40px',
    color: 'white'
  },
  line: {
    borderBottom: '2px solid #D3CBCB',
    width: 200,
    display: 'flex',
    justifyContent: 'center',
    margin: '10px auto',
  },
  boxForm: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30
  },
  input: {
    backgroundColor: 'white',
    width: 350,
    height: 40,
    borderTopLeftRadius: 25,
    borderBottomLeftRadius: 25
  },
  icon: {
    fontSize: 50
  },
  registerButton: {
    marginLeft: -20,
    width: 150,
    height: 42,
    borderTopRightRadius: 25,
    borderBottomRightRadius: 25,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    paddingTop: 2,
    paddingBottom: 2,
    color: 'white',
    backgroundColor: '#373fff',
    '&:hover': {
      backgroundColor: '#353a9b',
      color: '#FFF',
      border: '1px solid #353a9b'
    }
  }
}));

const Newsletter = () => {

  const classes = useStyles();

  return (
    <Box className={classes.mainBox}>

      <Box className={classes.boxTitle}>
        <EmailIcon className={classes.icon} />
        <Typography align='center' variant="h2">Fique por dentro</Typography>
        <Box className={classes.line} />
        <h3>Assine nossa Newsletter e receba nossos conteúdos sobre TI</h3>
      </Box>

      <Box className={classes.boxForm}>
        <TextField
          placeholder='Seu e-mail'
          variant="outlined"
          InputProps={{
            className: classes.input,
          }}
        />
        <Button
          variant="outlined"
          color="default"
          className={classes.registerButton}
        >
          Inscrever
        </Button>
      </Box>

    </Box>
  )
};

export default Newsletter;