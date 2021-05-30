const express = require('express');
const app = express()
const port = 3000;
const axios = require('axios');


// Initialising Sequelize
const Sequelize = require('sequelize')
const sequelize = new Sequelize('postgres://ramkaur:password@127.0.0.1:5432/Server',
    {
        dialect: 'postgres',
        protocol: 'postgres',
        define: {

            freezeTableName: true
        }
    })

// Defining Models

let Comment = sequelize.define('comments', {


    time: Sequelize.DATE,
    user_id: Sequelize.INTEGER,
    comment_id: Sequelize.INTEGER,
    document_id: Sequelize.INTEGER,
    commentor_id: Sequelize.INTEGER


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


//  Writing the APIs
app.get('/', (req, res) => {
    console.log("Home Route")
})


// app.get('/statsCollector/:id/:Action', async (req, res)=>
// {
//     var arr=['comments' , 'shares' , 'views']
//         console.log("I am inside Stats Collector Get REquest" ,req.params.id)

//     const {id , Action}=req.params
//     console.log('ID' , id)
//     console.log('Action' , Action)
//     if(Action=='Comment')
//     {
//        const result=  await Comment.findAll({
//             where: {
//               id: id
//             }
//           });
//           console.log("Comment in GET Request" , result)
//           res.send(result)
//     }
//     if(Action =='Share')
//     {
//         const result= await  Share.findAll({
//             where: {
//               id: id
//             }
//           });
//           console.log("Share in GET Request" , result)
//           res.send(result)
//     }
//     if(Action== 'View')
//     {
//         const result= await View.findAll({
//             where: {
//               id: id
//             }
//           });
//           console.log("View in GET Request" , result)
//           res.send(result)
//     }


// })


// Post API for addding Events to the DataBase

app.post('/', async (req, res) => {
    if (req.body.Action == "Comment") {
        res.send("Comment")


        var curr_user_id = req.body.user_id

        var curr_comment_id = req.body.comment_id
        var curr_document_id = req.body.document_id

        var curr_commentor_id = req.body.commentor_id


        const result = await Comment.create({ user_id: curr_user_id, comment_id: curr_comment_id, document_id: curr_document_id, commentor_id: curr_commentor_id, time: sequelize.literal('CURRENT_TIMESTAMP') })


        console.log("result   ", result)
        const found_comment = await Document.findOrCreate({
            where: { document_id: curr_document_id },
            defaults: {
                number_of_comments: 0,
                number_of_shares: 0,
                number_of_views: 0
            }
        });

        const updated_comment = await Document.update({ number_of_comments: found_comment[0].dataValues.number_of_comments + 1 }, {
            where: {
                id: found_comment[0].dataValues.id
            }
        });

        console.log("FOund Comment", found_comment[0].dataValues)
        console.log("Updated Comment", updated_comment)



        await axios.get(`http://localhost:8000/collect`, {
            params:
            {
                Result: result,
                Action: req.body.Action
            }
        })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            })
            .then(function () {
                console.log("Get Request Sent to Stats Collector")
            });




    }
    if (req.body.Action == "Share") {
        res.send("Share")
        var curr_sharer_id = req.body.sharer_id
        var curr_sharee_id = req.body.sharee_id
        var curr_document_id = req.body.document_id
        const result = await Share.create({ sharer_id: curr_sharer_id, sharee_id: curr_sharee_id, document_id: curr_document_id, time: sequelize.literal('CURRENT_TIMESTAMP') })
        const found_share = await Document.findOrCreate({
            where: { document_id: curr_document_id },
            defaults: {
                number_of_comments: 0,
                number_of_shares: 0,
                number_of_views: 0
            }
        });

        const updated_share = await Document.update({ number_of_shares: found_share[0].dataValues.number_of_shares + 1 }, {
            where: {
                id: found_share[0].dataValues.id
            }
        });

        console.log("Found share", found_share)

        await axios.get(`http://localhost:8000/collect`, {
            params:
            {
                Result: result,
                Action: req.body.Action
            }
        })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            })
            .then(function () {
                console.log("Get Request Sent to Stats Collector")
            });



    }
    if (req.body.Action == "View") {
        res.send("View")
        var curr_user_id = req.body.user_id
        var curr_document_id = req.body.document_id
        var curr_view_type = req.body.view_type

        const result = await View.create({ user_id: curr_user_id, document_id: curr_document_id, view_type: curr_view_type, time: sequelize.literal('CURRENT_TIMESTAMP') })

        const found_view = await Document.findOrCreate({
            where: { document_id: curr_document_id },
            defaults: {
                number_of_comments: 0,
                number_of_shares: 0,
                number_of_views: 0
            }
        });

        const updated_view = await Document.update({ number_of_views: found_view[0].dataValues.number_of_views + 1 }, {
            where: {
                id: found_view[0].dataValues.id
            }
        });
        console.log("Found View", found_view)
        await axios.get(`http://localhost:8000/collect`, {
            params:
            {
                Result: result,
                Action: req.body.Action
            }
        })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            })
            .then(function () {
                console.log("Get Request Sent to Stats Collector")
            });



    }
    console.log('Post request is running    ', req.body)


})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))