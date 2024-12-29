const searchinput=document.querySelector('.search');
const searchbutton=document.querySelector('.button');
const recipecontainer=document.querySelector('.recipe');
const recipecontainer1=document.querySelector('.recipe1');
const homeSection = document.querySelector('.home');
const recipecontent= document.querySelector('.reccontent');
const closebut = document.querySelector('.close');
// Function to remove the background image when searching
const removeBackgroundImage = () => {
   homeSection.style.background = 'none'
    
};


const getrecipes= async (label)=>{
    recipecontainer.innerHTML=""
    recipecontainer1.innerHTML="<h2 >Fetching recipes...</h2>"
    try{
const dat= await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${label}`)
const res= await dat.json()
recipecontainer1.innerHTML=""
recipecontainer.innerHTML=""
console.log(res)

res.meals.forEach(k => {

    console.log(k)
    const recdiv=document.createElement('div')
    recdiv.classList.add('recip')
    recdiv.innerHTML=`<nav>
    <img " src="${k.strMealThumb}">
      <h3 >${k.strMeal}</h3>
    <p > ${k.strArea} Dish</p>
    <p >${k.strCategory}</p></nav>
    
    `
    const but=document.createElement("button")
    but.textContent="View Recipe"
    recdiv.appendChild(but);
    but.addEventListener(`click`,()=>{
         showr(k);
    })
   
    recipecontainer1.appendChild(recdiv)


});}
catch(error){
recipecontainer1.innerHTML="<h2>Cannot find this food</h2>"
}
}
const getIngredients=(me)=>{
    let ingred="";
    for(let i =1;i<40 ;i++){
        const ing=me[`strIngredient${i}`];
        if(ing){
            const m=me[`strMeasure${i}`];
            ingred+=`<li>${m}${ing}</li>`
        }
        else{
            break;
        }
    }
    return ingred;
}
closebut.addEventListener(`click`,()=>{
    recipecontent.parentElement.style.display="none";


})
const showr=(k)=>{
    recipecontent.innerHTML=`
     <h2 class="recname">${k.strMeal}</h2>
   <h3 class="recin">Ingredients:</h3>
   <ul class="recingredient">${getIngredients(k)}</ul>
<div> 
   <h3 class="rin">Instructions:</h3>
   <p class="rinstruction">${k.strInstructions}</p>
   </div>
    `
    recipecontent.parentElement.style.display="block"
}

searchbutton.addEventListener('click',(x)=>{
    // removeBackgroundImage();
x.preventDefault()
const value=searchinput.value.trim()
if(!value){
    recipecontainer.innerHTML=""
    recipecontainer1.innerHTML="<h2>please Type any meal in search box</h2>"
    return
}
getrecipes(value)
console.log("button click")
    })
