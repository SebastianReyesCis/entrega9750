export async function currentSession(req, res) {
    res.send(req.user || req.session.user);
}

export async function logout(req, res) {
    req.session.destroy();
    res.clearCookie("connect.sid")
        .redirect("/login");
}