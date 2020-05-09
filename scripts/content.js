const getHours=()=>{
    let hours = prompt('What Hour? (0-23)',currentHours);
    Number(hours)&&Number(hours)>23||Number(hours)<0&&(getHours())()
    return hours
}

const scheduleClick=({hours,minutes,seconds,milliseconds,Clickinterval})=>{
    let button=document.getElementsByClassName("ScheduledClickTarget");
        let currentTime=new Date();
        let currentHours=currentTime.getHours();
        let currentMinutes=currentTime.getMinutes();
        let currentSeconds=currentTime.getSeconds();
        let currentgetMilliseconds=currentTime.getMilliseconds();
        if(Number(hours)<=Number(currentHours)&&Number(minutes)<=Number(currentMinutes)&&Number(seconds)<=Number(currentSeconds)&&Number(milliseconds)<=Number(currentgetMilliseconds)){
  	// start interval to click
            var Ms=0;
            var x = setInterval(function(){ 
	            	Ms=Ms+1;
	            	if(Ms>=Clickinterval){clearInterval(x);}
	              button[0].click();
			}, 1);
	//end of interval to click
	  clearTimeout(myVar);
            document.body.removeChild(document.getElementById("bg"));
        }
        // Recursive function, keeps calling itself until it is executed
        else{
            myVar=setTimeout((()=>{
                scheduleClick({hours,minutes,seconds,milliseconds,Clickinterval});
            }),1);
        }    
}


window.oncontextmenu=(e)=>{
    window.target=e.target;
    chrome.runtime.sendMessage({
        target:"bg",
        payload:`${e.target}`
    });
}
chrome.runtime.onMessage.addListener((message)=>{
    if(message.target===true){
        let currentTime=new Date();
        let currentHours=currentTime.getHours();
        let currentMinutes=currentTime.getMinutes();
        window.target.className=window.target.className+" ScheduledClickTarget";
        let hours = prompt('What Hour? (0-23)',currentHours);
        let minutes=prompt('What minutes? (00-59)',currentMinutes);
        let seconds=prompt('What seconds? (00-59)',59);
        let milliseconds=prompt('What milliseconds? (00-1000)',900);
        let Clickinterval=prompt('What Clickinterval? (00-1000)',10);
        scheduleClick({hours:hours,minutes:minutes,seconds:seconds,milliseconds:milliseconds,Clickinterval:Clickinterval});
        let display=document.createElement('div');
        let node1 = document.createTextNode(`The element will be clicked at  ${hours}:${minutes}:${seconds}:${milliseconds}`);
        let node2=document.createElement('p');
        node2.textContent="Please do NOT close or navigate away from this page on this tab :";
        let bg=document.createElement('div');
        bg.id="bg";
        bg.style.backgroundColor="rgba(20,20,20,.5)";
        bg.style.width="100vw";
        bg.style.height="100vh";
        bg.style.position="fixed";
        bg.style.top=0;
        bg.style.bottom=0;
        bg.style.left=0;
        bg.style.right=0;
        bg.style.zIndex=999998;
        display.appendChild(node1);
        display.appendChild(node2);
        bg.appendChild(display);
        let {style}=display;
        style.display="inline-block";
        style.position="fixed";
        style.top=50+"%";
        style.right=30+"%";
        style.left=30+"%";
        style.textAlign="center";
        style.backgroundColor="#339";
        style.color="white";
        style.padding=.75+"em";
        style.paddingTop=1.75+"em";
        style.borderRadius=15+"px";
        style.zIndex=999999;
        style.fontWeight=600;
        style.boxShadow="0 0 3px 0 black"
        // display.style={
        //     display:"inline-block",
        //     position:"fixed",
        //     top:"50%",
        //     right:"30%",
        //     left:"30%",
        //     textAlign:"center"
        //     backgroundColor:"#339",
        //     color:"white",
        //     padding:".75rem",
        //     paddingTop:"1.75rem",
        //     borderRadius:"15px",
        //     zIndex:9999999,
        //     fontWeight:600,
        //     boxShadow:"0 0 3px 0 black"
        // }
        document.body.appendChild(bg);
    }
});

