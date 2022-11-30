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

    
    /*
    useEffect(() => {
        
    }, [disliked]);
    */
    function handleLoadList(event, id) {
        console.log("handleLoadList for " + id);
        if (!event.target.disabled) {
            let _id = event.target.id;
            if (_id.indexOf('list-card-text-') >= 0)
                _id = ("" + _id).substring("list-card-text-".length);

            console.log("load " + event.target.id);

            // CHANGE THE CURRENT LIST
            store.setCurrentList(id);
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
        console.log(expanded);
        if (!expanded) setExpanded(true);
        else setExpanded(false);
        //store.hideModals();
    }

    function handleLike(event, id) {
        //console.log(store.currentSong);

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
        store.hideModals();
        //store.closeCurrentList(id);
    }
    function handleDislike(event, id) {
        event.stopPropagation();

        if (!disliked) {
            idNamePair.dislikes++;
            setdisLiked(!disliked);
        }
        else {
            idNamePair.dislikes--;
            setdisLiked(!disliked);
        }
        store.updateListLikes(id, idNamePair);
        store.hideModals();

    }
    function handleListen(event, id) {
        event.stopPropagation();
        idNamePair.listens++;
        store.updateListLikes(id, idNamePair);
        store.hideModals();
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
            style={{ transform: "translate(1%,0%)", width: '98%', fontSize: '48pt' }} // change this later for text things when I add the video player
            button
            onClick={(event) => {
                handleLoadList(event, idNamePair._id)
            }}
        >

            <Box sx={{ p: 2, flexGrow: 1 }}><Box sx={{ p: 2, flexGrow: 1 }}>{idNamePair.name}</Box>
                <Box sx={{ p: 2, flexGrow: 1 }}>by {idNamePair.firstname + " " + idNamePair.lastname}</Box> </Box>
            <Box sx={{ p: 2, flexGrow: 1 }}><Box sx={{ p: 2, flexGrow: 1 }}>listens </Box> <Box sx={{ p: 2, flexGrow: 1 }}>{idNamePair.listens}</Box> </Box>
            <Box sx={{ p: 2, flexGrow: 1 }}><Box sx={{ p: 1, flexGrow: 1 }}><Button onClick={(event) => { handleLike(event, idNamePair._id) }}>👍</Button>{idNamePair.likes}</Box><Box sx={{ p: 1, flexGrow: 1 }}><Button onClick={(event) => { handleDislike(event, idNamePair._id) }}>👎</Button>{idNamePair.dislikes}</Box></Box>
            <Box sx={{ p: 1 }}>
                <IconButton onClick={handleToggleEdit} aria-label='edit'>
                    <EditIcon style={{ fontSize: '48pt' }} />
                </IconButton>
            </Box>
            <Box sx={{ p: 1 }}>
                <IconButton onClick={(event) => {
                    handleDeleteList(event, idNamePair._id)
                }} aria-label='delete'>
                    <DeleteIcon style={{ fontSize: '48pt' }} />
                </IconButton>
            </Box>
            <Box sx={{ p: 1 }}>
                <IconButton onClick={(event) => {
                    handleExpand(event, idNamePair._id)
                }} aria-label='expand'>
                    ⇓
                </IconButton>
            </Box>

        </ListItem>

    if (expanded) console.log("thing")//cardElement += <Box sx={{ p: 1 }}>thing</Box>

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