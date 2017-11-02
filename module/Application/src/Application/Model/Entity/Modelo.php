<?php

namespace Application\Model\Entity;

class Modelo{

    public function getClient(){
        $api_url = 'https://app.alegra.com/api/v1/contacts/';
        $client_id = 'johnmanuelpenaloza@hotmail.com';
        $client_secret = '03d2d7d3c3234dea7496';
        $context = stream_context_create(array(
            'http' => array(
                'header' => "Authorization: Basic " . base64_encode("$client_id:$client_secret"),
            ),
        ));
        $result = file_get_contents($api_url, false, $context);
        $result = json_decode($result);
        $array = json_encode(array('totalCount' => count($result),'items'=>$result)) ;
        echo $array;
   }



   public function serchClient($nombre,$apellido){
    
    if(empty($nombre) and empty($apellido)){

        $api_url = 'https://app.alegra.com/api/v1/contacts/';
        $client_id = 'johnmanuelpenaloza@hotmail.com';
        $client_secret = '03d2d7d3c3234dea7496';
        $context = stream_context_create(array(
            'http' => array(
                'header' => "Authorization: Basic " . base64_encode("$client_id:$client_secret"),
            ),
        ));
        $result = file_get_contents($api_url, false, $context);
        $result = json_decode($result);
        $array  = ($result!="")?json_encode(array('success' => 'true')):$result;
        echo $array;

    }elseif(!empty($nombre)){

        $api_url = 'https://app.alegra.com/api/v1/contacts/:'.$nombre;
        $client_id = 'johnmanuelpenaloza@hotmail.com';
        $client_secret = '03d2d7d3c3234dea7496';
        $context = stream_context_create(array(
            'http' => array(
                'header' => "Authorization: Basic " . base64_encode("$client_id:$client_secret"),
            ),
        ));
        $result = file_get_contents($api_url, false, $context);
        $result = json_decode($result);
        $array  = ($result!="")?json_encode(array('success' => 'true')):$result;
        echo $array;

    }elseif (!empty($apellido)) {
        
        $api_url = 'https://app.alegra.com/api/v1/contacts/:'.$apellido;
        $client_id = 'johnmanuelpenaloza@hotmail.com';
        $client_secret = '03d2d7d3c3234dea7496';
        $context = stream_context_create(array(
            'http' => array(
                'header' => "Authorization: Basic " . base64_encode("$client_id:$client_secret"),
            ),
        ));
        $result = file_get_contents($api_url, false, $context);
        $result = json_decode($result);
        $array  = ($result!="")?json_encode(array('success' => 'true')):$result;
        echo $array;
    }

}

public function saveClient($usuario,$clave,$nombre,$apellidos,$telefono,$celular,$descripcion){

    $api_url = 'https://app.alegra.com/api/v1/contacts/';
    $client_id = 'johnmanuelpenaloza@hotmail.com';
    $client_secret = '03d2d7d3c3234dea7496';

    $postdata = http_build_query(
        array(
            'usuario' => $usuario,
            'clave' => $clave,
            'nombre' => $nombre,
            'apellidos' => $apellidos,
            'telefono' => $telefono,
            'celular' => $celular,
            'descripcion' => $descripcion
        )
    );

    $context = stream_context_create(array(
        'http' => array(
            'header' => "Authorization: Basic " . base64_encode("$client_id:$client_secret"),            
            'content' => $postdata,
        ),
    ));

    $result = file_get_contents($api_url, false, $context);
    $result = json_decode($result);

    if(!empty($result)){
        $data=array('success' => 'true');
    }else{
        $data=array('success' => 'false');
    }
    json_encode($data);
    echo $data;
}



}



?>