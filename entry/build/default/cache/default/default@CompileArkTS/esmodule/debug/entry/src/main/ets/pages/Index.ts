if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface Index_Params {
    message?: string;
    Menulist?: Array<MenuMedelData>;
}
import type common from "@ohos:app.ability.common";
import util from "@ohos:util";
import type { MenuMedel, MenuMedelData } from '../model/MenuMedel';
class Index extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__message = new ObservedPropertySimplePU('Hello World', this, "message");
        this.__Menulist = new ObservedPropertyObjectPU([], this, "Menulist");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: Index_Params) {
        if (params.message !== undefined) {
            this.message = params.message;
        }
        if (params.Menulist !== undefined) {
            this.Menulist = params.Menulist;
        }
    }
    updateStateVars(params: Index_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__message.purgeDependencyOnElmtId(rmElmtId);
        this.__Menulist.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__message.aboutToBeDeleted();
        this.__Menulist.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    // 读取本地json
    private __message: ObservedPropertySimplePU<string>;
    get message() {
        return this.__message.get();
    }
    set message(newValue: string) {
        this.__message.set(newValue);
    }
    private __Menulist: ObservedPropertyObjectPU<Array<MenuMedelData>>;
    get Menulist() {
        return this.__Menulist.get();
    }
    set Menulist(newValue: Array<MenuMedelData>) {
        this.__Menulist.set(newValue);
    }
    aboutToAppear() {
        let mContext = getContext() as common.UIAbilityContext; // 获取上下文
        this.getjsonfile(mContext); // 加载 JSON 数据
    }
    async getjsonfile(context: common.UIAbilityContext) {
        // // 1. 读取本地 JSON 文件
        let getjson = await context.resourceManager.getRawFileContent('data.json');
        console.log("getjson--->" + getjson);
        //  // 2. 解码文件内容
        let textDecoderOptions: util.TextDecoderOptions = { ignoreBOM: true };
        let textDecoder = util.TextDecoder.create("utf-8", textDecoderOptions);
        let result = textDecoder.decodeWithStream(getjson, { stream: false });
        console.log("result--->" + result);
        //  // 3. 解析 JSON 并更新数据
        let menumodel: MenuMedel = JSON.parse(result);
        this.Menulist = menumodel.data;
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            List.create({ space: 10 });
            List.height('100%');
            List.width('100%');
        }, List);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const item = _item;
                {
                    const itemCreation = (elmtId, isInitialRender) => {
                        ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                        itemCreation2(elmtId, isInitialRender);
                        if (!isInitialRender) {
                            ListItem.pop();
                        }
                        ViewStackProcessor.StopGetAccessRecording();
                    };
                    const itemCreation2 = (elmtId, isInitialRender) => {
                        ListItem.create(deepRenderFunction, true);
                    };
                    const deepRenderFunction = (elmtId, isInitialRender) => {
                        itemCreation(elmtId, isInitialRender);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Row.create();
                            Row.height(100);
                            Row.width('100%');
                            Row.justifyContent(FlexAlign.Start);
                        }, Row);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Image.create(item?.pic);
                            Image.width(100);
                            Image.height(100);
                            Image.objectFit(ImageFit.Fill);
                            Image.borderRadius(5.0);
                        }, Image);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Column.create({ space: 10 });
                            Column.width('calc(100% - 112vp)');
                            Column.height('100%');
                            Column.margin({ left: 12, top: 6 });
                            Column.justifyContent(FlexAlign.Start);
                            Column.alignItems(HorizontalAlign.Start);
                        }, Column);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Text.create(item?.name);
                            Text.fontSize(18);
                            Text.fontColor(Color.Black);
                            Text.textAlign(TextAlign.End);
                            Text.backgroundColor(Color.Red);
                        }, Text);
                        Text.pop();
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Text.create(item?.content);
                            Text.fontColor(Color.Gray);
                            Text.fontSize(15);
                            Text.maxLines(2);
                            Text.textOverflow({ overflow: TextOverflow.Ellipsis });
                        }, Text);
                        Text.pop();
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Row.create();
                            Row.width("100%");
                            Row.justifyContent(FlexAlign.SpaceBetween);
                            Row.backgroundColor(Color.Red);
                        }, Row);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Text.create(item?.cookingtime);
                            Text.fontSize(13);
                            Text.fontColor(Color.Gray);
                            Text.textAlign(TextAlign.Start);
                        }, Text);
                        Text.pop();
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Button.createWithLabel("查看");
                            Button.height(16);
                            Button.width(50);
                        }, Button);
                        Button.pop();
                        Row.pop();
                        Column.pop();
                        Row.pop();
                        ListItem.pop();
                    };
                    this.observeComponentCreation2(itemCreation2, ListItem);
                    ListItem.pop();
                }
            };
            this.forEachUpdateFunction(elmtId, this.Menulist, forEachItemGenFunction);
        }, ForEach);
        ForEach.pop();
        List.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "Index";
    }
}
registerNamedRoute(() => new Index(undefined, {}), "", { bundleName: "com.example.getjson", moduleName: "entry", pagePath: "pages/Index", pageFullPath: "entry/src/main/ets/pages/Index", integratedHsp: "false", moduleType: "followWithHap" });
