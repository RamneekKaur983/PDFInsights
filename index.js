const express = require('express');
const { NOW } = require('sequelize');
const app = express()
const port = 3000;



const Sequelize = require('sequelize')
const sequelize = new Sequelize('postgres://ramkaur:password@127.0.0.1:5432/Server',
    {
        dialect: 'postgres',
        protocol: 'postgres',
        define: {

            freezeTableName: true
        }
    })
``
let Comment = sequelize.define('comments', {


    time: Sequelize.DATE,
    user_id: Sequelize.INTEGER,
    comment_id: Sequelize.INTEGER,
    document_id: Sequelize.INTEGER


});
let View = sequelize.define('views', {

    time: Sequelize.DATE,
    user_id: Sequelize.INTEGER,
    document_id: Sequelize.INTEGER,
    view_type: Sequelize.STRING

})

let Share = sequelize.define('shares',
    {
        time: Sequelize.DATE,
        sharer_id: Sequelize.INTEGER,
        sharee_id: Sequelize.INTEGER,
        document_id: Sequelize.INTEGER
    })

let Document = sequelize.define('documents',
    {

        document_id: Sequelize.INTEGER,
        user_id: Sequelize.INTEGER,
        number_of_shares: Sequelize.INTEGER,
        number_of_comments: Sequelize.INTEGER,
        number_of_views: Sequelize.INTEGER
    })

app.use(express.json());
// app.get('/insert', (req, res) => {
//     console.log("I am inside GET API")
//     App();

//     res.send('Hello WORLD')
// })
app.get('/', (req, res) => {
    console.log("Home Route")
})

// Writing the POST APIs for the proxy server

app.post('/', async (req, res) => {
    if (req.body.Action == "Comment") {
        res.send("Comment")


        var curr_user_id = req.body.user_id

        var curr_comment_id = req.body.comment_id
        var curr_document_id = req.body.document_id


        const result = await Comment.create({ user_id: curr_user_id, comment_id: curr_comment_id, document_id: curr_document_id, time: sequelize.literal('CURRENT_TIMESTAMP') })
        const result2 = await Document.findAll({
            where: {
                document_id: curr_document_id
            }
        });
        console.log("Result On Finding The Document", result2)


        if (result2.length == 0) {

            const result3 = await Document.create({ document_id: curr_document_id, number_of_comments: 1 })
            console.log("When there was no initail commebt", result3)

        }
        else if (result2.length != 0 && result2[0].dataValues.number_of_comments == null) {
            const result5 = await Document.update(
                { number_of_comments: 1 },
                { where: { document_id: curr_document_id } }
            )
            console.log("Comment Null", result5)
        }

        else {
            try {
                const result4 = await Document.update(
                    { number_of_comments: result2[0].dataValues.number_of_comments + 1 },
                    { where: { document_id: curr_document_id } }
                )
                console.log("Added 1 to the number of comments", result4)
            } catch (err) {
                console.log(err)
            }
        }

    }
    if (req.body.Action == "Share") {
        res.send("Share")
        var curr_sharer_id = req.body.sharer_id
        var curr_sharee_id = req.body.sharee_id
        var curr_document_id = req.body.document_id
        const result = await Share.create({ sharer_id: curr_sharer_id, sharee_id: curr_sharee_id, document_id: curr_document_id, time: sequelize.literal('CURRENT_TIMESTAMP') })

        const result2 = await Document.findAll({
            where: {
                document_id: curr_document_id
            }
        });
        console.log("Finding in Documents", result2)
        if (result2.length == 0) {

            const result3 = await Document.create({ document_id: curr_document_id, number_of_shares: 1 })
            console.log("Result 2 lenfth 0", result3)
        }
        else if (result2.length != 0 && result2[0].dataValues.number_of_shares == null) {
            const result5 = await Document.update(
                { number_of_shares: 1 },
                { where: { document_id: curr_document_id } }
            )
            console.log("Number of share null", result5)
        }

        else {
            try {
                const result4 = await Document.update(
                    { number_of_shares: result2[0].dataValues.number_of_shares + 1 },
                    { where: { document_id: curr_document_id } }
                )
                console.log("Added 1  to share", result4)
            } catch (err) {
                console.log(err)
            }
        }


    }
    if (req.body.Action == "View") {
        res.send("View")
        var curr_user_id = req.body.user_id
        var curr_document_id = req.body.document_id
        var curr_view_type = req.body.view_type

        const result = await View.create({ user_id: curr_user_id, document_id: curr_document_id, view_type: curr_view_type, time: sequelize.literal('CURRENT_TIMESTAMP') })

        const result2 = await Document.findAll({
            where: {
                document_id: curr_document_id
            }
        });
        console.log("Finding all documents", result2)
        if (result2.length == 0) {
            const result3 = await Document.create({ document_id: curr_document_id, number_of_views: 1 })
            console.log("Result 2 length 0", result3)
        }
        else if (result2.length != 0 && result2[0].dataValues.number_of_views == null) {
            const result5 = await await Document.update(
                { number_of_views: 1 },
                { where: { document_id: curr_document_id } }
            )
            console.log("View count null", result5)
        }

        else {
            try {
                const result4 = await Document.update(
                    { number_of_shares: result2[0].dataValues.number_of_views + 1 },
                    { where: { document_id: curr_document_id } }
                )
                console.log("Updated voew Count by 1", result4)
            } catch (err) {
                console.log(err)
            }
        }


    }
    console.log('Post request is running    ', req.body)


})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))