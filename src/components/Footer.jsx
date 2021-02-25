// react
import React from 'react';

// material-ui
import { Box, Grid, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {
  Business,
  WatchLater,
  QuestionAnswer,
  LinkedIn,
  Instagram,
  WhatsApp,
  PhoneInTalk
} from '@material-ui/icons';

// image
import atendimentoWhatsapp from '../assets/atendimento-whatsapp.png';

const useStyles = makeStyles(() => ({
  box: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0 40px',
  },
  grid: {
    padding: 20,
    marginTop: 15,
    minHeight: 100,
    display: 'flex',
    justifyContent: 'space-between',
  },
  line: {
    borderBottom: '2px solid #D3CBCB',
    width: '75%',
    display: 'flex',
    justifyContent: 'center',
    margin: '0 auto',
    marginTop: 20
  },
  icon: {
    marginRight: 10,
  },
  h2: {
    display: 'flex',
    alignItems: 'center'
  },
  socialBox: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%'
  },
  social1: {
    width: '100%',
    padding: 8,
    backgroundColor: '#373fff',
    color: 'white',
    '&:hover': {
      color: '#373fff',
      backgroundColor: 'transparent'
    }
  },
  social2: {
    width: '100%',
    padding: 8,
    borderColor: '#ff743b',
    marginTop: 8,
    color: 'white',
    backgroundColor: '#ffa843',
    '&:hover': {
      color: '#ffa843',
      backgroundColor: 'transparent'
    }
  },
  social3: {
    width: '100%',
    padding: 8,
    borderColor: '#00b721',
    marginTop: 8,
    backgroundColor: '#00b721',
    color: 'white',
    '&:hover': {
      color: '#00b721',
      backgroundColor: 'transparent'
    }
  },
  boxQuote: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
    fontFamily: 'Akaya Telivigala'

  },
  boxQuoteP: {
    fontSize: 18,
    marginBottom: 5
  },
  lineQuote: {
    borderBottom: '2px solid #e2dcdc',
    width: '55%',
    display: 'flex',
    justifyContent: 'center',
    margin: '0 auto',
    marginTop: 20,
  },
  whatsappFooter: {
    position: 'fixed',
    right: 100,
    bottom: 0,
    width: 50,
    textAlign: 'center',
    '&:hover': {
      opacity: 0.9,
    }
  },
  whatsappFooterImg: {
    width: 150,
    cursor: 'pointer'
  }
}));

const Footer = () => {

  const classes = useStyles();

  return (
    <Grid container className={classes.box}>

      <Box className={classes.line} />

      <Grid className={classes.grid} item md={4} sm={6} xs={12}>
        <Box>
          <h2 className={classes.h2}><Business className={classes.icon} /> Endereço</h2>
          <span>Rua Des. Alonso Starling, 52 - Camargos</span> <br />
          <span>Belo Horizonte/MG</span>
          <p style={{ display: 'flex', alignItems: 'center' }}>
            <PhoneInTalk style={{ marginRight: 7 }} /> (31) 3362-1025
          </p>
        </Box>
      </Grid>

      <Grid className={classes.grid} item md={4} sm={6} xs={12}>
        <Box>
          <h2 className={classes.h2}><WatchLater className={classes.icon} /> Horários</h2>
          <span>Segunda a sexta: 8:00 às 18:00</span> <br />
          <span>Sábado: 8:00 às 13:00</span>
        </Box>
      </Grid>

      <Grid className={classes.grid} item md={4} sm={6} xs={12}>
        <Box className={classes.socialBox}>
          <h2 className={classes.h2}><QuestionAnswer className={classes.icon} /> Social</h2>
          <Button variant="outlined" color="primary" className={classes.social1}>
            <LinkedIn /> Linkedin
          </Button>
          <Button variant="outlined" className={classes.social2}>
            <Instagram /> Instagram
          </Button>
          <Button variant="outlined" className={classes.social3}>
            <WhatsApp /> Whatsapp
          </Button>
        </Box>
      </Grid>

      <Box className={classes.boxQuote}>
        <Box className={classes.lineQuote} />
        <p className={classes.boxQuoteP}>
          "Cada sonho que você deixa pra trás, é um pedaço do seu futuro que deixa de existir"
        </p>
        <p style={{ fontStyle: 'italic', marginTop: 0, fontSize: 14, color: 'gray' }}>
          - Steve Jobs
        </p>
      </Box>

      <Box className={classes.whatsappFooter}>
        <img src={atendimentoWhatsapp} className={classes.whatsappFooterImg} alt="Whatsapp" />
      </Box>

    </Grid >
  );
};

export default Footer;