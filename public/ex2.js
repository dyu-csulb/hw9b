window.addEventListener("load", bind);

function bind() {
  document.getElementById("btnSubmit").addEventListener("click", myFunction);
  document.getElementById("btnClear").addEventListener("click", clear);
}

function myObj() {
    let v_name = document.getElementById("txtName").value;
    let countries = [];
  
    let str1 = document.getElementById("txtCountry").value;
    countries = str1.split(',');
  

    let countryArray = [];
    for (var i = 0; i < countries.length; i++) {
      countryArray.push({
              name: countries[i],
        });
    }
    let myObj = {
      name: v_name,
      countries: countryArray
    }
  
    return myObj;
  
  }

  function myFunction(){
    if (document.getElementById("txtName").value==='' ) {
      alert('Please enter a name!');
      document.getElementById("txtName").focus();
    }
  
    else if (document.getElementById("txtCountry").value==='') {
      alert('Please enter a country!')
      document.getElementById("txtCountry").focus();
    }
    
    else {
      callApi();
    }
  }
  
  
  function callApi() {
    const url = 'https://davidyu-hw9.herokuapp.com/api/countries';
    fetch(url, {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(myObj()),
    })
    .then(response => response.text())
    .then(result => {
      console.log('Success:', result);
      document.getElementById("lblMessage").innerHTML = result;
      document.getElementById("txtCountry").focus();
    })
    .catch((error) => {
      console.log('Error:', error);
      alert(error);
    });
  }

  function clear() {
    document.getElementById("txtName").value='';
    document.getElementById("txtCountry").value='';
    document.getElementById("lblMessage").innerHTML = '';
  }