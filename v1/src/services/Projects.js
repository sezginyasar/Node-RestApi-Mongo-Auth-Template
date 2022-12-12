const Project = require('../models/Projects');

const list = (where) => {
    return Project.find(where || {}).populate({
        path: "user_id",
        select: "full_name email profile_image",
    });
};

const insert = (data) => {
    //console.log(projectData);
    const projects = new Project(data);

    return projects.save();
};

const modify = (data, id) => {
    // return Project.findById(id)
    //     .then(p => {
    //         p.name = data?.name;
    //         return p.save();
    //     });

    return Project.findByIdAndUpdate(id, data, { new: true });

};

const remove = (id) => {
    return Project.findByIdAndDelete(id);

};

module.exports = {
    list,
    insert,
    modify,
    remove,
}