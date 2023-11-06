
window.addEventListener('load', function() {
	const splashScreen = document.getElementById('splash-screen');
	const content = document.getElementById('content');
	setTimeout(function() { splashScreen.style.display = 'none'; content.style.display = 'block'; }, 100);
});

function sleep(ms) {
	return new Promise(wait => setTimeout(wait, ms));
}
  

function Connect_Clicked() {
	var submit = document.getElementById("connect");
	submit.innerText = "Connecting Profile... ( > 5 seconds)";
	var username = document.getElementById('Username').value;
	var password = document.getElementById("Password").value;

	if (username == "201" && password == "password") { alert("Welcome admin"); }

	fetch("https://script.google.com/macros/s/AKfycbxmnwpzT62OLCfuR9w3I282udbZN4QvPy9J-I6Dyk99wsTitzHL69dHV44fkH1kHcXu3g/exec?id="+username+"&pass="+password+"&connect=true")
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
				var Sucess_or_Fail = document.getElementById('Sucess/fail_tablet');
				Sucess_or_Fail.innerText = "Sucessful!";
				sleep(10000).then(() => {
					fetch("https://script.google.com/macros/s/AKfycbxmnwpzT62OLCfuR9w3I282udbZN4QvPy9J-I6Dyk99wsTitzHL69dHV44fkH1kHcXu3g/exec?id="+username+"&pass="+password+"&connect=false")
					.then(response => response.json())
					.then(data => {
						// console.log(data);
						content.style.display = 'none';
						datasheet.style.display = 'block';
						bridge.style.display = 'none';

						var Teamer = document.getElementById('Teamrole');
						var Signed_up_points = document.getElementById('signed_up_points');
						var General_requirements = document.getElementById('General_Requirements');
						var Attendance = document.getElementById('AttendanceProgress');
						var Funds = document.getElementById('Fund_raised');
						var Text_attendance = document.getElementById('texta');
						var Text_General_requirements = document.getElementById('textgr');
						var Text_Funds = document.getElementById('textfunds');

						Teamer.innerText = data['TeamRole'] + '!';
						Signed_up_points.innerText = ('Signed Up Points : ' + data['Projects_signed_up'] + ' Points');
						General_requirements.setAttribute("value", data['General_Requirements(%)']);
						Attendance.setAttribute("value", data['Attendance(%)']);
						Funds.setAttribute("value", data['Fundrasising(%)']);
						Text_General_requirements.innerText = ('Fundraising: ' + data['General_Requirements(%)'] + "%");
						Text_attendance.innerText = ('Attendance: ' + data['Attendance(%)'] + "%");
						Text_Funds.innerText = ('General Requirements: ' + data['Fundrasising(%)'] + "%");


					})
				  });
				
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