import { CustomRouter } from "./CustomRouter.js";
import { userModel } from "../../models/userModel.js";

class UsersRouter extends CustomRouter {
    init() {
        this.get("/",
            async (req, res) => {
                const users = await userModel.find({});
                res.json(users);
            });

        this.put("/:email", async (req, res) => {
            const { email } = req.params;
            const update = req.body;
            const updatedUser = await userModel.updateOne({ email }, update);
            res.json(updatedUser);
        });

        this.delete("/:email", async (req, res) => {
            const { email } = req.params;
            const deletedUser = await userModel.deleteOne({ email });
            res.json(deletedUser);
        });
    }
}
export default new UsersRouter();