
const loadPhone = async (inputText='13',isShow) => {
    const res = await fetch(
      `https://openapi.programming-hero.com/api/phones?search=${inputText}`
    );
    const data =  await res.json();
    const phones = data.data;
    displayPhones(phones,isShow);
}



const displayPhones = (phones,isShow) => {
    // console.log(phones.length)
     
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
   
  

    if (phones.length > 13 && !isShow) {
        
        

        showBtn.classList.remove('hidden')
        // console.log(phones);

    }
     else {
        showBtn.classList.add("hidden");
     }
     
    if (!isShow) {
        phones = phones.slice(0, 12);
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
                  <button onclick="showDetails('${element.slug}')" class="btn btn-primary">Show Details</button>
                  
                </div>
              </div>
            </div>
    
    
    `;
    productContainer.appendChild(div);
    });
    
    toggleLoadingSpinner(false);
}




const SearchLoader = (isShow) => {

    toggleLoadingSpinner(true);
    const inputFieldId = document.getElementById("search-input-id");
    const inputText = inputFieldId.value;



    loadPhone(inputText,isShow);
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


 
const showAll = () =>{
  
    SearchLoader(true)
}


const showDetails = async (id) => {
    const res = await fetch(
      `https://openapi.programming-hero.com/api/phone/${id}`
    );
    const data = await res.json();
    const info = data.data;
    showDetailsDisplay(info);
}



const showDetailsDisplay = (phone) => {
    show_details_modal.showModal();

    // console.log(phone);

    const DetailsContainer = document.getElementById("details-container");

    DetailsContainer.textContent = ''

    const div = document.createElement('div');
    div.innerHTML = `
     <img class="w-1/2 mx-auto" src="${phone.image}" alt="">
       <h2 class="font-bold">${phone.name}</h2>
       <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
       <h2><span class="font-bold">Storage :</span> ${phone?.mainFeatures?.storage}</h2>
       <h2><span class="font-bold">Display Size :</span>${phone?.mainFeatures?.displaySize} </h2>
       <h2><span class="font-bold">Chipset :</span> ${phone?.mainFeatures?.chipSet}</h2>
       <h2><span class="font-bold">Memory :</span> ${phone?.mainFeatures?.memory}</h2>
       <h2><span class="font-bold">Slug : </span>${phone?.slug} </h2>
       <h2><span class="font-bold">Release data :</span> ${phone?.releaseDate}</h2>
       <h2><span class="font-bold">Brand :</span> ${phone?.brand}</h2>
       <h2><span class="font-bold">GPS : </span> ${phone?.others?.GPS}</h2>
    
    
    `;

    DetailsContainer.appendChild(div);
}



loadPhone()