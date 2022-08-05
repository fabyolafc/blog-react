
import './Perfil.css'
import React, {useState, useEffect, ChangeEvent} from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Card, CardActions, CardContent, Button, Typography, TextField } from '@material-ui/core';
import {Box} from '@mui/material'
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import ShareIcon from '@material-ui/icons/Share';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Grid, Menu, MenuItem } from '@mui/material';
import { TokenState } from '../../store/tokens/tokensReducer';
import { buscaId, put } from '../../services/Service';
import User from '../../models/User';
import MeusPosts from '../../components/postagens/meusposts/MeusPosts';
import { purple } from '@mui/material/colors';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: 550,
      marginLeft: "250px",
      marginBottom: "30px"
    },
    media: {
      height: 0,
      paddingTop: '56.25%',
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

function Perfil() {

  const { id } = useParams<{ id: string }>();
    
    const [users, setUsers] = useState<User>({
        id: 0,
        nome: '',
        usuario: '',
        senha: '',
        foto: ''
       
    })

    const [user, setUser] = useState<User | any>({
      id: 0,
      nome: '',
      usuario: '',
      foto: '',
      senha: '',
      postagem: null
    });

    const [endImg, setEndImg] = useState('./perfil.png');
  
    let navigate = useNavigate();

    const token = useSelector<TokenState, TokenState["tokens"]>(
        (state) => state.tokens
    );

     const userId = useSelector<TokenState, TokenState['id']>(
        (state) => state.id
    )

  useEffect(() => {
    if(token == ''){
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

  async function getUserId() {
    await buscaId(`/usuarios/${userId}`, setUsers, {
      headers: {
        'Authorization': token
      }
    })
  }

  useEffect(() => {
    getUserId()
  }, [])

  useEffect(() => {
    if (token === "") {
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
  }, [token]);

  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


    return(
        <>
          <Box className="profileImageContainer">
            {users.foto ? <img className="profileImage" src={ users.foto } alt={users.nome} /> : <img className='profileImage' src={endImg}/>}
            <Typography className="profile-name">{users.nome}</Typography>
            <Typography className="profile-email">{users.usuario}</Typography>
            <hr className='linha-perfil' />
            </Box>
              
            <Grid className='caixa'>
            <h3>Minhas postagens</h3>
            <MeusPosts/>
            </Grid>
   
    
  

        

        </>
    );
}

export default Perfil;