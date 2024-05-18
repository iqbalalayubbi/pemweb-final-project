<?php
function card($title, $description, $img)
{
    return "
    <div class='flex flex-col bg-white border shadow-xl rounded-xl w-1/4 h-1/3'>
        <div class='p-4 md:p-5'>
            <span class='bg-purple-600 p-3 inline-block rounded-full'>
                $img
            </span>
            <h3 class='text-lg font-bold text-dark-normal mt-3'>
                $title
            </h3>
            <p class='mt-1 text-dark-normal'>
                $description
            </p>
        </div>
    </div>";
}

function cardTutor($title, $img, $number)
{
    return "
    <div class='flex flex-col items-center bg-white border shadow-lg rounded-xl w-1/4 relative'>
        <img class='w-1/2' src=$img alt='Image Description'>
        <div class='p-4 md:p-5'>
            <h3 class='text-lg font-bold text-dark-normal px-3'>
                $title
            </h3>
        </div>
        <div class='absolute -top-8 left-0 mt-5 text-xl bg-purple-600 w-12 h-12 text-white rounded-full flex justify-center items-center font-bold'>$number</div>
    </div>";
}
