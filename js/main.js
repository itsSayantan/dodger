/*

Filename: main.js
Author: Sayantan ghosh
Project url: https://github.com/itsSayantan/dodger
Author profile: https://github.com/itsSayantan

Description: Main logic of Dodger game is present in this file.

*/

$(document).ready(function(){
	/*

	--- Initialize the game
	--- Display the splashscreen

	*/

	//Declarations
	let w = 320,
		h = 480,
		gameTitleText = "Dodger",
		gameVersionText = "ver 0.1",
		gameAuthorText = "Sayantan Ghosh (github.com/itsSayantan)",
		shadowCol = "#999aaa",
		mainCol = "#0052cc",
		oCol="#777888",
		mainMenu,menuButtonStart,menuButStartText;

	//stage

	let stage = new createjs.Stage("gameCanvas");
	createjs.Touch.enable(stage);

	//main rectangular display

	let m_rect = new createjs.Shape();
	m_rect.graphics.beginFill("white").drawRect(0,0,w,h);

	//loading section

	let lcont = new createjs.Container();
	lcont.x=0;
	lcont.y=350;
	lcont.shadow = new createjs.Shadow(shadowCol, 0, 1, 3);

	let loadrect = new createjs.Shape();
	loadrect.graphics.beginFill("#bbbccc").drawRect(0,0,w,3);

	let loadrectfill = new createjs.Shape();
	loadrectfill.graphics.beginFill(mainCol).drawRect(0,0,w,3);
	loadrectfill.scaleX=0; //setting the initial width of the loading rectangular bar to 0

	//game title

	let gameTitle = new createjs.Text(gameTitleText, "30px Arial", mainCol);
	gameTitle.x=((w/2) - (gameTitle.getMeasuredWidth()/2));
	gameTitle.y=250;

	//game texts
	let bottomCont = new createjs.Container();
	bottomCont.x=0;
	bottomCont.y=(h-20);

	let gameVersion = new createjs.Text(gameVersionText, "10px Arial", oCol);
	gameVersion.x=5;
	gameVersion.y=5;

	let gameAuthor = new createjs.Text(gameAuthorText, "10px Arial", oCol);
	gameAuthor.x=(w - gameAuthor.getMeasuredWidth() - 5);
	gameAuthor.y=5;
	gameAuthor.addEventListener("click", function(e){
		e.preventDefault();
		window.location = "https://github.com/itsSayantan";
	});

	//adding to view

	bottomCont.addChild(gameVersion,gameAuthor);
	lcont.addChild(loadrect,loadrectfill);
	stage.addChild(m_rect,gameTitle,lcont,bottomCont);


	//call function 'loadGame'

	loadGame(function(amt){
		//animate the loadrectfill
		createjs.Tween.get(loadrectfill, {loop: false})
		.to({scaleX: amt}, 2000, createjs.Ease.getPowInOut(4)).call(handleCompleteLoading);
	});

	//animation presets

    createjs.Ticker.setFPS(60);
    createjs.Ticker.addEventListener("tick", stage);

    /* Function loadGame */

    function loadGame(callback){
    	/* create the main menu */
    	mainMenu = new createjs.Container();
    	mainMenu.x=0;
    	mainMenu.y=(h/2)-20;

    	menuButtonStart = new createjs.Shape();
    	menuButtonStart.graphics.beginFill(mainCol).drawRoundRect(((w/2)-40),0,80,40,5,5,5,5);
    	menuButtonStart.shadow = new createjs.Shadow(shadowCol, 0, 1, 3);

    	//add mouse event listener to menuButtonStart

    	menuButtonStart.addEventListener("mousedown", function(){
    		menuButtonStart.shadow = new createjs.Shadow(shadowCol, 0, 1, 15);			
    	});

    	menuButtonStart.addEventListener("pressup", function(){
    		menuButtonStart.shadow = new createjs.Shadow(shadowCol, 0, 1, 3);
    		setTimeout(loadMainGame,800);
    	});

    	menuButtonStartText = new createjs.Text("Start", "20px Arial", "#fff");
    	menuButtonStartText.x = ((w/2) - (menuButtonStartText.getMeasuredWidth()/2));
    	menuButtonStartText.y = (menuButtonStart.y + (menuButtonStartText.getMeasuredHeight()/2));

    	mainMenu.addChild(menuButtonStart,menuButtonStartText);

    	callback(1);
    }

    /* Function handleCompleteLoading */
	
	function handleCompleteLoading(){
		console.log("Game loaded...");
		stage.removeChild(gameTitle,lcont);

		stage.addChild(mainMenu);
	}

	function loadMainGame(){
		alert(1);
	}
});