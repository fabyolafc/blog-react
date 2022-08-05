import React from "react";
import {Button, Typography} from '@material-ui/core'
import {makeStyles, Theme, createStyles} from '@material-ui/core/styles'

import CloseIcon from '@material-ui/icons/Close'
import { Box, Modal } from '@mui/material';
import EditIcon from '@material-ui/icons/Edit';
import AtualizaUsuario from "./AtualizaUsuario";
import './Config.css'

function getModalStyle(){

    const top=50;
    const left=50;

    return{

    top:`${top}%`,
    left:`${left}%`,
    transform:`translate(-${top}%,-${left}%)`

    };
}

const useStyles=makeStyles((theme:Theme)=>
    createStyles({
        paper:{
            position:'absolute',
            width:500,
            backgroundColor: theme.palette.background.paper,
            border:'2px solid #4b9e1b',
            boxShadow:theme.shadows[5],
            padding:theme.spacing(2,4,3)
        }
    })

);

function ModalAtualizaUsuario(){
    const classes = useStyles();
    const[modalStyle] = React.useState(getModalStyle);
    const[open,setOpen] = React.useState(false);

    const handleOpen =()=>{
        setOpen(true)
    }

    const handleClose=()=>{
        setOpen(false)
    }

    const body=(
        <div >
            <Box display='flex' justifyContent='flex-end' className='cursor'>
                <CloseIcon onClick={handleClose}/>
            </Box>
            <AtualizaUsuario />
        </div>
    );

    return(
    <div>
        <Box display="flex" flexDirection="row" justifyContent="space-between" alignItems="center" onClick={handleOpen} className='btnEdit'>
            <Typography >Editar Usuário</Typography>
            <EditIcon />
        </Box>
        
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
        >
            {body}
        </Modal>
    </div>
    );
}


export default ModalAtualizaUsuario;