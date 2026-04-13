export async function login(req, res) {
    res.render("login");
}

export async function register(req, res) {
    res.render("register");
}

export async function failedRegister(req, res) {
    res.send("el registro falló, intente de nuevo");
}

export async function profile(req, res) {
    res.render("profile", {
        user: req.user || req.session.user
    });
}

export async function notFound(req, res) {
    res.status(404).send("no se encuentra la página");
}