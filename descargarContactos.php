<?php
include_once('./AdministradorBaseDatos.php');
$bddAdmin = new AdministradorBaseDatos();
$busqueda = $_REQUEST['busqueda'];
$busqueda = strtoupper($busqueda);
$respuesta = $bddAdmin->ejecutarConsulta("SELECT * FROM Contacto;", array());
header('Content-Type: text/csv; charset=utf-8');
header('Content-Encoding: UTF-8');
header('Content-Disposition: attachment; filename=Directorio-Yavirac.csv');
echo "\xEF\xBB\xBF";
$salida= "Identificación; Primer Nombre; Segundo Nombre; Primer Apellido; Segundo Apellido; Teléfono; Fecha de Nacimiento; Extensión; Correo Electrónico; Dirección\n";
$contactos = json_decode($respuesta);
foreach($contactos as $contacto){
    $salida .= $contacto->cedula.";".$contacto->nombre1.";".$contacto->nombre2.";".$contacto->apellido1.";".$contacto->apellido2.";".$contacto->telefono.";".$contacto->fechaNacimiento.";".$contacto->extension.";".$contacto->email.";".$contacto->direccion."\n";
}
echo $salida;
exit;