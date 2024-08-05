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
const inputRange = document.querySelector("#load");
const value = document.querySelector(".value");
const loadBox = document.querySelector(".loading-box");
const heroNav = document.querySelector(".hero-nav");

let xprev1 = 0;
let yprev = 0;
let val = 1;



 function load(){
     
     loadBox.classList.add("show-load");

    return new Promise((resolve, reject) => {
        
        const checkVal = setInterval(()=>{
          
            if(val>100){
            
                clearInterval(checkVal);
                resolve(100);
            }
            else{
                inputRange.style.background = `linear-gradient(to right , black ${val}%, white ${val}%)`;
                value.innerText = `${val} %`;
                val++;
            }

        },30)
       
    })
}


             //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<


function countViews(){
    try{
        let viewsCount;

    let views = localStorage.getItem('views');
    
    if(views===null){
        views = 0;
    }
    else{
        viewsCount = JSON.parse(views);
    }
    viewsCount++;
    localStorage.setItem('views',JSON.stringify(viewsCount));
    console.log(viewsCount);

    // localStorage.clear();
    }
    catch(error){
        console.log();
    }

}


window.addEventListener('load',async ()=>{
  
    mouseCircle.style.display = 'block';

    const isFirstLoad = sessionStorage.getItem('hasVisitedBefore');
    
    if(isFirstLoad){

        document.body.style.backgroundColor = 'black';
        loadBox.classList.remove("show-load");
         
    }
    else{
        countViews();
        window.scrollTo(0,0);
        sessionStorage.setItem('hasVisitedBefore','true');
        await load();
        document.body.style.backgroundColor = 'black';

        window.scrollTo({
            top: window.innerHeight,
            behavior: 'smooth'
        });

    }

    heroEnd.classList.add('hero-end-show');
    headBox1H1.forEach((ele)=>{
        ele.classList.add('show-h-box-h1');
    })
    smallHeadings.forEach((ele)=>{
        ele.classList.add('move-head-ele-show');
    })

    heroNav.classList.remove("hide-nav");
    setTimeout(()=>{
        
        loadBox.classList.remove("show-load");
    },5000)
     
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