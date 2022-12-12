const { list, insert, modify, remove } = require('../services/Projects');
const httpStatus = require('http-status');

const index = (req, res) => {
    list()
        .then(response => {
            res.status(httpStatus.OK).send(response);
        })
        .catch(e => res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e));
};

const create = (req, res) => {
    req.body.user_id = req.user;
    insert(req.body)
        .then(response => {
            res.status(httpStatus.CREATED).send(response);
        })
        .catch(e => {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e);
        });
};

const update = (req, res) => {
    //console.log(req.params?.id);
    //return false;
    if (!req.params?.id) {
        return res.status(httpStatus.BAD_REQUEST).send({
            message: "ID Bilgisi eksik..."
        })
    }

    modify(req.body, req.params?.id)
        .then(uptadedProject => {
            res.status(httpStatus.CREATED).send(uptadedProject);
        })
        .catch(e => {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error: "Güncelleme sırasında bir problem oluştu.." });
        });
};

const deleteProject = (req, res) => {
    if (!req.params?.id) {
        return res.status(httpStatus.BAD_REQUEST).send({
            message: "ID Bilgisi eksik..."
        })
    }

    remove(req.params?.id)
        .then((deletetedItem) => {
            if (!deletetedItem) return res.status(httpStatus.NOT_FOUND).send({ message: "Böyler bir kayıt bulunmamaktadır." })
            res.status(httpStatus.OK).send({ message: "Kayıt silinmiştir." });
        })
        .catch(e => {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error: "Silme işlemi sırasında bir problem oluştu.." });
        });
};

module.exports = {
    index,
    create,
    update,
    deleteProject,
};