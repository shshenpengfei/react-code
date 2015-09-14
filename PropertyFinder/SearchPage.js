'use strict';

var React =require('react-native');
var SearchResults = require('./SearchResults');

/**是一种解构赋值，准许你获取对象的多个属性并且使用一条语句将它们赋给多个变量。
结果是，后面的代码中可以省略掉 React 前缀；比如，你可以直接引用 StyleSheet ，而不再需要 React.StyleSheet。
*/
var {
	StyleSheet,
	Text,
	TextInput,
	View,
	TouchableHighlight,
	ActivityIndicatorIOS,
	Image,
	Component
} = React;

var styles = StyleSheet.create({

	description:{
		marginBottom:20,
		fontSize:18,
		textAlign:'center',
		color:'#656565'
	},

	container:{
		padding:30,
		marginTop:65,
		alignItems:'center'
	},

	flowRight: {
	  flexDirection: 'row',
	  alignItems: 'center',
	  alignSelf: 'stretch'
	},

	buttonText: {
	  fontSize: 18,
	  color: 'white',
	  alignSelf: 'center'
	},

	button: {
	  height: 36,
	  flex: 2,
	  flexDirection: 'row',
	  backgroundColor: '#48BBEC',
	  borderColor: '#48BBEC',
	  borderWidth: 1,
	  borderRadius: 8,
	  marginBottom: 10,
	  alignSelf: 'stretch',
	  justifyContent: 'center'
	},

	searchInput: {
	  height: 36,
	  padding: 4,
	  marginRight: 5,
	  flex: 4,
	  fontSize: 18,
	  borderWidth: 1,
	  borderColor: '#48BBEC',
	  borderRadius: 8,
	  color: '#48BBEC'
	},

	image: {
	  width: 120,
	  height: 120
	}

});

function urlForQueryAndPage(key, value, pageNumber) {
  var data = {
      country: 'uk',
      pretty: '1',
      encoding: 'json',
      listing_type: 'buy',
      action: 'search_listings',
      page: pageNumber
  };
  data[key] = value;

  var querystring = Object.keys(data)
    .map(key => key + '=' + encodeURIComponent(data[key]))
    .join('&');

  return 'http://api.nestoria.co.uk/api?' + querystring;
};

class SearchPage extends Component {

//构造函数
  constructor(props) {
	  super(props);
	  this.state = {
	  	title:'我的世界太过安静',
	    searchString: '搜索需求名称',
	    isLoading: false,
	    location: '定位当前位置',
	    message:''

	  };
  }

  render() {
  	var spinner = this.state.isLoading ?
	  ( <ActivityIndicatorIOS
	      hidden='true'
	      size='large'/> ) :
	  ( <View/>);

   	//console.log('SearchPage.render');
    return (
      <View style={styles.container}>
        <Text style={styles.description}>
          {this.state.title}
        </Text>
        <Text style={styles.description}>
          静得可以听到自己心跳的声音，心房的血液慢慢流回心室，如此这般的轮回
        </Text>

        <View style={styles.flowRight}>
		  <TextInput
		    style={styles.searchInput}
		    onChange={this.onSearchTextChanged.bind(this)}
		    placeholder={this.state.searchString}/>
		  <TouchableHighlight style={styles.button}
		      underlayColor='#99d9f4' onPress={this.onSearchPressed.bind(this)}>
		    <Text style={styles.buttonText}>搜索</Text>
		  </TouchableHighlight>
	    </View>
	  <TouchableHighlight style={styles.button}
		    underlayColor='#99d9f4'>
		  <Text style={styles.buttonText}>{this.state.location}</Text>
	  </TouchableHighlight>
	  <Image source={require('image!house')} style={styles.image}/>
	  {spinner}
      <Text style={styles.description}>{this.state.message}</Text>
      </View>
    );
  }

  onSearchTextChanged(event) {
	  //console.log('onSearchTextChanged');
	  this.setState({ searchString: event.nativeEvent.text });
	  //console.log(this.state.searchString);
  }

  _executeQuery(query) {
  console.log(query);
  this.setState({ isLoading: true });
fetch(query)
  .then(response => response.json())
  .then(json => this._handleResponse(json.response))
  .catch(error => 
     this.setState({
      isLoading: false,
      message: 'Something bad happened ' + error
   }));
	}



	onSearchPressed() {
	  var query = urlForQueryAndPage('place_name', this.state.searchString, 1);
	  this._executeQuery(query);
	}

_handleResponse(response) {
  this.setState({ isLoading: false , message: '' });
  if (response.application_response_code.substr(0, 1) === '1') {
    //console.log('Properties found: ' + response.listings.length);

	this.props.navigator.push({
	  title: '搜索结果列表',
	  //通过更新 initialRoute 来引用最新添加的页面
	  component: SearchResults,
	  passProps: {listings: response.listings}
	});

  } else {
    this.setState({ message: '没有找到合适的数据，请重新尝试'});
  }
}


}

//export SearchPage 类，方便在其他文件中使用它
module.exports = SearchPage;
