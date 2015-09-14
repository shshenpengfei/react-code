//开启 Strict Mode，Strict mode的错误处理可以有所提高，JavaScript的一些语言缺陷也可以避免。
'use strict';

//将 react-native 模块加载进来，并将它赋值给变量 React
var React = require('react-native');
var SearchPage = require('./SearchPage');

//定义要应用到的css样式
var styles = React.StyleSheet.create({
  text:{
    color:'red',
    backgroundColor:'white',
    fontSize:30,
    margin:60
  },
  container:{
    flex:1
  }

});



//React.Component是react的ui的基础模块
class ProjectManageApp extends React.Component{
  render(){
//    return React.createElement(React.Text, {style: styles.text}, "Hello World!");
//    return <React.Text style={styles.text}>第一个react app</React.Text>;
    return <React.Text style={styles.text}>我的需求</React.Text>
  }
}

//React.Component是react的ui的基础模块
class NaviApp extends React.Component{
  render(){
    return (
      //构造一个 navigation controller，应用一个样式，并把初始路由设为SearchPage组件
        <React.NavigatorIOS style={styles.container} initialRoute={{
          title:"内部项目管理系统",
          //通过更新 initialRoute 来引用最新添加的页面
          component: SearchPage,
        }} />
      );
  }
}



//AppRegistry 定义了App的入口，并提供了根组件。
React.AppRegistry.registerComponent('PropertyFinder', function() { return NaviApp });
