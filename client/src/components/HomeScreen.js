import React, { useContext, useEffect } from 'react'
import { GlobalStoreContext } from '../store'
import ListCard from './ListCard.js'
import MUIDeleteModal from './MUIDeleteModal'
import {Button} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab'
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
/*
    This React component lists all the top5 lists in the UI.
    
    @author McKilla Gorilla
*/
const HomeScreen = () => {
    const { store } = useContext(GlobalStoreContext);
    var vidPlayer = true;
    useEffect(() => {
        store.loadIdNamePairs();
    }, []);

    function handleCreateNewList() {
        store.createNewList();
    }
    let listCard = "";
    if (store) {
        listCard = 
            <List sx={{width: '100%', bgcolor: 'background.paper', mb:"20px" }}>
            {
                store.idNamePairs.map((pair) => (
                    <ListCard
                        key={pair._id}
                        idNamePair={pair}
                        selected={false}
                    />
                ))
                
                
            }
            <Button sx = {{width: '100%', height : '5%'}} color="primary" variant="contained" aria-label="add"
                id="add-list-button"
                onClick={handleCreateNewList}>
            +
          </Button>
          
            
            </List>;
    }
    if(!vidPlayer){
        return (
            
            <div id="playlist-selector">
                <div id="list-selector-heading">
                <Fab sx={{transform:"translate(-20%, 0%)"}}
                    color="primary" 
                    aria-label="add"
                    id="add-list-button"
                    onClick={handleCreateNewList}
                >
                    <AddIcon />
                </Fab>
                    Your Playlists
                </div>
                <Box sx={{bgcolor:"background.paper"}} id="list-selector-list">
                    {
                        listCard
                    }
                    <MUIDeleteModal />
                </Box>
            </div>)
    } else{
        return (
            
            <div id="playlist-selector">
                <div id="list-selector-heading">
                <Fab sx={{transform:"translate(-20%, 0%)"}}
                    color="primary" 
                    aria-label="add"
                    id="add-list-button"
                    onClick={handleCreateNewList}
                >
                    <AddIcon />
                </Fab>
                    Your Playlists
                </div>
                
                <div className="splitScreen">
                    <div className="leftPanel">

                        <Box sx={{width:"50%", bgcolor:"background.paper"}} id="list-selector-list">
                            {
                                listCard
                            }
                            <MUIDeleteModal />
                        </Box>
                    </div>
                    <div className="rightPanel">


                    </div>
                </div>
                
                
                
                
            </div>)
    }
}

export default HomeScreen;