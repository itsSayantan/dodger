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
		enemyCol = "#ff0000",
		oCol="#777888",
		soundID,
		mainMenu,menuButtonStart,menuButStartText,githubButton,githubButtonText,
		mainGame,score,scoreText="Score: ",s=0,
		player,
		max=280,min=10,gameInt,
		enemyBottomVel=600,enemyGenTime=600,
		gameover,gameoverText="Game Over. Refresh to play again";

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
    	menuButtonStart.graphics.beginFill(mainCol).drawRect(((w/2)-40),0,80,40);
    	menuButtonStart.shadow = new createjs.Shadow(shadowCol, 0, 1, 3);

    	githubButton = new createjs.Shape();
    	githubButton.graphics.beginFill(mainCol).drawRect(((w/2)-40),50,80,40);
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
		score = new createjs.Text(scoreText+s, "14px Arial", oCol);
		score.x = 0;
		score.y = 0;

		//main game area
		mainGameArea = new createjs.Shape();
		mainGameArea.graphics.beginFill("white").drawRect(0,30,(w-20),(h-80));
		mainGameArea.shadow = new createjs.Shadow(shadowCol, 0, 0, 3);

		//create the player
		player = new createjs.Shape();
		player.graphics.beginFill(mainCol).drawRect(0,(h-80),20,20);
		player.shadow = new createjs.Shadow(shadowCol, 0, 0, 5);

		//set x-position of the player to the middle of the game area
		player.x=(w/2) - 20;

		//gameover
		gameover = new createjs.Text(gameoverText, "16px Arial", mainCol);
		gameover.x = (w/2) - (gameover.getMeasuredWidth()/2) - 10;
		gameover.y = 50;

		//adding to main game container
		mainGame.addChild(score,mainGameArea,player);

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


		//listen to keyboard events

		$(document).on("keydown", function(e){
			//not disabling the reset functionality
			if(e.keyCode != 116){
				e.preventDefault();
				let k = e.keyCode;

				if(k == 37){
					console.log("Move left");
					
					if(player.x>=10){
						let newX = player.x - 10;
						createjs.Tween.get(player, {loop: false})
						.to({x:newX}, 10, createjs.Ease.getPowInOut(1));
					}else{
						console.log("cannot move to the left");
					}
				}else if(k == 39){
					console.log("Move right");

					if(player.x <= 270){
						let newX = player.x + 10;
						createjs.Tween.get(player, {loop: false})
						.to({x:newX}, 10, createjs.Ease.getPowInOut(1));
					}else{
						console.log("cannot move to the right");
					}
				}
			}
		});

		//Enemy generation and animation logic

		gameInt = setInterval(function(){
			//generate new enemies
			let enew = new createjs.Shape();

			enew.graphics.beginFill(enemyCol).drawRect(0,0,20,20);
			enew.shadow = new createjs.Shadow(shadowCol, 0, 0, 5);

			//set the position of this newly created enemy
			p = getEnemyPos();

			enew.x = p;
			enew.y = 40;

			//add this new enemy to the mainGame
			mainGame.addChild(enew);

			//animate this new enemy to the bottom

			createjs.Tween.get(enew, {loop: false})
			.to({y: (h-80)}, enemyBottomVel, createjs.Ease.getPowInOut(4)).call(enemyBottom);
		},enemyGenTime);
	}

	/* Function getEnemyPos */

	function getEnemyPos(){
		return (Math.floor(Math.random() * (max-min+1) + min));
	}

	/* Function enemyBottom */

	function enemyBottom(){
		const diff = Math.abs(player.x - this.x);
		if(diff <= 19){
			console.log("Collision!!!");
			clearInterval(gameInt);
			mainGame.removeChild(mainGameArea,player,this);
			mainGame.addChild(gameover);
		}else{
			//remove the current enemy
			mainGame.removeChild(this);
			++s;
			score.text = scoreText+s;
		}
	}

});