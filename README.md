## koa2和typescript的服务项目
[koa](https://koa.bootcss.com/)
[typescript](https://www.tslang.cn/docs)

### 直接引入的koa插件
- 路由：
[koa-router](https://github.com/koajs/router/blob/HEAD/API.md)
- 验证参数模块：
[async-validator](https://github.com/yiminghe/async-validator)

### 支持的功能
- [x] typescript编译：nodemon开发环境热更新，ts-node辅助编译
- [x] husky git钩子提交前eslint检查代码，commitizen规范化git提交
- [x] 具有常用的修饰方法修饰控制器
  - [x] Contoller修饰方法，表示控制器基础路由
  - [x] Method修饰方法，表示控制器方法对应的路由的处理方法
  - [x] Validate修饰方法，在真正处理前对请求参数进行验证
- [x] 环境配置
- [x] sequlize数据库工具
- [x] pm2部署