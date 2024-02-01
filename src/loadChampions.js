import { loadChampionInModal } from "./modal.js";
let championsList;
const main = document.querySelector('main')

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

    for (const championName in championsList) {
      const championInfo = championsList[championName];
      writeCardInHtml(championInfo);
    };

    const cardsList = document.querySelectorAll('.card')
    addEventInCards(cardsList);


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

  cardsList.forEach(card => {
    card.addEventListener('click', () => {  
      let championNameSelected = card.classList[1];
    
      main.classList.add('goToLeft');
      openModal(championNameSelected);
    });
  });
}

async function openModal(championName) {
  const containerModal = document.querySelector('.container-modal');
  const modalDiv = document.querySelector('.modal-div');
  const championData = await getChampionData(championName);
  containerModal.innerHTML = '';
  containerModal.innerHTML += loadChampionInModal(championData, championName);

  eventInArrowReturn();
}

async function getChampionData(championId) {
  let url = `https://ddragon.leagueoflegends.com/cdn/14.2.1/data/pt_BR/champion/${championId}.json`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    const championData = data.data;
    return championData;


  } catch (error) {
      console.error('Error fetching champions list:', error);
      throw error;
  
  }
}

function closeModal() {
  const modalDiv = document.querySelector('.modal-div');
  modalDiv.classList.add('none');
}

function eventInArrowReturn() {
  let arrowReturn = document.getElementById('arrowReturn');
  arrowReturn.addEventListener('click', clickInArrow);

}

function clickInArrow() {
  closeModal();

  main.classList.remove('goToLeft');
  main.classList.add('goToRight');
  setTimeout(() => {
    main.classList.remove('goToRight');  
  }, 1001);
}


//pasiva
//https://ddragon.leagueoflegends.com/cdn/14.2.1/img/passive/Anivia_P.png
// data.passive.image.full

//https://ddragon.leagueoflegends.com/cdn/14.2.1/data/pt_BR/champion/Darius.json
//https://ddragon.leagueoflegends.com/cdn/14.2.1/img/spell/FlashFrost.png
loadChampionsList();

