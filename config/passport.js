const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const User = require('../models/user');

// Optional: only these GitHub usernames can log in, for example ALLOWED_GITHUB_USERS=cassien,mary
const allowedUsers = (process.env.ALLOWED_GITHUB_USERS || '')
    .split(',')
    .map((name) => name.trim().toLowerCase())
    .filter(Boolean);

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL
}, async (accessToken, refreshToken, profile, done) => {
    try {
        if (allowedUsers.length > 0 && !allowedUsers.includes(profile.username.toLowerCase())) {
            return done(null, false);
        }
        // first login creates the account, the next logins only update lastLogin
        const user = await User.findOneAndUpdate(
            { githubId: profile.id },
            {
                username: profile.username,
                displayName: profile.displayName || profile.username,
                avatarUrl: profile.photos && profile.photos[0] ? profile.photos[0].value : undefined,
                profileUrl: profile.profileUrl,
                lastLogin: new Date()
            },
            { upsert: true, returnDocument: 'after', runValidators: true, setDefaultsOnInsert: true }
        );
        done(null, user);
    } catch (error) {
        done(error);
    }
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (error) {
        done(error);
    }
});
