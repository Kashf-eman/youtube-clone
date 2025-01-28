var videoCardContainer = document.querySelector(".container")
var menuIcon = document.querySelector('.menu-icon');
var sidebar = document.querySelector('.sidebar');
var fil=document.querySelector(".filters");
var container = document.querySelector('.container');
menuIcon.onclick = function(){
    sidebar.classList.toggle('small-sidebar');
    fil.classList.toggle("small-filter")
    container.classList.toggle("large-container")   
}
let api_key = "AIzaSyAzelgXNi_GUaf1qC-VOsszIHWy5jM1_os";
let video_http = "https://www.googleapis.com/youtube/v3/search?";
let channel_http = "https://www.googleapis.com/youtube/v3/channels?";


fetch(video_http + new URLSearchParams({
   key: api_key,
   part: 'snippet',
   chart: 'mostPopular',
//    q: 'Pakistani Dramas',
   type:"video",
maxResults: 50,
   regionCode: 'PK',
   

}))
.then(res => res.json())
.then(data => {
    // console.log(data);
    data.items.forEach(item => {
       getChannelIcon(item); 
    });
    
})
.catch(err => console.log(err));


const getChannelIcon = (video_data) => {
    fetch(channel_http + new URLSearchParams({
        key: api_key,
        part: 'snippet',
        id: video_data.snippet.channelId,
    }))
.then(res => res.json())
.then(data => {
// console.log(data);
video_data.channelThumbnail = data.items[0].snippet.thumbnails.default.url;
makeVideoCard(video_data);
})
}


const makeVideoCard =(data) =>{
videoCardContainer.innerHTML +=`
 <div class="vid-list" onclick="location.href ='https://youtube.com/watch?v=${data.id.videoId}'">
  <img src="${data.snippet.thumbnails.high.url}" class="thumbnail">
        <div class="content">
            <img src="${data.channelThumbnail}"class="channel-icon" alt="">
            <div class="vid-info">
            <h4 class="title">${data.snippet.title}</h4>
           <p class="channel-name">${data.snippet.channelTitle}</p>
           
            </div>
        </div>
    </div>
`
}




const searchInp = document.querySelector(".search-bar");
const searchBtn = document.querySelector(".search-btn");
let searchLink = "https://www.youtube.com/results?search_query=";

searchInp.addEventListener("change",()=>{
    if(searchInp.value.length){
        location.href = searchLink + searchInp.value;
    }
})

