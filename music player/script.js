const musicContainer = document.querySelector('.music-container');
const prevBtn = document.querySelector('#prev');
const playBtn = document.querySelector('#play');
const nextBtn = document.querySelector('#next');
const title = document.querySelector('#title');
const cover = document.querySelector('#cover');
const audio = document.querySelector('#audio');
const progressContainer = document.querySelector('.progress-container');
const progress = document.querySelector('.progress');

const songs = ['hey', 'summer', 'ukulele'];

let songIndex = 1;

loadSong(songs[songIndex]);

//initially load song into DOM
function loadSong(song) {
    title.innerText = song;
    audio.src = `music/${song}.mp3`;
    cover.src = `images/${song}.jpg`;
}

function playSong() {
    musicContainer.classList.add('play');
    playBtn.querySelector('i.fas').classList.remove('fa-play');
    playBtn.querySelector('i.fas').classList.add('fa-pause');

    audio.play();
}

function pauseSong() {
    musicContainer.classList.remove('play');
    playBtn.querySelector('i.fas').classList.remove('fa-pause');
    playBtn.querySelector('i.fas').classList.add('fa-play');

    audio.pause();
}

function prevSong() {
    --songIndex;

    if (songIndex < 0) songIndex = songs.length - 1;

    loadSong(songs[songIndex]);

    playSong();
}

function nextSong() {
    ++songIndex;

    if (songIndex > songs.length - 1) songIndex = 0;

    loadSong(songs[songIndex]);

    playSong();
}

function showProgress(e) {
    const { currentTime, duration } = e.srcElement;

    progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
}

function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;

    audio.currentTime = (clickX / width) * duration;
}


//setting event Listeners
playBtn.addEventListener('click', () => {
    const isPlaying = musicContainer.classList.contains('play');

    if (isPlaying) pauseSong();
    else playSong();
})

//change songs
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

//progress visibility
audio.addEventListener('timeupdate', showProgress);

//set Progress
progressContainer.addEventListener('click', setProgress);

//goto next song automatically after song ended
audio.addEventListener('ended', nextSong);