> 前情概要，对于json的处理我一直在前端获取对应的值之后，然后利用eval()函数进行处理，将后台传过来的string类型的json进行序列化，但是这样把所有的数据放到前台界面的某个标签中，将该标签隐藏，但是其实页面不渲染，不代表进行源码查看的时候不能看到对应的完整数据，这样对于数据是很不负责的行为，所以今天花了很多时间在后台读取多节点xml数据和将数据序列化上。

# 介绍json
> 摘抄自某百科

### __JSON定义__<br/>
JSON(JavaScript Object Notation, JS 对象标记) 是一种轻量级的数据交换格式。它基于 ECMAScript 规范的一个子集，采用完全独立于编程语言的文本格式来存储和表示数据。简洁和清晰的层次结构使得 JSON 成为理想的数据交换语言。 易于人阅读和编写，同时也易于机器解析和生成，并有效地提升网络传输效率。<br/>
在 JS 语言中，一切都是对象。因此，任何支持的类型都可以通过 JSON 来表示，例如字符串、数字、对象、数组等。但是对象和数组是比较特殊且常用的两种类型。<br/>
对象：对象在 JS 中是使用花括号包裹 {} 起来的内容，数据结构为 {key1：value1, key2：value2, ...} 的键值对结构。在面向对象的语言中，key 为对象的属性，value 为对应的值。键名可以使用整数和字符串来表示。值的类型可以是任意类型。<br/>
数组：数组在 JS 中是方括号 [] 包裹起来的内容，数据结构为 ["java", "javascript", "vb", ...] 的索引结构。在 JS 中，数组是一种比较特殊的数据类型，它也可以像对象那样使用键值对，但还是索引使用得多。同样，值的类型可以是任意类型。<br/><br/>
### __JSON 与 JS 对象的关系__<br/>
很多人搞不清楚 JSON 和 Js 对象的关系，甚至连谁是谁都不清楚。其实，可以这么理解：<br/>
JSON 是 JS 对象的字符串表示法，它使用文本表示一个 JS 对象的信息，本质是一个字符串。<br/>
```
  var obj = {a: 'Hello', b: 'World'}; //这是一个对象，注意键名也是可以使用引号包裹的
  var json = '{"a": "Hello", "b": "World"}'; //这是一个 JSON 字符串，本质是一个字符串
```
JSON 和 JS 对象互转
要实现从对象转换为 JSON 字符串，使用 JSON.stringify() 方法：
```
  var json = JSON.stringify({a: 'Hello', b: 'World'}); //结果是 '{"a": "Hello", "b": "World"}'
  要实现从 JSON 转换为对象，使用 JSON.parse() 方法：
  var obj = JSON.parse('{"a": "Hello", "b": "World"}'); //结果是 {a: 'Hello', b: 'World'}
```
### __JSON 与 xml的关系__<br/>
##### 可读性<br/>
JSON和XML的可读性可谓不相上下，一边是简易的语法，一边是规范的标签形式，很难分出胜负。<br/>
##### 可扩展性<br/>
XML天生有很好的扩展性，JSON当然也有，没有什么是XML可以扩展而JSON却不能扩展的。不过JSON在Javascript主场作战，可以存储Javascript复合对象，有着xml不可比拟的优势。<br/>
##### 编码难度<br/>
XML有丰富的编码工具，比如Dom4j、JDom等，JSON也有提供的工具。无工具的情况下，相信熟练的开发人员一样能很快的写出想要的xml文档和JSON字符串，不过，xml文档要多很多结构上的字符。<br/>
##### 解码难度<br/>
XML的解析方式有两种：<br/>
一是通过文档模型解析，也就是通过父标签索引出一组标记。例如：xmlData.getElementsByTagName("tagName")，但是这样是要在预先知道文档结构的情况下使用，无法进行通用的封装。<br/>
另外一种方法是遍历节点（document 以及 childNodes）。这个可以通过递归来实现，不过解析出来的数据仍旧是形式各异，往往也不能满足预先的要求。<br/>
凡是这样可扩展的结构数据解析起来一定都很困难。<br/>
JSON也同样如此。如果预先知道JSON结构的情况下，使用JSON进行数据传递简直是太美妙了，可以写出很实用美观可读性强的代码。如果你是纯粹的前台开发人员，一定会非常喜欢JSON。但是如果你是一个应用开发人员，就不是那么喜欢了，毕竟xml才是真正的结构化标记语言，用于进行数据传递。<br/>
而如果不知道JSON的结构而去解析JSON的话，那简直是噩梦。费时费力不说，代码也会变得冗余拖沓，得到的结果也不尽人意。但是这样也不影响众多前台开发人员选择JSON。因为json.js中的toJSONString()就可以看到JSON的字符串结构。当然不是使用这个字符串，这样仍旧是噩梦。常用JSON的人看到这个字符串之后，就对JSON的结构很明了了，就更容易的操作JSON。<br/>
以上是在Javascript中仅对于数据传递的xml与JSON的解析。在Javascript地盘内，JSON毕竟是主场作战，其优势当然要远远优越于xml。如果JSON中存储Javascript复合对象，而且不知道其结构的话，我相信很多程序员也一样是哭着解析JSON的。
除了上述之外，JSON和XML还有另外一个很大的区别在于有效数据率。JSON作为数据包格式传输的时候具有更高的效率，这是因为JSON不像XML那样需要有严格的闭合标签，这就让有效数据量与总数据包比大大提升，从而减少同等数据流量的情况下，网络的传输压力。<br/>

# 介绍json序列化
> 公司使用的是c#做后台所以需要注意using，参考某[博客](http://www.jb51.net/article/39942.htm)

##### serialize<br/>
将string转化为jsonList或者jsonArray类型

```
Product product = new Product();
product.Name = "Apple";
product.Expiry = new DateTime(2008, 12, 28);
product.Sizes = new string[] { "Small" };

string json = new JavaScriptSerializer().Serialize(product);
```
##### Deserialize <br/>
将jsonList或者jsonArray转化为string类型

```
using System.Web.Script.Serialization;
protected void Page_Load(object sender, EventArgs e)
        {
            Personnel personnel = new Personnel();
            personnel.Id = 1;
            personnel.Name = "小白";
            JavascriptSerializer jsonSerializer = new JavascriptSerializer();
            //执行序列化
            string r1 = jsonSerializer.Serialize(personnel);

            //执行反序列化
            Personnel _Personnel = jsonSerializer.Deserialize<Personnel>(r1);
         }

public class Personnel
    {
        public int Id { get; set; }
        public string Name { get; set; }
    }
```
##### 小技巧<br/>
可以使用IgnoreDataMember:指定该成员不是数据协定的一部分且没有进行序列化，DataMember:定义序列化属性参数，使用DataMember属性标记字段必须使用DataContract标记类 否则DataMember标记不起作用。
```
[DataContract]
        public class People
        {
            [DataMember(Name = "id")]
            public int Id { get; set; }
            [IgnoreDataMember]
            public string Name { get; set; }
        }


```
输出结果: {"id":1}

##### 完整案例<br/>
```
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Xml;//读取xml这个一定要using
using System.Text;
using XXX.Model;
using System.Web.Script.Serialization;//序列化json这个一定要using
namespace GREI.Suite
{
    public partial class Main : System.Web.UI.Page
    {
        //public string LeftList;
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                LoadLeftList();
            }
        }

        public void LoadLeftList()
        {
            String LeftList =LoadListXml();
            List<LeftLists> LeftLs = new JavaScriptSerializer().Deserialize<List<LeftLists>>(LeftList);    //将json数据转化为对象类型并赋值给list

            String modules ="<div class=\"panel-group wrap\" id=\"accordion\" role=\"tablist\" aria-multiselectable=\"true\">\n";

            for (int n = 0; n < LeftLs.Count; n++)
            {
                modules += "<div class='panel' id='panel-"+n+"'>\n";
                modules += "	<div class=\"panel-heading\" role=\"tab\"  id='heading-"+n+"'>\n";
                modules += "		<h4 class=\"panel-title\"><a role=\"button\" data-toggle=\"collapse\" data-parent=\"#accordion\" href='#panel-in-" + n + "' aria-expanded=\"true\" aria-controls='panel-in-" + n + "'>" + LeftLs[n].ParentName + "</a></h4>\n";
                modules += "	</div>\n";
                modules += "	<div id='panel-in-" + n + "' class=\"panel-collapse collapse\" role=\"tabpanel\" aria-labelledby='panel-in-" + n + "'>\n";
                modules += "		<div class=\"panel-body\">\n";
                modules += "            <div class ='list-group' id='panel-list-"+n+"'>\n";
                for (int m = 0; m < LeftLs[n].data.Count; m++)
                {
                    modules += "	        <a onclick='open_xml_win('Rlist'," + LeftLs[n].data[m].Url + ")' class ='list-group-item'>" + LeftLs[n].data[m].Name + "</a>\n";
                }
                modules += "            </div>\n";
                modules += "		</div>\n";
                modules += "	</div>\n";
                modules += "</div>\n";
            }
            modules += "</div>\n";
            leftTree.InnerHtml = modules;
        }

        public string LoadListXml()
        {
            XmlDocument XmlDoc = new XmlDocument();
            string paths = "XXX/XXX.xml";
            paths = Server.MapPath(paths);
            StringBuilder sb = new StringBuilder();
            try
            {
                XmlDoc.Load(paths);

                XmlNode xnroot = XmlDoc.SelectSingleNode("WorkFlow");


                sb.Append("[");
                int index = 0;
                foreach (XmlNode xnType in xnroot.ChildNodes)
                {
                    if (xnType.NodeType == XmlNodeType.Comment)
                    {
                        continue;
                    }


                    if (index > 0)
                    {
                        sb.Append(",");
                    }


                    XmlAttribute attribute = xnType.Attributes["Name"];
                    string parentname =attribute.Value;

                    string strJson = CommonHelper.GetActByProcessName(parentname, paths);

                    string res = "{\"ParentName\":\""+parentname+"\",\"data\":"+strJson+"}";
                    sb.Append(res);
                    index++;
                }
                sb.Append("]");

                return sb.ToString();
            }
            catch (Exception err)
            {
                throw;
            }

        }


        public struct LeftLists
        {
            public string ParentName { get; set; }  //属性的名字，必须与json格式字符串中的"key"值一样。
            public List<dataList> data { get; set; }//数组处理
        }

        public struct dataList
        {
            public int ID { get; set; }
            public string Name { get; set; }
            public string Type { get; set; }
            public string Url { get; set; }
        };

    }
}
```

# 今天遇见的主要问题
在之前我主要是用的时候序列化，但是为了在后台方便操作json数据节点，所以我使用了反序列化，在使用的最开始，一直不得其法还去[.net with json](http://www.newtonsoft.com/json)
[下载](https://pan.baidu.com/share/link?shareid=1944400503&uk=1226725970&app=zd)了相关dll文件。

```
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

public string cutJson(string json,string item,int index)
{
    JObject jo = (JObject)JsonConvert.DeserializeObject(json);
    string value = jo[item][index].ToString();
    return value;
}
JArray LeftLists = (JArray)JsonConvert.DeserializeObject(LeftList);

```

> #####  1 第一种

```
JArray array = new JArray();
array.Add("Manual text");
array.Add(new DateTime(2000, 5, 23));

JObject o = new JObject();
o["MyArray"] = array;

string json = o.ToString();
// {
//   "MyArray": [
//     "Manual text",
//     "2000-05-23T00:00:00"
//   ]
// }
LINQ to JSON
```

> #####  2 第二种

```
string json = @"{
  'Name': 'Bad Boys',
  'ReleaseDate': '1995-4-7T00:00:00',
  'Genres': [
    'Action',
    'Comedy'
  ]
}";

Movie m = JsonConvert.DeserializeObject<Movie>(json);

string name = m.Name;
// Bad Boys
Deserialize JSON

```


> #####  3 第三种
```
Product product = new Product();
product.Name = "Apple";
product.Expiry = new DateTime(2008, 12, 28);
product.Sizes = new string[] { "Small" };

string json = JsonConvert.SerializeObject(product);
// {
//   "Name": "Apple",
//   "Expiry": "2008-12-28T00:00:00",
//   "Sizes": [
//     "Small"
//   ]
// }
Serialize JSON

```
> #####  4 结论
结果使用了结果发现不用另外下载dll，直接使用System.Web.Script.Serialization就好，还有就是在构造对应的public struct上，我也花费了很多时间，之前不知道怎么用，需要注意的是在json数组对象中多层嵌套数组，在反序列对应的struct上怎样多层对应定义，然后在反序列化之后怎么对应，那一部分是用对象的方法`LeftLs[n].ParentName`进行取值，哪一块是通过数组下标的方式`LeftLs[n].data[m].Name`进行取值，还有反序列化之后的list应该怎样正确声明，正确`List<LeftLists> LeftLs = new JavaScriptSerializer().Deserialize<List<LeftLists>>(LeftList);  `,错误`LeftLists LeftLists =  new JavaScriptSerializer().Deserialize<LeftLists>(LeftList); `,花费了大量时间，后期逐步了解了，才发现其实很好用，希望我之后能够将现有项目中json转化解析的部分功能进行进一步的优化。不过后期如果有时间有应该把[.net with json](http://www.newtonsoft.com/json)好好学习一下，还有之前以为return的json可以通过length控制，后期才发现使用了很多firstchild比较麻烦，还是序列化方便一些，直接通过下表或者取对象值的方式就可以了。

技术栈 `javascript` `json` `c#` `xml`
