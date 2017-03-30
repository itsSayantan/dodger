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
		gameAuthorText = "Sayantan Ghosh (github.com/itsSayantan)";

	//stage

	let stage = new createjs.Stage("gameCanvas");

	//main rectangular display

	let m_rect = new createjs.Shape();
	m_rect.graphics.beginFill("white").drawRect(0,0,w,h);

	//loading section

	let lcont = new createjs.Container();
	lcont.x=0;
	lcont.y=350;
	lcont.shadow = new createjs.Shadow("#999aaa", 0, 1, 3);

	let loadrect = new createjs.Shape();
	loadrect.graphics.beginFill("#bbbccc").drawRect(0,0,w,3);

	let loadrectfill = new createjs.Shape();
	loadrectfill.graphics.beginFill("#4db8ff").drawRect(0,0,w,3);
	loadrectfill.scaleX=0; //setting the initial width of the loading rectangular bar to 0

	//game title

	let gameTitle = new createjs.Text(gameTitleText, "30px Helvetica", "#4db8ff");
	gameTitle.x=((w/2) - (gameTitle.getMeasuredWidth()/2));
	gameTitle.y=250;
	gameTitle.shadow = new createjs.Shadow("#999aaa", 0, 1, 3);

	//game texts
	let bottomCont = new createjs.Container();
	bottomCont.x=0;
	bottomCont.y=(h-20);

	let gameVersion = new createjs.Text(gameVersionText, "10px Helvetica", "#4db8ff");
	gameVersion.x=5;
	gameVersion.y=5;

	let gameAuthor = new createjs.Text(gameAuthorText, "10px Helvetica", "#4db8ff");
	gameAuthor.x=(w - gameAuthor.getMeasuredWidth() - 5);
	gameAuthor.y=5;

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
    	callback(1);
    }

    /* Function handleCompleteLoading */
	
	function handleCompleteLoading(){
		console.log("Game loaded...");
		gameTitle.text = "Hello";
		/*stage.removeChild(gameTitle,lcont,bottomCont);*/
	}
});