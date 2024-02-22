import { loadChampionInModal } from "./modal.js";
let championsList;
const main = document.querySelector('main');
const containerAnimation = document.querySelector('.container-animation');

const championSpells = {
  passive: null,
  q: {
    name: null,
    attribute: null
  },
  w: {
    name: null,
    attribute: null
  },
  e: {
    name: null,
    attribute: null
  },
  r: {
    name: null,
    attribute: null
  },
}
openAnimation()

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
    closeAnimation();

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
      openAnimation();
      let championNameSelected = card.classList[1];
    
      main.classList.add('goToLeft');
      openModal(championNameSelected);
    });
  });
}

async function openModal(championName) {
  const containerModal = document.querySelector('.container-modal');
  const championData = await getChampionData(championName);

  containerModal.innerHTML = '';
  containerModal.innerHTML += loadChampionInModal(championData, championName);

  eventInArrowReturn();
  loadChampionSpells(championData[championName]);
  eventInSpellsImages();

  
  setTimeout(() => {
    closeAnimation();
  }, 1001);
}

function eventInSpellsImages() {
  const passiveImage = document.querySelector('.passive-image');
  const qImage = document.querySelector('.q-image');
  const wImage = document.querySelector('.w-image');
  const eImage = document.querySelector('.e-image');
  const rImage = document.querySelector('.r-image');

  const skillName = document.querySelector('.skill-name');
  const skillDescription = document.querySelector('.info-skill');

  passiveImage.addEventListener('click', () => {
    skillName.innerHTML = 'Passiva';
    skillDescription.innerHTML = championSpells.passive;
    removeBorderInImage();
    addBorderInImage(document.querySelector('.p'));
  })

  qImage.addEventListener('click', () => {
    skillName.innerHTML = championSpells.q.name;
    skillDescription.innerHTML = championSpells.q.attribute;
    removeBorderInImage();
    addBorderInImage(document.querySelector('.q'));

  })

  wImage.addEventListener('click', () => {
    skillName.innerHTML = championSpells.w.name;
    skillDescription.innerHTML = championSpells.w.attribute;
    removeBorderInImage();
    addBorderInImage(document.querySelector('.w'));
  })

  eImage.addEventListener('click', () => {
    skillName.innerHTML = championSpells.e.name;
    skillDescription.innerHTML = championSpells.e.attribute;
    removeBorderInImage();
    addBorderInImage(document.querySelector('.e'));
  })

  rImage.addEventListener('click', () => {
    skillName.innerHTML = championSpells.r.name;
    skillDescription.innerHTML = championSpells.r.attribute;
    removeBorderInImage();
    addBorderInImage(document.querySelector('.r'));
  })

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

function loadChampionSpells(dataChampionSpells) {
  const spellsList = dataChampionSpells.spells;

  championSpells.q.name = spellsList[0].name;
  championSpells.q.attribute = spellsList[0].tooltip;

  championSpells.w.name = spellsList[1].name;
  championSpells.w.attribute = spellsList[1].tooltip;

  championSpells.e.name = spellsList[2].name;
  championSpells.e.attribute = spellsList[2].tooltip;

  championSpells.r.name = spellsList[3].name;
  championSpells.r.attribute = spellsList[3].tooltip;

  championSpells.passive = dataChampionSpells.passive.description;
}

function removeBorderInImage() {
  const arrayImages = document.querySelectorAll('.img-skill');

  arrayImages.forEach((element, index) => {
    if (element.className.includes('selected')) {
      element.classList.remove('selected');
    }
  });
}

function addBorderInImage(element) {
  element.classList.add('selected');
}

function openAnimation() {
  containerAnimation.classList.add('flex');
  containerAnimation.classList.add('animationOpacity');
}

function closeAnimation() {
  containerAnimation.classList.remove('flex');
  containerAnimation.classList.remove('animationOpacity');
}


//pasiva
//https://ddragon.leagueoflegends.com/cdn/14.2.1/img/passive/Anivia_P.png
// data.passive.image.full

//https://ddragon.leagueoflegends.com/cdn/14.2.1/data/pt_BR/champion/Darius.json
//https://ddragon.leagueoflegends.com/cdn/14.2.1/img/spell/FlashFrost.png
loadChampionsList();
