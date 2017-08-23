> 很早就知道了vue，在很早之前看过一丢丢官网，上个周末看了一个关于使用了vue-resources插件的vue购物车应用，功能比较齐全，但是代码极为简约，才发现这个使用了mvvm思维的vue是多么方便开发，所以来重新学习一下。搬运[vue官网]()

- 一 安装vue
  - 1 直接下载对应的js，Vue 会被注册为一个全局变量。__重要提示：在开发时请用开发版本，遇到常见错误它会给出友好的警告。__   
    -  [开发版](http://vuejs.org/js/vue.js) `包含完整的警告和调试模式`
    -  [生产版](http://vuejs.org/js/vue.min.js) `删除了警告，24.72kb min+gzip`
    - CDN
      -  推荐：`[unpkg](https://unpkg.com/vue@2.3.0/dist/vue.js)`, 会保持和 npm 发布的最新的版本一致。可以在 `[unpkg.com/vue/](https://unpkg.com/vue)` 浏览 npm 包资源。
      -  也可以从 `[jsdelivr](https://cdn.jsdelivr.net/vue/2.1.3/vue.js)` 或 `[cdnjs](https://cdnjs.cloudflare.com/ajax/libs/vue/2.1.3/vue.js)` 获取，不过这两个服务版本更新可能略滞后。
    -  `<script src="js/vue.js" type="text/javascript"></script>`  
        ### `tip`:
        开发环境不要用最小压缩版，不然就失去了错误提示和警告!
  ___    
  - 2 npm
    - 在用 Vue.js 构建大型应用时推荐使用 NPM 安装， NPM 能很好地和诸如 `[Webpack](http://webpack.github.io/)` 或 `[Browserify](http://browserify.org/)` 模块打包器配合使用。 Vue.js 也提供配套工具来开发`[单文件组件](https://cn.vuejs.org/v2/guide/single-file-components.html)`。
    ```shell          
                                # shell
      # 最新稳定版
      $ npm install vue
    ```    
    - 独立构建 vs 运行时构建<br/>
        有两种构建方式，独立构建和运行构建。它们的区别在于前者包含模板编译器而后者不包含。<br/>
        模板编译器的职责是将模板字符串编译为纯 JavaScript 的渲染函数。如果你想要在组件中使用 template 选项，你就需要编译器。<br/>
        独立构建包含模板编译器并支持 template 选项。 它也依赖于浏览器的接口的存在，所以你不能使用它来为服务器端渲染。<br/>
        运行时构建不包含模板编译器，因此不支持 template 选项，只能用 render 选项，但即使使用运行时构建，在单文件组件中也依然可以写模板，因为单文件组件的模板会在构建时预编译为 render 函数。运行时构建比独立构建要轻量30%，只有 17.14 Kb min+gzip大小。<br/>
        默认 NPM 包导出的是 运行时 构建。为了使用独立构建，在 webpack 配置中添加下面的别名：
        ```javascript
                                    // javascript
        resolve: {
          alias: {
            'vue$': 'vue/dist/vue.common.js'
          }
        }
        ```
        对于Browserify，可以添加一个别名到 package.json 中：
        ```javascript
                                    // javascript
        "browser": {
          "vue": "vue/dist/vue.common"
        },
        ```
  ___    

  - 3 CSP 环境<br>
    有些环境，如 Google Chrome Apps ，强制应用内容安全策略 (CSP) ，不能使用 new Function() 对表达式求值。这时可以用 CSP 兼容版本。独立的构建取决于该功能编译模板，所以无法使用这些环境。
    另一方面，运行时构建的是完全兼容 CSP 的。当通过 Webpack + vue-loader 或者 Browserify + vueify 构建时，在 CSP 环境中模板将被完美预编译到 render 函数中。
  ___        
  - 4 命令行工具
    Vue.js 提供一个官方命令行工具，可用于快速搭建大型单页应用。该工具提供开箱即用的构建工具配置，带来现代化的前端开发流程。只需几分钟即可创建并启动一个带热重载、保存时静态检查以及可用于生产环境的构建配置的项目：
    ```shell          
                                                      # shell
    # 全局安装 vue-cli
    $ npm install --global vue-cli
    # 创建一个基于 webpack 模板的新项目
    $ vue init webpack my-project
    # 安装依赖，走你
    $ cd my-project
    $ npm install
    $ npm run dev
    ```
    ### `tip`:
    CLI 工具假定用户对 Node.js 和相关构建工具有一定程度的了解。如果你是新手，我们强烈建议先在不用构建工具的情况下通读指南，熟悉 Vue 本身之后再研究 CLI。

    对于大陆用户，建议将 npm 的注册表源设置为`[国内的镜像](http://riny.net/2014/cnpm/)`，可以大幅提升安装速度。
  ___        
    - 5 开发版本
    重要: Github 仓库的 `/dist` 文件夹只有在新版本发布时才会更新。如果想要使用 Github 上 Vue 最新的源码，你需要自己构建。
    ```shell          
                                                        # shell
    git clone https://github.com/vuejs/vue.git node_modules/vue
    cd node_modules/vue
    npm install
    npm run build
    ```    
  ___        
    - 6 Bower
    ```shell          
                                                        # shell
    git clone https://github.com/vuejs/vue.git node_modules/vue
    cd node_modules/vue
    npm install
    npm run build
    ```    
  ___
    - 7 AMD 模块加载器<br>
    独立下载版本或通过 Bower 安装的版本已用 UMD 包装，因此它们可以直接用作 AMD 模块。
  ___               
- 二 vue基础语法
- 三 安装vue
- 四 安装vue
- 五 安装vue
