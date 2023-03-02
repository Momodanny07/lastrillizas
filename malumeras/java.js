// Song data
const SongList = [
    {
        title: "Cuatro babys",
        File: "maluma-cuatro-babys-letra.mp3",
        cover: "cuatro babys.jfif",
    },

    {
        title: "Typa Girl",
        File: "Typa Girl.mp3",
        cover: "typa Girl.jfif",
    },

    {
        title: "Marinero",
        File: "maluma-marinero-letral.mp3",
        cover: "marinero.jfif",
    }
]

// Canción actual
let actualSong = null

// Capturar elementos del DOM para trabajar con JS
const songs = document.getElementById("songs")
const audio = document.getElementById("audio")
const cover = document .getElementById("cover")
const title = document.getElementById("title")
const play = document.getElementById("play")
const prev = document.getElementById("prev")
const next = document.getElementById("next")
const progress = document.getElementById("progress")
const progressContainer = document.querySelector(" .progress-container")
progressContainer.addEventListener("click", setProgress)

// Escucchar el elemento AUDIO
audio.addEventListener("timeupdate", updateProgress)

// Escuchar clicks en los controles
play.addEventListener("click", ( ) => {
    if (audio.pause) {
        playsong()
    }   else {
        pausesong()
    }
})

next.addEventListener("click", () => nextsong())
prev.addEventListener("click", () => prevsong())

// Cargar canciones  y mostrar el listado
function loadSongs() {
     SongList.forEach((song, index) => {
        console.log(index)
        //crear li
        const li = document.createElement("li")
        //crear a
        const link = document.createElement("a")
        //Hidratar a
        link.textContent = song.title
        link.href = "#"
        //Escuchar clicks
        link.addEventlistener("click",() => loadSong(index))
        //añadir a li
        li.appendChild(link)
        //añadir li a ul
        songs.appendChild(li)
     })
}

//Cargar canción seleccionada
function loadSong(songIndex) {
    if (songIndex  !== actualSong) {
      changeactiveclass(actualSong, songIndex)  
    actualSong = songIndex
     audio.src = "./audios/" + SongList[songIndex].file
     playsong()
     changecover(songIndex)
     }
}

// Actualizar barra de progreso de la canción 
function updateControls(event) {
    // Total y el actual
    const {duration, currentTime} = event.srcElement
    const percent = (currentTime / duration ) * 100
    progress.style.width = percent + "%"
}

// Hacer la barra de progreso clicable
function serProgress(event) {
    const totalWidth = this.offsetwidth
    const progressWidth = event.offsetx
    const percent = (progressWidth / totalWidth) * audio.duration
    audio.currentTime = percent
}

//Actualizar controles
function updateControls() {
    if (audio.paused) {
    play.classList.remove("fa-pause")
    play.classList.add("fa-play")

}  else {

    play.classList.add("fa-pause")
    play.classList.remove("fa-play")
}
}
//Reproducir canción
function playsong() {
    if (actualSong !== null) {
       audio.play()
    updateControls() 
    }
}

//Pausar canción
function pausesong() {
    audio.pause()
    updateControls()
}

// Cambiar clase activa
function changeactiveclass(lastIndex, newIndex) {
   const links = document.querySelectorAll("a")
    if (lastIndex !== null) {
         links[actualSong].classList.remove("active")
   }
   links[newIndex].classList.add("active")
}
// Cambiar el cover de la canción
function changecover(songIndex) {
    cover.src = "./img/" + SongList[songIndex].cover
}

//Cambiar el titulo de la canción 
function changesongtitle(songIndex) {
     title.innerText = SongList[songIndex].title
}

// Anterior canción
function prevsong() {
    if (actualSong > 0) {
        loadSong(actualSong - 1)
    } else {
        loadSong(SongList.length - 1)
    }
    
}

// Siguiente canción
function nextsong() {
    if (actualSong < SongList.length - 1) {
       loadSong(actualSong + 1) 
    } else {
        loadSong(0)
    }
     
    
}

// Lanzar siguiente canción cuando se acaba la actual
audio.addEventlistener("ended", () =>nextsong() )

//GO!
loadSongs()
