document.addEventListener('DOMContentLoaded', () => {
    updatePosts()
})

function updatePosts() {

    fetch('http://localhost:3000/api/all').then(res => {
        return res.json()
    }).then(json => {
        let postElements = ''

        let posts = JSON.parse(json)
        posts.forEach((post) => {
            let postElement = ` <div id=${post.id} class="card mb-4">
                                    <div class="card-header">
                                        <h5 class="card-title">${post.title}</h5>
                                        <img src="../trash.png" id=${post.id} class="float-end" onclick="deletePost(this)">
                                    </div>
                                    <div class="card-body">
                                        <div class="card-text">${post.description}</div>
                                    </div>
                                </div>`
            postElements += postElement
        })

        document.getElementById('posts').innerHTML = postElements
    })

}

function newPost() {

    let title = document.getElementById('title').value
    let description = document.getElementById('desc').value
    let post = { title, description }

    if(title == '' || description == '') {
        return true
    }


    const options = {
        method: 'POST',
        headers: new Headers({ 'content-type': 'application/json' }),
        body: JSON.stringify(post)
    }

    fetch('http://localhost:3000/api/new', options).then(res => {
        console.log(res)
        updatePosts()

        document.getElementById('title').value = ''
        document.getElementById('desc').value = ''
    })
}

function deletePost(event) {
    console.log(event)
    fetch(`http://localhost:3000/api/${event.id}`, {method: 'DELETE'}).then(res => {
        console.log(res)
        updatePosts()
    })
}




let title = document.querySelector('#title')
let desc = document.querySelector('#desc')

const pattern = '[À-Úà-úa-zA-Z0-9 ]'

title.addEventListener('keypress' , (e) => {

    var char = String.fromCharCode(e.keyCode);
    
    if(!char.match(pattern)) {
        e.preventDefault()
    }

})

desc.addEventListener('keypress' , (e) => {

    var char = String.fromCharCode(e.keyCode);

    if(!char.match(pattern)) {
        e.preventDefault()
    }

})