module.exports = {
    //Modification for jpg image
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
        // Important: return the modified config
        config.module.rules.push = {
            test: /\.(png|jpg|gif)$/i,
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 8192 // in bytes
                }
            }]
        }
        return config
    },
}


