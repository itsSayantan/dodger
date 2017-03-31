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
		mainMenu,menuButtonStart,menuButStartText,githubButton,githubButtonText,
		mainGame,score,scoreText="Score: ",s=9999,gameControlsArea,leftb,leftbshape,rightb,rightbshape,exitb,exitbtext;

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
	//Initialize loadrectfillanim
	let loadrectfillanim = createjs.Tween.get(loadrectfill, {loop: false});

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
		if(amt == 1.0)
			loadrectfillanim.to({scaleX: amt}, 1000, createjs.Ease.getPowInOut(4)).call(handleCompleteLoading);
		else
			loadrectfillanim.to({scaleX: amt}, 1000, createjs.Ease.getPowInOut(4));
	});

	//animation presets

    createjs.Ticker.setFPS(60);
    createjs.Ticker.addEventListener("tick", stage);

    /* Function loadGame */

    function loadGame(callback){
    	/* create the main menu */
    	mainMenu = new createjs.Container();
    	mainMenu.x=0;
    	mainMenu.y=(h/2)-70;

    	menuButtonStart = new createjs.Shape();
    	menuButtonStart.graphics.beginFill(mainCol).drawRoundRect(((w/2)-40),0,80,40,5,5,5,5);
    	menuButtonStart.shadow = new createjs.Shadow(shadowCol, 0, 1, 3);

    	githubButton = new createjs.Shape();
    	githubButton.graphics.beginFill(mainCol).drawRoundRect(((w/2)-40),50,80,40,5,5,5,5);
    	githubButton.shadow = new createjs.Shadow(shadowCol, 0, 1, 3);

    	//Menu Button Texts

    	menuButtonStartText = new createjs.Text("Start", "bold 20px Arial", "#fff");
    	menuButtonStartText.x = ((w/2) - (menuButtonStartText.getMeasuredWidth()/2));
    	menuButtonStartText.y = (menuButtonStart.y + (menuButtonStartText.getMeasuredHeight()/2));

    	githubButtonText = new createjs.Text("Github", "bold 20px Arial", "#fff");
    	githubButtonText.x = ((w/2) - (githubButtonText.getMeasuredWidth()/2));
    	githubButtonText.y = (githubButton.y + 50 + (githubButtonText.getMeasuredHeight()/2));

    	//add mouse event listener to menuButtonStart

    	menuButtonStart.addEventListener("mousedown", function(){
    		menuButtonStart.shadow = new createjs.Shadow(shadowCol, 0, 1, 15);			
    	});

    	menuButtonStart.addEventListener("pressup", function(){
    		menuButtonStart.shadow = new createjs.Shadow(shadowCol, 0, 1, 3);
    		setTimeout(loadMainGame,800);
    	});

    	//add mouse event listener to githubButton

    	githubButton.addEventListener("mousedown", function(){
    		githubButton.shadow = new createjs.Shadow(shadowCol, 0, 1, 15);			
    	});

    	githubButton.addEventListener("pressup", function(){
    		githubButton.shadow = new createjs.Shadow(shadowCol, 0, 1, 3);
    		window.location = "https://github.com/itsSayantan/dodger";
    	});

    	mainMenu.addChild(menuButtonStart,menuButtonStartText,githubButton,githubButtonText);

    	//50% loading complete
		callback(0.5);

		/* Creating the main game assets */

		mainGame = new createjs.Container();
		mainGame.x = 10;
		mainGame.y = 10;

		//score area
		score = new createjs.Text(scoreText+s, "bold 16px Arial", shadowCol);
		score.x = 0;
		score.y = 0;

		//main game area
		mainGameArea = new createjs.Shape();
		mainGameArea.graphics.beginFill("black").drawRect(0,30,(w-20),(h-120));

		//game controls area
		gameControlsArea = new createjs.Container();
		gameControlsArea.x = 0;
		gameControlsArea.y = (h-80);

		//game controls
		leftb = new createjs.Shape();
		leftb.graphics.beginFill(mainCol).drawRoundRect(0,0,40,40,5,5,5,5);

		leftbshape = new createjs.Shape();
		leftbshape.graphics.beginFill("#fff").moveTo(30,10).lineTo(30,30).lineTo(10,20).lineTo(30,10);

		rightb = new createjs.Shape();
		rightb.graphics.beginFill(mainCol).drawRoundRect((w-60),0,40,40,5,5,5,5);

		rightbshape = new createjs.Shape();
		rightbshape.graphics.beginFill("#fff").moveTo(((w-60)+10),10).lineTo(((w-60)+30),20).lineTo(((w-60)+10),30).lineTo(((w-60)+10),10);

		exitb = new createjs.Shape();
		exitb.graphics.beginFill(mainCol).drawRoundRect(((w/2)-50),0,80,40,5,5,5,5);

		//exitbtext
		exitbtext = new createjs.Text("Exit", "bold 20px Arial", "#fff");
		exitbtext.x = ((w - exitbtext.getMeasuredWidth())/2) - 10;
		exitbtext.y = exitb.y + exitbtext.getMeasuredHeight()/2;

		/* Add event listener to buttons */
		leftb.addEventListener("click", function(){
			alert("left");
		});

		rightb.addEventListener("click", function(){
			alert("right");
		})

		exitb.addEventListener("click", function(){
			alert("exit");
		});

		//adding game controls to game controls area
		gameControlsArea.addChild(leftb,leftbshape,rightb,rightbshape,exitb,exitbtext);
		//adding to main game container
		mainGame.addChild(score,mainGameArea,gameControlsArea);

		//100% loading complete
		callback(1.0);
    }

    /* Function handleCompleteLoading */
	
	function handleCompleteLoading(){
		console.log("Game loaded...");
		stage.removeChild(gameTitle,lcont);

		stage.addChild(mainMenu);
	}

	/* Function loadmaingame */

	function loadMainGame(){
		console.log("Game Started...");
		stage.removeChild(mainMenu);

		stage.addChild(mainGame);
	}
});