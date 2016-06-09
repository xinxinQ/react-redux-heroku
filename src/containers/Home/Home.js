import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { Jumbotron, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

export default class Home extends Component { // eslint-disable-line
  render() {
    return (
      <div>
        <Helmet title="主页"/>
        <Jumbotron>
          <div className="container">
            <h1>React Redux Book</h1>
            <p>学习使用React与Redux搭建Universal应用</p>
            <p>
              <LinkContainer to="/login">
                <Button bsStyle="primary">了解更多</Button>
              </LinkContainer>
            </p>
          </div>
        </Jumbotron>
        <div className="container">
          <h1>技术简介</h1>
          <h2>1.1 React</h2>
          <p>
            React官方是这样介绍React的：“一个声明式的、高效、灵活的创建用户界面的JavaScript库。”这究竟是什么意思呢？下面我们来逐一解读一下。
          </p>
          <p>
            声明式是指只需要使用React描述组件的样子就可以改变用户界面。传统方法是命令式的操作DOM。
            操作DOM不仅需要记住大量的API，而且还会增加代码的耦合度，使得项目难以维护。
            React使用自己的魔法改变界面，让开发者不用再操作DOM，降低了处理视图的难度。
          </p>
          <p>
            高效主要得益于React的虚拟DOM，以及其Diff算法。传统的Diff算法的复杂度是极高的，
            而Facebook的工程师聪明地结合Web界面的特点改进了Diff算法，使其性能出众。
            拥有了高性能的Diff算法，我们就可以“刷新”全部界面，但只更新需要改变的那部分界面了。
            也正因为这个原因，React可以使用单向数据流改变界面，抛弃了传统的数据绑定，减少了样板代码和重量。
          </p>
          <p>灵活是指React可以作为视图层与其他技术栈配合使用，比如代替Angular的指令，或者与Redux搭配等等。</p>
          <p>
            除了上面介绍的这些优点外，React最让人兴奋的莫过于Universal渲染和衍生的React Native项目了。
            Universal渲染指的是一套代码可以同时在服务端和客户端渲染，这也是本书重点介绍的技术。
            React Native则让你可以使用前沿的Javascript为IOS、Android编写跨平台原生APP。
          </p>
          <p>
            如果你还是很困惑React究竟是什么，不用过于纠结，有时候只管先把某些东西拿来用就好了,
            在实际的使用中慢慢理解它是什么，本书将教你如何用 React开发Web程序。
          </p>
          <h2>1.2 Redux</h2>
          <p>Redux 是一个JavaScript状态容器，提供可预测的状态管理。</p>
          <p>
            过去开发网络应用程序，就是从服务器获取数据并渲染。但是随着程序越来越复杂，
            程序员们越来越难做到心里有数。特别是当接手别人的复杂项目的时候，需要花很多工夫去了解数据流、运行机制等等。
            为了解决这些问题，我们需要有一个“仪表盘”，可以随时显示程序的状态，包括数据、变化等等。我们还需要一个“规则”，
            遵守“规则”让状态变得可预测，让程序运行得井井有条。于是Redux便诞生了！
          </p>
          <p>Redux可以用这三条基本原则来描述：单一数据源；State是只读的；使用纯函数来执行修改。</p>
          <p>
            单一数据源是指整个应用的state被存储在一棵对象树中，并且这个对象树只存在于唯一一个store中。这里的state指的是数据。
            单一数据源是Redux区别与其他同类工具的一个重要特征。
            这条原则可以帮助解决Universal渲染中的数据传递问题：服务端渲染后只需要给客户端传递一个变量即可，这个变量就是那个单一state树。
            同时，单一数据源也使得“撤销重做功能”变得容易。
            因为所有的变化都在一个state树中发生。
          </p>
          <p>
            State只读，并不代表我们无法改变state。如果无法改变state，那么程序将不会发生变化。这里的“只读”指的是不允许直接对state这个变量重写赋值，
            但是可以通过action和reducer返回一个新的state，而且限制只能使用这一方法。打个比方，条条大路通罗马，
            但是很难预测人们会从哪条路过来，而规定了只能通过一条路来到罗马后，
            预测和管理就变得简单了。
          </p>
          <p>
            使用纯函数来执行修改是指更新state的reducer只是一些纯函数，它接收先前的 state 和 action，
            并返回新的state。一个reducer对于一个大型项目而言是远远不够的，
            所幸reducer可以拆分成不同的函数，分别独立地操作state树的不同部分，因为reducer只是函数，你可以控制它们被调用的顺序，传入附加数据。
          </p>
          <p>想要理解Redux并不容易，但无疑它是非常优秀的。Redux及其丰富的生态系统可以帮助我们搭建更容易维护的Web 程序。</p>
          <h2>1.3 Node与Universal渲染</h2>
          <p>React与Redux既可以在浏览器端运行也可以在服务器端运行。这里的服务器端指的则是Node服务器。</p>
          <p>
            Node和传统的Web服务器之间的区别主要是：更简单、单线程、平台无关等。但最重要的是它使用了JavaScript这门原来在浏览器运行的语言，
            所以我们才可以实现Universal渲染——用一套代码在服务端和客户端渲染。
          </p>
          <p>
            最初所有的渲染都是发生在服务器端的，但是在2005年，AJAX的到来将渲染过程转移到了客户端，通过调用服务器的API进行数据的获取和修改。
            此后诞生了无数的JavaScript框架来实现客户端渲染和路由控制。但是开发者们意识到一个问题：客户端渲染破坏了搜索引擎的索引，
            因为搜索引擎无法和JavaScript通话。
            除此之外，客户端渲染在第一次会加载较多模板和脚本，严重影响了网页打开的速度。
          </p>
          <p>
            很明显，开发者们需要同时在服务端和客户端进行渲染，而且最好共用一套代码。于是Universal渲染出现了。
            Universal渲染实现了更快的加载速度，更好的SEO，更优雅的交互效果，
            更容易维护的代码……这一切都关乎你或者你老板的项目的利益。作为软件工程师的你应该明白这些，并引起足够的重视，用技术帮助项目盈利。
          </p>
          <p>React与Redux是实现Universal渲染的理想技术组合。本书会重点介绍使用React与Redux实现Universal渲染的最佳实践。</p>
          <h2>1.4 Babel</h2>
          <p>Babel是一个JavaScript编译器，可以让开发者提前用到下一代的JavaScript。</p>
          <p>Babel可以和各种工具配合使用，包括如下这些。</p>
          <ul>
            <li>Babel的内建工具：Babel CLI、Require Hook。</li>
            <li>各种构建系统：Webpack、Gulp、Grunt、RequireJs等。</li>
            <li>测试框架：Jasmine、Karma、Mocha等。</li>
            <li>语言API：C#/.NET、Node、Ruby。</li>
            <li>模板引擎：Jade。</li>
            <li>编辑器：WebStorm。</li>
            <li>调试器：Node Inspector等等。</li>
          </ul>
          <p>本书将在Node和浏览器两个环境中运行React与Redux程序，所以我们需要学习在Node和在Webpack中使用Babel。</p>
          <h2>1.5 Webpack</h2>
          <p>
            Webpack 是当下最热门的前端资源模块化管理和打包工具。它可以将许多松散的模块按照依赖和规则打包成符合生产环境部署的前端资源，
            还可以将按需加载的模块进行代码分隔，等到实际需要的时候再异步加载。通过 loader 的转换，
            任何形式的资源都可以视作模块，比如CommonJs模块、AMD模块、ES6模块、CSS、图片、JSON、Coffeescript、 LESS 等。
          </p>
          <p>本书使用Webpack的功能主要包括：</p>
          <ul>
            <li>编译ES2015</li>
            <li>编译React</li>
            <li>加载图片文件</li>
            <li>加载字体文件</li>
            <li>加载样式文件</li>
            <li>加载JSON文件</li>
            <li>使用同构工具实现同构渲染</li>
            <li>热替换</li>
            <li>开发服务器</li>
            <li>压缩合并</li>
            <li>哈希命名</li>
          </ul>
          <h2>1.6 总结</h2>
          <p>
            React是一个声明式的、高效的、灵活的创建用户界面的Javascript库，它所带来的Universal渲染更是一场革命。Redux是一个JavaScript状态容器，
            提供可预测的状态管理，单一数据源、只读state等特性使其从同类工具中脱颖而出。而使用Babel和Webpack做编译和构建则是开发React与Redux程序的最佳选择。
          </p>
          <p>让我们将循序渐进地学习使用这些现代前端技术。</p>
        </div>
      </div>
    );
  }
}
