# BlogDemo 项目说明

本仓库是合并后的博客项目单仓库，以原 `BlogDemo` 仓库作为主仓库，包含前端项目和后端 API 项目。

## 目录结构

```text
.
├── BlogDemo  # 博客前端项目，基于 Vue 2 / Vue CLI
└── BlogApi   # 博客后端接口项目，基于 Express
```

两个子目录都是独立项目，分别维护自己的 `package.json`、依赖和启动方式。

## 前端项目

前端项目目录：

```text
BlogDemo/
```

安装依赖：

```powershell
cd BlogDemo
npm install
```

本地启动：

```powershell
npm run serve
```

构建生产版本：

```powershell
npm run build
```

代码检查：

```powershell
npm run lint
```

## 后端项目

后端项目目录：

```text
BlogApi/
```

安装依赖：

```powershell
cd BlogApi
npm install
```

本地启动：

```powershell
node app.js
```

后端服务默认监听端口：

```text
8001
```

## 后端配置说明

后端数据库连接在 `BlogApi/db/index.js` 中读取：

```js
const config = require('../config')
```

因此运行后端前需要在 `BlogApi` 同级路径可解析的位置补充数据库配置模块，或根据实际环境调整 `BlogApi/db/index.js` 中的配置读取方式。

数据库配置通常需要包含以下字段：

```js
module.exports = {
  host: '数据库地址',
  port: 3306,
  user: '数据库用户名',
  password: '数据库密码',
  database: '数据库名'
}
```

## Git 合并说明

本仓库以 `BlogDemo` 为主仓库，已将原 `BlogApi` 仓库合并到 `BlogApi/` 二级目录下，并保留了后端仓库的提交历史。

当前仓库结构按前后端拆分为两个并列目录：

```text
BlogDemo/
BlogApi/
```
