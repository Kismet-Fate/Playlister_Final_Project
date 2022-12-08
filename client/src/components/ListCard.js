import { useContext, useState, useEffect } from 'react'
import { GlobalStoreContext } from '../store'
import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import api from '../store/store-request-api'
import SongCard from './SongCard';
import WorkspaceScreen from './WorkspaceScreen.js';
import Grid from '@mui/material/Grid';
/*
    This is a card in our list of top 5 lists. It lets select
    a list for editing and it has controls for changing its 
    name or deleting it.
    
    @author McKilla Gorilla
*/
function ListCard(props) {
    const { store } = useContext(GlobalStoreContext);
    const [editActive, setEditActive] = useState(false);
    const [text, setText] = useState("");
    const { idNamePair, selected } = props;


    const [expanded, setExpanded] = useState(false);
    //const [liked,setLiked] = useState(false)
    const [liked, setLiked] = useState(
        localStorage.getItem('liked') === 'true'
    );
    const [disliked, setdisLiked] = useState(
        localStorage.getItem('disliked') === 'true'
    );
    useEffect(() => {
        localStorage.setItem('liked', JSON.stringify(liked));
        localStorage.setItem('disliked', JSON.stringify(disliked));
    }, [liked, disliked]);

   
    useEffect(() => {
        var t = document.getElementById(idNamePair._id);
        var h = t.style.height 
        var a = t.style.alignSelf 
        if(expanded){
            t = document.getElementById(idNamePair._id);
            t.style.height = "100%";
            t.style.top = "0";
            t.style.alignItems = "initial";
            
        }
        else {
            t.style.height = "30%";
            t.style.alignSelf = a;
            t.style.alignItems = "center";

            
        }
        /*
        if(expanded){
            
        }else{

        }*/
        //setExpanded(!expanded);
    }, [expanded]);
    
    function handleLoadList(event, id) {
        
        if(!idNamePair.published && store.currentModal === "NONE"){
            console.log("handleLoadList for " + id);
            if (!event.target.disabled) {
                let _id = event.target.id;
                if (_id.indexOf('list-card-text-') >= 0)
                    _id = ("" + _id).substring("list-card-text-".length);

                console.log("load " + event.target.id);

                // CHANGE THE CURRENT LIST
                //remember to change it from 2 to "" if you want to edit it
                if(event.detail == 2) store.setCurrentList(id);//store.setCurrentList(id);
                else store.setCurrentList2(id)
            }
            
        } else{
            if(store.currentModal === "NONE"){
                handleListen(event, id);
                store.setCurrentList2(id)
            }
        }
    }

    function handleToggleEdit(event) {
        event.stopPropagation();
        toggleEdit();
    }

    function toggleEdit() {
        let newActive = !editActive;
        if (newActive) {
            store.setIsListNameEditActive();
        }
        setEditActive(newActive);
    }

    async function handleDeleteList(event, id) {
        event.stopPropagation();
        let _id = event.target.id;
        _id = ("" + _id).substring("delete-list-".length);
        store.markListForDeletion(id);
    }

    function handleKeyPress(event) {
        event.stopPropagation();
        if (event.code === "Enter") {
            let id = event.target.id.substring("list-".length);
            store.changeListName(id, text);
            toggleEdit();
        }
    }
    function handleUpdateText(event) {
        setText(event.target.value);
    }

    function handleExpand(event, id) {
        event.stopPropagation();
        //console.log(expanded);
        setExpanded(!expanded);

        if (!event.target.disabled) {
            let _id = event.target.id;
            if (_id.indexOf('list-card-text-') >= 0)
                _id = ("" + _id).substring("list-card-text-".length);

            console.log("load " + event.target.id);

            // CHANGE THE CURRENT LIST
            store.setCurrentList2(id);
        }

        //store.hideModals();
    }

    function handleLike(event, id) {
        //console.log(store.currentSong);
        if(disliked){
            idNamePair.dislikes--;
            setdisLiked(!disliked);
        }
        event.stopPropagation();
        if (!liked) {
            idNamePair.likes++;
            setLiked(!liked);
        }
        else {
            idNamePair.likes--;
            setLiked(!liked);
        }
        store.updateListLikes(id, idNamePair);
        //store.hideModals();
        //store.closeCurrentList(id);
    }
    function handleDislike(event, id) {
        event.stopPropagation();
        if(liked){
            idNamePair.likes--;
            setLiked(!liked);
        }
        if (!disliked) {
            idNamePair.dislikes++;
            setdisLiked(!disliked);
        }
        else {
            idNamePair.dislikes--;
            setdisLiked(!disliked);
        }
        store.updateListLikes(id, idNamePair);
        //store.hideModals();

    }
    function handleListen(event, id) {
        event.stopPropagation();
        idNamePair.listens++;
        store.updateListLikes(id, idNamePair);
        //store.hideModals();
    }
    function handlePublish(event, id){
        event.stopPropagation();
        console.log(idNamePair);
        idNamePair.published = true;
        store.updateListLikes(id, idNamePair);
        store.hideModals();
    }

    function handleDuplicate(event, id){
        event.stopPropagation();
        console.log(idNamePair);
        store.duplicateList(idNamePair);
        store.hideModals();
        store.changeUserStateHome();
    }

    let selectClass = "unselected-list-card";
    if (selected) {
        selectClass = "selected-list-card";
    }
    let cardStatus = false;
    if (store.isListNameEditActive) {
        cardStatus = true;
    }
    console.log(idNamePair);
    /*
    Change overflow to overflow-y, change left panel width to 70%, no position absolute. 
    */
    let cardElement =
        <ListItem 
            id={idNamePair._id}
            key={idNamePair._id}
            sx={{ borderRadius: "25px", p: "10px", bgcolor: '#8000F00F', marginTop: '15px', display: 'flex', p: 1 }}
            style={{ transform: "translate(1%,0%)", width: '98%', fontSize: '12pt' }} // change this later for text things when I add the video player
            button
            onClick={(event) => {
                handleLoadList(event, idNamePair._id)
            }}
        >
            
            <Grid container direction="row" alignItems="stretch" justifyContent="space-between" xs = {6} flexShrink = {0}>
            <Box sx={{ p: 1, flexGrow: 0 }}><Box sx={{ p: 1, flexGrow: 0 }}>{idNamePair.name}</Box>
            <Box sx={{ p: 1, flexGrow: 0 }}>by {idNamePair.firstname + " " + idNamePair.lastname}</Box> </Box>
            <Box sx={{ p: 1, flexGrow: 0 }}><Box sx={{ p: 1, flexGrow: 0 }}>listens </Box> <Box sx={{ p: 1, flexGrow: 0 }}>{idNamePair.listens}</Box> </Box>
            <Box sx={{ p: 1, flexGrow: 0 }}><Box sx={{ p: 1, flexGrow: 0 }}><Button onClick={(event) => { handleLike(event, idNamePair._id) }}>👍</Button>{idNamePair.likes}</Box><Box sx={{ p: 1, flexGrow: 0 }}><Button onClick={(event) => { handleDislike(event, idNamePair._id) }}>👎</Button>{idNamePair.dislikes}</Box></Box>
            {!idNamePair.published && store.user === "HOME" && <Box sx={{ p: 1 }}>
                <IconButton onClick={handleToggleEdit} aria-label='edit'>
                    <EditIcon style={{ fontSize: '48pt' }} />
                </IconButton>
            </Box>}
            {store.user === "HOME" && <Box sx={{ p: 1 }}>
                <IconButton onClick={(event) => {
                    handleDeleteList(event, idNamePair._id)
                }} aria-label='delete'>
                    <DeleteIcon style={{ fontSize: '48pt' }} />
                </IconButton>
            </Box>}
            {!idNamePair.published && store.user === "HOME" &&<Button onClick={(event) => {handlePublish(event, idNamePair._id)}}>publish</Button>}
            {!store.isGuest() && <Button onClick={(event) => {handleDuplicate(event, idNamePair._id)}}>duplicate</Button>}
            <Box sx={{ p: 1 }}>
                <IconButton onClick={(event) => {
                    handleExpand(event, idNamePair._id)
                }} aria-label='expand'>
                    ⇓
                </IconButton>
            </Box>
            <br></br>
            </Grid>
            <Grid >
            <div style={{}}>
                
                
                {expanded && store.currentList && <WorkspaceScreen />/*SongCard*/}
                
            </div>
            </Grid>
        </ListItem>

    if (editActive) {
        cardElement =
            <TextField
                margin="normal"
                required
                fullWidth
                id={"list-" + idNamePair._id}
                label="Playlist Name"
                name="name"
                autoComplete="Playlist Name"
                className='list-card'
                onKeyPress={handleKeyPress}
                onChange={handleUpdateText}
                defaultValue={idNamePair.name}
                inputProps={{ style: { fontSize: 48 } }}
                InputLabelProps={{ style: { fontSize: 24 } }}
                autoFocus
            />
    }
    return (
        cardElement
    );
}

export default ListCard;