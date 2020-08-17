const input = document.getElementById("input");
const search = document.querySelector(".search-btn");
const result = document.getElementById("result")

search.addEventListener("click", function(){
   getResult(input.value)
  
})

function getResult(){
    fetch(`https://api.lyrics.ovh/suggest/${input.value}`)
    .then(song => song.json())
    .then(data => show(data));
}

function show(data){
    console.log(data);
    for (let i = 0; i < 10; i++) {
         result.innerHTML +=  
                    `<div class="single-result row align-items-center my-3 p-3">
                          <div class="col-md-9 col-7">
                                  <h3 class="song-title">${data.data[i].title}</h3>
                                 <p class="author-name lead">Album By <span class="artist-name">${data.data[i].artist.name}</span></p>
                                 <img src="${data.data[i].album.cover_small}"/>
                                 <a class="btn btn-warning ml-3" href="${data.data[i].preview}">Play song</a>
                             </div>
                            <div class="col-md-3 col-5">
                            <button class="btn btn-success lyric-btn" data-artist="${data.data[i].artist.name}" data-title="${data.data[i].title}">Get Lyrics</button>
                            </div>
                    </div>`;
    }
}    


    async function getLyrics(artist , songTitle){
    const res = await fetch(`https://api.lyrics.ovh/v1/${artist}/${songTitle}`);
    const data = await res.json();
    const lyrics = data.lyrics;
    

    if(lyrics == undefined){
        result.innerHTML = `
    <div class="single-lyrics text-center">
    
    <h2 class="text-success mb-4">${artist} - ${songTitle}</h2>
    <pre class="lyric"> SORRY , GO PREMIUM VERSION , </br>WE ARE USE A FREE API :) ;
    </pre>
        <h4 class="text-info">Again click to search button , if you have done </h4>
    
    </div>
    `;
    }
    
    else{
        result.innerHTML = `
    <div class="single-lyrics text-center">
    
    <h2 class="text-success mb-4">${artist} - ${songTitle}</h2>
    <pre class="lyric">${lyrics}</pre>
        <h4 class="text-info">Again click to search button , if you have done </h4>
    
    </div>
    `;
    }
    
}

    result.addEventListener('click' , e => {
        const clickedItem = e.target ;
        if(clickedItem.tagName === "BUTTON"){
            const artist = clickedItem.getAttribute('data-artist');
            const songTitle = clickedItem.getAttribute('data-title');
            console.log(artist , songTitle);

            getLyrics(artist , songTitle);
        }
    })