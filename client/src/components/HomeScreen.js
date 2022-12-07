import React, { useContext, useState, useEffect } from 'react'
import { GlobalStoreContext } from '../store'
import ListCard from './ListCard.js'
import MUIDeleteModal from './MUIDeleteModal'
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab'
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { fontSize } from '@mui/system';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import YouTubePlayerExample from './PlaylisterYouTubePlayer.js';

/*
    This React component lists all the top5 lists in the UI.
    
    @author McKilla Gorilla
*/
const HomeScreen = () => {
    const { store } = useContext(GlobalStoreContext);
    const [vidPlayer, setVidPlayer] = useState(true);
    
    useEffect(() => {
        store.loadIdNamePairs();
    }, []);
    useEffect(() => {
        store.loadIdNamePairs();
        console.log(store.user)
    }, [store.user]);
    const [idNamePair2, setidNamePair2] = useState([]);
    //setidNamePair2(store.idNamePairs);
    const [searchInput, setSearchInput] = useState("");
    const handleChange = (event) => {
        setSearchInput(event.target.value);
    };

    useEffect(() => {
        console.log(searchInput);
        //store.idNamePair = store.idNamePairs.filter(element => element.name.toLowerCase().includes(searchInput.toLowerCase()));
        if(store.user === "ALL"){
            store.searchIdNamePairsPlaylistName(searchInput);
        }
        else if(store.user === "USER"){
            store.searchIdNamePairsAuthor(searchInput);
        }
        console.log("Original playlist")
        console.log(store.idNamePairs);
        console.log("Searched by name of playlist")
        console.log(store.idNamePairs.filter(element => element.name.toLowerCase().includes(searchInput.toLowerCase())));
        console.log("Searched by author")
        console.log(store.idNamePairs.filter(element => element.firstname.concat(element.lastname).toLowerCase().includes(searchInput.toLowerCase())));
    }, [searchInput]);

    function handleHome(){
        store.changeUserStateHome();
        //console.log(store);
    }
    function handleAll(){   
        store.changeUserStateAll();
        //console.log(store);
    }
    function handleUser(){
         store.changeUserStateUser();
        //console.log(store);
        //console.log(store);
        //store.loadIdNamePairs();
    }

    function handleCreateNewList() {
        store.createNewList();
    }


    /*
    const [anchorEl, setAnchorEl] = useState(null);
    const isMenuOpen = Boolean(anchorEl);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const sortedByMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose}><Link to='/login/'>Login</Link></MenuItem>
            <MenuItem onClick={handleMenuClose}><Link to='/register/'>Create New Account</Link></MenuItem>
            <MenuItem onClick={handleGuest}><Link to='/'>Login As Guest</Link></MenuItem>
        </Menu>);
    

    */
    let listCard = "";
    if (store) {
        listCard =
            <List sx={{ width: '100%', bgcolor: 'background.paper', mb: "20px" }}>
                {
                    store.idNamePairs.map((pair) => (
                        <ListCard
                            key={pair._id}
                            idNamePair={pair}
                            selected={false}
                        />
                    ))


                }
                
                <Button sx={{ width: '100%', height: '5%' }} color="primary" variant="contained" aria-label="add"
                    id="add-list-button"
                    onClick={handleCreateNewList}>
                    +
                </Button>


            </List>;
    }
    if (!vidPlayer) {
        if(store.currentList!=null){
            store.currentList.comments.forEach(c => <div>{c.Grid}</div>)
        }
        return (

            <div id="playlist-selector">
                <div><img src="https://i.gyazo.com/925c86fb69ce0341fe569c6beff25caf.png" onClick={(e)=>handleHome(e)}></img>
                    <img src="https://i.gyazo.com/86621b0d0f86837ac3119a826eda3a77.png" onClick={(e)=>handleAll(e)}></img>
                    <img src="https://i.gyazo.com/17ce1729cad3905d213a06ee107a6e90.png" onClick={(e)=>handleUser(e)}></img>
                    <input style={{display: "inline-block", marginLeft:"250px", width:"500px"}} type="text" placeholder="Search here" onChange={handleChange} value={searchInput} />
                    <img style={{float: "right"}} src="https://i.gyazo.com/5a08a4d8c4b67862f1784b3cb14a5863.png"></img>
                    <p style={{display:"inline", float: "right"}}>Sorted by</p>
                    
                    
                    
                </div>
                <div id="list-selector-heading">
                    {/*<Fab sx={{ transform: "translate(-20%, 0%)" }}
                        color="primary"
                        aria-label="add"
                        id="add-list-button"
                        onClick={handleCreateNewList}
                    >
                        <AddIcon />
                    </Fab>*/}
                    Your Playlists
                </div>
                <Grid container spacing = {0}>
                    <div className="splitScreen">
                        <Grid item xs = {12}>
                        <div style={{ fontSize: "10px" }} className="leftPanel">

                            <Box sx={{ bgcolor: "background.paper" }} id="list-selector-list">
                                {
                                    listCard
                                }
                                <MUIDeleteModal />
                            </Box>
                        </div>
                        </Grid>
                        <Grid item xs = {4} >
                        <div className="rightPanel">
                            {
                                
                            } 
                        </div>
                        </Grid>
                    </div>
                    
                </Grid>




            </div>)
    } else {
        return (

            <div id="playlist-selector">
                <div><img src="https://i.gyazo.com/925c86fb69ce0341fe569c6beff25caf.png" onClick={(e)=>handleHome(e)}></img>
                    <img src="https://i.gyazo.com/86621b0d0f86837ac3119a826eda3a77.png" onClick={(e)=>handleAll(e)}></img>
                    <img src="https://i.gyazo.com/17ce1729cad3905d213a06ee107a6e90.png" onClick={(e)=>handleUser(e)}></img>
                    <input style={{display: "inline-block", marginLeft:"250px", width:"500px"}} type="text" placeholder="Search here" onChange={handleChange} value={searchInput} />
                    <img style={{float: "right"}} src="https://i.gyazo.com/5a08a4d8c4b67862f1784b3cb14a5863.png"></img>
                    <p style={{display:"inline", float: "right"}}>Sorted by</p>
                    
                    
                    
                </div>
                <div id="list-selector-heading">
                    {/*<Fab sx={{ transform: "translate(-20%, 0%)" }}
                        color="primary"
                        aria-label="add"
                        id="add-list-button"
                        onClick={handleCreateNewList}
                    >
                        <AddIcon />
                    </Fab>*/}
                    Your Playlists
                </div>
                <Grid container spacing = {0}>
                    <div className="splitScreen">
                        <Grid item xs = {12}>
                        <div style={{ fontSize: "10px" }} className="leftPanel">

                            <Box sx={{ bgcolor: "background.paper" }} id="list-selector-list">
                                {
                                    listCard
                                }
                                <MUIDeleteModal />
                            </Box>
                        </div>
                        </Grid>
                        <Grid item xs = {4} >
                        <div className="rightPanel">
                            <YouTubePlayerExample store={store} />
                        </div>
                        </Grid>
                    </div>
                    
                </Grid>




            </div>)
    }
}

export default HomeScreen;