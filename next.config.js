// @ts-ignore
const webpack = require("webpack");
require("dotenv").config();

module.exports = {
    webpack: config => {
        const env = Object.keys(process.env).reduce((acc, curr) => {
            acc[`process.env.${curr}`] = JSON.stringify(process.env[curr]);
            return acc;
        }, {});

        config.plugins.push(new webpack.DefinePlugin(env));

        return config;
    },
    env: {
        apiKey:            process.env.FB_API_KEY,
        authDomain:        process.env.FB_AUTH_DOMAIN,
        databaseURL:       process.env.FB_DATABASE_URL,
        projectId:         process.env.FB_PROJECT_ID,
        storageBucket:     process.env.FB_STORAGE_BUCKET,
        messagingSenderId: process.env.FB_MESSAGING_SENDER_ID,
        appId:             process.env.FB_APP_ID,
        measurementId:     process.env.FB_MEASUREMENT_ID,
    }
}