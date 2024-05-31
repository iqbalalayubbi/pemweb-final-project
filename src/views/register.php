<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Register</title>
    <link href="../output.css" rel="stylesheet">
</head>

<body class="bg-gradient-to-r from-purple-300 to-purple-700 h-screen flex items-center justify-center">
    <div class="bg-white w-2/5 h-3/4 p-5 rounded-md">
        <form action="../controller/createUser.php" method="post" class="flex flex-col items-center justify-center h-full gap-3 w-full" id="form-register">
            <h1 class="text-3xl font-bold text-center text-purple-600">Register</h1>
            <div class="max-w-sm space-y-3 w-3/4 mt-3">
                <div>

                    <div class="relative">
                        <input type="text" class="peer py-3 px-4 ps-11 block w-full bg-gray-100 border-transparent rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none" placeholder="username" name="username" autocomplete="off" required>
                        <div class="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-4 peer-disabled:opacity-50 peer-disabled:pointer-events-none">
                            <svg class="flex-shrink-0 size-4 text-gray-500 dark:text-neutral-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                                <circle cx="12" cy="7" r="4"></circle>
                            </svg>
                        </div>
                    </div>
                    <p class="text-sm text-red-600 mt-2 username-status" id="hs-validation-name-error-helper"></p>
                </div>

                <div>
                    <div class="relative">
                        <input type="password" class="peer py-3 px-4 ps-11 block w-full bg-gray-100 border-transparent rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none" placeholder="password" name="password" required>
                        <div class="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-4 peer-disabled:opacity-50 peer-disabled:pointer-events-none">
                            <svg class="flex-shrink-0 size-4 text-gray-500 dark:text-neutral-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M2 18v3c0 .6.4 1 1 1h4v-3h3v-3h2l1.4-1.4a6.5 6.5 0 1 0-4-4Z"></path>
                                <circle cx="16.5" cy="7.5" r=".5"></circle>
                            </svg>
                        </div>
                    </div>
                    <p class="text-sm text-red-600 mt-2 password-status" id="hs-validation-name-error-helper"></p>
                </div>

                <div>
                    <div class="relative">
                        <input type="password" class="peer py-3 px-4 ps-11 block w-full bg-gray-100 border-transparent rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none" placeholder="Confirm Password" name="confirm-password" required>
                        <div class="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-4 peer-disabled:opacity-50 peer-disabled:pointer-events-none">
                            <svg class="flex-shrink-0 size-4 text-gray-500 dark:text-neutral-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M2 18v3c0 .6.4 1 1 1h4v-3h3v-3h2l1.4-1.4a6.5 6.5 0 1 0-4-4Z"></path>
                                <circle cx="16.5" cy="7.5" r=".5"></circle>
                            </svg>
                        </div>
                        <div class="absolute inset-y-0 end-0 flex items-center pointer-events-none pe-3">
                            <svg class="flex-shrink-0 size-4 text-teal-500 hidden" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" id="correct-icon">
                                <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                            <svg class="flex-shrink-0 size-4 text-red-500 hidden" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" id="wrong-icon">
                                <circle cx="12" cy="12" r="10"></circle>
                                <line x1="12" x2="12" y1="8" y2="12"></line>
                                <line x1="12" x2="12.01" y1="16" y2="16"></line>
                            </svg>
                        </div>
                    </div>
                    <p class="text-sm text-red-600 mt-2 confirm-status" id="hs-validation-name-error-helper"></p>
                </div>
            </div>
            <button type="submit" name="submit" disabled class="mt-8 py-3 w-3/4 px-4 inline-flex items-center gap-x-2 text-sm justify-center font-semibold rounded-lg border border-transparent bg-purple-600 text-white hover:bg-purple-700 disabled:opacity-50 disabled:pointer-events-none">
                Register
            </button>
            <span class="text-dark-normal">
                Already have account ? <a href="login.php" class="text-purple-600">Login</a>
            </span>
        </form>
    </div>

    <script src="https://code.jquery.com/jquery-3.7.1.min.js" integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" crossorigin="anonymous"></script>
    <script src="../script/register.js" type="module"></script>
</body>

</html>