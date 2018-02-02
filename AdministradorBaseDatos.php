<?php
class AdministradorBaseDatos
{
    private $Conexion;

    public function __construct() {

    }
    
    private function conectar(){
        try 
        {
            $this->Conexion = new PDO("mysql:host=localhost;dbname=DirectorioTelefonico;charset=utf8", "prueba", "12345678",array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES 'utf8'"));
            return true;
        }
        catch (PDOException $e) 
        {
            return false;
        }
    }
    
    private function desconectar(){
        $this->Conexion = null;
    }

    private function consultar($sql,$parametros){
        $stmt = $this->Conexion->prepare($sql);
        $stmt->execute($parametros);
        $array = array();
        $cuenta = $stmt->rowCount();
        if($cuenta>0){
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC))
            {
                $array[]=$row;
            }
        }else{
            $array[]=$cuenta;
        }
        return $array;
    }

    public function ejecutarConsulta($sql,$parametros){
        $this->conectar();
        $salida = $this->consultar($sql,$parametros);
        $this->desconectar();
        return json_encode($salida);
    }
}