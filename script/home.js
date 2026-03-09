const loadIsues = () => {
    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    .then((res)=> res.json())
    .then((json) => {
        sobIssues = json.data;
        displayIssues(sobIssues);
    })
};

const loadDetails =async (id)=>{
    const url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`;
    const res = await fetch(url);
    const details = await res.json();
    displayDetails(details.data)
};
const displayDetails =(word) =>{
    console.log(word)
    const detailsBox = document.getElementById('details-container');
    detailsBox.innerHTML=` <div>
                <h1 class="font-semibold">${word.title}</h1>
            </div>
            <div class="flex gap-3">
                 <button class="text-[10px] px-4 py-[2px] rounded-xl bg-green-500 text-white border-none">${word.status}</button> 
                <p class="ct  text-[10px]">Opened by ${word.author}</p>
                <p  class="ct  text-[10px]">${word.createdAt}</p>
            </div>

            <div>
                <button class="text-[10px] px-4 py-[2px] rounded-xl bg-red-300 text-white border-none">${word.labels[0]}</button>
                <button class="text-[10px] px-4 py-[2px] rounded-xl bg-yellow-300 text-white border-none">${word.labels[1]}</button>
            </div>

            <div>
                <p  class="text-[10px] ct"> ${word.description}</p>
            </div>

            <div class="w-full bg-[#64748b10] flex p-5 justify-between items-center">
                <div><p class="ct text-[10px] font-semibold">Assigne: <br><span> ${word.assignee} </span></p></div>
                <div><p class="ct text-[10px] font-semibold">Priority: <br> <button  class="text-[10px] px-4 py-[2px] rounded-xl bg-red-700 text-white border-none">${word.priority}</button></p></div>
            </div>
`;
    document.getElementById('word_modal').showModal();
}


// dekhi ki hoy 
const displayIssues = (issues)=>{
   
    document.getElementById("total-issues").innerText = issues.length;
    const issueContainer =document.getElementById("issue-container" );
    issueContainer.innerHTML='';

    for(let issue of issues){

        // border color 
        const borderColor = issue.priority === "low" ?
        "border-t-purple-500":"border-t-green-500";

        // dan pasher button higa
        const hlwColor =(issue.labels[1] === "help wanted" || !issue.labels[1]) ?
        "bg-yellow-100 text-yellow-700": "bg-green-100 text-green-700";

        // bug er ga 
        const bugColor = issue.labels[0] === "bug"?
        "bg-red-100 px-4 text-red-700":"bg-green-100 text-green-700";

        // icon er ga 
        const iconColor=issue.priority === "low"?
        'src="./assets/Closed- Status .png"': ' src="./assets/Open-Status.png" '


        const cardDiv = document.createElement('div');
        console.log(issue)
        cardDiv.innerHTML=`
        <div onclick="loadDetails(${issue.id})" class=" h-full bg-white shadow rounded p-2 border-t-2 ${borderColor} space-y-2">
            <div class="flex justify-between items-center"><img class="w-3 h-3" ${iconColor} alt="">
            <button class="  rounded-lg bg-red-100 px-4 text-red-700 text-[10px] ">${issue.priority}</button>
            </div>

            <h2>${issue.title}</h2>
            <p class="ct text-[10px]">${issue.description}</p>

            <div class="py-2">
                <button class=" ${bugColor} uppercase rounded-lg  text-[10px] ">${issue.labels[0]}</button>
                <button class=" uppercase rounded-lg  px-4 ${hlwColor} text-[10px] ">${issue.labels[1] ?? 'HELP WANTED'}</button>
            </div>
            <hr>

            <p class="ct text-[10px] py-1">#1 by jhon_doe</p>
            <p class="ct text-[10px]">1/15/2024</p>
         </div>
        `
        issueContainer.appendChild(cardDiv)
    }

}

loadIsues()

// bttn er kaj 

document.getElementById("all-btn").addEventListener("click", () => {

    displayIssues(sobIssues);
    ActiveButton("all-btn");

});

document.getElementById("open-btn").addEventListener("click", () => {

    const openIssues = sobIssues.filter(issue => issue.priority !== "low");

    displayIssues(openIssues);
    ActiveButton("open-btn");

});

document.getElementById("close-btn").addEventListener("click", () => {

    const closedIssues = sobIssues.filter(issue => issue.priority === "low");

    displayIssues(closedIssues);
    ActiveButton("close-btn");

});

function ActiveButton(id){

    const buttons = document.querySelectorAll(".select-btn");

    buttons.forEach(btn=>{
        btn.classList.remove('btn-primary');
    });

    document.getElementById(id).classList.add("btn-primary");
    document.getElementById(id).classList.remove('btn-soft')

};

document.getElementById('btn-search').addEventListener("click",()=>{
    const input =document.getElementById('input-src');
    const searchValue = input.value.trim().toLowerCase;
    console.log(searchValue)
})

