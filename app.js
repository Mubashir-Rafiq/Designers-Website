let mouseCircle = document.querySelector(".mouse-circle");
let talkBtn = document.querySelector("#talk");
const timeBox = document.querySelector("#time");
const workBoxes = document.querySelectorAll(".work_boxes");
const imgPlug = document.querySelector(".img-plug");
const imgIxper = document.querySelector(".img-ixperience");
const imgHudu= document.querySelector(".img-hudu");

let xprev = 0;
let yprev = 0;

window.addEventListener('mousemove',(evt)=>{
    console.log(evt.clientY);
})

document.addEventListener('mouseleave',()=>{
    mouseCircle.style.display = 'none';
});
document.addEventListener('mouseenter',()=>{
    mouseCircle.style.display = 'block';
});

document.addEventListener("mousemove", (evt)=>{

    let xscale = 1;
    let yscale = 1;

    var xdiff = Math.abs(evt.clientX - xprev) ;
    var ydiff = Math.abs(evt.clientY - yprev) ;

    xprev = evt.clientX;
    yprev = evt.clientY;

    xscale = gsap.utils.clamp(0.8,1.3,xdiff/3);
    yscale = gsap.utils.clamp(0.8,1.3,ydiff/3);

    mouseCircle.style.transform = `translate(${evt.clientX - 5}px, ${evt.clientY - 5}px) scale(${xscale},${yscale})`;
    
    timeout = setTimeout(()=>{

        mouseCircle.style.transform = `translate(${evt.clientX - 5}px, ${evt.clientY - 5}px) scale(1,1})`;

    },100);

});




document.addEventListener('wheel', (evt)=>{

    evt.preventDefault();
    window.scrollBy({
        top : evt.deltaY ,
        behavior : "smooth"
    });

},{passive : false});


function formatTime(hours,minutes){

    let amPm = false;

    hours = hours % 12 || 12 ;
    minutes = minutes < 10 ? '0' + minutes : minutes;

    if (hours === 12){
        amPm = !amPm;
    }

    if(amPm){
        return `${hours} : ${minutes} am`;
    }
    else{
        return `${hours} : ${minutes} pm`;  
    }
    
}

function displayTime(){

    let time =  new Date();
    let hours = time.getHours();
    let min = time.getMinutes();

    timeBox.innerText = formatTime(hours,min);

}

displayTime();
setInterval(displayTime,60000);

let img;
workBoxes.forEach((box,index)=>{


    box.addEventListener('mouseenter',(evt)=>{

        img = box.querySelector('img');
        img.style.display = 'block';

        // console.log(evt.clientX);

        // const height = img.offsetHeight * 2;
        // const width = img.offsetWidth * 0.5;

        // const boxTop = box.getBoundingClientRect().top;
        // const boxHeight = box.getBoundingClientRect().bottom;

        // mouseY1 = boxTop - evt.clientY;
        // mouseY2 = boxHeight - evt.clientY;

        box.addEventListener('mousemove',(evt)=>{
            img.style.transform = `translate(-50%,-50%)`;
            img.style.left = `${evt.clientX}px`;
            //     console.log(evt.clientX,img.style.left);
            img.style.top = `${window.scrollY + evt.clientY}px`;
            // console.log(evt.clientY,img.style.top);

        })

   
    })

    box.addEventListener('mouseleave',()=>{

        img = box.querySelector('img');
        img.style.display = 'none';

    })
})