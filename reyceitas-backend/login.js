const {OAuth2Client} = require('google-auth-library');

const client = new OAuth2Client(process.env.CLIENT_ID);
const jwt = require('jsonwebtoken');
exports.login = (req,res,next) => {
    async function verify() {
        const ticket = await client.verifyIdToken({
            idToken : req.body.token,
            audience : "YOUR_GOOGLE_CLIENT_ID"
        });
        const payload = ticket.getPayload();
        const userDetails = {
            email : payload['email'],
            firstname : payload['given_name'],
            lastname : payload['family_name']
        }
        let token = jwt.sign(userDetails, process.env.CLIENT_SECRET, {expiresIn: 1440});
        res.status(200).json({ token: token })
    }
    verify().catch(console.error);
}