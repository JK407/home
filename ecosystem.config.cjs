module.exports = {
  apps: [
    {
      name: "oberl-home",
      script: "pnpm",
      args: "dev",
      interpreter: "none",
      watch: false,
      instances: 1, // 这将启动1个实例
      env: {
        NODE_ENV: "development",
      },
    },
  ],
};
