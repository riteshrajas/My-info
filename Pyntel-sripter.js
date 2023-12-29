
window.addEventListener('load', function () {
	const splashScreen = document.getElementById('splash-screen');
	const content = document.getElementById('content');
	setTimeout(function () { splashScreen.style.display = 'none'; content.style.display = 'block'; }, 2000);
	var cachedUsername = Cookies.get('username');
	var cachedPassword = Cookies.get('password');

	if (cachedUsername && cachedPassword) {
		const usernameInput = document.getElementById('Username');
		usernameInput.value = cachedUsername;
		const passwordInput = document.getElementById('Password');
		passwordInput.value = cachedPassword;

	}
});


function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}



function Connect_Clicked() {
	var submit = document.getElementById("connect");
	submit.innerText = "Connecting Profile... ( > 5 seconds)";
	var username = document.getElementById('Username').value;
	var password = document.getElementById("Password").value;

	if (username == "201" && password == "password") { alert("Welcome admin"); }

	fetch("https://script.google.com/macros/s/AKfycbxcd9n_6AjNtbCaOe1RE7dB6OBngy68wXKUzFJxRKrLbzd__tyKqXD1Izqj_QIx_lPmew/exec?id="+username+"&pass="+password+"&connect=true")
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
				Cookies.set('username', username, { expires: 7});
				Cookies.set('password', password, { expires: 7});
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
// function Register_Connected() {
// 	var First_Name = document.getElementById('Register-First-name').value;
// 	var Last_Name = document.getElementById('Register-Last-name').value;
// 	var Username = document.getElementById('Register-Username').value;
// 	var Password = document.getElementById('Register-Password').value;
// 	fetch("https://script.google.com/macros/s/AKfycbxRayPdqflxciAaqQzxeEQbOYvrHe912tD3RebKRmwZWI69-4CK0zhXGXoddD41kPLp/exec?firstname=" + First_Name + "&lastname=" + Last_Name + "&schoolID=" + Username + "&password=" + Password)
// 		.then(response => response.json())
// 	var button = document.getElementById("register");
// 	button.innerText = "Registering Profile... ( > 5 seconds)";
// 	sleep(1000).then(() => {
// 		button.innerText = "Thanks, You can close the Tab now!";
// 		sleep(1000).then(() => {
// 			location.href = 'index.html'
// 		})
// 	})
// }


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

			Teamer.innerText = data['TEAM_ROLE'] + '!';
			Signed_Points_text.innerText = ('Signed Up Points: ' + roundToPlace((data['SPECIAL_PROJECT_POINTS_COMPLETED'] / data['SIGNED_UP_POINTS']) * 100,2)+"%"); ;
			General_requirements.setAttribute("value", data['GENERAL_REQUIREMENTS_PERCENTAGE']);
			Attendance.setAttribute("value", data['ATTENDANCE_PERCENTAGE']);
			Funds.setAttribute("value", data['FUNDRAISING_PERCENTAGE']);
			Completed_points.setAttribute("value", data['SPECIAL_PROJECT_POINTS_COMPLETED']);
			Completed_points.setAttribute("max", data['SIGNED_UP_POINTS']);
			Text_General_requirements.innerText = ('General Requirements: ' + data['GENERAL_REQUIREMENTS_PERCENTAGE'] + "%");
			Text_attendance.innerText = ('Attendance: ' + data['ATTENDANCE_PERCENTAGE'] + "%");
			Text_Funds.innerText = ('Fundraising: ' + data['FUNDRAISING_PERCENTAGE'] + "%");


			for (const key in data) {
				if (data.hasOwnProperty(key)) {
					Cookies.set(key, data[key], {expires: 2});
				}
			}
		})
	})
}

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

	Signed_Points_text.innerText = ('Signed Up Points: ' + roundToPlace((Cookies.get('SPECIAL_PROJECT_POINTS_COMPLETED') / Cookies.get('SIGNED_UP_POINTS')) * 100,2)+"%"); ;
	Teamer.innerText = Cookies.get('TEAM_ROLE') + '!' + " Fetching Latest Data";
	General_requirements.setAttribute("value", Cookies.get('GENERAL_REQUIREMENTS_PERCENTAGE'));
	Attendance.setAttribute("value", Cookies.get('ATTENDANCE_PERCENTAGE'));
	Funds.setAttribute("value", Cookies.get('FUNDRAISING_PERCENTAGE'));
	Text_General_requirements.innerText = ('General Requirements: ' + Cookies.get('GENERAL_REQUIREMENTS_PERCENTAGE') + "%");
	Text_attendance.innerText = ('Attendance: ' + Cookies.get('ATTENDANCE_PERCENTAGE') + "%");
	Text_Funds.innerText = ('Fundraising: ' + Cookies.get('FUNDRAISING_PERCENTAGE') + "%");
	Completed_points.setAttribute("value", Cookies.get('SPECIAL_PROJECT_POINTS_COMPLETED'));
	Completed_points.setAttribute("max", Cookies.get('SIGNED_UP_POINTS'));
	console.log(Cookies.get('Teamrole'));
  }
  
  function roundToPlace(number, place) {
	return Math.round(number * Math.pow(10, place)) / Math.pow(10, place);
  }
  