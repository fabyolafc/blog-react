import { Avatar, Box, Grid, MenuItem, TextField, Typography } from '@mui/material';
import React, { ChangeEvent, useEffect, useState } from 'react'
import Brightness4Icon from '@material-ui/icons/Brightness4';
import './Config.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { TokenState } from '../../store/tokens/tokensReducer';
import { toast } from 'react-toastify';
import { buscaId, put } from '../../services/Service';
import User from '../../models/User';
import ModalAtualizaUsuario from './ModalAtualizaUsuario';
function Config() {

    const { id } = useParams<{ id: string }>();

    const [users, setUsers] = useState<User>({
        id: 0,
        nome: '',
        usuario: '',
        senha: '',
        foto: '',
    })

    let navigate = useNavigate();

    const token = useSelector<TokenState, TokenState["tokens"]>(
        (state) => state.tokens
    );

    const userId = useSelector<TokenState, TokenState['id']>(
        (state) => state.id
    )

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

    const [usuario, setUsuario] = useState<User>({
        id: +userId, 
        nome: '',
        usuario: '',
        senha: '',
        foto: '',
    })


    //para atualizar o usuário
    async function findByIdUsuario(id: string) {
        await buscaId(`usuarios/${id}`, setUsuario, {
            headers: {
                'Authorization': token
            }
        })
    }

    function updatedUsuario(e: ChangeEvent<HTMLInputElement>) {

        setUsuario({
            ...usuario,
            [e.target.name]: e.target.value
        })

    }

    async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault()

        if (id !== undefined) {
            put(`/usuarios`, usuario, setUsuario, {
                headers: {
                    'Authorization': token
                }
            })
            toast.success('Usuário atualizado com sucesso', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                theme: "colored",
                progress: undefined,
            })
        }
        back()
    }

    function back() {
        navigate('/config')
    }

    return (
        <>
            
            <Grid container className="grid-maior" >

                <Grid xs={4} justifyContent='center' alignItems="center">
                    <form className='form-perfil'>
                        <Box className='caixa-foto' width={280} height={300}>
                            <img src={users.foto} alt={users.nome} width="200" height="200" className='foto-user' />
                        </Box>
                       
                    </form>
                </Grid>

                <Grid xs={1} justifyContent='center' alignItems="center">
                    <Box width={300} height={400} id='caixaDados'>
                        <Typography className="user-titulo">Dados do Usuário</Typography>
                        <hr />
                        <Box paddingX={4} className='atributos-user'>
                            <p>Nome</p>
                        </Box>
                        <Typography className="user-texto" paddingX={4}>{users.nome}</Typography>
                        <Box paddingX={4} className='atributos-user'>
                            <p>Usuário</p>
                        </Box>
                        <Typography className="user-texto" paddingX={4}>{users.usuario}</Typography>
                       
                        <Box display="flex" justifyContent="center" marginTop="19px">
                            <ModalAtualizaUsuario />
                        </Box>
                    </Box>
                </Grid>
            </Grid>

        </>
    )
}

export default Config;