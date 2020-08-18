export default async(req, res) => {
    const user:string = "user";

    res.statusCode = 200;
    res.json({
        user: user,
    });
}