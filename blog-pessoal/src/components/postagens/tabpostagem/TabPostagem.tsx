import React, {useState} from 'react';
import { AppBar, Grid, Tab, Tabs, Typography } from '@material-ui/core';
import { Box } from '@mui/material';
import { TabContext, TabPanel } from '@material-ui/lab';
import ListaPostagem from '../listapostagem/ListaPostagem';
import './TabPostagem.css';
import StarBorderIcon from '@mui/icons-material/StarBorder';


function TabPostagem() {
    const [value, setValue] = useState('1')
    function handleChange(event: React.ChangeEvent<{}>, newValue: string){
        setValue(newValue);
    }
  return (
    <>
      <TabContext value={value} >
        <AppBar position="static" className='corDeFundo'>
          <Tabs centered indicatorColor="secondary" onChange={handleChange}>
            <Tab label="Todas as postagens" value="1" className="titulo"/>
            <Tab label="Sobre mim" value="2" className="titulo"/>
          </Tabs>
        </AppBar>
        <TabPanel value="1" >
          <Box display="flex" flexWrap="wrap" justifyContent="center">
            <ListaPostagem />
          </Box>
        </TabPanel>
        <TabPanel value="2" >
          <Typography variant="h5" gutterBottom color="textPrimary" component="h5" align="center" className="titulo">Sobre mim</Typography>
          
          <Grid className='centralizar'>
            <Box className='image'></Box>

            <Typography variant="body1" gutterBottom color="textPrimary" align="justify">
              Olá, meu nome é Fabyola Campos sou uma Desenvolvedora Java FullStack, que vive no estado de Minas Gerais, Brasil.<br></br>
              Meu espírito aventureiro me levou a fazer parte da primeira turma de guarda mirim da minha cidade, o que me proporcionou a experiência de ter o meu primeiro emprego de jovem aprendiz como auxiliar de recepção.<br></br>
              A minha paixão pela tecnologia veio através do curso do #OTechTaOn, onde aprendi Front-end aplicando no desenvolvimento de uma landing page. Gosto de novas experiências e de novos desafios, conhecimento é a minha chave para o sucesso!<br></br><br></br>
              Em 2022, foi uma ano de muitas conquistas!<br></br>
              <StarBorderIcon/>Fui aprovada para estudar Análise e Desenvolvimento de Sistemas no Instituto Federal do Norte de Minas Gerais,  Campus Araçuai.<br></br>
              <StarBorderIcon/>Tive a oportunidade de fazer parte da Generation em um bootcamp, desenvolvendo habilidades técnicas e aperfeiçoando minhas habilidades comportamentais como comunicação e trabalho em equipe, colocando tudo em prática nos trabalhos em grupos e no projeto integrador que foi a construção da rede social Sustenta+ atrelada a ODS 11 da ONU.<br></br>
              E para encerrar, deixo a frase que me define: "Conhecimento é o segredo de um futuro brilhante. Lembre-se disso quando pensar em desistir".
            </Typography>
          </Grid>

        </TabPanel>
      </TabContext>
    </>
  );
}
export default TabPostagem;