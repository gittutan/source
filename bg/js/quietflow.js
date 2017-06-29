
$.fn.quietflow = function(attributes){

	// Containing element
	var $element = this;
	var $limitX = $element.width();
	var $limitY = $element.height();

	// Remove quietflow	
	$("#quietflow").remove();

	// Defaults
	var theme = "starfield";
	var z_Index = -1000;
	if (attributes != undefined){
		if (attributes.z_Index != undefined){
			z_Index = attributes.z_Index;
		}
	}

	var backgroundCol,
		speed,
		lineGlow,
		specificColors = [],
		transparent = true,
		squareSize = 10,
		maxRed = 255,
		maxGreen = 255,
		maxBlue = 255,
		mainRadius = 20,
		miniRadii = 30,
		circleCol = "#6F6F6F",
		maxRadius = 40,
		bounceSpeed = 50,
		bounceBallCount = 50,
		centerX = $limitX/2,
		centerY = $limitY/2,
		lines = 50,
		primary = "#D4145A",
		accent = "#FBB03B",
		starSize = 3,
		starColor = "#fff",
		triangles = 50,
		boxCount = 400,
		maxBoxSize = 80;

	// Create canvas and set attributes
	var canvas = document.createElement("canvas");
	var ctx = canvas.getContext("2d");
	canvas.id = "quietflow";
	canvas.width = $limitX;
	canvas.height = $limitY;
	canvas.style.zIndex = z_Index;
	canvas.style.position = "absolute";
	canvas.style.top = 0;

	// Attach canvas to element
	var $checkValidID = $(this).attr("id");

	if (!($checkValidID == undefined)){
		var appendObject = document.getElementById($checkValidID);
		appendObject.appendChild(canvas);
	} else {
		document.body.appendChild(canvas);
	}

	theme = "starfield";
	if (attributes.starColor != undefined) starColor = attributes.starColor;
	if (attributes.starSize != undefined) starSize = attributes.starSize;

	attributes.speed != undefined ? speed = attributes.speed : speed = 100;
	
	function init(){

			var starData = [];

			for (var i = 0; i < 700; i++){
				starData.push([Math.random() * $limitX*2 - $limitX, Math.random() * $limitY, Math.random() * starSize, Math.ceil(Math.random() * 5)]);
			}

			setTimeout(starfieldTimed, speed);

			function starfieldTimed(){

				var gradient = ctx.createLinearGradient(0, 0, $limitX/2, $limitY);
				gradient.addColorStop(0, "#f7fafc");
				gradient.addColorStop(1, "#f7fafc");

				ctx.fillStyle = gradient;
				ctx.fillRect(0, 0, $limitX, $limitY);

				for (var i = 0; i < starData.length; i++){

					var currentStar = starData[i],
						X = 0,
						Y = 1,
						RADIUS = 2,
						SPEED = 3;

					currentStar[X] += currentStar[SPEED];

					ctx.beginPath();
					ctx.fillStyle = starColor;
					ctx.arc(currentStar[X], currentStar[Y], currentStar[RADIUS], 0, Math.PI * 2, true);
					ctx.shadowColor = "#fff";
					ctx.shadowBlur = 20;
					ctx.closePath();
					ctx.fill();

					// Create new star
					if (currentStar[X] > $limitX){
						starData.splice(i, 1);
						starData.unshift([Math.random() * $limitX/4 - $limitX/4, Math.random() * $limitY, Math.random() * starSize, Math.ceil(Math.random() * 5)]);
					}

				}
				setTimeout(starfieldTimed, speed);
			}
	}

	init();
}
