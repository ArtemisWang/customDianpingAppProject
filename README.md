npm start运行

# 架构部分
## 1-功能路径
展示：首页->详情页
搜索：搜索页->结果页
购买：登录->下单->我的订单->注销

## 2-技术选型
UI：React
路由：React Router
状态管理：Redux
整体结构基础：ducks---reducer、action、actionTypes、actionCreators、selectors都放在一个文件中

## 3-各个页面对应的UI状态模块
1. 保存在redux/modules文件夹中
2. 包括首页home、商品详情detail、通用基础app状态
3. 在redux/modules/index.js中结合了所有的领域状态entities和所有的UI状态

## 4-领域状态模块
1. 存储在redux/modules/entities中
2. 包括：商品、店铺、评论、订单
3. 在redux/modules/entities/index.js中组合该文件夹内的几个领域状态

## 5-store创建
1. 保存在redux文件夹中store.js
2. 基于modules/index.js中的reducer创建
3. 配置redux调试插件、还有处理返回函数的action的redux-thunk中间件
4. 在index中引入store

## 6-网络请求封装
1. get和post方法封装在utils/request
2. url封装在utils/url

## 7-首页网络请求action
1. 存储在modules/home.js中
2. 猜你喜欢模块网络请求包括三种动作actionTypes：FETCH_LIKES_REQUEST开始请求、FETCH_LIKES_SUCCESS成功、FETCH_LIKES_FAILURE失败
3. 分别对应三个actionCreators
4. reducer中switch-case三种动作

## 8-定义中间件处理获取数据请求
1. 包括三种动作类型types、结束点endpoint的url、对应领域实体的结构schema
2. 每个领域实体（modules/entities）中，都需要定义该实体的schema，找出json数据中的某条key值与该领域实体对应起来的关系
3. 在middleware中创建api.js，强化中间件处理请求数据这一action，将请求数据的整个过程放在中间件中，简化home.js中代码

## 9-关于错误处理
1. 错误组件保存在components/ErrorToast文件夹中，包括两部分，错误信息组件和错误状态
2. 需要在redux/modules/app.js中引入，先定义清除错误actionTypes与actionCreators，在initialState中添加error对象，设置reducer，定义selector函数从state中解析出state.app.error值
3. 在containers/App组件中引入错误组件和当前App组件connect起来，这里的APP兼容了UI展示和业务逻辑，其中绑定dispatch时调用了bindActionCreators方法，用来绑定dispatch方法，调用该函数时直接执行dispatch

---


# UI部分-首页
## 1-首页组件划分原则
1. HomeHeader：查询、个人中心入口
2. Banner：横幅区域
3. Category:门类划分菜单区域
4. Headline:点评头条区域
5. Activity:主题活动区域
6. Discount:超值优惠活动区域
7. LikeList列表区域：展示猜你喜欢内容
8. Footer：链接到其他区域的超链接

## 2-Home组件保存位置
1. 1-7保存在src/containers/Home/components/
2. Footer组件保存在src/components/---用于存放整个应用通用的组件

## 3-Category(containers/Home/components/Category/)组件开发
1. 走马灯效果，使用react-slick-->https://react-slick.neostack.com/
2. BEM命名规范：block模块名、block__element节点名、block--modifier节点状态名
3. 想看到Category组件的渲染，需要在其上一级Home组件中引入，然后再整个业务的根组件App中引入Home组件
4. 发现问题：走马灯下方按钮，按下之后，当页面再次滑走后该位置显示黑色--解决办法：查找样式变化，看到button:focus:before和button:hover:before对应的opacity在走马灯经过后变为了1，重新设置其中一个对应的opacity值为.25即可，同时button:before中添加opacity项设置opacity为1，放置在默认属性之后执行

## 4-Headline(containers/Home/components/Headline/)组件开发
1. 头条信息连接自上而下滚动，类似上面的走马灯效果，仍然使用react-slick

## 5-Discount(containers/Home/components/Discount/)组件开发
1. 有一个header区域显示超值特惠logo，右侧一个更多优惠链接，下面三个特惠商品信息链接
2. 价格信息使用\<ins>和\<del>标签包裹，分别表示被插入的文本和删除文本，契合语义
3. 设置全局取消\<a>的下划线，在src下的index样式文件中设置\<a>text-decoration:none，在src/index中引入此文件，即可全局改变属性

## 6-LikeList(containers/Home/components/LikeList/)组件开发
1. 猜你喜欢列表，显示产品数据的列表，包括图片、店名、团购包含内容简略信息、价格、已售数量等
2. 创建LikeItem组件来处理每个商品信息，结构为左右两部分，\<a>包裹
3. 设置向下滑动加载更多内容，添加一个状态属性，设置加载的次数，当加载次数大于3次则返回一个加载更多的链接，设置延时，1s后更新新的状态，模拟加载数据的延时，绑定整个页面的滚动事件，didmount时绑定，当事件触发了三次后或者willunmount时解绑
4. 在通用组件src/components/中添加Loading组件，显示加载动画和正在加载字样
5. 当前加载的新数据使用原数据的复制

## 7-其他组件的开发(containers/Home/components/)
1. Header组件：左边选择城市，中间输入框搜索商户，右侧图像链接到登录或者用户界面
2. Footer组件定义在src/components/中，为通用组件，其他都在containers中保存

---


# 状态管理-首页
1. 首页的reducer和动作定义存储在redux/modules/home.js
2. 设置初始状态initialState，包括猜你喜欢和超值优惠两部分，包含ids、isFetching，其中猜你喜欢还包含目前已加载的页数pageCount
3. actionTypes定义，每个状态对应三个action：加载数据、加载成功、加载失败
4. actionCreators定义，分别经过fetchLikes()和fetchDiscounts()创建action，这两个函数中的初始action经过FETCH_DATA包裹，以调用之前编写FETCH_DATA中间件api
5. reducer编写，使用combineReducers分别连接likes和discounts这两个reducer

---

# 组件连接Redux-首页
## 1-selectors定义(redux/modules/home.js)
1. 定义的三个选择器来从state状态中提取到组件需要的数据
2. 分别获取得到猜你喜欢商品信息、折扣商品信息和猜你喜欢已加载页数

## 2-mapStateToProps和mapDispatchToProps(containers/Home/components/index.js)
1. 使用bindActionCreators绑定action和dispatch方法
2. 状态部分连接的主要是selector获取的三个数据的映射
3. dispatch部分映射actionCreators方法，使用bindActionCreators绑定dispatch到该方法上，当执行方法时自动派发动作

## 3-组件使用props(containers/Home/components/)
1. 猜你喜欢部分在didmount生命周期阶段加载数据，还有滚动到位置时加载数据，解析data和加载页数
2. 折扣部分的数据由于已经在上层Home组件的didmount阶段加载完成，这里只需要调用props中传来的商品信息即可

---

# React-Rounter-首页
1. 首页Router在containers/App/index.js中定义，设置switch标签，保证匹配到一个地址后不再匹配
2. HomeHeader中设置跳转到个人中心页和搜索页的Link
3. Discount中设置跳转到商品详情页
4. LikeItem中设置跳转到商品详情页
5. 解决了几个小的警告问题包括，a标签必须包裹有效的href，img标签必须有alt

(๑•̀ㅂ•́)و✧至此首页开发完毕(๑•̀ㅂ•́)و✧

---

# UI部分-团购详情页ProductDetail
## 1-组件划分
1. Header：顶部
2. ProductOverview：商品信息
3. ShopInfo：店铺信息
4. Detail：团购包含内容详情
5. Remark：其他信息
6. BuyButton：购买按钮

## 2-ProductDetail保存位置
1-6组件内容保存在containers/ProductDetail/中

## 3-ProductOverview组件开发
由于文字需要与图片重叠，设置文字的position为absolute，父级为relative

## 4-ShopInfo组件开发
星级显示部分，display设为inline-block，是两个图片重叠的效果，设置行内样式width值百分比控制显示的星级数量，100%对应五星，80%对应四星...

## 5-Detail团购详情组件开发
1. 布局难点在于中间商品类别与数量的部分，采用table的方式布局
2. 3行3列的形式中，第一行用th横跨三列，最后一行空一格，后两格中使用\<br>换行隔开上下两个词语

## 6-Remark购买须知组件开发
1. 主要包括：有效期、不可用日期、使用时间、预约提醒、规则提醒、包间、堂食外带等
2. 使用dl标签，dt、dd来表示有标题和解释的列表项

## 7-BuyButton和Header组件开发
1. 购买按钮使用一个\<a>标签表示
2. Header组件存储在通用组件下，团购详情页和购买页都使用该组件，只是样式不同，设计一个支持背景色替换的Header组件
3. Header组件中包含三个需要从props结构出的变量，分别为背景颜色、标题、和返回事件函数

---

# 状态管理-团购详情页ProductDetail

## 1-State定义
1. 店铺相关的状态定义在redux/modules/entities/shops中
2. schema定义中，name属性指代该领域实体在redux的state中是挂载到哪一个属性下，id属性指代数据中哪一个字段代表该实体的id值
3. 因为为每一个状态创建reducer的过程很重复，所以创建一个通用函数在utils文件夹下，来创建reducer
4. 整个团购详情页的state放在redux/modules/detail中，定义初始状态中包含product和relatedShop两个对象，其中包含isFetching状态和id值

## 2-Action定义
1. 定义获取团购详情数据的三种actionTypes，获取店铺信息数据的三种actionTypes
2. actionCreators中设置loadProductDetail和loadShopById两个函数，判断state中是否已经缓存了响应的状态，如果没有则调用中间件

## 3-Reducer定义
包括两部分：product和relatedShops，再通过combineReducers合并

---

# 组件状态连接-团购详情页ProductDetail
## 1-定义selector函数(redux/modules/detail.js)
1. 通过当前状态和id获取商品详细信息getProduct
2. 通过状态和商品id获取相关店铺信息getRelatedShop

## 2-组件和状态绑定
1. 使用react router中的this.props.history.goBack()获取返回页面
2. 使用props.match.params.id可以获取当前props中储存的id值

---

# 搜索页面
## 1-搜索页面组件划分
1. SearchBox搜索框
2. PopularSearch热门搜索
3. SearchHistory搜索历史

## 2-UI组件开发
1. SearchBox搜索框：输入框，删除按钮，搜索按钮，点击搜索后出来一个搜索结果列表
2. PopularSearch热门搜索：3*3的列表形式
3. SearchHistory搜索历史：显示搜索过的历史记录，点击末尾清空按钮清空历史记录，点击搜索历史列表项跳转到对应的搜索结果页

## 3-Redux模块
1. 设计关键词领域数据模块，在redux/modules/entities/keywords.js中
2. 其他的状态：搜索框内文本、文本检索结果列表、热门关键词、搜索历史记录

## 4-Action和Reducer定义
1. 包括actionTypes定义，actionCreators编写，调用middleware实现取数据
2. reducer定义针对四个状态来写

---

# 搜索结果页SearchResult
## 1-页面组件划分
1. SearchHeader
2. KeywordBox
3. Banner
4. ShopList
5. ShopItem对应ShopList中的每一个店铺信息

## 2-路由配置
1. 在App中配置SearchResult路由信息
2. 在Search页面中配置点击关键词跳转到搜索结果页，使用this.props.history.push达成

## 3-UI组件
1. 将Banner组件上移
2. KeywordBox先设置一个默认值text

## 4-Redux模块(redux/modules/search.js)
1. 搜索结果页与搜索页有很多状态的交互，索性将搜索结果的redux定义部分放在搜索页中
2. 状态：搜索框中的文本、搜索列表项信息
3. 搜索结果页中不需要调用redux当中的action，所以在连接时不需要mapDispatchToProps
4. 目前搜索结果页所显示的内容都是一样的，因为mock中的数据没变，有待后面更新

---

# 登录页
## 1-登录页组件划分
1. LoginHeader登录头部
2. LoginForm登录表单

## 2-登录页状态
包括：登录请求、登陆成功、登录失败、登出、密码和用户名的设定

## 3-React Router校验页面登录状态逻辑
1. 定义私人路由组件：src/containers/PrivateRoute/，判断登录状态，重定向
2. 登录状态需要持久化，不能因为刷新页面而丢失，使用localStorage.setItem()储存username和login状态，达到登录状态持久化的目的

---

# 个人中心页(src/containers/User/)
## 1-组件划分
1. UserHeader
2. UserMain：订单主体
3. OrderItem：订单列表项

## 2-UI组件部分
UserMain组件的title部分的状态先设置一个currentTab，保存当前被点击了的标签索引；列表项部分先判断item是否存在，不存的时候调用renderEmpty()，存在的时候调用renderOrderList；tab部分还需要设置一个onClick事件，控制currentTab的值

## 3-redux部分
1. actionTypes、actionCreators、reducer、selector都保存在redux/modules/user.js中
2. 设定一个领域状态保存在redux/modules/entities/orders.js中

## 4-订单删除部分弹框
保存在src/components/Confirm中，确认是否删除订单

---

# 购买功能(src/containers/purchase)
## 1-购买页组件
1. 下单页面，包括数量，价格小计，提交订单按钮
2. 配置路由时考虑只有登录状态的用户才可购买，路由使用privateRoute配置

## 2-状态设定
1. 状态：购买数量、购买成功的弹框
2. 其他的变量值可以通过已经存在的状态值获取


---

# Reselect优化选择器
1. 终端运行npm install reselect -D
2. 并不是所有的selectors函数都需要reselect优化
3. 将计算总价钱部分使用createSelector创建缓存，实现优化
4. 需要reselect进行改造的selector需要是包含业务逻辑的，否则不起作用
5. 性能优化了多少取决于原本selector中的业务逻辑有多复杂，以及该函数被调用的频次

---

# 动态加载
1. 使用dynamic import实现组件的动态加载
2. import("../pathOfComponent")返回的是一个promise对象，当组件加载完成后，该promise对象会变为完成状态，这时候再正常使用该组件
3. 我们可以将import("../pathOfComponent")包装进一个函数中，这样当调用该函数时，才会实现组件的加载，这样就可以实现组件的动态加载优化
4. 首先需要定义一个高阶组件(src/utils/AsyncComponent.js)，在高阶组件中封装上述逻辑

---

# 项目构建和部署
## 1-准备
1. yarn build编译文件，编译好的内容存储在了build文件夹内
2. brew install nginx安装nginx服务器，其常用于托管静态资源以及反向代理
3. brew info nginx查看已安装的nginx web资源默认路径，显示根路径Docroot is: /usr/local/var/www
4. 配置文件在 /usr/local/etc/nginx/nginx.conf，默认使用8080端口
5. 启动：nginx
6. 停止：nginx -s stop
7. 浏览器访问localhost:8080，可以进入nginx欢迎页面

## 2-开始部署
1. 在/usr/local/var/www所在文件夹/usr/local/var/内创建一个新文件夹web/
2. 在此文件夹内部署web app文件，将build/中的内容拷贝到web/文件夹内
3. 配置nginx配置文件(/usr/local/etc/nginx/nginx.conf)，可以看到http节点下已经存在了一个server节点，这个节点对应的就是上述nginx欢迎页面(8080端口那个)；在此server节点上面新建一个server节点，内部设置port、server_name、location
4. location中的root对应/usr/local/var/web，index对应其中的index.html
5. 重新加载配置文件：nginx -s reload
6. 此时访问localhost:8000可以看到我们的web app可以正常访问了，但是当我们点击一个商品后，跳转至商品详情页后点击刷新页面，整个页面显示空白，这是因为我们的web app是单页面应用，客户端路由的形式，刷新操作会将页面请求发送至服务器端，而我们的nginx服务器端找不到对应子路径的页面信息(web/文件夹内没有对应的子路径文件夹存在)，解决方法：我们需要配置当服务器找不到对应的页面信息时重定向至index.html，然后在客户端执行页面的跳转功能，定位到我们需要显示的页面。
7. location / 中添加try_files $uri /index.html;实现找不到文件重定向，再重新加载配置文件：nginx -s reload；此时解决了上述问题，在任意路径下刷新都可以正常显示页面了
8. 如何配置到子路径：在开发环境中修改package.json，添加"homepage":"http://localhost:8000/dianping"
，再重新编译yarn build；此时查看build/index.html，可以看到我们的静态资源路径都是在"/dianping/static/..."内的，但这样并不能够正常工作，还需要在react router配置中修改每一个path对应的路径，例如\<Route path="/login" component={Login} />修改为\<Route path="/dianping/login" component={Login} />；但这样每一个都修改很麻烦，可以修改父节点\<Router basename="/dianping">；然后重新编译yarn build，将build文件夹内容拷贝到web文件夹内的dianping文件夹，然后修改nginx配置文件loaction / 为location /dianping，下面的重定向uri变为/dianping/index.html；再重新加载配置；浏览器打开http://localhost:8000/dianping
，此时又发现我们的mock数据获取不到的问题，发现mock数据请求路径并没有被包裹在dianping/内，解决办法：修改nginx配置文件，添加路径匹配location /mock {
    		root   /usr/local/var/web/dianping;
    	}，再重新加载配置，运行发现解决了问题。

