function loadChampionInModal(objectChampion, championName) {
    const champion = objectChampion[championName];

    const urlSpells = 'https://ddragon.leagueoflegends.com/cdn/14.2.1/img/spell/';
    const modal = `
        <div class="modal-div">
            <div class="arrow-return" id="arrowReturn">
                <img src="assets/img/arrow-left-solid.svg" alt="seta para esquerda" class="img">
            </div>

            <div class="div-img  div-img-modal">
                <img src="https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champion.id}_0.jpg" alt="" class="img">
            </div>

            <div class="championInfo">
                <div class="basic-info">
                    <h2>${champion.name}</h2>
                    <span>"${champion.title}"</span>
                    <p>${champion.lore}</p>
                </div>

                <div class="row-skills">
                    <div class="div-img div-img-skill passive-image">
                        <img src="https://ddragon.leagueoflegends.com/cdn/14.2.1/img/passive/${champion.passive.image.full}" alt="" class="img img-skill selected p">
                        <span class="passive-txt">Passiva</span>
                    </div>

                    <div class="div-img div-img-skill q-image">
                        <img src="${urlSpells + champion.spells[0].image.full}" alt="" class="img img-skill q">
                        <span>Q</span>
                    </div>

                    <div class="div-img div-img-skill w-image">
                        <img src="${urlSpells + champion.spells[1].image.full}" alt="" class="img img-skill w">
                        <span>W</span>
                    </div>

                    <div class="div-img div-img-skill e-image">
                        <img src="${urlSpells + champion.spells[2].image.full}" alt="" class="img img-skill e">
                        <span>E</span>
                    </div>

                    <div class="div-img div-img-skill r-image">
                        <img src="${urlSpells + champion.spells[3].image.full}" alt="" class="img img-skill r">
                        <span>R</span>
                    </div>
                </div>

                <div class="skills-info">
                    <h2 class="skill-name">Passiva</h2>
                    <p class="info-skill">${champion.passive.description}</p>
                </div>
            </div>
        </div>
    `;

    return modal
}
  
export { loadChampionInModal };