import React, { useContext, useState, useEffect } from 'react'
import { GlobalStoreContext } from '../store'
import ListCard from './ListCard.js'
import MUIDeleteModal from './MUIDeleteModal'
import { Button, useThemeProps } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab'
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { fontSize } from '@mui/system';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import YouTubePlayerExample from './PlaylisterYouTubePlayer.js';
import EditToolbar from './EditToolbar'

/*
    This React component lists all the top5 lists in the UI.
    
    @author McKilla Gorilla
*/
const HomeScreen = (props) => {
    const { store } = useContext(GlobalStoreContext);
    const [vidPlayer, setVidPlayer] = useState(true);
    const {auth} = props.auth;
    
    const [sortedBy, setsortedBy] = useState("");

    useEffect(() => {
        store.loadIdNamePairs();
    }, []);
    
    useEffect(() => {
        store.loadIdNamePairs();
        
    }, [store.user]);
    const [idNamePair2, setidNamePair2] = useState([]);
    //setidNamePair2(store.idNamePairs);
    const [searchInput, setSearchInput] = useState("");

    const [commentThing, setcommentThing] = useState();
    function handleCommenting(event) {
        setcommentThing(event.target.value);
    }
    const[currentComment, setcurrentComment] = useState();
    useEffect(() => {
        if(store.currentList != null){
            setcurrentComment(store.currentList.comments);
            //console.log(store.isMyList(store.currentList));
        }
    }, [store.currentList]);


    function handleSubmit(){
        let newComment = {
            name: props.auth.user.firstName.concat(props.auth.user.lastName),
            comment: commentThing
        };
        console.log(props.auth.user.firstName.concat(props.auth.user.lastName));
        store.currentList.comments.push(newComment);
        //console.log(store.currentList);
        store.updateListLikes(store.currentList._id, store.currentList);
        
        //console.log(store.currentList);
        store.loadIdNamePairs();
        //store.setCurrentList2(store.currentList._id);
        
    }

    const handleSortedByName = () =>{
        setsortedBy("NAME");
        store.loadIdNamePairsSorted("NAME");
        handleMenuClose();
    }
    const handleSortedByDate = () =>{
        setsortedBy("DATE");
        store.loadIdNamePairsSorted("DATE");
        handleMenuClose();
    }
    const handleSortedByListens = () =>{
        setsortedBy("LISTENS");
        store.loadIdNamePairsSorted("LISTENS");
        handleMenuClose();
    }
    const handleSortedByLikes = () =>{
        setsortedBy("LIKES");
        store.loadIdNamePairsSorted("LIKES");
        handleMenuClose();
    }
    const handleSortedByDislikes = () =>{
        setsortedBy("DISLIKES");
        store.loadIdNamePairsSorted("DISLIKES");
        handleMenuClose();
    }
    

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
        else if(store.user === "HOME"){
            store.searchIdNamePairsPlaylistName(searchInput);
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
        document.getElementById("homeButton").src = 'https://safeimagekit.com/ezoimgfmt/d33wubrfki0l68.cloudfront.net/050c51f7b376da9c4aad8dfc1d875558b85d77b8/6115e/img/featureproperty/nodownload.png?ezimgfmt=rs:48x48/rscb1/ng:webp/ngcb1';
        document.getElementById("allButton").src = 'https://i.gyazo.com/86621b0d0f86837ac3119a826eda3a77.png';
        document.getElementById("userButton").src = 'https://i.gyazo.com/17ce1729cad3905d213a06ee107a6e90.png';
        //console.log(store);
    }
    
    function handleAll(){   
        store.changeUserStateAll();
        document.getElementById("homeButton").src = 'https://i.gyazo.com/925c86fb69ce0341fe569c6beff25caf.png';
        document.getElementById("allButton").src = 'https://safeimagekit.com/ezoimgfmt/d33wubrfki0l68.cloudfront.net/050c51f7b376da9c4aad8dfc1d875558b85d77b8/6115e/img/featureproperty/nodownload.png?ezimgfmt=rs:48x48/rscb1/ng:webp/ngcb1';
        document.getElementById("userButton").src = 'https://i.gyazo.com/17ce1729cad3905d213a06ee107a6e90.png';
        //console.log(store);
    }
    function handleUser(){
         store.changeUserStateUser();
         document.getElementById("homeButton").src = 'https://i.gyazo.com/925c86fb69ce0341fe569c6beff25caf.png';
        document.getElementById("allButton").src = 'https://i.gyazo.com/86621b0d0f86837ac3119a826eda3a77.png';
        document.getElementById("userButton").src = 'https://safeimagekit.com/ezoimgfmt/d33wubrfki0l68.cloudfront.net/050c51f7b376da9c4aad8dfc1d875558b85d77b8/6115e/img/featureproperty/nodownload.png?ezimgfmt=rs:48x48/rscb1/ng:webp/ngcb1';
        //console.log(store);
        //console.log(store);
        //store.loadIdNamePairs();
    }

    function handleCreateNewList() {
        store.createNewList();
    }
    function changeToVidPlayer(){
        setVidPlayer(true);
    }
    function changeFromVidPlayer(){
        setVidPlayer(false);
    }

    
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
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleSortedByName}>Name (A-Z)</MenuItem>
            <MenuItem onClick={handleSortedByDate}>Publish Date (Newest)</MenuItem>
            <MenuItem onClick={handleSortedByListens}>Listens (High - Low)</MenuItem>
            <MenuItem onClick={handleSortedByLikes}>Likes (High - Low)</MenuItem>
            <MenuItem onClick={handleSortedByDislikes}>Dislikes (High - Low)</MenuItem>
        </Menu>);
    

    
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
                
                {store.user === "HOME" &&<Button sx={{ width: '100%', height: '5%' }} color="primary" variant="contained" aria-label="add"
                    id="add-list-button"
                    onClick={handleCreateNewList}>
                    +
                </Button>}


            </List>;
    }
    if (!vidPlayer) {
        return (

            <div id="playlist-selector">
                <div><img id = "homeButton" src="https://i.gyazo.com/925c86fb69ce0341fe569c6beff25caf.png" onClick={(e)=>handleHome(e)}></img>
                    <img id = "allButton" src="https://i.gyazo.com/86621b0d0f86837ac3119a826eda3a77.png" onClick={(e)=>handleAll(e)}></img>
                    <img id = "userButton" src="https://i.gyazo.com/17ce1729cad3905d213a06ee107a6e90.png" onClick={(e)=>handleUser(e)}></img>
                    <input style={{display: "inline-block", marginLeft:"250px", width:"500px"}} type="text" placeholder="Search here" onChange={handleChange} value={searchInput} />
                    <img onClick = {handleProfileMenuOpen} style={{float: "right"}} src="https://i.gyazo.com/5a08a4d8c4b67862f1784b3cb14a5863.png"></img>
                    <p style={{display:"inline", float: "right"}}>Sorted by</p>
                    {sortedByMenu}
                    
                    
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
                                <div>
                                    {store.currentList && <Grid container spacing={2}>
                                        <Grid item xs={6}>
                                            <Button onClick={changeToVidPlayer}>Player</Button>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Button onClick={changeFromVidPlayer}>Comments</Button>
                                        </Grid>
                                    </Grid>}
                                    
                                    <Grid container spacing={1} direction="column">
                                        <Grid item xs={8}>
                                            
                                            {currentComment.map(e => <div>{e.name} : {e.comment}</div>)}
                                            
                                        </Grid>
                                        <Grid item xs ={4}>
                                        { store.currentList && <input id="commentSection" type="text" defaultValue="" onChange={handleCommenting} />}
                                        { store.currentList && <Button onClick={handleSubmit}>submit</Button>}
                                        </Grid>
                                    </Grid>
                                </div>
                            } 
                        </div>
                        </Grid>
                    </div>
                    
                </Grid>




            </div>)
    } else {
        return (

            <div id="playlist-selector">
                <div><img id = "homeButton" src="https://i.gyazo.com/925c86fb69ce0341fe569c6beff25caf.png" onClick={(e)=>handleHome(e)}></img>
                    <img id = "allButton" src="https://i.gyazo.com/86621b0d0f86837ac3119a826eda3a77.png" onClick={(e)=>handleAll(e)}></img>
                    <img id = "userButton" src="https://i.gyazo.com/17ce1729cad3905d213a06ee107a6e90.png" onClick={(e)=>handleUser(e)}></img>
                    <input style={{display: "inline-block", marginLeft:"250px", width:"500px"}} type="text" placeholder="Search here" onChange={handleChange} value={searchInput} />
                    <img onClick = {handleProfileMenuOpen} style={{float: "right"}} src="https://i.gyazo.com/5a08a4d8c4b67862f1784b3cb14a5863.png"></img>
                    <p style={{display:"inline", float: "right"}}>Sorted by</p>
                    {sortedByMenu}
                    
                    
                    
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
                        {store.currentList && <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <Button onClick={changeToVidPlayer}>Player</Button>
                            </Grid>
                            <Grid item xs={6}>
                                <Button onClick={changeFromVidPlayer}>Comments</Button>
                            </Grid>
                        </Grid>}
                            {store.currentList && <YouTubePlayerExample store={store} />}
                                
                            {/*store.currentList && 
                            <Grid container>
                                <Grid item xs={3}>
                                    <Button>⏪︎</Button>
                                </Grid>
                                <Grid item xs={3}>
                                    <Button>⏹︎</Button>
                                </Grid>
                                <Grid item xs={3}>
                                    <Button>⏵︎</Button>
                                </Grid>
                                <Grid item xs={3}>
                                    <Button>⏩︎</Button>
                                </Grid>

                            </Grid>*/}
                        </div>
                        </Grid>
                    </div>
                    
                </Grid>




            </div>)
    }
}

export default HomeScreen;