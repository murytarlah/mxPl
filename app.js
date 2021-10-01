const musicContainer = document.querySelector('.music-container');
const btn_play = document.querySelector('#play');
const btn_next = document.querySelector('#next');
const btn_rand = document.querySelector('#random');
const audio = document.querySelector('#audio');
const progress = document.querySelector('.progress-bar');
const progress_bar = document.querySelector('.progress');
const title = document.querySelector('.music-title');
const cover = document.querySelector('.music-cover img');
const time = document.querySelector('.time span')

//             song titles
const songs = ['DaBaby', 'Jockstrap', 'Kehlani'];

let songIndex = 0;

loadSong(songs[songIndex]);

// Update song details
function loadSong(song) {
  title.innerText = song;
  audio.src = `music/${song}.mp3`;
  cover.src = `images/${song}.jpg`;
}

// function to play song
function playSong() {
    musicContainer.classList.add('play');
    btn_play.querySelector('i.fas').classList.remove('fa-play');
    btn_play.querySelector('i.fas').classList.add('fa-pause');

    audio.play();
}

// function to pause song
function pauseSong() {
    musicContainer.classList.remove('play');
    btn_play.querySelector('i.fas').classList.add('fa-play');
    btn_play.querySelector('i.fas').classList.remove('fa-pause');

    audio.pause();
}


function nextSong() {
    songIndex++;
    
    if (songIndex > songs.length - 1) {
        songIndex = 0;
    }

    loadSong(songs[songIndex]);

    playSong();
}

function shuffleSong(){
    songIndex = Math.floor(Math.random() *songs.length)
    loadSong(songs[songIndex]);

    playSong();
    songIndex == 0
}

// Update progress bar
function updateProgress(e) {
    const { duration, currentTime } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
}

// update song progress using the currentTime property of the audio object
function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;

    audio.currentTime = (clickX / width) * duration;
}

// Event listeners
btn_play.addEventListener('click', () => {
  const isPlaying = musicContainer.classList.contains('play');

  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});


btn_rand.addEventListener('click', shuffleSong);

// update the time and 
audio.addEventListener('timeupdate', updateProgress);

// sets the currentTime of the song
progress_bar.addEventListener('click', setProgress);

// Song ends
audio.addEventListener('ended', nextSong);