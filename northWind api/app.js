let tbody = document.querySelector('tbody')
let modal = document.getElementById("myModal");
let modalContent = document.querySelector(".modal-content");
let btn = document.getElementById("myBtn");
var span = document.getElementsByClassName("close")[0];
let contactName = document.querySelector('.contactName')
// let contactId = document.querySelector('.id')
let companyName = document.querySelector('.companyName')
let contactTitle = document.querySelector('.contactTitle')
let addEdit = document.querySelector('.addEdit')
let detailsInfo = document.querySelector('.detailsInfo')

function apiData() {
    fetch("https://northwind.vercel.app/api/customers")
        .then(response => response.json())
        .then(data => {
            let array = data
            data.forEach(element => {

                tbody.innerHTML += `
                <div class='umumi'>
                    <div class='box' id=${element.id}>
                        <td>${element.id}</td>
                        <td>${element.companyName}</td>
                        <td>${element.contactName}</td>
                        <td>${element.contactTitle}</td> 
                    </div>
                    <div class='btn'>
                    <form>
                        <button class='edit' id='${element.id}'>EDIT</button>
                        <button class='delete' id='${element.id}'>DELETE</button>
                        <button class='detail' id='${element.id}'>DETAIL</button>
                    <form>
                    </div>
                </div>
                `
            });


            let detailBtn = document.querySelectorAll('.detail')

            let delBtn = document.querySelectorAll('.delete')
            let editBtn = document.querySelectorAll('.edit')

            delBtn.forEach(element => {
                element.addEventListener('click', function () {

                    fetch(`${"https://northwind.vercel.app/api/customers/"}${this.id}`, {
                        method: "DELETE"
                    })
                    location.reload()
                })
            })
            editBtn.forEach(elem => {
                elem.addEventListener('click', function () {
                    fetch(`${"https://northwind.vercel.app/api/customers/"}${this.id}`)
                        .then(response => response.json())
                        .then(data => {
                            // console.log(data.id)
                            // contactId.value= `${data.id}`
                            companyName.value = `${data.companyName}`
                            contactName.value = `${data.contactName}`
                            contactTitle.value = `${data.contactTitle}`
                            // console.log(this.id)
                            addEdit.addEventListener('click', function () {

                                function edits(id) {
                                    fetch(`${"https://northwind.vercel.app/api/customers/"}${id}`, {
                                        method: "PUT",
                                        headers: { 'content-type': 'application/json' },
                                        body: JSON.stringify({
                                            "companyName": `${companyName.value}`,
                                            "contactName": `${contactName.value}`,
                                            "contactTitle": `${contactTitle.value}`,
                                        })
                                    })
                                    setTimeout(() => {
                                        location.reload()
                                    }, 1500)
                                }
                                edits(data.id);
                                modal.style.display = 'none'
                            })
                        })
                    modal.style.display = "block";

                })
            })

            detailBtn.forEach(evenet => {
                // modal.style.innerHTML=''
                evenet.addEventListener('click', function () {
                    // console.log(this.id)
                    fetch(`${"https://northwind.vercel.app/api/customers/"}${this.id}`)
                        .then(response => response.json())
                        .then(data => {
                            // console.log('sala,')

                            detailsInfo.innerHTML += `            
                                <h2>${data.id}</h2>
                                <h3>${data.companyName}</h3>
                                <h3>${data.contactName}</h3>
                                <h3>${data.contactTitle}</h3>

                                `

                        })
                    detailsInfo.style.display = "block";

                })
            })

        })
}
apiData()
let close = document.querySelector('.close')
close.addEventListener('click', function () {
    modal.style.display = "none";
    detailsInfo.style.display = "none";
})
window.onclick = function (event) {
    if (event.target == modal || event.target == detailsInfo) {
        modal.style.display = "none";
        modalContent.innerHTML = ''

    }
}
window.onclick = function (event) {
    if (event.target == detailsInfo) {
        detailsInfo.style.display = "none";
        detailsInfo.innerHTML = ''
    }
}