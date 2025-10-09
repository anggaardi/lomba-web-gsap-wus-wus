var path = "M 20 250 Q 950 250 1900 250"
var finalpath = "M 20 250 Q 950 250 1900 250"

var string = document.querySelector("#string")

string.addEventListener(".mosemove",function(dets){
    path = `M 20 250 Q ${dets.x} ${dets.y} 1900 250`;
    gsap.to ("svg path",{
        attr:{d:path},
        duration:0.3,
        ease:"power3.Out"
    })
})

string.addEventListener("mouseleave",function(){
    gsap.to("svg path",{
        after:{d:finalpath},
        duration:1.5,
        ease:"elastic.out(1,0,2)",
    })
})