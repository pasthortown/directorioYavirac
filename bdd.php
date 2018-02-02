<?php
include_once('./AdministradorBaseDatos.php');
$bddAdmin = new AdministradorBaseDatos();
$busqueda = $_REQUEST['busqueda'];
$busqueda = strtoupper($busqueda);
echo $bddAdmin->ejecutarConsulta("SELECT * FROM Contacto WHERE UPPER(CONCAT(nombre1, ' ', nombre2, ' ', apellido1, ' ', apellido2)) LIKE '%".$busqueda."%';", array());