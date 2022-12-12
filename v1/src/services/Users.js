const User = require('../models/Users');

const insert = (data) => {
    //console.log(data);
    const user = new User(data);

    return user.save();
};

const loginUser = (loginData) => {
    return User.findOne(loginData);
}

const list = () => {
    return User.find({});
};

const modify = (where, data) => {
    //* Örnek ayrı bir filitreleme
    // const updateData = Object.keys(data).reduce((obj, key) => {
    //     if (key !== "password") obj[key] = data[key];
    //     return obj;
    // }, {});
    // return User.findOneAndUpdate(where, updateData, { new: true });

    return User.findOneAndUpdate(where, data, { new: true });
};

const remove = (id) => {
    return User.findByIdAndDelete(id);

};

module.exports = {
    insert,
    list,
    loginUser,
    modify,
    remove,
}