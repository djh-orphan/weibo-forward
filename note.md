### bash 访问github的token

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



## 开发过程中遇到的问题

### vue-cli4 的使用

1. 在一个视图中import一个组件并使用时，需要在export default中用component导出该组件否则无法显示

2. 一个组件中有多个v-model时 使用方法如下：

   ​	原理：v-bind将input的value与props参数绑定 props参数值改变将改变input的value

   ​				@input将input事件与\$emit('update:参数', $event.target.value)绑定 每当有input事件会触发	emit调用update:参数 将事件的target.value赋值给props参数。

   ​				从而实现了双向绑定。

   ```html
   <html>
    <input type="text" class="form-control" placeholder="请输入用户名" id="username" :value="username"
           @input="$emit('update:username', $event.target.value)">
       <input type="text" class="form-control" placeholder="密码" id="pwd" :value="pwd"
           @input="$emit('update:pwd', $event.target.value)">
       </html>
   <script>
   export default{
       props: {
         username: String,
         pwd: String
       },
    emits: ['update:username', 'update:pwd'],
   }
   </script>  
   ```

   3. 外部依赖的使用：

      1. bootstrap   npm install --save @popperjs/core bootstrap@next

         ```js
         import 'bootstrap/dist/css/bootstrap.min.css'
         import 'bootstrap'
         ```

      2. axios   npm install --save axios vue-axios

         ```js
         import axios from 'axios'
         import VueAxios from 'vue-axios'
         createApp(App).use(VueAxios, axios)//使axios在应用级生效
         //在每个组件实例中可以使用this.axios来访问axios方法
         ```

### devServer的使用

##### 注意：devServer的配置是为了在开发环境下实现跨域访问，在生产环境下要实现跨域访问要采取额外的方法

```js
 devServer: {
    proxy: {
      '/api': { // 路径中有 /api 的请求都会走这个代理
        target: 'http://192.144.210.195:8000/', // 要访问的接口域名
        ws: true, // 是否启用  websockets
        // secure: false,
        changeOrigin: true,
        // 开启代理：在本地会创建一个虚拟服务端，
        // 然后发送请求的数据，并同时接收请求的数据，
        // 这样服务端和服务端进行数据的交互就不会有跨域问题
        pathRewrite: {
          '^/api': '' // 这里理解成用/api代替target里面的地址，即去掉路径中的/api  的这一截
        }
      }
    }
  }
```



### nginx跨域的配置

本例采用的是nginx做反向代理来实现跨域访问。

配置如下：

```C
 location ~* ^/api/(.*)$ {
	    rewrite ^/api/(.*)$ $1 break;	
       	proxy_pass    http://172.21.0.12:8000; //前端http请求转发的地址
        }
//凡是以/api开头的请求，都会被匹配去掉/api 然后将其转发到指定的地址。
```

> Tips：最好不要使用location后直接取正则匹配值，这会丢失get方法的参数。正确做法是使用rewrite对url进行提取

location 匹配规则：

- ~      波浪线表示执行一个正则匹配，区分大小写
- ~*    表示执行一个正则匹配，不区分大小写
- ^~    ^~表示普通字符匹配，如果该选项匹配，只匹配该选项，不匹配别的选项，一般用来匹配目录
- =      进行普通字符精确匹配
- @     "@" 定义一个命名的 location，使用在内部定向时，例如 error_page, try_files

Location处理逻辑:

1. 用uri测试所有的prefix string;
2. Uri精确匹配到=定义的loacation，使用这个location，停止搜索；
3. 匹配最长prefix string，如果这个最长prefix string带有^~修饰符，使用这个location，停止搜索，否则：
4. 存储这个最长匹配；
5. 然后匹配正则表达；
6. 匹配到第一条正则表达式，使用这个location，停止搜索；
7. 没有匹配到正则表达式，使用#4步存储的prefix string的location。

### gunicorn使用问题

**由于 gunicorn 使用的负载平衡算法有限，因此在使用此 Web 服务器时不能使用多个工作进程。因此，上面的所有示例都包含该选项。`-w 1`**

将多个工作进程与 gunicorn 一起使用的解决方法是启动多个单工作进程实例，并将它们置于功能更强大的负载均衡器（如[nginx ）之后](https://www.nginx.com/)。

### postgres使用问题

​		postgres 在使用时会创建一个postgres用户，只有使用该用户登录linux才可以进入数据库。奇怪的是登录klinux密码和进入数据库密码是分开的，我将其设置为一样的，个人目前测试进入数据库的密码基本无用，只要你可以登录到Linux就可以进入到指定数据库，之后创建用户，也需要分别在数据库和linux中同时创建用户这样才可以进入数据库。

​		关于模式：模式的所有者可以给其他用户分配创建权限和使用权限。创建之后，你只是可以在该模式创建表（或其他）以及使用数据，如果要修改某表，**还需要在修改该用户在该表的权限才可以。**