// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.20.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.20.0/firebase-analytics.js";
import { getDatabase, ref, set,get, child, update, remove,push, onChildAdded} from  "https://www.gstatic.com/firebasejs/9.20.0/firebase-database.js";
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

const db = getDatabase();

document.getElementById("btn_registrarse").addEventListener("click",register);
document.getElementById("btn_inciar-sesión").addEventListener("click",login);
document.getElementById("registro").addEventListener("click",register);
document.getElementById("LogIn").addEventListener("click",login);


let contenedorLoginRegister=document.querySelector(".contenedor_login-register");
let formularioLogin=document.querySelector(".formulario_login");
let formularioRegister=document.querySelector(".formulario_register");
let cajaTraseraLogin=document.querySelector(".caja_trasera-login");
let cajaTraseraRegister=document.querySelector(".caja_trasera-register");

const Nombres= document.getElementById("nombres");
const Apellidos= document.getElementById("apellidos");
const Usuario= document.getElementById("Usuario");
const Correo= document.getElementById("Correo");
const Contraseña= document.getElementById("Contraseña");
const Contraseña2= document.getElementById("ConfirmarContraseña");
const Fecha= document.getElementById("fecha");
const Foto= document.getElementById("foto");
const form= document.getElementById("register");
const form2= document.getElementById("login");
const parrafo= document.getElementById("warnings");

const User=document.getElementById("Usernamelogin");
const pass=document.getElementById("passwordLogin");




    const registersb = function(){
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
         
         if(ok<8){
             return false;
         }else if (ok===8){
            alert(Nombres.value);
           agregar();

             return true;
         }
        
    };
    
    
    
        $("#register").submit(registersb);
        
       $("#login").submit(function login() {
                
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
             
             if (ok < 2 ){
                return false;
             }
             else if(ok === 2){
                var existe = false;
                buscar_usuarios(existe);
                if (existe == true){
                    return true;
                }
                else{
                    alert("usuario no existente");
                    return false;
                }
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
    

    function agregar(){
        alert("Si entra aqui");
    push(ref(db, "Usuarios"),{
         Indice: indice,
        Nombres: Nombres.value,
        Apellidos: Apellidos.value,
        Correo: Correo.value,
        Usuario: Usuario.value,
        Contraseña: Contraseña.value,
        Foto: Foto.value,
        Fecha: Fecha.value
    })
    set(ref(db,"Indice actual "),{
        Indice: indice
    });

    indice++;
    }

 