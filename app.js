let mouseCircle = document.querySelector(".mouse-circle");
let talkBtn = document.querySelector("#talk");
const timeBox = document.querySelector("#time");
const workBoxes = document.querySelectorAll(".work_boxes");
const imgPlug = document.querySelector(".img-plug");
const imgIxper = document.querySelector(".img-ixperience");
const imgHudu= document.querySelector(".img-hudu");
const heroEnd = document.querySelector(".hero-end");
const headBox1H1 = document.querySelectorAll('.head_box1 h1');
const smallHeadings =document.querySelectorAll('.move-head-ele *');

let xprev1 = 0;
let yprev = 0;



window.addEventListener('load',()=>{
    heroEnd.classList.add('hero-end-show');
    headBox1H1.forEach((ele)=>{
        ele.classList.add('show-h-box-h1');
    })
    smallHeadings.forEach((ele)=>{
        ele.classList.add('move-head-ele-show');
    })
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

    var xdiff1 = Math.abs(evt.clientX - xprev1) ;
    var ydiff = Math.abs(evt.clientY - yprev) ;

    xprev1 = evt.clientX;
    yprev = evt.clientY;

    xscale = gsap.utils.clamp(0.8,1.2,xdiff1/3);
    yscale = gsap.utils.clamp(0.8,1.2,ydiff/3);
    let tipLength = mouseCircle.clientHeight/2;

    mouseCircle.style.transform = `translate( ${evt.clientX - tipLength}px, ${evt.clientY - tipLength}px ) scale(${xscale},${yscale})`;
    
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
        return `${hours} : ${minutes} AM EST`;
    }
    else{
        return `${hours} : ${minutes} PM EST`;  
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

        
        let xprev2 = 0;
        let xdiff2;

        box.addEventListener('mousemove',(evt)=>{
            // mouseCircle.style.transform = 'scale(1,1)';
            img.style.left = `${evt.clientX}px`;
            img.style.top = `${window.scrollY + evt.clientY}px`;
         
            xdiff2 = evt.clientX - xprev2;
            xprev2 = evt.clientX;
            
            let rotate = gsap.utils.clamp(-10,10,xdiff2);

            // mouseCircle.style.transition = 'translate 0s ease-out';
            mouseCircle.style.height = '2vw';
            mouseCircle.style.width = '2vw';
            mouseCircle.innerText = 'View';

            
            img.style.transform = `translate(-50%,-50%) rotateZ(${rotate}deg)`;
            


        })

   
    })

    box.addEventListener('mouseleave',()=>{

        img = box.querySelector('img');
        img.style.display = 'none';

        mouseCircle.style.transition = 'all 0.1s ease-out';
        mouseCircle.style.height = '13px';
        mouseCircle.style.width = '13px';
        mouseCircle.innerText = '';
        

    })
})