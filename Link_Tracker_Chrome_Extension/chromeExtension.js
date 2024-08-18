// chrome://extensions/
let myLeads = []

const inputEl = document.getElementById("input-el")

const inputBtn = document.getElementById("input-btn")

const ulEl = document.getElementById("ul-el")

const saveTab = document.getElementById("tab-el")

const deleteBtn = document.getElementById("delete-btn")
const leadsFromLocalStorage  = JSON.parse(localStorage.getItem("myLeads"))

if(leadsFromLocalStorage)
{
    myLeads = leadsFromLocalStorage
    render(myLeads)
}


saveTab.addEventListener("click", function(){
    // console.log(tabs[0].url)

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        render(myLeads)

    })

})

function render(leads)
{
let listItems = ""
for(let i=0; i<myLeads.length; i++)
{
    // listItems += "<li><a target = '_blank' href = ' " + myLeads[i] + "'>" + myLeads[i] + "</a></li>"
    listItems += `
    <li>
    <a target = '_blank' href = '${leads[i]}'>
    ${leads[i]}
    </a>
    </li>
    `
    console.log(listItems)
}
ulEl.innerHTML = listItems
}

deleteBtn.addEventListener("dblclick", function(){
    console.log("Double Clickeds")
    localStorage.clear()
    myLeads = []
    render(myLeads)
})

inputBtn.addEventListener("click", function(){
    myLeads.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    render(myLeads)
})
