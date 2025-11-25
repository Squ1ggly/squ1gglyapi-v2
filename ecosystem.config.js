module.exports = {
    apps: [
        {
            name: "squ1ggly-api",
            script: "cd /home/st/squ1gglyapi ; npm i ; npx tsc ;  npm run start",
            time: true,
            env: {
                NODE_ENV: "production",
            },
        },
    ],
};
