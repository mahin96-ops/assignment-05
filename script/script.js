document.getElementById('login-btn').addEventListener('click', function(){
   const nameInput =document.getElementById('input-name') ;
   const name = nameInput.value;
   console.log(name)

   const passInput =document.getElementById('input-pass');
   const pass = passInput.value;
   console.log(pass)

   if(name == 'admin' && pass == 'admin123'){
    alert('login succses')

    window.location.assign("./home.html")
   }else{
    alert('login faild')
    return
   }
  
})