<?php

// Check string surrounded by parenthesis
function stringWithoutParenthesis($str) {
    return substr($str, ($p = strpos($str, '(')+1), strrpos($str, ')')-$p);
}

// Check string surrounded by parenthesis and concatenate parenthesis around
function stringWithParenthesis($str) {
    $pseudo = substr($str, ($p = strpos($str, '(')+1), strrpos($str, ')')-$p);
    return (' ('.$pseudo.')');
}

// Generate an aleatory float with two decimals in the interval $min/$max
function random_float ($min,$max) {
    $value = ($min+lcg_value()*(abs($max-$min)));
    return (sprintf("%01.2f",$value)."bars");
}

// @Email.com array
function emailData() 
{
    $data = ['gmail.com','outlook.fr','yahoo.fr','protonmail.com','orange.fr','live.fr','laposte.net','icloud.com','sfr.fr','free.fr','mailo.com'];
    $value = array_rand(array_flip($data), 1);
    return $value;
}

// Lightnings equipements array
function lightningsData()
{
    $data = ['Terrasse','Abris Jardin','Abris Bois','Terrain Pétanque','Pignon','Massif Brasero','Allée','Portail',
    'Porte Entrée','Carport','Piscine','Bassin','Douche Piscine','Sapin','Chêne','Enrochement','Spa',
    'Cuisine Extérieure','Jacuzi','Pas Japonais','Massif','Haie Bambous','Ruche','Saule Pleureur','Guinguette',
    'Lagune','Balustrade','Globes','Bande LED','Serpentin','Palmiers','Jeux d\'Eau','Nénuphars','Escalier',
    'Lanternes','Pont','Ponton','Balancelle','Tonnelle','Guirlande','Photophores','Pergola','Massif Minéral',
    'Candélabre','Parasol Chauffant','Buddha','Potager','Spot Île'
    ];
    $value = array_rand(array_flip($data), 1);
    return $value;
}

// Pools equipements array
function poolsData()
{
    $data = ['Jet Enrochement','Jet Tonneau','Cracheur','Roue','Cascade','Trop-Plein','Pompe Remplissage',
    'Aspirateur','Filtre','Boule Lumineuse','Cygne','Grenouille','Héron Cendré','Canard'
    ];
    $value = array_rand(array_flip($data), 1);
    return $value;
}

// Waterings equipements array
function wateringsData()
{
    $data = ['Chemin Accès','Allée','Bassin','Enrochement','Massif Brasero','Bassin','Arrière Maison','Haie Bambous',
    'Piscine','Massif','Terrasse','Massif Minéral','Pergola','Potager','Tomates','Salade','Courges','Secteur Devant',
    'Secteur Arrière','Haie','Potiches','Goutte à Goutte','Jardinière'
    ];
    $value = array_rand(array_flip($data), 1);
    return $value;
}