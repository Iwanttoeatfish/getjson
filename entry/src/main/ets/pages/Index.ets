import {common} from '@kit.AbilityKit'
import util from '@ohos.util';
import { it } from '@ohos/hypium';
import {MenuMedel,MenuMedelData} from '../model/MenuMedel'


@Entry
@Component
struct Index {

  // 读取本地json
  @State message: string = 'Hello World';
  @State Menulist: Array<MenuMedelData> =[];

  aboutToAppear() {
    let mContext = getContext() as common.UIAbilityContext; // 获取上下文
    this.getjsonfile(mContext); // 加载 JSON 数据
  }


  async getjsonfile(context: common.UIAbilityContext){
    // // 1. 读取本地 JSON 文件
    let getjson=await context.resourceManager.getRawFileContent('data.json')
    console.log("getjson--->"+getjson)

    //  // 2. 解码文件内容
    let textDecoderOptions:util.TextDecoderOptions={ignoreBOM:true};
    let textDecoder=util.TextDecoder.create("utf-8",textDecoderOptions);
    let result =textDecoder.decodeWithStream(getjson,{stream:false});
    console.log("result--->"+result)

    //  // 3. 解析 JSON 并更新数据
    let menumodel:MenuMedel=JSON.parse(result);
    this.Menulist=menumodel.data;
  }


  build() {
    List({space: 10}){
      ForEach(this.Menulist,(item :MenuMedelData) =>{
        ListItem(){
          Row(){
            Image(item?.pic)
              .width(100)
              .height(100)
              .objectFit(ImageFit.Fill)
              .borderRadius(5.0)
            Column({space : 10}){
              Text(item?.name)
                .fontSize(18)
                .fontColor(Color.Black)
                .textAlign(TextAlign.End)
                .backgroundColor(Color.Red)
              Text(item?.content)
                .fontColor(Color.Gray)
                .fontSize(15)
                .maxLines(2)  //选择显示几行
                .textOverflow({overflow:TextOverflow.Ellipsis}) //后面展示三个点
              Row(){
                Text(item ?.cookingtime)
                  .fontSize(13)
                  .fontColor(Color.Gray)
                  .textAlign(TextAlign.Start)
                Button("查看")
                  .height(16)
                  .width(50)
              }
              .width("100%")
              .justifyContent(FlexAlign.SpaceBetween)
              .backgroundColor(Color.Red)
            }
            .width('calc(100% - 112vp)')
            .height('100%')
            .margin({left: 12,top :6})
            .justifyContent(FlexAlign.Start)
            .alignItems(HorizontalAlign.Start)
          }
          .height(100)
          .width('100%')
          .justifyContent(FlexAlign.Start)
        }
      })
    }
    .height('100%')
    .width('100%')
  }
}