const { insert, list, loginUser, modify, remove } = require('../services/Users');
const projectService = require("../services/Projects");
const httpStatus = require('http-status');
const { passwordToHash, generateAccessToken, generateRefreshToken } = require('../scripts/utils/helper');
const uuid = require('uuid');
const eventEmitter = require('../scripts/events/eventEmitter');
const path = require('path');

const index = (req, res) => {
    list()
        .then((response) => {
            res.status(httpStatus.OK).send(response);
        })
        .catch((e) => res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e));
};

const login = (req, res) => {
    req.body.password = passwordToHash(req.body.password);
    loginUser(req.body)
        .then((user) => {
            if (!user) return res.status(httpStatus.NOT_FOUND).send({ message: "E-mail ya da Parola yanlış..." })
            user = {
                ...user.toObject(),
                tokens: {
                    access_token: generateAccessToken(user),
                    refresh_token: generateRefreshToken(user),
                },
            };
            delete user.password;
            res.status(httpStatus.OK).send(user)
        })
        .catch((e) => res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e));
}

const create = (req, res) => {
    const cryptedPassword = passwordToHash(req.body.password);
    //console.log(req.body.password, cryptedPassword);

    req.body.password = passwordToHash(req.body.password);
    //return false;
    insert(req.body)
        .then((response) => {
            // console.log(`\x1b[31m\x1b[46m 11111111111 \x1b[0m`);
            res.status(httpStatus.CREATED).send(response);
        })
        .catch((e) => {
            // console.log(`\x1b[31m\x1b[46m ${e} \x1b[0m`);
            // console.log(`\x1b[31m\x1b[46m 222222222222222 \x1b[0m`);
            res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e);
        });
};

const projectList = (req, res) => {
    projectService.list({ user_id: req.user?._id }).then(projects => {
        res.status(httpStatus.OK).send(projects)
    }).catch(() => res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
        error: "Proje listesini getirirken beklenmedik bir hata oluştu."
    }))
};

const resetPassword = (req, res) => {


    const new_password = uuid.v4()?.split("-")[0] || `usr-${new Date().getTime()}`;

    modify({ email: req.body.email }, { password: passwordToHash(new_password) })
        .then(updatedUser => {
            if (!updatedUser) return res.status(httpStatus.NOT_FOUND).send({ error: "Böyle bir kullanıcı bulunmamaktadır..." });

            eventEmitter.emit("send_email", {
                to: updatedUser.email,
                subject: "Şifre Sıfırlama",
                html: `Talebiniz üzerine şifre sıfırlama işleminizi gerçekleşmiştir. <br/> Giriş yaptıktan sonra şifrenizi değiştirmeyi unutmatın! <br/> Yeni Şifreniz : <b>${new_password}</b>`
            });
            res.status(httpStatus.OK).send({ message: "Şifre sıfırlama işlemi için sisteme kayıtlı e-mail adresinize gerekli bilgiler gönderilmiştir." });
            //console.log(updatedUser);
        })
        .catch((e) => res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error: "Şifre resetleme sırasında sorun oluştu" }));
};

const update = (req, res) => {
    modify({ _id: req.user?._id }, req.body)
        .then(updatedUser => {
            res.status(httpStatus.OK).send(updatedUser);
        })
        .catch(() => res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error: "Güncelleme işlemi sırasında bir problem oluştu." }))
};

const deleteUser = (req, res) => {
    if (!req.params?.id) {
        return res.status(httpStatus.BAD_REQUEST).send({
            message: "ID Bilgisi eksik..."
        })
    }

    remove(req.params?.id)
        .then((deletetedItem) => {
            if (!deletetedItem) return res.status(httpStatus.NOT_FOUND).send({ message: "Böyler bir kayıt bulunmamaktadır." });
            res.status(httpStatus.OK).send({ message: "Kayıt silinmiştir." });
        })
        .catch(e => {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error: "Silme işlemi sırasında bir problem oluştu.." });
        });
};

const changePassword = (req, res) => {
    req.body.password = passwordToHash(req.body.password);

    modify({ _id: req.user?._id }, req.body)
        .then(updatedUser => {
            res.status(httpStatus.OK).send(updatedUser);
        })
        .catch(() => res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error: "Güncelleme işlemi sırasında bir problem oluştu." }))
};

const updateProfileImage = (req, res) => {
    //! 1- Resim kontrolü
    if (!req?.files?.profile_image) {
        return res.status(httpStatus.BAD_REQUEST).send({ error: "Bu işlemi yapabilmek için yeterli veriye sahip edilsiniz." });
    }

    //! 2- Upload işlemi
    const extension = path.extname(req.files.profile_image.name);
    const fileName = `${req?.user?._id}${extension}`;
    const folderPath = path.join(__dirname, "../", "uploads/users", fileName);
    req.files.profile_image.mv(`${folderPath}`, (err) => {
        if (err) return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error: err });
        //console.log("resim yüklendi");
        modify({ _id: req.user._id }, { profile_image: fileName })
            .then(updatedUser => {
                res.status(httpStatus.OK).send(updatedUser);
            })
            .catch(e => res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error: "Upload başarılı fakat kayıt sırasında bir sorun oluştu." }));
    })

    //! 3- Db save İşlemi
    //! 4- Responses
}


module.exports = {
    index,
    login,
    create,
    projectList,
    resetPassword,
    update,
    deleteUser,
    changePassword,
    updateProfileImage,
};