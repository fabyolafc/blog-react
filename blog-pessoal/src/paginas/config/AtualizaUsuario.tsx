import React, { ChangeEvent, useEffect, useState } from 'react'
import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { TokenState } from '../../store/tokens/tokensReducer';
import { buscaId, put } from '../../services/Service';
import { addToken } from '../../store/tokens/actions';
import './Config.css'
import User from '../../models/User';

function AtualizaUsuario() {

    let navigate = useNavigate();

    const [confirmarSenha, setConfirmarSenha] = useState<String>("")

    const userId = useSelector<TokenState, TokenState['id']>(
        (state) => state.id
    )

    const token = useSelector<TokenState, TokenState["tokens"]>(
        (state) => state.tokens
    );

    const dispatch = useDispatch();

    const [user, setUser] = useState<User>({
        id: 0,
        nome: '',
        usuario: '',
        senha: '',
        foto: '',
    });

    useEffect(() => {
        if (token === "") {
            toast.info('Você precisa estar logado.', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'colored',
            });
            navigate("/login")
        }
    }, [token])

    useEffect(() => {
        if (userId !== undefined) {
            findById(userId)
        }
    }, [userId]);

    async function findById(id: string) {
        buscaId(`/usuarios/${id}`, setUser, {
            headers: {
                'Authorization': token
            }
        })
    }

    async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault()
        user.postagem = null
        if (confirmarSenha === user.senha) {
            put(`/usuarios/atualizar`, user, setUser, {
                headers: {
                    'Authorization': token
                }
            })
            toast.success('Usuário atualizado', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'colored',
            });
            navigate('/perfil')
        } else {
            toast.warn('As senhas devem ser as mesmas.', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'colored',
            });
        }
    }

    function confirmarSenhaHandle(e: ChangeEvent<HTMLInputElement>) {
        setConfirmarSenha(e.target.value)
    }

    function updatedModel(e: ChangeEvent<HTMLInputElement>) {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    function goLogout() {
        dispatch(addToken(''));
        toast.info('Usuário atualizado, por favor use suas credenciais atualizadas', {
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

    return (
        <>
            <Grid container direction='row' justifyContent='center' alignItems='center'>

                <Box paddingX={10} marginY={10} className='cardCadastro' id='formAtualizar'>
                    <form onSubmit={onSubmit}>
                        <Typography variant='h5' className='inputAtualiza' gutterBottom color='textPrimary' component='h5' align='center'>Editar Perfil</Typography>

                        <TextField value={user.nome} className='inputAtualiza' onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)} id='nome' variant='outlined' placeholder='Insira o seu nome' name='nome' margin='normal' fullWidth />

                        <TextField value={user.foto} className='inputAtualiza' onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)} id='foto' placeholder='Insira o link da foto' variant='outlined' name='foto' margin='normal' fullWidth />

                        <TextField value={user.senha} className='inputAtualiza' onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)} id='senha' variant='outlined' placeholder='Insira a sua senha' name='senha' margin='normal' type='password' fullWidth />

                        <TextField value={confirmarSenha} className='inputAtualiza' onChange={(e: ChangeEvent<HTMLInputElement>) => confirmarSenhaHandle(e)} id='confirmarSenha' placeholder='Confirmar senha' variant='outlined' name='confirmarSenha' margin='normal' type='password' fullWidth />

                        <Box marginTop={2} textAlign='center'>
                            <Link to="/perfil" className='text-decorator-none'>
                                <Button variant='contained' color='secondary' className='btnEdit'>
                                    Cancelar
                                </Button>
                            </Link>
                            <Button type='submit' variant='contained' color='primary' className='btnEdit btnEdit2'>
                                Atualizar
                            </Button>
                        </Box>
                    </form>
                </Box>

            </Grid>
        </>
    )
}

export default AtualizaUsuario;