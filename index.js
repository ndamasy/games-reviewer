
const cardOne = document.querySelector('#films-wrapper');
const gamesSection = document.querySelector('.firest-section');
const infoSection = document.querySelector('.second-section');
const closeIcon = document.querySelector('.info-icon');
const loading = document.querySelector(".loading");


function cardClick(cardId) {
  getGameInfo(cardId);
  gamesSection.classList.add('d-none');
  infoSection.classList.remove('d-none')
  // TODO: fetch film details by id

};

async function getGameInfo(id) {
  if (!id) return;
  try {
    const url = 'https://free-to-play-games-database.p.rapidapi.com/api/game?id=' + id;
    const options = {
      method: 'GET',
      headers: {
        'x-rapidapi-key': '974d696889msh1e5a256613f78a8p143c57jsn0dcef5a6d309',
        'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
      }
    };

    const response = await fetch(url, options);
    const infoResult = await response.json();
   
    buildGameInfoHtml(infoResult);
  } catch (error) {
    console.error(error);
  }
}

// TODO: function fetch film details by id, and after fetch (inside try) display film details (another function)
function buildGameInfoHtml(infoResult) {
  let infoContainer = '';
  if (!infoResult) return infoContainer
  infoContainer += `   
          <div class="col-lg-4">
        <div class="info-photo">
          <img src="${infoResult.thumbnail}">
        </div>
      </div>
      <div class="col-lg-8 ">
        <div class="info-data">
          <h2>${infoResult.title}</h2>
          <p>Category : <span>${infoResult.genre}</span></p>
          <p>Platform : <span>${infoResult.platform}</span></p>
          <p>Status : <span>${infoResult.status}</span></p>
          <p>${infoResult.description}</p>
          <button>Show game</button>
        </div>
      </div>`;

  document.getElementById("details").innerHTML = infoContainer;
}




function closeSlide() {
  infoSection.classList.add('d-none');
  gamesSection.classList.remove('d-none');
}

closeIcon.addEventListener('click', closeSlide);




async function getGames() {

  const url = 'https://free-to-play-games-database.p.rapidapi.com/api/games?category=mmorpg';
  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': '974d696889msh1e5a256613f78a8p143c57jsn0dcef5a6d309',
      'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
    }
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();

    buildGameCardHtml(result);
  } catch (error) {
    console.error(error);
  }

}



function buildGameCardHtml(result) {
  let gameContainer = '';
  for (let i = 0; i < result.length; i++) {
    const colDiv = document.createElement("div");
    colDiv.classList.add("col-lg-3");

    const cardHtml = `
           <div class="first-game-col">
             <div class="card card-one" data-id="${result[i].id}">
               <img src="${result[i].thumbnail}">
               <div class="card-body">
                 <div class="first-card-body-section d-flex justify-content-between align-items-center">
                   <div class="card-left-header">
                     <h5 class="card-title text-white">${result[i].title}</h5>
                   </div>
                   <div class="card-right-header">
                     <h5>Free</h5>
                   </div>
                 </div>
                 <p class="card-text"> ${result[i].short_description}</p>
                 <div class="card-foter d-flex justify-content-between align-items-center">
                   <div class="left-foter ">
                     <h4>${result[i].genre}</h4>
                   </div>
                   <div class="right-foter ">
                     <h4>${result[i].platform}h4>
                   </div>
                 </div>
               </div>
             </div>
          
           </div>
     `;
    colDiv.innerHTML = cardHtml;
    gameContainer += colDiv.outerHTML;
  }
  cardOne.innerHTML = gameContainer;
  document.querySelectorAll(".card-one").forEach(card => card.addEventListener("click", function (e) {
    cardClick(card.dataset.id);
  }, false));
}
getGames();




async function linkDetails(category) {
  
  loading.classList.remove("d-none");
  const url = `https://free-to-play-games-database.p.rapidapi.com/api/games?category=${category}`;
  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': '974d696889msh1e5a256613f78a8p143c57jsn0dcef5a6d309',
      'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
    }
  };

  try {
    const response = await fetch(url, options);
    const detailsResult = await response.json();
   
    buildGameCardHtml(detailsResult)
    loading.classList.add("d-none");
  } catch (error) {
    console.error(error);
  }
}


document.querySelectorAll('.nav-link').forEach(link => link.addEventListener("click", function (e) {
  linkDetails(e.target.innerText.toLowerCase())
  link.classList.add('active');
  document.querySelector('.active').classList.remove('active')

 
}))

window.addEventListener('scroll' ,function(){
  let nav=document.querySelector('.first-section-nav');
  if(window.scrollY > 0){
    nav.classList.add('sticky');
   
  }else{
    nav.classList.remove('sticky');
  }
 
})


