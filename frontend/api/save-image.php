<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: *");
    header("Access-Control-Allow-Headers: *");

    if($_FILES['file']) {
        $uploaddir = '/var/www/uploads/';
        $uploadfile = $uploaddir . basename($_FILES['file']['name']);

        $dir = save_source_code($_POST['user'], $_FILES['file']);
        $json[] = array(
            'name' => $name,
            'file' => $_FILES['file'],
            'dir' => $dir,
        );
        echo json_encode($json);
    } else {
        $json[] = array(
            'error' => 'file not found',
            'file' => $_FILES['file'],
        );
        echo json_encode($json);
    }

    function creat_dir($Name){
        $dir = preg_replace("/\s+/", "", $Name);
        if(!is_dir("images/".$dir)){
            if(mkdir("images/".$dir, 0777)){
                return $dir;
            } else return false;
        } else return $dir;
    }

    function save_source_code($cName,$cData) {
        $dir = creat_dir($_POST['user']);
        if($dir){
            $name = basename($_FILES["file"]["name"]);
            if (!move_uploaded_file($_FILES['file']['tmp_name'], "images/$dir/$name" )) {
                $dir = '';
            }
        }
        return $dir;
    }
?>