<?php

namespace Application\Model\Entity;

class Modelo{

  

   public function serchClient($data){
    
    session_start();
    @$_SESSION["data"]=$data;
     
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
        $_SESSION["cliente_info"] = $result;
        if($result !=""){
            $array = json_encode(array('success' => 'true'));
        }
        
        echo $array;

    }

    public function getClient(){
    
            session_start();
            @$data         = $_SESSION["data"];
            @$cliente_info = $_SESSION["cliente_info"];
            
            $n = count($cliente_info);
            for($i = 0; $i< $n; $i++){
                if($cliente_info[$i]->name == $data){
                    $id = $cliente_info[$i]->id;
                }
            }

            
            if(!empty($id)){
                $api_url = 'https://app.alegra.com/api/v1/contacts/'.$id;
            }else{
                $api_url = 'https://app.alegra.com/api/v1/contacts/';
            }

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


public function saveClient($identificacion,$nombre,$apellidos,$telefono,$celular,$descripcion){

    $host = 'https://app.alegra.com/api/v1/contacts';
    $data = array('name' => $nombre, 'identification' => $identificacion, 'identification (Perú)' => '', 'type' => '', 'internalContacts' => '','phonePrimary'=>$telefono,'observations'=>$descripcion);
    $data_string = json_encode($data);
    $headers = array(
        'Content-Type:application/json',
        'Content-Length: ' . strlen($data_string),
        'Authorization: Basic '. base64_encode('johnmanuelpenaloza@hotmail.com:03d2d7d3c3234dea7496')
    );
    
    $ch = curl_init($host); 
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'POST');  
    curl_setopt($ch, CURLOPT_POSTFIELDS, $data_string);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER,1);
    $result = curl_exec($ch);
    curl_close($ch);  
   
    $array  = ($result!="")?json_encode(array('success' => 'true')):$result;
    echo $array;

}



}



?>