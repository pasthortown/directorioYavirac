var contactosLista = [];
var contactos = [];

$(document).ready(function(){
    document.getElementById('datosContacto').style.display = "none";
    document.getElementById('contactos').style.display = "none";
});

function getTodos() {
    document.getElementById('nombreCompleto').value = "";
    document.getElementById('datosContacto').style.display = "none";
    document.getElementById('contactos').style.display = "block";
    urlToRequest = './bdd.php';
    $.ajax({
        type: "post",
        url: urlToRequest,
        data: {busqueda: ''},
        async:false,
        success: function(respuesta){
            contactosObtenidos = JSON.parse(respuesta);
            contactosObtenidos.forEach(contacto => {
                document.getElementById('contenido').innerHTML = document.getElementById('contenido').innerHTML + "<tr><td>" + contacto.extension + "</td><td>" + contacto.cedula + "</td><td>" + contacto.nombre1 + ' ' + contacto.nombre2 + ' ' + contacto.apellido1 + ' ' + contacto.apellido2 + "</td><td>" + contacto.email + "</td><td>" + contacto.telefono + "</td><td>" + contacto.fechaNacimiento + "</td><td>" + contacto.direccion + "</td></tr>";
            });
        }
    });
}

function vaciar() {
    document.getElementById('nombreCompleto').value = "";
    document.getElementById('contactos').style.display = "none";
    document.getElementById('datosContacto').style.display = "none";
}

function getContactos() {
    document.getElementById('contactos').style.display = "none";
    document.getElementById('datosContacto').style.display = "none";
    urlToRequest = './bdd.php';
    busqueda = document.getElementById('nombreCompleto').value;
    if(busqueda.length <3){
        return;
    }
    $.ajax({
        type: "post",
        url: urlToRequest,
        data: {busqueda: busqueda},
        async:false,
        success: function(respuesta){
            contactosObtenidos = JSON.parse(respuesta);
            contactosLista = [];
            contactosObtenidos.forEach(contacto => {
                contactosLista.push({
                    value: contacto.nombre1 + ' ' + contacto.nombre2 + ' ' + contacto.apellido1 + ' ' + contacto.apellido2,
                    identificacion: contacto.cedula,
                    telefono: contacto.telefono,
                    fechaNacimiento: contacto.fechaNacimiento,
                    extension: contacto.extension,
                    email: contacto.email,
                    direccion: contacto.direccion,
                    id: contacto.id
                });
            });
            $(".autocomplete").autocomplete({
                source: contactosLista,
                select: function(e, ui) {
                    mostrarContacto(ui.item);
                }
            });
        }
    });
}

function mostrarContacto(contacto) {
    document.getElementById('datosContacto').style.display = "block"; 
    document.getElementById('identificacion').value = contacto.identificacion;
    document.getElementById('nombreCompleto2').value = contacto.value;
    document.getElementById('telefono').value = contacto.telefono;
    document.getElementById('fechaNacimiento').value = contacto.fechaNacimiento;
    document.getElementById('extension').value = contacto.extension;
    document.getElementById('email').value = contacto.email;
    document.getElementById('direccion').value = contacto.direccion;
}

function descargarContactos() {
    window.location = "http://localhost/DirectorioYavirac/descargarContactos.php";
}