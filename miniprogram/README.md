# Kid Reading 微信小程序 MVP

这是 Kid Reading 手机点读小程序的第一版骨架，已包含：

- 课本列表
- 左右翻页
- 原生点读播放
- 原生录音跟读
- 播放自己的录音

## 如何开始

1. 安装微信开发者工具。
2. 打开微信开发者工具，选择“导入项目”。
3. 项目目录选择本文件夹：`/Users/max.mu/workspace/sandy-blog/miniprogram`。
4. 先用测试号打开，或把 `project.config.json` 里的 `appid` 改成你的小程序 AppID。
5. 开发阶段可以在开发者工具里勾选“不校验合法域名、web-view、TLS 版本以及 HTTPS 证书”。

## 需要在微信公众平台配置的域名

进入“小程序后台 -> 开发管理 -> 开发设置 -> 服务器域名”，配置：

- request 合法域名：`https://kidreading.club`
- downloadFile 合法域名：`https://kidreading.club`
- 如果后台已有 `https://kidreading.fun`，也可以一起保留；小程序只会校验当前数据里实际加载的域名。
- uploadFile 合法域名：暂时不用，后续如果上传录音再加

## 内容数据

当前数据文件是：

```text
miniprogram/data/books.js
```

它由网站的 `data.js` 转换而来。图片继续使用远程地址，音频会复制/下载到小程序本地：

```text
miniprogram/local-audio/...
```

同步命令：

```text
node ../tools/sync-miniprogram-books.js
```

后续更适合改成远程 JSON 接口，这样每天更新内容时不需要重新发版小程序。
