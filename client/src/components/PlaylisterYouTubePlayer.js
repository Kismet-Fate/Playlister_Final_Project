import React from 'react';
import YouTube from 'react-youtube';
import { useContext, useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import { Button, useThemeProps } from '@mui/material';
export default function YouTubePlayerExample({ store }) {
    // THIS EXAMPLE DEMONSTRATES HOW TO DYNAMICALLY MAKE A
    // YOUTUBE PLAYER AND EMBED IT IN YOUR SITE. IT ALSO
    // DEMONSTRATES HOW TO IMPLEMENT A PLAYLIST THAT MOVES
    // FROM ONE SONG TO THE NEXT
    let playlist3 = [

    ];
    const [playlist, setplaylist] = useState(playlist3);
    const [songNum, setsongNum] = useState(0);
    const [songTitle, setsongTitle] = useState("");
    const [songArtist, setsongArtist] = useState("");
    console.log(store);
    useEffect(() => {
        if (store.currentList != null) {
            let playlist2 = [];
            store.currentList.songs.forEach(function (x) {
                playlist2.push(x.youTubeId);
            });
            setplaylist(playlist2);
            console.log(store.currentList);
            setsongNum(1);
            setsongTitle(store.currentList.songs[songNum].title);
            setsongArtist(store.currentList.songs[songNum].artist);
        }
    }, [store.currentList]);

    
    // THIS HAS THE YOUTUBE IDS FOR THE SONGS IN OUR PLAYLIST



    // THIS IS THE INDEX OF THE SONG CURRENTLY IN USE IN THE PLAYLIST
    let currentSong = 0;

    const playerOptions = {
        height: '390',
        width: '640',
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 0,
        },
    };

    // THIS FUNCTION LOADS THE CURRENT SONG INTO
    // THE PLAYER AND PLAYS IT
    function loadAndPlayCurrentSong(player) {
        let song = playlist[currentSong];
        player.loadVideoById(song);
        player.playVideo();
    }

    // THIS FUNCTION INCREMENTS THE PLAYLIST SONG TO THE NEXT ONE
    function incSong() {
        currentSong++;
        currentSong = currentSong % playlist.length;
    }

    let youtubePlayer = null;
    

    function onPlayerReady(event) {
        loadAndPlayCurrentSong(event.target);
        event.target.playVideo();
        youtubePlayer = event;
        console.log(youtubePlayer);
    }
    function playVideo(){
        youtubePlayer.target.playVideo();
    }
    function pauseVideo(){
        youtubePlayer.target.pauseVideo();
    }
    function forwardVideo(){
        incSong();
        let song = playlist[currentSong];
        youtubePlayer.target.loadVideoById(song);
        youtubePlayer.target.playVideo();
        //setsongNum(currentSong);
    }
    function backVideo(){
        if(currentSong != 0){
            let song = playlist[--currentSong];
            youtubePlayer.target.loadVideoById(song);
            youtubePlayer.target.playVideo();
        }
        //setsongNum(currentSong);
    }  

    


    // THIS IS OUR EVENT HANDLER FOR WHEN THE YOUTUBE PLAYER'S STATE
    // CHANGES. NOTE THAT playerStatus WILL HAVE A DIFFERENT INTEGER
    // VALUE TO REPRESENT THE TYPE OF STATE CHANGE. A playerStatus
    // VALUE OF 0 MEANS THE SONG PLAYING HAS ENDED.
    function onPlayerStateChange(event) {
        let playerStatus = event.data;
        let player = event.target;
        if (playerStatus === -1) {
            // VIDEO UNSTARTED
            //console.log("-1 Video unstarted");
        } else if (playerStatus === 0) {
            // THE VIDEO HAS COMPLETED PLAYING
            //console.log("0 Video ended");
            incSong();
            loadAndPlayCurrentSong(player);
        } else if (playerStatus === 1) {
            // THE VIDEO IS PLAYED
            //console.log("1 Video played");
        } else if (playerStatus === 2) {
            // THE VIDEO IS PAUSED
            //console.log("2 Video paused");
        } else if (playerStatus === 3) {
            // THE VIDEO IS BUFFERING
            //console.log("3 Video buffering");
        } else if (playerStatus === 5) {
            // THE VIDEO HAS BEEN CUED
            //console.log("5 Video cued");
        }
    }

    return (
        <div><YouTube
            videoId={playlist[currentSong]}
            opts={playerOptions}
            onReady={onPlayerReady}
            onStateChange={onPlayerStateChange} />
            <div>Playlist: {store.currentList.name}</div>
            <div>Song #: {songNum}</div>
            <div>Title: {songTitle}</div>
            <div>Artist: {songArtist}</div>
            <Grid container>
                <Grid item xs={3}>
                    <Button onClick={backVideo}>⏪︎</Button>
                </Grid>
                <Grid item xs={3}>
                    <Button onClick={pauseVideo}>⏹︎</Button>
                </Grid>
                <Grid item xs={3}>
                    <Button onClick={playVideo}>⏵︎</Button>
                </Grid>
                <Grid item xs={3}>
                    <Button onClick={forwardVideo}>⏩︎</Button>
                </Grid>

            </Grid>
        </div>

    );
}