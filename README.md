# [`koa2`](https://koa.bootcss.com/)和[`typescript`]((https://www.tslang.cn/docs))的服务项目

## 支持的功能
- [x] `typescript`编译：`nodemon`开发环境热更新，`ts-node`辅助编译
- [x] `husky`提交前eslint检查代码，`commitizen`规范化`git`提交
- [x] 具有常用的修饰方法修饰控制器
  - [x] `Contoller`修饰方法，表示控制器基础路由
  - [x] `Method`修饰方法，表示控制器方法对应的路由的处理方法
  - [x] `Validate`修饰方法，在真正处理前对请求参数进行验证
- [x] 环境配置
- [x] [`sequlize`](https://www.sequelize.com.cn/)数据库操作工具
- [x] `pm2`部署
- [x] `log4js`日志输出 