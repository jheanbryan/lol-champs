let championsList;

//get champions list from api
async function getChampionsList() {
  let url = 'https://ddragon.leagueoflegends.com/cdn/14.2.1/data/pt_BR/champion.json';

  try {
    const response = await fetch(url);
    const data = await response.json();
    const champions = data.data;
    return champions;

  } catch (error) {
      console.error('Error fetching champions list:', error);
      throw error;
  
  }
}

async function loadChampionsList() {
  try {
    championsList = await getChampionsList();
    //console.log(championsList);

    for (const championName in championsList) {
      const championInfo = championsList[championName];
      writeCardInHtml(championInfo);
    };

    const cardsList = document.querySelectorAll('.card')
    addEventInCards(cardsList)

  } catch (error) {
    console.error('Error:', error);
  }
}

function writeCardInHtml(championInfo) {
  const containerCards = document.querySelector('.container-cards');

  const card = `
    <div class="card ${championInfo.id}">
      <div class="div-img">
          <img src="https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${championInfo.id}_0.jpg" alt="${championInfo.name}" class="img">
      </div>

      <div class="div-champion-name">
          <span class="champion-name">${championInfo.name}</span>
      </div>
    </div>
  `;

  containerCards.innerHTML += card;
}

function addEventInCards(cardsList) {
  const main = document.querySelector('main')

  cardsList.forEach(card => {
    card.addEventListener('click', () => {  
      let championNameSelected = card.classList[1];
    
      main.classList.add('goToLeft');
      openModal(championNameSelected);
    });
  });
}

function openModal(championName) {
  console.log(championsList[championName]);
  
  const modal = `
    
  `;
}

loadChampionsList();

