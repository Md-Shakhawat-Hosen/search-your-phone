
const loadPhone = async (inputText='13') => {
    const res = await fetch(
      `https://openapi.programming-hero.com/api/phones?search=${inputText}`
    );
    const data =  await res.json();
    const phones = data.data;
    displayPhones(phones);
}



const displayPhones = (phones) => {
    console.log(phones.length)
     
    const productContainer = document.getElementById('product-container');

     productContainer.textContent = '';


     const notFound = document.getElementById("not-found");
    if (phones.length === 0) {
        notFound.classList.remove('hidden')
    }
    else {
       notFound.classList.add("hidden");
    }


 const showBtn = document.getElementById("show-all-btn");
   
  

    if (phones.length > 13) {
        
        phones = phones.slice(0,12);

        showBtn.classList.remove('hidden')
        console.log(phones);

    }
     else {
        showBtn.classList.add("hidden");
     }
     
 
     

    phones.forEach(element => {
         const div = document.createElement("div");

         div.innerHTML = `
    
      <div class="card card-compact w-96 bg-slate-200 shadow-xl">
              <figure>
                <img class="p-4"
                  src="${element.image}"
                  alt="Shoes"
                />
              </figure>
              <div class="card-body">
                <h2 class="text-center font-bold">${element.phone_name}</h2>
                <p class="text-center">There are many variations of passages of available, but the majority have suffered</p>
                <h2 class="text-center font-bold">$999</h2>
                <div class="card-actions justify-center">
                  <button class="btn btn-primary">Show Details</button>
                </div>
              </div>
            </div>
    
    
    `;
    productContainer.appendChild(div);
    });
    
    toggleLoadingSpinner(false);
}




const SearchLoader = () => {

    toggleLoadingSpinner(true);
    const inputFieldId = document.getElementById("search-input-id");
    const inputText = inputFieldId.value;



    loadPhone(inputText);
}



const toggleLoadingSpinner = (isLoading) => {
     const spinner = document.getElementById('spinner-id');
     if (isLoading) {
        spinner.classList.remove('hidden')
     }
     else {
        spinner.classList.add('hidden')
     }
}

//  const inputFieldId = document.getElementById("search-input-id");
 
// const showAll = () =>{
  
//     const text = inputFieldId.value;
//     loadPhone(text)
// }


loadPhone()