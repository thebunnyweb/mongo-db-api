const devConfig = {
    MONGO_URL: 'mongodb://localhost:27017/gad-database',
    JWT_SECRET: 'bunnyissunny'
}
const prodCpnfig = {

}
const defaultConfig = {
    PORT: process.env.PORT || 3000
}

function environmentConfig(env){
    switch(env){
        case 'development':
            return devConfig;
        case 'production': 
            return prodConfig;
        default:
            return defaultConfig;
    }
}

export default {
    ...defaultConfig,
    ...environmentConfig(process.env.NODE_ENV)
}
