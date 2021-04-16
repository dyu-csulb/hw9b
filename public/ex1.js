
window.addEventListener("load", bind);

function bind() {
    document.getElementById("btnSubmit").addEventListener("click", showResults);
    document.getElementById("btnCancel").addEventListener("click", clear);
    document.getElementById("btnReload").addEventListener("click", reload);
    getData();
}

function showResults() {
    if (document.getElementById("txtName").value==='' ) {
      alert('Please enter a name!');
      document.getElementById("txtName").focus();
    }

    else if (document.getElementById("txtEmail").value==='') {
      alert('Please enter an email address!')
      document.getElementById("txtEmail").focus();
    }

    else if (emailIsValid(document.getElementById("txtEmail").value)==false) {
      alert('Please enter a valid email address!')
      document.getElementById("txtEmail").focus();
    }

    else if (document.getElementById("cboLocation").value ==='') {
      alert('Please select a preferred location!')
    }
    else {
        postData();
    }
    
} 

function emailIsValid (email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

function postData() {
    obj = {
        name : document.getElementById("txtName").value,
        email: document.getElementById("txtEmail").value,
        payType: getPayType(),
        promotion: document.getElementById("chkPromotion").checked,
        location: document.getElementById("cboLocation").value
      }
    fetch("https://davidyu-hw9b.herokuapp.com/postdata", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
          },
        body: JSON.stringify(obj), 
      })
    .then(response => response.text())
    .then(result => {
        document.getElementById("lblMessage").innerHTML = result;
    })
    .catch(err => {
        console.error(err.message);
    });
}

function getData() {
    let myObj = []
    const url = 'https://davidyu-hw9b.herokuapp.com/getdata' 
  
    fetch(url)
    .then(response => response.json())
    .then(data => myObj.push({
                                name: data.name, 
                                email: data.email, 
                                payType: data.payType,
                                promotion: data.promotion, 
                                location: data.location, 
                            }
                        ))
    .then(function () {
        if (myObj[0].name != undefined) {
                document.getElementById("txtName").value = myObj[0].name;
                document.getElementById("txtEmail").value = myObj[0].email;
                switch (myObj[0].payType) {
                    case 'Cash':
                        document.getElementById("cash").checked = true;
                      break;
                    case 'Credit':
                        document.getElementById("credit").checked = true;
                      break;
                    case 'GooglePay':
                        document.getElementById("googlePay").checked = true;
                      break;
                    case 'ApplePay':
                        document.getElementById("applePay").checked = true;
                  }
            
                document.getElementById('cboLocation').value = myObj[0].location;

            }  
        }
    )
    .catch(function (err) {
      console.log('Fetch Error: ', err);
    })
  }

  function getPayType() {
    let v_payType = '';
    let rdo = document.getElementsByName('rdoPayType');     
    for(i = 0; i < rdo.length; i++) {
        if(rdo[i].checked)
        v_payType = rdo[i].value;
    }
    return v_payType;
  }

function clear() {
    document.getElementById("txtName").value='';
    document.getElementById("txtEmail").value='';
    document.getElementById("cash").checked = true;
    document.getElementById("chkPromotion").checked = false;
    document.getElementById("cboLocation").value ='';
    document.getElementById("lblMessage").innerHTML = '';
} 

function reload() {
    location.reload(); 
} 
