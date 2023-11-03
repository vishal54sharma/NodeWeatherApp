


const weatherform = document.querySelector("form")
const p1 = document.querySelector("#messageone")
const p2 = document.querySelector("#messagetwo")

weatherform.addEventListener("submit",(e)=>{
    e.preventDefault()
    const search = document.querySelector("input").value
    fetch("http://localhost:3000/weather?address="+search).then((response)=>{
    response.json().then(data=>{
        
        if(!data.error){
            
            
            p1.textContent="Its "+data.temperature+"F in "+ data.location+" . Weather is "+data.description[0]+" and it feels like "+data.feelslike+" F"
            p2.textContent=""
        }
        else{
            p1.textContent=""
            p2.textContent=data.error
        }
        
    })
})



})