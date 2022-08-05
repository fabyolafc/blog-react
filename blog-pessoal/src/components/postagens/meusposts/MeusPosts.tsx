import React, {useState, useEffect} from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Card, CardActions, CardContent, Button, Typography } from '@material-ui/core';
import { Box } from '@mui/material';
import './MeusPosts.css'
import { busca, buscaId } from '../../../services/Service';
import { TokenState } from '../../../store/tokens/tokensReducer';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import { purple } from '@mui/material/colors';
import { Grid, Menu, MenuItem } from '@mui/material';
import User from '../../../models/User';
import Postagem from '../../../models/Postagem';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: 550,
      marginLeft: "450px",
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

function MeusPosts() {

    const [posts, setPosts] = useState<Postagem[]>([])
    let navigate = useNavigate();
    const token = useSelector<TokenState, TokenState["tokens"]>(
      (state) => state.tokens
    );
    const userId = useSelector<TokenState, TokenState["id"]>(
      (state) => state.id
    );
  
    const [user, setUser] = useState<User | any>({
      id: 0,
      nome: '',
      usuario: '',
      foto: '',
      senha: '',
      postagem: null
    });
  
    useEffect(() => {
      if (userId !== undefined) {
        findById(userId)
      }
      console.log(user)
    }, [userId]);
  
    useEffect(() => {
      if(token === ''){
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
  
    async function findById(id: string) {
      buscaId(`/usuarios/${userId}`, setUser, {
        headers: {
          'Authorization': token
        }
      })
      
    }

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
    
    <div style={{height:"50px"}}></div>

    <Grid className='caixa' >
    
    {
      user.postagem?.map((post:any )=> (
        <Card className={classes.root}>
        <CardHeader
          avatar={
            <Avatar src={user.foto} />   
          }
          title={post.usuario?.nome}
          subheader={new Date(post.data).toLocaleDateString()}
          time={new Date(post.data).toLocaleTimeString([],{timeStyle:'short'})}
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
            Postado às {new Date(post.data).toLocaleTimeString([],{timeStyle:'short'})}
          </Typography>
        </CardActions>
      </Card>

      ))
    }
    </Grid>

    </>
    )
}

export default MeusPosts;