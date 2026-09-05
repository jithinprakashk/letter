const pages=[...document.querySelectorAll(".page")];let current=0,startX=0,startY=0;
const counter=document.getElementById("counter"),prev=document.getElementById("prevBtn"),next=document.getElementById("nextBtn");
function render(){pages.forEach((p,i)=>{p.classList.remove("active","flipped");if(i<current)p.classList.add("flipped");else if(i===current)p.classList.add("active")});counter.textContent=`${current+1} / ${pages.length}`;prev.disabled=current===0;next.disabled=current===pages.length-1}
function nextPage(){if(current<pages.length-1){current++;render()}}function prevPage(){if(current>0){current--;render()}}
book.addEventListener("touchstart",e=>{startX=e.changedTouches[0].screenX;startY=e.changedTouches[0].screenY},{passive:true});
book.addEventListener("touchend",e=>{let dx=e.changedTouches[0].screenX-startX,dy=e.changedTouches[0].screenY-startY;if(Math.abs(dx)>55&&Math.abs(dx)>Math.abs(dy)*1.2)(dx<0?nextPage:prevPage)()},{passive:true});
document.addEventListener("keydown",e=>{if(e.key==="ArrowRight"){nextPage()}if(e.key==="ArrowLeft"){prevPage()}});
const bgMusic=new Audio("music.m4a");bgMusic.loop=true;bgMusic.volume=.55;
document.getElementById("musicBtn").onclick=()=>{if(bgMusic.paused){bgMusic.play().catch(()=>{});musicBtn.textContent="♫"}else{bgMusic.pause();musicBtn.textContent="♪"}};
render();