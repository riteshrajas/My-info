

/**
 * This code runs on page load to handle initial UI state.
 * It hides the splash screen and shows the main content after a 2 second delay.
 * It also checks for cached login credentials and populates the username/password inputs if found.
*/
window.addEventListener('load', function () {
	const splashScreen = document.getElementById('splash-screen');
	const content = document.getElementById('content');
	setTimeout(function () { splashScreen.style.display = 'none'; content.style.display = 'block'; }, 2000);
	const cachedUsername = getCookie('username');
	const cachedPassword = getCookie('password');

	if (cachedUsername && cachedPassword) {
		const usernameInput = document.getElementById('Username');
		usernameInput.value = cachedUsername;
		const passwordInput = document.getElementById('Password');
		passwordInput.value = cachedPassword;

	}
});

/**
 * Sleep function to pause execution for a given number of milliseconds.
 * @param {number} ms - Number of milliseconds to pause for.
 */
function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}


/**
 * Connect_Clicked handles user login and authentication.
 * 
 * It takes the username and password values from the input fields, 
 * calls the Google Apps Script API to authenticate, 
 * and handles the response.
 *
 * On success:
 * - Saves username and password in cookies
 * - Shows main content
 * - Gets latest user info
 * 
 * On failure:
 * - Shows error message
 */
function Connect_Clicked() {
	var submit = document.getElementById("connect");
	submit.innerText = "Connecting Profile... ( > 5 seconds)";
	const username = document.getElementById('Username').value;
	const password = document.getElementById("Password").value;

	if (username == "201" && password == "password") { alert("Welcome admin"); }

	fetch("https://script.google.com/macros/s/AKfycbxcd9n_6AjNtbCaOe1RE7dB6OBngy68wXKUzFJxRKrLbzd__tyKqXD1Izqj_QIx_lPmew/exec?id=" + username + "&pass=" + password + "&connect=true")
		.then(response => response.json())
		.then(data => {
			const datasheet = document.getElementById("ruleover");
			const content = document.getElementById('content');
			const bridge = document.getElementById('content-ruleover-merger');


			content.style.display = 'none';
			datasheet.style.display = 'none';
			bridge.style.display = 'block';
			console.log(data);

			if (data['Correct'] == "true") {
				setCookie('username', username, { expires: 7 });
				setCookie('password', password, { expires: 7 });
				addGame();

				GetLatestInfo(username, password)

			}


			if (data['Correct'] == "false") {
				var Sucess_or_Fail = document.getElementById('Sucess/fail_tablet');
				var condition = document.getElementById('condense');
				Sucess_or_Fail.innerText = "Failed!";
				condition.innerText = "Wrong Password or User ID";
				// close()
			}


		})

		.catch(error => {
			console.error("Error fetching data: " + error);
			alert("Hiya, We have a promblem with the Gserevers (I think), \n please Send a message to Ritesh +1 (248) 805-4935")
		});

}


/**
 * Fetches the latest user info from the server and updates the UI with the data.
 * 
 * @param {string} username The user's username
 * @param {string} password The user's password
 */
function GetLatestInfo(username, password) {
	sleep(1000).then(() => {
		fetch("https://script.google.com/macros/s/AKfycbxcd9n_6AjNtbCaOe1RE7dB6OBngy68wXKUzFJxRKrLbzd__tyKqXD1Izqj_QIx_lPmew/exec?id=" + username + "&pass=" + password + "&connect=false")
			.then(response => response.json())
			.then(data => {
				// console.log(data);
				const datasheet = document.getElementById("ruleover");
				const content = document.getElementById('content');
				const bridge = document.getElementById('content-ruleover-merger');


				content.style.display = 'none';
				datasheet.style.display = 'block';
				bridge.style.display = 'none';

				var Teamer = document.getElementById('Teamrole');
				var Signed_Points_text = document.getElementById('Signed_Points_text');
				var General_requirements = document.getElementById('General_Requirements');
				var Attendance = document.getElementById('AttendanceProgress');
				var Funds = document.getElementById('Fund_raised');
				var Text_attendance = document.getElementById('Attendance_text');
				var Text_General_requirements = document.getElementById('General_Requirements_text');
				var Text_Funds = document.getElementById('textfunds');
				var Completed_points = document.getElementById('Signed_Points');
				var Status_Check = document.getElementById('Status_Check');
				var P_C_text = document.getElementById('P&C_text');
				var Profile_Security = document.getElementById('Profile_Security');

				Teamer.innerText = data['TEAM_ROLE'] + '!';
				Signed_Points_text.innerText = ('Signed Up Points: ' + roundToPlace((data['SPECIAL_PROJECT_POINTS_COMPLETED'] / data['SIGNED_UP_POINTS']) * 100, 2) + "%");;
				General_requirements.setAttribute("value", data['GENERAL_REQUIREMENTS_PERCENTAGE']);
				Attendance.setAttribute("value", data['ATTENDANCE_PERCENTAGE']);
				Funds.setAttribute("value", data['FUNDRAISING_PERCENTAGE']);
				Completed_points.setAttribute("value", data['SPECIAL_PROJECT_POINTS_COMPLETED']);
				Completed_points.setAttribute("max", data['SIGNED_UP_POINTS']);
				Text_General_requirements.innerText = ('General Requirements: ' + data['GENERAL_REQUIREMENTS_PERCENTAGE'] + "%");
				Text_attendance.innerText = ('Attendance: ' + data['ATTENDANCE_PERCENTAGE'] + "%");
				Text_Funds.innerText = ('Fundraising: ' + data['FUNDRAISING_PERCENTAGE'] + "%");
				Status_Check.innerText = (() => {
					switch (data['STATUS_CHECK']) {
						case " ":
							return "No Status Check";
						default:
							return data['STATUS_CHECK'];
					}
				})();
				P_C_text.innerText = ("Your P & C Score is " + data['P_C_SCORE'])
				Profile_Security.innerText = data['PROFILE_SEC']

				for (const key in data) {
					if (data.hasOwnProperty(key)) {
						setCookie(key, data[key], { expires: 2 });
					}
				}
			})
			
	})
	Check_for_Browser_Support()
}

/**
 * Retrieves user data from cookies and updates the UI 
 * with the latest values.
 * 
 * Gets DOM elements by ID and updates their values and text 
 * based on saved cookie values. Cookies store the latest data 
 * for the user.
 * 
 * The function handles displaying status checks, points completed,
 * attendance, funds raised, etc. in the UI.
*/
function addGame() {
	const datasheet = document.getElementById("ruleover");
	const content = document.getElementById('content');
	const bridge = document.getElementById('content-ruleover-merger');

	content.style.display = 'none';
	datasheet.style.display = 'block';
	bridge.style.display = 'none';

	// Retrieve values from cookies
	var Teamer = document.getElementById('Teamrole');
	var Signed_Points_text = document.getElementById('Signed_Points_text');
	var General_requirements = document.getElementById('General_Requirements');
	var Attendance = document.getElementById('AttendanceProgress');
	var Funds = document.getElementById('Fund_raised');
	var Text_attendance = document.getElementById('Attendance_text');
	var Text_General_requirements = document.getElementById('General_Requirements_text');
	var Text_Funds = document.getElementById('textfunds');
	var Completed_points = document.getElementById('Signed_Points');
	var Status_Check = document.getElementById('Status_Check');
	var P_C_text = document.getElementById('P&C_text');
	var Profile_Security = document.getElementById('Profile_Security');

	Signed_Points_text.innerText = ('Signed Up Points: ' + roundToPlace((getCookie('SPECIAL_PROJECT_POINTS_COMPLETED') / getCookie('SIGNED_UP_POINTS')) * 100, 2) + "%");;
	Teamer.innerText = getCookie('TEAM_ROLE') + '!' + " Fetching Latest Data";
	General_requirements.setAttribute("value", getCookie('GENERAL_REQUIREMENTS_PERCENTAGE'));
	Attendance.setAttribute("value", getCookie('ATTENDANCE_PERCENTAGE'));
	Funds.setAttribute("value", getCookie('FUNDRAISING_PERCENTAGE'));
	Text_General_requirements.innerText = ('General Requirements: ' + getCookie('GENERAL_REQUIREMENTS_PERCENTAGE') + "%");
	Text_attendance.innerText = ('Attendance: ' + getCookie('ATTENDANCE_PERCENTAGE') + "%");
	Text_Funds.innerText = ('Fundraising: ' + getCookie('FUNDRAISING_PERCENTAGE') + "%");
	Completed_points.setAttribute("value", getCookie('SPECIAL_PROJECT_POINTS_COMPLETED'));
	Completed_points.setAttribute("max", getCookie('SIGNED_UP_POINTS'));
	Status_Check.innerText = (() => {
		switch (getCookie('STATUS_CHECK')) {
			case " ":
				return "Mybad, no messages here";
			default:
				return getCookie('STATUS_CHECK');
		}
	})();
	P_C_text.innerText = ("Your P & C Score is " + getCookie('P_C_SCORE'))
	Profile_Security.innerText = getCookie('PROFILE_SEC')

}

/**
 * Rounds a number to a certain number of decimal places.
 * 
 * @param {number} number - The number to round.
 * @param {number} place - The number of decimal places to round to.
 * @returns {number} The rounded number.
*/
function roundToPlace(number, place) {
	return Math.round(number * Math.pow(10, place)) / Math.pow(10, place);
}

let slideIndex = 1;
showSlides(slideIndex);

/**
 * Increments the slideIndex by n, and shows that slide.
 * @param {number} n - The number to increment slideIndex by.
*/
function plusSlides(n) {
	showSlides(slideIndex += n);
}

/**
 * Sets the current slide index to show the slide at the given index n.
 * Calls showSlides() to actually show the slide.
 * @param {number} n - Index of slide to show
*/
function currentSlide(n) {
	showSlides(slideIndex = n);
}

/**
 * showSlides() displays a slideshow with pagination. 
 * It hides non-active slides, removes the 'active' class from pagination dots,
 * shows the slide at the given index, and adds the 'active' class to the corresponding dot.
*/
function showSlides(n) {
	let i;
	let slides = document.getElementsByClassName("mySlides");
	let dots = document.getElementsByClassName("dot");
	if (n > slides.length) { slideIndex = 1 }
	if (n < 1) { slideIndex = slides.length }
	for (i = 0; i < slides.length; i++) {
		slides[i].style.display = "none";
	}
	for (i = 0; i < dots.length; i++) {
		dots[i].className = dots[i].className.replace(" active", "");
	}
	slides[slideIndex - 1].style.display = "block";
	dots[slideIndex - 1].className += " active";
}

// Function to set a cookie
function setCookie(name, value, days) {
	var expires = "";
	if (days) {
		var date = new Date();
		date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
		expires = "; expires=" + date.toUTCString();
	}
	document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

// Function to get a cookie
function getCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for (var i = 0; i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == ' ') {
			c = c.substring(1, c.length);
		}
		if (c.indexOf(nameEQ) == 0) {
			return c.substring(nameEQ.length, c.length);
		}
	}
	return null;
}

// Function to delete a cookie
function deleteCookie(name) {
	document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

function Create_Passkey() {
	// Notify the user that the feature is not yet available
	alert("This feature is not yet available");
  
	// Generate a random identifier for the user
	const userId = new Uint8Array(16);
	
	// Generate a random challenge
	const challenge = new Uint8Array(32);
  
	const publicKeyCredentialCreationOptions = {
	  rp: {
		name: "FEDS",
		id: "http://127.0.0.1", // Unique identifier for your website
	  },
	  user: {
		id: userId,
		name: "Username", // Optional: User's name
		displayName: "Password", // Optional: User's display name
	  },
	  challenge: challenge,
	  pubKeyCredParams: [{ alg: -7, type: "public-key" }], // Restrict to COSE algorithm
	  attestation: "direct", // Use direct attestation
	  authenticatorSelection: {
		userVerification: "required", // Require user verification (e.g., fingerprint)
	  },
	};
  
	navigator.credentials.create({
	  publicKey: publicKeyCredentialCreationOptions,
	})
	.then((credential) => {
	  // Passkey created successfully
	  alert("Passkey created successfully");
	})
	.catch((error) => {
		// Log the full error details to the console for debugging purposes
		console.error("Error creating passkey:", error);
	  
		// Display a user-friendly error message based on the type of error
		let errorMessage = "Error creating passkey. Please try again.";
	  
		if (error.name === 'NotAllowedError') {
		  errorMessage = "User denied permission. Please enable the necessary permissions.";
		} else if (error.name === 'NotSupportedError') {
		  errorMessage = "Web Authentication API is not supported in this browser.";
		} else if (error.name === 'SecurityError') {
		  errorMessage = "Security error occurred. Please ensure the website is served over HTTPS.";
		}
	  
		alert(errorMessage);
	  });
	  
  }
  

function Check_for_Browser_Support() {
	Passkeyer = document.getElementById('Passkey_creator');
	if ('PublicKeyCredential' in window) {
		Passkeyer.style.display = 'none';		


	  } else {
	
	  }
	  
}