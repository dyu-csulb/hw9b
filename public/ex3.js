window.addEventListener("load", bind);

function bind() {
  document.getElementById("btnSubmit").addEventListener("click", myFunction);
  document.getElementById("btnClear").addEventListener("click", clear);
}

function clear() {
    document.getElementById("txtTitle").value='';
    document.getElementById("txtContent").value='';
    document.getElementById("lblMessage").innerHTML = '';
    document.getElementById("txtTitle").focus();
  }

  function myObj() {
    let myObj = {
      title: document.getElementById("txtTitle").value,
      content: document.getElementById("txtContent").value
    }
    return myObj;
  }

  function myFunction(){
    if (document.getElementById("txtTitle").value==='' ) {
      alert('Please enter a title!');
      document.getElementById("txtTitle").focus();
    }
  
    else if (document.getElementById("txtContent").value==='') {
      alert('Please enter some content!')
      document.getElementById("txtContent").focus();
    }
    
    else {
      callApi();
    }
  }
  
  
  function callApi() {
    const url = 'http://localhost:5000/api/articles';
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
    })
    .catch((error) => {
      console.log('Error:', error);
      alert(error);
    });
  }