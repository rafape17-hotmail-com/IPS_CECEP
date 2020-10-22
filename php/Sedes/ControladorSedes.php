<?php
 
require_once 'Sedes_modelo.php';
$datos = $_GET;
switch ($_GET['accion']){
    case 'editar':
        $sedes = new Sedes();
        $resultado = $sedes->editar($datos);
        $respuesta = array(
                'respuesta' => $resultado
            );
        echo json_encode($respuesta);
        break;
    case 'nuevo':
        $sedes = new Sedes();
		$resultado = $sedes->nuevo($datos);
        if($resultado > 0) {
            $respuesta = array(
                'respuesta' => 'correcto'
            );
        }  else {
            $respuesta = array(
                'respuesta' => 'error'
            );
        }
        echo json_encode($respuesta);
        break;
    case 'borrar':
		$sedes = new Sedes();
		$resultado = $sedes->borrar($datos['codigo']);
        if($resultado > 0) {
            $respuesta = array(
                'respuesta' => 'correcto'
            );
        }  else {
            $respuesta = array(
                'respuesta' => 'error'
            );
        }
        echo json_encode($respuesta);
        break;

    case 'consultar':
        $sedes = new Sedes();
        $sedes->consultar($datos['codigo']);

        if($sedes->getComu_codi() == null) {
            $respuesta = array(
                'respuesta' => 'no existe'
            );
        }  else {
            $respuesta = array(
                'codigo' => $sedes->getComu_codi(),
                'sedes' => $sedes->getComu_nomb(),
                'municipio' =>$sedes->getMuni_codi(),
                'respuesta' =>'existe'
            );
        }
        echo json_encode($respuesta);
        break;

    case 'listar':
        $sedes = new Sedes();
        $listado = $sedes->lista();
        echo json_encode(array('data'=>$listado), JSON_UNESCAPED_UNICODE);    
        break;
}
?>
