const pages=[...document.querySelectorAll(".page")];let current=0,startX=0,startY=0,animating=false;
pages.forEach((p,i)=>{if(!p.classList.contains("cover")&&!p.classList.contains("final-page")){const n=document.createElement("div");n.className="page-num";n.textContent=i;p.appendChild(n)}});
const counter=document.getElementById("counter"),prev=document.getElementById("prevBtn"),next=document.getElementById("nextBtn");
function render(){pages.forEach((p,i)=>{p.classList.remove("active","flipped");if(i<current)p.classList.add("flipped");else if(i===current)p.classList.add("active")});counter.textContent=`${current+1} / ${pages.length}`;prev.disabled=current===0;next.disabled=current===pages.length-1}
function flipTo(dir){
  if(animating)return;
  const newIndex=dir==="fwd"?current+1:current-1;
  if(newIndex<0||newIndex>=pages.length)return;
  animating=true;
  const animPage=dir==="fwd"?pages[current]:pages[newIndex];
  const staticPage=dir==="fwd"?pages[newIndex]:pages[current];
  staticPage.classList.add("reveal");
  animPage.classList.remove("active","flipped");
  animPage.classList.add(dir==="fwd"?"turn-fwd":"turn-back");
  function done(){
    animPage.removeEventListener("animationend",done);
    animPage.classList.remove("turn-fwd","turn-back");
    staticPage.classList.remove("reveal");
    current=newIndex;animating=false;render();
  }
  animPage.addEventListener("animationend",done,{once:true});
}
function nextPage(){flipTo("fwd")}function prevPage(){flipTo("back")}
book.addEventListener("touchstart",e=>{startX=e.changedTouches[0].screenX;startY=e.changedTouches[0].screenY},{passive:true});
book.addEventListener("touchend",e=>{let dx=e.changedTouches[0].screenX-startX,dy=e.changedTouches[0].screenY-startY;if(Math.abs(dx)>55&&Math.abs(dx)>Math.abs(dy)*1.2)(dx<0?nextPage:prevPage)()},{passive:true});
document.addEventListener("keydown",e=>{if(e.key==="ArrowRight"){nextPage()}if(e.key==="ArrowLeft"){prevPage()}});
const bgMusic=new Audio("music.m4a");bgMusic.loop=true;bgMusic.volume=.55;
function startMusic(){if(bgMusic.paused){bgMusic.play().then(()=>{musicBtn.textContent="♫"}).catch(()=>{})}}
document.getElementById("musicBtn").onclick=()=>{if(bgMusic.paused){startMusic()}else{bgMusic.pause();musicBtn.textContent="♪"}};
document.addEventListener("click",startMusic,{once:true});
document.addEventListener("touchend",startMusic,{once:true});
render();
