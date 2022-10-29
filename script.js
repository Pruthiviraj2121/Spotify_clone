console.log("Welcome to spotify");

// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio('songs1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let songs = [
  {songName:"7 Rings", filePath:"songs1.mp3",coverPath:"7rings.jpeg"},
  {songName:"Unstoppable", filePath:"songs2.mp3",coverPath:"sia-unstoppable.jpeg"},
  {songName:"Let Me Down", filePath:"songs3.mp3",coverPath:"let me down slowly.jpeg"},
  {songName:"I Was Never There", filePath:"songs4.mp3",coverPath:"i_was_never_there.jpeg"},
  {songName:"Hymn For The Weekend", filePath:"songs5.mp3",coverPath:"hymn_for.jpeg"},
  {songName:"Lift Me Up", filePath:"songs6.mp3",coverPath:"lift_me_up.jpeg"},
  {songName:"Hate Me", filePath:"songs7.mp3",coverPath:"hate_me.jpeg"}
]
songItems.forEach((element, i)=>{
  element.getElementsByTagName("img")[0].src = songs[i].coverPath;
  element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
})
//audioElement.play();

//Handle play/pause click
masterPlay.addEventListener('click', ()=>{
  if(audioElement.paused || audioElement.currentTime<=0){
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
    gif.style.opacity = 1;
  } 
  else{
    audioElement.pause();
    masterPlay.classList.remove('fa-circle-pause');
    masterPlay.classList.add('fa-circle-play');
    gif.style.opacity = 0;
  }
})
// Listen to Events
audioElement.addEventListener('timeupdate', ()=>{
  // Update Seekbar
  progress = parseInt((audioElement.currentTime/audioElement.duration)* 100);
  myProgressBar.value = progress;
})
myProgressBar.addEventListener('change', ()=>{
  audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

const makeAllPlays = ()=>{
  Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.classList.add('fa-circle-play');
    element.classList.remove('fa-circle-pause');
  })
}
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
  element.addEventListener('click',(e)=>{
    console.log(e.target);
    makeAllPlays();
    songIndex = parseInt(e.target.id);
    e.target.classList.remove('fa-circle-play');
    e.target.classList.add('fa-circle-pause');
    audioElement.src =`songs${songIndex}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
  })
})

document.getElementById('next').addEventListener('click', ()=>{
  if(songIndex>=7){
    songIndex=0
  }
  else{
      songIndex += 1;
  }
  audioElement.src =`songs${songIndex}.mp3`;
  masterSongName.innerText = songs[songIndex].songName;
  audioElement.currentTime = 0;
  audioElement.play();
  masterPlay.classList.remove('fa-circle-play');
  masterPlay.classList.add('fa-circle-pause');
})
document.getElementById('previous').addEventListener('click', ()=>{
  if(songIndex<0){
    songIndex=0
  }
  else{
      songIndex -= 1;
  }
  audioElement.src =`songs${songIndex}.mp3`;
  masterSongName.innerText = songs[songIndex].songName;
  audioElement.currentTime = 0;
  audioElement.play();
  masterPlay.classList.remove('fa-circle-play');
  masterPlay.classList.add('fa-circle-pause');
})