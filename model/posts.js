module.exports = {


    posts: [
        {
            id: 'dbvnvdb',
            title: 'Teste do Mural',
            description: 'Descrição teste'
        },
    ],

    getAll() {
        return this.posts
    },

    newPost(title, description) {

        this.posts.push({ id: generateID(), title, description })
    },

    deletePost(idPost) {

        this.posts = this.posts.filter(function (el) {
            return el.id !== idPost
        })
    }

}

function generateID() {
    return Math.random().toString(36).substr(2, 9)
}