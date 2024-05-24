let myRow = document.getElementById("myRow")
let list = ["Corba","Burek","Sushi","Bistek","Big Mac","Dal" ]
let nameSearch = document.getElementById("nameSearch");
let search = document.getElementById("search");
let categories = document.getElementById("categories");
let area = document.getElementById("area");
let ingredients = document.getElementById("ingredients");
let contactUs = document.getElementById("contactUs");
let searchContainer = document.querySelector(".searchContainer");

// $(document).ready(() => {
//     $(".loading").fadeOut(3000)
// })

$(document).ready(() => {
    searchByName("").then(() => {
        $(".loading-screen").fadeOut(500)
    })
})


$("#openBtn").click(function(){
    $(".nav-container").css(`left`, `0`)
    $("#openBtn").css("display","none")
    $("#closeBtn").css("display","block")
    
});

$("#closeBtn").click(function(){
    let outerWidth = $(".nav-body").outerWidth();
    $(".nav-container").css("left", `-${outerWidth}px`)
    $("#openBtn").css("display","block")
    $("#closeBtn").css("display","none")
    
});

function closeNav(){
    let outerWidth = $(".nav-body").outerWidth();
    $(".nav-container").css("left", `-${outerWidth}px`)
    $("#openBtn").css("display","block")
    $("#closeBtn").css("display","none")
}

// Start Home Display
async function getMeals(name){
        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
        response = await response.json();
        displayHomeMeals(response.meals)
}
getMeals("")

function displayHomeMeals(arr){
    let box = "";
    for(i = 0 ; i < arr.length; i++){
        box += `<div class="col-md-3 box">
        <div onclick="getMealDetails('${arr[i].idMeal}')" class="main-box position-relative">
            <div class="img-box">
                <div class="box-layout position-absolute ">
                    <h3 class="ms-2">${arr[i].strMeal}</h3>
                </div>
                <img src="${arr[i].strMealThumb}" alt="" class="w-100">
            </div>
        </div>
    </div>`
    };
    myRow.innerHTML = box;
}

// End Home Display

// Start Search Section
async function searchByName(mealName){
    let response = await fetch(`http://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`)
    response = await response.json()
    displayHomeMeals(response.meals)
}
async function searchByletter(letter){
    let response = await fetch(`http://www.themealdb.com/api/json/v1/1/search.php?s=${letter}`)
    response = await response.json()
    displayHomeMeals(response.meals)
}
function displaySearch(){
    closeNav()
    myRow.innerHTML = ""
    searchContainer.classList.remove("d-none");
    searchContainer.innerHTML =`<input onkeyup="searchByName(this.value)" id="nameSearch" type="text" placeholder="Search By Name" class="form-control col-6">
    <input onkeyup="searchByletter(this.value)" id="letterSearch" type="text" placeholder="Search By First Letter" class="form-control col-6">`
}

// End Search Section



// Start category Section
async function getCategories(){
    let response = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php");
    response = await response.json();
    console.log(response.categories);
    displayCategories(response.categories)
}

function displayCategories(arr){
    closeNav()
    searchContainer.innerHTML = ""
    let box = ""
    for(i = 0 ; i < arr.length; i++){
        box += `<div class="col-md-3 box">
        <div onclick="getCategoryMeals('${arr[i].strCategory}')" class="main-box position-relative">
            <div class="img-box">
                <div class="box-layout position-absolute ">
                    <h3 class="d-block ms-2">${arr[i].strCategory}</h3>
                    <p class="d-block">${arr[i].strCategoryDescription.slice(0,40)}</p>
                </div>
                <img src="${arr[i].strCategoryThumb}" alt="" class="w-100">
            </div>
        </div>
    </div>`
    };
    myRow.innerHTML = box;
}

async function getCategoryMeals(category){
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    response = await response.json()
    displayHomeMeals(response.meals)
}


// End category Section

// Area Section
async function getArea(){
    let response = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?a=list");
    response = await response.json();
    console.log(response.meals);
    displayArea(response.meals)
}

function displayArea(arr){
    closeNav()
    searchContainer.innerHTML = ""
    let box = ""
    for(i = 0 ; i < arr.length; i++){
        box += `<div class="col-md-3 box">
        <div onclick="getAreaMeals('${arr[i].strArea}')" class="main-box position-relative">
            <div class="img-box">
            <i class="fa-solid fa-house-laptop fa-4x text-white"></i>
                <h3 class="d-block ms-2 text-white">${arr[i].strArea}</h3>
            </div>
        </div>
    </div>`
    };
    myRow.innerHTML = box;
}

async function getAreaMeals(area){
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
    response = await response.json()
    displayHomeMeals(response.meals)
}

// Start Ingredients Section

async function getIngredients(){
    let response = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?i=list");
    response = await response.json();
    displayIngredients(response.meals)
}

function displayIngredients(arr){
    closeNav()
    searchContainer.innerHTML = ""

    let box = ""
    for(i = 0 ; i < arr.length; i++){
        box += `<div class="col-md-3 box">
        <div onclick="getIngredientsMeals('${arr[i].strIngredient}')" class="main-box position-relative">
            <div class="img-box">
            <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                <h3 class="d-block ms-2 text-white">${arr[i].strIngredient}</h3>
                <p>${arr[i].strDescription}</p>
            </div>
        </div>
    </div>`
    };
    myRow.innerHTML = box;
}

async function getIngredientsMeals(Ingredients){
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${Ingredients}`)
    response = await response.json()
    displayHomeMeals(response.meals)
}

// End Ingredeints Section

// Start Contact Section

function displayContact() {
    closeNav()
    myRow.innerHTML = `<div class="contact min-vh-100 d-flex justify-content-center align-items-center">
    <div class="container w-75 text-center">
        <div class="row g-4">
            <div class="col-md-6">
                <input id="nameInput" onkeyup="inputsValidation()" type="text" class="form-control" placeholder="Enter Your Name">
                <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Special characters and numbers not allowed
                </div>
            </div>
            <div class="col-md-6">
                <input id="emailInput" onkeyup="inputsValidation()" type="email" class="form-control " placeholder="Enter Your Email">
                <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Email not valid *exemple@yyy.zzz
                </div>
            </div>
            <div class="col-md-6">
                <input id="phoneInput" onkeyup="inputsValidation()" type="text" class="form-control " placeholder="Enter Your Phone">
                <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid Phone Number
                </div>
            </div>
            <div class="col-md-6">
                <input id="ageInput" onkeyup="inputsValidation()" type="number" class="form-control " placeholder="Enter Your Age">
                <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid age
                </div>
            </div>
            <div class="col-md-6">
                <input  id="passwordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Enter Your Password">
                <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid password *Minimum eight characters, at least one letter and one number:*
                </div>
            </div>
            <div class="col-md-6">
                <input  id="repasswordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Repassword">
                <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid repassword 
                </div>
            </div>
        </div>
        <button id="submitBtn" disabled class="btn btn-outline-danger px-2 mt-3">Submit</button>
    </div>
</div> `
    submitBtn = document.getElementById("submitBtn")


    document.getElementById("nameInput").addEventListener("focus", () => {
        nameInputTouched = true
    })

    document.getElementById("emailInput").addEventListener("focus", () => {
        emailInputTouched = true
    })

    document.getElementById("phoneInput").addEventListener("focus", () => {
        phoneInputTouched = true
    })

    document.getElementById("ageInput").addEventListener("focus", () => {
        ageInputTouched = true
    })

    document.getElementById("passwordInput").addEventListener("focus", () => {
        passwordInputTouched = true
    })

    document.getElementById("repasswordInput").addEventListener("focus", () => {
        repasswordInputTouched = true
    })
}

let nameInputTouched = false;
let emailInputTouched = false;
let phoneInputTouched = false;
let ageInputTouched = false;
let passwordInputTouched = false;
let repasswordInputTouched = false;




function inputsValidation() {
    if (nameInputTouched) {
        if (nameValidation()) {
            document.getElementById("nameAlert").classList.replace("d-block", "d-none")

        } else {
            document.getElementById("nameAlert").classList.replace("d-none", "d-block")

        }
    }
    if (emailInputTouched) {

        if (emailValidation()) {
            document.getElementById("emailAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("emailAlert").classList.replace("d-none", "d-block")

        }
    }

    if (phoneInputTouched) {
        if (phoneValidation()) {
            document.getElementById("phoneAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("phoneAlert").classList.replace("d-none", "d-block")

        }
    }

    if (ageInputTouched) {
        if (ageValidation()) {
            document.getElementById("ageAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("ageAlert").classList.replace("d-none", "d-block")

        }
    }

    if (passwordInputTouched) {
        if (passwordValidation()) {
            document.getElementById("passwordAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("passwordAlert").classList.replace("d-none", "d-block")

        }
    }
    if (repasswordInputTouched) {
        if (repasswordValidation()) {
            document.getElementById("repasswordAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("repasswordAlert").classList.replace("d-none", "d-block")

        }
    }


    if (nameValidation() &&
        emailValidation() &&
        phoneValidation() &&
        ageValidation() &&
        passwordValidation() &&
        repasswordValidation()) {
        submitBtn.removeAttribute("disabled")
    } else {
        submitBtn.setAttribute("disabled", true)
    }
}

function nameValidation() {
    return (/^[a-zA-Z ]+$/.test(document.getElementById("nameInput").value))
}

function emailValidation() {
    return (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(document.getElementById("emailInput").value))
}

function phoneValidation() {
    return (/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(document.getElementById("phoneInput").value))
}

function ageValidation() {
    return (/^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(document.getElementById("ageInput").value))
}

function passwordValidation() {
    return (/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(document.getElementById("passwordInput").value))
}

function repasswordValidation() {
    return document.getElementById("repasswordInput").value == document.getElementById("passwordInput").value
}


// End Contact Section


// Start Details 

async function getMealDetails(mealID) {
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`);
    response = await response.json();

    displayMealDetails(response.meals[0])
}

function displayMealDetails(meal) {
    let ingredients = ""
    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients += `<li class="alert alert-info m-2 p-1">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>`
        }
    }

    let tags = meal.strTags?.split(",")
    if (!tags) tags = []

    let tagsStr = ''
    for (let i = 0; i < tags.length; i++) {
        tagsStr += `
        <li class="alert alert-danger m-2 p-1">${tags[i]}</li>`
    }

    let detailsBox = `
    <div class="col-md-4 text-white">
                <img class="w-100 rounded-3" src="${meal.strMealThumb}"
                    alt="">
                    <h2>${meal.strMeal}</h2>
            </div>
            <div class="col-md-8 text-white">
                <h2 >Instructions</h2>
                <p >${meal.strInstructions}</p>
                <h3><span class="fw-bolder">Area : </span>${meal.strArea}</h3>
                <h3><span class="fw-bolder">Category : </span>${meal.strCategory}</h3>
                <h3>Recipes :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${ingredients}
                </ul>

                <h3>Tags :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${tagsStr}
                </ul>

                <a target="_blank" href="${meal.strSource}" class="btn btn-success">Source</a>
                <a target="_blank" href="${meal.strYoutube}" class="btn btn-danger">Youtube</a>
            </div>`

    myRow.innerHTML = detailsBox
}

// End Deatils 


$(".loading").fadeOut(1500, function () {
    $(".loading").removeClass("d-flex")
})


