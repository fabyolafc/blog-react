import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Postagem from '../../../models/Postagem';
import { busca } from '../../../services/Service'
import { Card, CardActions, CardContent, Button, Typography, createStyles, makeStyles, Theme, Grid, CardHeader, Avatar } from '@material-ui/core';
import { Box } from '@mui/material';
import './ListaPostagem.css';
import { useNavigate } from 'react-router-dom'
import { TokenState } from '../../../store/tokens/tokensReducer';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { purple } from '@mui/material/colors';
import User from '../../../models/User';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: 550,
      marginLeft: "10px",
      marginBottom: "30px"
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatar: {
      backgroundColor: purple[500],
    },
  }),
);

const ITEM_HEIGHT = 48;

function ListaPostagem() {
  const [posts, setPosts] = useState<Postagem[]>([])

  let navigate = useNavigate();

  const token = useSelector<TokenState, TokenState["tokens"]>(
    (state) => state.tokens
  );

  useEffect(() => {
    if (token == '') {
      toast.error('Você precisa estar logado', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        theme: "colored",
        progress: undefined,
      });
      navigate('/login')
    }
  }, [token])

  async function getPost() {
    await busca("/postagens", setPosts, {
      headers: {
        'Authorization': token
      }
    })
  }

  useEffect(() => {
    getPost()
  }, [posts.length])


  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


  return (
    <>
    
    <div style={{ height: "100px" }}></div>
        {
          
          posts.map(post => (
            
            <Card className={classes.root}>
              <CardHeader
                avatar={
                  <Avatar src={post.usuario?.foto} aria-label="recipe" className={classes.avatar} />
                }
                title={post.usuario?.nome}
                subheader={new Date(post.data).toLocaleDateString()}
                time={new Date(post.data).toLocaleTimeString([], { timeStyle: 'short' })}
              />
              <Box className='titulo-tema'>
                <Typography variant="h5" component="h2">{post.titulo}</Typography>
                <Typography variant="body2" color="textSecondary" component="p">Tema: {post.tema?.descricao}</Typography>
              </Box>
              <CardContent>
                <Typography variant="body2" component="p">
                  {post.texto}
                </Typography>
              </CardContent>
              <CardActions disableSpacing>
                <Link to={`/formularioPostagem/${post.id}`} className="text-decorator-none" >
                  <Box mx={1}>
                    <Button variant="contained" className="marginLeft button" size='small' color="primary" >
                      atualizar
                    </Button>
                  </Box>
                </Link>
                <Link to={`/deletarPostagem/${post.id}`} className="text-decorator-none">
                  <Box mx={1}>
                    <Button className='button' variant="contained" size='small' color="secondary">
                      deletar
                    </Button>
                  </Box>
                </Link>
                <Typography className='time-post' variant="body2" component="p" color="textSecondary">
                  Postado às {new Date(post.data).toLocaleTimeString([], { timeStyle: 'short' })}
                </Typography>
              </CardActions>
              
            </Card>

))
}
  
    </>
  )
}

export default ListaPostagem;