function lenisInitialize(){
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smooth: true
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);
}

function cardHoverEffect(){
  let showingImage;
  
  document.querySelectorAll(".cnt")
  .forEach(function(cnt){

    cnt.addEventListener("mousemove", function(dets){
      document.querySelector("#cursor").children[dets.target.dataset.index].style.opacity = 1;
      showingImage = dets.target; 
      document.querySelector("#cursor").children[dets.target.dataset.index].style.transform = `translate(${dets.clientX}px, ${dets.clientY}px)`;
      showingImage.style.filter = "grayscale(1)";

      document.querySelector("#work").style.backgroundColor = "#" + dets.target.dataset.color;
    });

    cnt.addEventListener("mouseleave", function(dets){
      document.querySelector("#cursor").children[showingImage.dataset.index].style.opacity = 0;
      showingImage.style.filter = "grayscale(0)";
      document.querySelector("#work").style.backgroundColor = "#f2f2f2";
    });
  });
}

lenisInitialize();
cardHoverEffect();