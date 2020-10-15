# 常用命令

# npm
npm设置淘宝镜像
```bash
npm install -g <package> --registry=https://registry.npm.taobao.org
```

## ionic cli
[ionic cli document](http://ionicframework.com/docs/cli/)

创建工程
```bash
ionic start <project_name>  <template> [options]

# example
ionic start shengyizhuanjia sidemenu --type=angular
```

在浏览器中运行，默认网址：<http://localhost:8100/>
```bash
# 在项目根目录下执行
ionic serve
```

使用angular cli生成功能
```bash
ionic generate <type> <name> [options]

# type: pages, components, directives, services, etc
# For a full list of available types, use 
npx ng g --help
# For a list of options for a types, use 
npx ng g <type> --help

# name
# For example, specify a name of "pages/New Page" to generate page files at src/app/pages/new-page/.

# example
ionic generate page pages/welcome
# or
ionic g page welcome
```

文件名 | 说明
---|---
welcome.page.html | HTML模板
welcome.module.ts | 模块
welcome.page.scss | 私有的样式表，app-welcome{}是一个元素选择器，名称和welcome.page.ts文件中元数据的选择器是一致的，  selector: 'app-welcome'。相当于有一个自定义的元素`<app-welcome></app-welcome>`
welcome.page.ts | 组件的类（class）代码
welcome.routing.ts | 路由模块文件
welcome.module>ts | 模块文件




## cordova

项目添加平台
```bash
ionic cordova platform add <android/ios>
```

编译
```bash
ionic cordova build android
```

运行
```bash
ionic cordova emulate android
# or
echo android| ionic cordova run
```

对resource目录下的图片进行处理（在项目根目录执行）
```bash
ionic cordova resources  

# 分别处理
ionic cordova resources --icon
ionic cordova resources --splash
```


