window.addEventListener('load', function() {
	const splashScreen = document.getElementById('splash-screen-beta');
	const content = document.getElementById('content-beta');
	setTimeout(function() { splashScreen.style.display = 'none'; content.style.display = 'block'; 	}, 1234);
});

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}
   
function Connect_Clicked_beta() {
    var conect_btn = document.getElementById('connectors');
    var conector_btn = document.getElementById('connector');
    var username = document.getElementById('Username_beta').value;
    var password = document.getElementById('Password_beta').value;
    const content = document.getElementById('content-beta');
    const ruleover = document.getElementById('ruleover-beta');
    conect_btn.innerText = 'Connecting...';
    conector_btn.innerText = 'Connecting...';
    if (username == "") {
        return alert("Unknown user");
    }

    if (password == "") {
        return alert("Unknown password");
    }

    if (username == "201"){
        if (password == "edna2018"){
            fetch("https://script.google.com/macros/s/AKfycbw7sNXfwi2JTTVBsAw7gZxRNmmt5oq13DxTekEn1E623huDSTLHJ00Rkipr0dea8Y34/exec",{ redirect: 'follow',method: 'GET'})
            .then(alert("Sucessfullty Updated"))
        }
    }
    // console.log("Username: "+ username );
    // console.log("Password: "+ password );

    var url = "https://script.google.com/macros/s/AKfycbx5a63G6i7z-0-Qei747EblyKkd_71W-74jwETiV8Ymr-y4VL1JuKuUvUVDGXvqDYgQfA/exec?user="+username+"&pswd="+password+"";
    // console.log(url);
    fetch(url, { redirect: 'follow',method: 'GET'})

    .then(response => response.text())
    .then(result => {

        var resultObject = JSON.parse(result);

        content.style.display = 'none';
        ruleover.style.display = 'block';


        var Teamer = document.getElementById('Teamrole');
        var Signed_up_points = document.getElementById('signed_up_points');
        var General_requirements = document.getElementById('General_Requirements');
        var Attendance = document.getElementById('AttendanceProgress');
        var Funds = document.getElementById('Fund_raised');
        var Text_attendance = document.getElementById('Attendance_text');
        var Text_General_requirements = document.getElementById('General_Requirements_text');
        var Text_Funds = document.getElementById('textfunds');
        var P_and_C_points = document.getElementById('p&c_points');
        var Completed_Points = document.getElementById('completed_points');

        Teamer.innerText = resultObject['TeamRole'] + '!';
        P_and_C_points.innerText = ('P & C Points : ' + resultObject['P_and_C'] + ' Points');
        Completed_Points.innerText = ('Completed Points : ' + resultObject['Special_Project_Points_Completed'] + ' Points');
        Signed_up_points.innerText = ('Signed Up Points : ' + resultObject['Signed_in_points'] + ' Points');
        General_requirements.setAttribute("value", resultObject['General_Requirements']);
        Attendance.setAttribute("value", resultObject['Attendance']);
        Funds.setAttribute("value", resultObject['Fundrasising']);
        Text_General_requirements.innerText = ('General Requirements: ' + resultObject['General_Requirements'] + "%");
        Text_attendance.innerText = ('Attendance: ' + resultObject['Attendance'] + "%");
        Text_Funds.innerText = ('Fundraising: ' + resultObject['Fundrasising'] + "%");

    
    })
    .catch(error => alert('error', error));
    

}
