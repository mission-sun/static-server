module.exports = {
  apps : [{
    name: 'static-serve',
    script: './src/index.js',
    // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
    args: 'one two',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }],

  deploy : {
    production : {
      user : 'root-mission',
      host : '154.8.204.98',
      ref  : 'origin/new-static-serve',
      repo : 'git@github.com:mission-sun/static-server.git',
      path : '/home/root-mission/static-serve',
      'pre-deploy': "git fetch",
      'post-deploy' : 'npm install --registry=https://registry.npm.taobao.org && pm2 reload ecosystem.config.js --env production'
    }
  }
};


// 'post-deploy' : 'npm install && npm run build && pm2 start build.sh  --interpreter bash'
