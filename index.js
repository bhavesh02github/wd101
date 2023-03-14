let loginform = document.getElementById("login-form");
const dobinput = document.getElementById('dob');

dobinput.addEventListener('input', (event) => {
    const dob = new Date(event.target.value);
    const now = new Date();
    const age = now.getFullYear() - dob.getFullYear();

    if (age < 18 || age > 55) {
        dobinput.setCustomValidity('Please enter a valid date of birth between ages 18 and 55.');
    }
    else{
        dobinput.setCustomValidity('');
    }
});

const getdetails = ()=>{
    let details = localStorage.getItem("user-details");
    if(details){
        details = JSON.parse(details);
    }
    else{
        details = [];
    } 
    return details;
}
let data = getdetails();

const showdetails =()=>{
    const details = getdetails();
    const tableentries = details.map((entry)=>{
        const nameCell = `<td>${entry.name}</td>`;
        const emailCell = `<td>${entry.email}</td>`;
        const passwordCell = `<td>${entry.pw}</td>`;
        const dobCell = `<td>${entry.db}</td>`;
        const acceptTermsCell = `<td>${entry.ch}</td>`;
        const row = `<tr>${nameCell} ${emailCell} ${passwordCell} ${dobCell} ${acceptTermsCell}</tr>`;
        return row;
    }).join("\n");

    const tab = 
    `<table class="table-auto w-full">
        <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Password</th>
            <th>dob</th>
            <th>accepted terms?</th>
        </tr>${tableentries}
    </table>`;

    let fdetails = document.getElementById("user-details");
    fdetails.innerHTML = tab;
}
const saveform = (event)=>{
    event.preventDefault();
    const name = document.getElementById("name").value; 
    const email = document.getElementById("email").value;
    const pw = document.getElementById("password").value;
    const db = document.getElementById("dob").value;
    const ch = document.getElementById("acceptTerms").checked;
    const entry = {
        name,
        email,
        pw,
        db,
        ch
    }
    data.push(entry);
    localStorage.setItem("user-details",JSON.stringify(data));
    showdetails();
}

loginform.addEventListener("submit",saveform); 

showdetails();
