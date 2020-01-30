const UserModel = require("../database/models/user_model");


//showing a list of all users
async function index(req, res) {
    let users = await UserModel.find();
    res.json(users);
}

//shows form to make new user
function make(req, res) {
    res.render("CreateUserView");
}

const create = async (req, res) => {
    console.log(".......create method")
    let {
        googleID,
        firstName,
        lastName,
        email,
        password,
        confirmPW,
        image
    } = req.body;
    console.log(req.body);
    // console.log("ID--------- ", req.body._id);
    if (password != confirmPW) {
        console.log("Password does not match, try again")
        res.send("We have a problem");
    } else {
        let user = await UserModel.create({
            googleID,
            firstName,
            lastName,
            email,
            password,
            image
        })
        new UserModel(user)

            .save()
            .then(user => {
                console.log("WE CREATED A USER: ", user);
                console.log("ID--------- ", user._id);
                res.json(user);
            })
            .catch(err => res.status(500).send(err));
        res.status(200).json({
            message: "Successfully signed up!",
            success: true
        });
        // res.json('dashboard');
    }
}

const show = async (req, res) => {
    console.log("+++++++++++++++ ", req.params)
    let {
        id
    } = req.params
    let user = await UserModel.findById(id)
        .then(users => {
            console.log(users);
            res.json(users)
        })
        .catch(err => res.status(500).send(err))
}

//finds user to edit
const edit = async (req, res) => {
    let {
        id
    } = req.params
    let user = await UserModel.findById(id)
        .catch(err => res.status(500).send(err))
    res.render("user/edit", {
        user
    });
}

//saves updated info on user
const update = async (req, res) => {
    let {
        id
    } = req.params
    let {
        googleID,
        email,
        password,
        firstName,
        lastName,
        image
    } = req.body
    await UserModel.findByIdAndUpdate(id, {
            googleID,
            email,
            password,
            firstName,
            lastName,
            image
        })
        .catch(err => res.status(500).send(err));
    res.redirect(`/users/${id}`)
}

const destroy = async (req, res) => {
    let {
        id
    } = req.params
    await UserModel.findByIdAndDelete(id)
        .catch(err => res.status(500).send(err));
    res.redirect('/users');
}

const getUser = async (req, res) => {
    console.log('get user-------')
    // res.json(req.user)
}

module.exports = {
    index,
    create,
    make,
    show,
    edit,
    update,
    destroy,
    getUser
}