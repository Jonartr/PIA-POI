var set_nombre = document.getElementById('nombres');
var set_apellidos = document.getElementById('apellidos');
var set_correo = document.getElementById('Correo');
var set_usuario = document.getElementById('Usuario');
var set_contraseña = document.getElementById('Contraseña');
var set_foto = document.getElementById('foto');
var set_fecha = document.getElementById('fecha');
var boton_enviar = document.getElementById('registrar');
var boton_login = document.getElementById('btn-login');
var indice = 1;

  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.20.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.20.0/firebase-analytics.js";
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

  import { getDatabase, ref, set,get, child, update, remove,push, onChildAdded} 
          from  "https://www.gstatic.com/firebasejs/9.20.0/firebase-database.js";
  
              const db = getDatabase();

 export function agregar(){
    push(ref(db, "Usuarios"),{
        Indice: indice,
        Nombres: set_nombre.value,
        Apellidos: set_apellidos.value,
        Correo: set_correo.value,
        Usuario: set_usuario.value,
        Contraseña: set_contraseña.value,
        Foto: set_foto.value,
        Fecha: set_fecha.value
    })
    .then(()=>{alert("Guardado con exito");})
    .catch((error)=>{alert("Fallo al guardar en la bases");});

    set(ref(db,"Indice actual "),{
        Indice: indice
    });

    indice++;
}

export function buscar_usuarios(existe){
    const refmensajes = ref(db,"Usuarios");
    var get_usuario = document.getElementById('Usernamelogin');
    var get_contraseña = document.getElementById('passwordLogin');
    onChildAdded(refmensajes,(data)=>{
        if(data.val().Usuario == get_usuario.value && data.val().Contraseña == get_contraseña.value){
            alert("Usuario existe");
            return existe = true;
        }
        else{
            alert("Usuario o contraseña incorrectos, intenta nuevamente");
            return existe = false;
        }



    });
}
