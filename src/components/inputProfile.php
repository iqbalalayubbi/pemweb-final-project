<?php

function inputUser($class, $type, $name, $value, $placeholder)
{
    return "
        <div class='w-1/4 flex justify-center items-center gap-3 $class'>
            <input type='$type' class='py-3 px-4 block w-4/5 border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-80 disabled:text-gray-500 disabled:pointer-events-none input-field' placeholder='$placeholder' value='$value' name='$name' disabled>
            <iconify-icon icon='material-symbols-light:change-circle-outline-rounded' width='24' title='change $name' class='hover:opacity-50 hover:cursor-pointer' onclick='enableInput(event)'></iconify-icon>
        </div>
    ";
}
