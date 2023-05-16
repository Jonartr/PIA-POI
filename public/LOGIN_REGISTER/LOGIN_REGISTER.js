 // Import the functions you need from the SDKs you need
 import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
 import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-analytics.js";
 // TODO: Add SDKs for Firebase products that you want to use
 // https://firebase.google.com/docs/web/setup#available-libraries

 // Your web app's Firebase configuration
 // For Firebase JS SDK v7.20.0 and later, measurementId is optional
 const firebaseConfig = {
     apiKey: "AIzaSyBMMI7fGG_UEEkZ537X7efvhemElAGNvV4",
     authDomain: "mensajeria-poi.firebaseapp.com",
     databaseURL: "https://mensajeria-poi-default-rtdb.firebaseio.com",
     projectId: "mensajeria-poi",
     storageBucket: "mensajeria-poi.appspot.com",
     messagingSenderId: "840989306295",
     appId: "1:840989306295:web:2192e5056c57cf85ef4c32",
     measurementId: "G-2RH39H1T41"
 };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


  import { getDatabase, ref, set,get, child, update, remove,push, onChildAdded} from  "https://www.gstatic.com/firebasejs/9.22.0/firebase-database.js";
  import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";

  var auth = getAuth();
  const db = getDatabase();
  const refusuarios = ref(db,"Usuarios");



document.getElementById("btn_registrarse").addEventListener("click",register);
document.getElementById("btn_inciar-sesión").addEventListener("click",iniciarSesion);
document.getElementById("registro").addEventListener("click",register);
document.getElementById("LogIn").addEventListener("click",iniciarSesion);


let contenedorLoginRegister=document.querySelector(".contenedor_login-register");
let formularioLogin=document.querySelector(".formulario_login");
let formularioRegister=document.querySelector(".formulario_register");
let cajaTraseraLogin=document.querySelector(".caja_trasera-login");
let cajaTraseraRegister=document.querySelector(".caja_trasera-register");

var Nombres= document.getElementById("nombres");
var Apellidos= document.getElementById("apellidos");
var Usuario= document.getElementById("Usuario");
var  Contraseña= document.getElementById("Contraseña");
var Contraseña2= document.getElementById("ConfirmarContraseña");
var Fecha= document.getElementById("fecha");
var Foto= document.getElementById("foto");
var form= document.getElementById("register");
var form2= document.getElementById("login");
var parrafo= document.getElementById("warnings");

var User=document.getElementById("Usernamelogin");
var pass=document.getElementById("passwordLogin");
var existe = false;
var repetido = false;




    $("#register").submit(function registerf(event) {
        event.preventDefault();
         var ok=0;
      

    var regexNombres=/^[a-zA-ZáéíóúÁÉÍÓÚñÑ]+(?: [a-zA-ZáéíóúÁÉÍÓÚñÑ]+)*$/;
    var regexE=/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))*$/;

    if(Nombres.value.length<1){ //Valida solo incluir letras alfabeto español
        setErrorFor(Nombres,"El campo no puede estar vacío");
    }else if(!regexNombres.test(Nombres.value)){
        setErrorFor(Nombres,"Carácteres no válidos");
    }else{
        setSuccesFor(Nombres);
        ok++;
    }

    if(Apellidos.value.length<1){ //Valida solo incluir letras alfabeto español
        setErrorFor(Apellidos,"El campo no puede estar vacío");
    }else if(!regexNombres.test(Apellidos.value)){
        setErrorFor(Apellidos,"Carácteres no válidos");
    }else{
        setSuccesFor(Apellidos);
        ok++;
     }

     if(Correo.value.length<1){
        setErrorFor(Correo,"El campo no puede estar vacío");
    }else if(!regexE.test(Correo.value)){ //evalua que haya texto, @, texto y luego .com
        setErrorFor(Correo,"El correo electrónico no es válido");
    }else{
        setSuccesFor(Correo);
        ok++;
    }

     if(Usuario.value.length<1){
        setErrorFor(Usuario,"El campo no puede estar vacío");
     }else{
        setSuccesFor(Usuario);
        ok++;
     }
     if(Contraseña.value.length<1){
        setErrorFor(Contraseña,"El campo no puede estar vacío");
     }else if(!Contraseña.value.match(/[0-9]/)){
        setErrorFor(Contraseña,"La contraseña debe contener al menos un número");
     }else if(!Contraseña.value.match(/[A-Z]/)){
        setErrorFor(Contraseña,"La contraseña debe contener al menos una mayúscula");
     }else if(!Contraseña.value.match(/[a-z]/)){
        setErrorFor(Contraseña,"La contraseña debe contener al menos una minúscula");
     }else if(!Contraseña.value.match(/[¿/?/!/¡/./,/;/:/-/(/)/"/']/)){
        setErrorFor(Contraseña,"La contraseña debe contener al menos un signo de puntuación");
     }else if(Contraseña.value.length<8){
        setErrorFor(Contraseña,"La contraseña debe contener al menos 8 caracteres");
     }else{
        setSuccesFor(Contraseña);
        ok++;
     }

     if(Contraseña2.value.length<1){
        setErrorFor(Contraseña2,"El campo no puede estar vacío");
     }else if(Contraseña2.value!==Contraseña.value){
        setErrorFor(Contraseña2,"Las contraseñas no coinciden");
     }else{
        setSuccesFor(Contraseña2);
        ok++;
     }

     if(Fecha.value.length<1){
        setErrorFor(Fecha,"No seleccionó ninguna fecha");
     }else if(validateDate(Fecha.value)){
        setErrorFor(Fecha,"Fecha no válida");
    }else if(getAge(Fecha.value)<13){
        setErrorFor(Fecha,"Debe ser mayor a 13 años");
    }else{ 
        setSuccesFor(Fecha);
        ok++;
     }
     if(Foto.files.length===0){
        setErrorFor(Foto,"No ha agregado ninguna foto");
     }else{
        setSuccesFor(Foto);
        ok++;

     }

     onChildAdded(refusuarios,(data)=>{
        if(data.val().Correo == Correo.value || data.val().Usuario == Usuario.value){
            repetido = true;
        }
        });

     if(ok == 8 && repetido == false){
        var email = Correo.value;
        var password = Contraseña.value
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        alert("Usuario registrado:", user);
        })
        .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert("Error al registrar el usuario:", errorCode.value, errorMessage.value);
        // ..
        });

     

     push(ref(db, "Usuarios"),{

            Nombres: Nombres.value,
            Apellidos: Apellidos.value,
            Correo: Correo.value,
            Usuario: Usuario.value,
            Contraseña: Contraseña.value,
            Foto: Foto.value,
            Fecha: Fecha.value
        }) .then(() => {
          })
          .catch((error) => {
            alert("Error al enviar los datos: " + error.message);
          });

       

          window.location.reload();
          return true;
     }
     else
     {
        if(repetido == true){
            alert("Usuario y/o correo existente");
        }
        repetido = false;
         return false ;
     }
     
});


        
       $("#login").submit(function login(event) {
             
        event.preventDefault();
            var ok=0;
             if(User.value.length<1){ 
                setErrorFor(User,"El campo no puede estar vacío");
            }else{
                setSuccesFor(User);
                ok++;
            }
            if(pass.value.length<1){
                setErrorFor(pass,"El campo no puede estar vacío");
            }else{
                setSuccesFor(pass);
                ok++;
              
            }

                if (ok == 2){
                    onChildAdded(refusuarios,(data)=>{
                            if(data.val().Usuario == User.value && data.val().Contraseña == pass.value){
                                alert("Usuario existe");
                                return true;
                            }
                            else{
                                alert("Usuario o contraseña incorrectos, intenta nuevamente");
                                return false;
                            }
                    });

                          

                }
             
        });
    
    
    
    
    function getAge(date){
        
        var today=new Date();
        var birthday= new Date(date);
        var year= today.getFullYear()-birthday.getFullYear();
        var month=today.getMonth()-birthday.getMonth();
        if(month<0||(month==0 && today.getDate()-1<birthday.getDate())){
            year--;
        }
        return year;
    }
    
     function validateDate(date){
        
        var today=new Date();
        var birthday= new Date(date);
        if(birthday>today){
            return true;
        }else{
            return false;
        }
    }
    
     function setErrorFor(input, message){
        const formControl=input.parentElement;//.form-control
        const small=formControl.querySelector('small');
    
        if(input=Foto){
            //add error message inside mall
            small.innerText=message;
    
            //add error class
            formControl.className='form-control error';
        }else{
            //add error message inside mall
            small.innerText=message;
    
            //add error class
            formControl.className='form-control error';
        }
    }
    
     function setSuccesFor(input){
        const formControl=input.parentElement;
        formControl.className='form-control success';
    }
    
    
     function iniciarSesion(){
        formularioRegister.style.display="none";
        contenedorLoginRegister.style.left="10px";
        formularioLogin.style.display="block";
        cajaTraseraRegister.style.opacity="1";
        cajaTraseraLogin.style.opacity="0";
    }
    
     function register(){
         formularioRegister.style.display="block";
        contenedorLoginRegister.style.left="410px";
        formularioLogin.style.display="none";
        cajaTraseraRegister.style.opacity="0";
        cajaTraseraLogin.style.opacity="1";
    }
    


 //firebase deploy --only hosting