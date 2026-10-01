const router = require('express').Router();
const passport = require('passport');

router.get('/login', (req, res, next) => {
    //#swagger.tags=['Auth'];
    //#swagger.description='Open this address in the browser (not in Try it out) to sign in with GitHub.';
    //#swagger.responses[302] = { description: 'Redirects to GitHub to sign in' };
    next();
}, passport.authenticate('github'));

router.get('/github/callback', passport.authenticate('github', { failureRedirect: '/login-failed' }), (req, res) => {
    //#swagger.ignore = true;
    res.redirect('/');
});

router.get('/login-failed', (req, res) => {
    //#swagger.ignore = true;
    res.status(403).send('Login failed. This GitHub account is not allowed, or the login was cancelled.');
});

router.get('/logout', (req, res, next) => {
    //#swagger.tags=['Auth'];
    //#swagger.description='Signs you out and goes back to the home page.';
    //#swagger.responses[302] = { description: 'Redirects to the home page' };
    req.logout((error) => {
        if (error) return next(error);
        res.redirect('/');
    });
});

module.exports = router;
