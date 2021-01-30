<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: *");
    header("Access-Control-Allow-Headers: *");

    if($_POST['dir']) {
        unlink("images/".$_POST['dir']);
        $json[] = array(
            'dir' => $_POST['dir'],
            'status' => 'deleted',
        );
        echo json_encode($json);
    }
?>