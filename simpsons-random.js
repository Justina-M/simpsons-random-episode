// Seasons and number of episodes in each season :
const simpsons = {
    // season: number of episodes in this seasons
    6: 25,
    7: 25,
    8: 25,
    9: 25,
    10: 23,
    11: 22,
    12: 21,
    13: 22,
    14: 22,
    15: 22,
    16: 21,
    17: 22,
    18: 22,
    19: 20,
    20: 21,
    21: 23,
    22: 22,
    23: 22,
    24: 22,
    25: 22,
    26: 22,
    27: 22,
    28: 21,
    29: 21,
    30: 23
}

// CREATE EPISODES SLOT MASHINE :
const slotsPerReel = 10;
// radius = Math.round((panelWidth / 2) / Math.tan(Math.PI / slotsPerReel)) :
const reelRadius = Math.round((100 / 2) / Math.tan(Math.PI / slotsPerReel)) - 1;

function createSlots(ring) {
    let slotAngle = 360 / slotsPerReel;
    
    for (let i = 0; i < slotsPerReel; i++) {
        let slot = document.createElement('div');
        slot.className = 'slot';
        
        // create and asign transform for this slot :
        let transform = `rotateX(${slotAngle * i}deg) translateZ(${reelRadius}px)`;
        
        slot.style.transform = transform;
        
        // add the number to the slot :
        $(slot).append(`<p>${i}</p>`);
        
        // add slot to the ring :
        ring.append(slot);
    }
}


// CALCULATE RANDOM EPISODE :
let randomEpisode = {};

function calcEpisode() {
    const numberOfSeasons = Object.keys(simpsons).length;
    const firstSeason = Number(Object.keys(simpsons)[0]);
    
    let season = parseInt(Math.random() * numberOfSeasons) + firstSeason;
        
    let maxEpisodes = simpsons[season.toString()];
    
    let episode = parseInt(Math.random() * maxEpisodes) + 1;
    
    console.log(`Season: ${season}, episode: ${episode}`);
    
    return randomEpisode = {
        season: season,
        episode: episode
    }
}

console.log(randomEpisode);


// CREATE SPINNING ANIMATION :
function spin(timer) {
    
    // SEASON : 
    let season = randomEpisode.season.toString().split(''); // array
        
        if (season.length === 1) {
            season = ['0', season[0]];
        }
    
        console.log(season);
    
    // looping through rings with season :
    for (let i = 1; i < 3; i++) {
        
        $(`#stage1 #ring${i}`).css('animation', '');
        
        setTimeout(function() {
            $(`#stage1 #ring${i}`).css('animation', `back-spin 1s, spin-${season[i-1]} ${timer + i * 0.4}s`).attr('class', `ring spin-${season[i-1]}`);  
        }, 10);
    }
    
    // EPISODE :
    let episode = randomEpisode.episode.toString().split(''); // array
    
    if (episode.length === 1) {
            episode = ['0', episode[0]];
        }
    
        console.log(episode);
    
    // looping through rings with episode :
    for (let i = 1; i < 3; i++) {
        
        $(`#stage2 #ring${i}`).css('animation', '');
        
        setTimeout(function() {
            $(`#stage2 #ring${i}`).css('animation', `back-spin 1s, spin-${episode[i-1]} ${timer + i * 0.9}s`).attr('class', `ring spin-${episode[i-1]}`);  
        }, 10);
    }
}


$(document).ready(function() {
    // create slots :
    createSlots($('#stage1 #ring1'));
    createSlots($('#stage1 #ring2'));
    
    createSlots($('#stage2 #ring1'));
    createSlots($('#stage2 #ring2'));
    
    // button :
    $('.spin').on('click', function() {
        // calculate random episode :
        calcEpisode();
        
        // spin the reel :
        let timer = 2;
        spin(timer);
    });
});


