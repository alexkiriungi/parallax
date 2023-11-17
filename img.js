// const track = document.querySelector('div');
// const image = document.querySelectorAll('.image');

// window.onmousedown = (e) => {
//     console.log(e.target);
//     track.dataset.onmousedown = e.clientLeft;
// }


// window.onmouseup = (e) => {
//     track.dataset.mouseDownAt = "0";
// }

// console.dir(image);
// window.onmousemove = (e) => {
//     if(track.dataset.mouseDownAt == "0") return;

//     const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientLeft,
//           maxDelta = window.innerWidth / 2;

//     const percentage = (mouseDelta / maxDelta) * -100,
//           nextPercentage = parseFloat(track.dataset.percentage) + percentage;

//     track.dataset.percentage = nextPercentage;

//     track.style.transformTranslate = '${nextPercentage}%, -50%';
    
//     track.animate({
//         transformTranslate: '{nextPercentage}%, -50%'
//     }, {duration: 1200, fill: "forwards"});

//     image.style.objectPosition = '${nextPercentage + 100}%, 50%';

//     image.animate({
//         objectPosition: '${100 + nextPercentage}%, center'
//     }, {duration: 1200, fill: "forwards"});

//     console.log(e.percentage);
//     console.log(e.prevPercentage);
// }

const track = document.getElementById("image-track");

const handleOnDown = e => track.dataset.mouseDownAt = e.clientX;

const handleOnUp = () => {
  track.dataset.mouseDownAt = "0";  
  track.dataset.prevPercentage = track.dataset.percentage;
}

const handleOnMove = e => {
  if(track.dataset.mouseDownAt === "0") return;
  
  const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
        maxDelta = window.innerWidth / 2;
  
  const percentage = (mouseDelta / maxDelta) * -100,
        nextPercentageUnconstrained = parseFloat(track.dataset.prevPercentage) + percentage,
        nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);
  
  track.dataset.percentage = nextPercentage;
  
  track.animate({
    transform: `translate(${nextPercentage}%, -50%)`
  }, { duration: 1200, fill: "forwards" });
  
  for(const image of track.getElementsByClassName("image")) {
    image.animate({
      objectPosition: `${100 + nextPercentage}% center`
    }, { duration: 1200, fill: "forwards" });
  }
}

/* -- Had to add extra lines for touch events -- */

window.onmousedown = e => handleOnDown(e);

window.ontouchstart = e => handleOnDown(e.touches[0]);

window.onmouseup = e => handleOnUp(e);

window.ontouchend = e => handleOnUp(e.touches[0]);

window.onmousemove = e => handleOnMove(e);

window.ontouchmove = e => handleOnMove(e.touches[0]);