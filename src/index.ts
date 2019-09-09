// import * as PositionKey from './PositionKey'
import * as fs from "fs";
import * as XmlStream from "xml-stream";

const xmlFile = "xmldataset/out_19-28_08.xml";

const stream = fs.createReadStream(xmlFile);
const xml = new XmlStream(stream, "utf8");

interface IGood {
    nomenclatureID: string;  // ID номенклатуры
                            // tslint:disable-next-line:max-line-length
                            // //<v8:Номенклатура xsi:type="v8:CatalogRef.Номенклатура">537f9676-b1f0-11e9-bd6d-005056a02d45
    quantity: number;    // количество
    deliveryDate: Date;  // дата доставки
    costByPc: number;    // цена за шт
    totalCosts: number;  // цена за все позиции без НДС
}

interface ITagsGood {
    tagNomenclatureID: string;  // ID номенклатуры
    tagNomenclatureIDAtr: string;
                            // tslint:disable-next-line:max-line-length
                            // //<v8:Номенклатура xsi:type="v8:CatalogRef.Номенклатура">537f9676-b1f0-11e9-bd6d-005056a02d45
    tagQuantity: string;    // количество
    tagDeliveryDate: string;  // дата доставки
    tagCostByPc: string;    // цена за шт
    tagTotalCosts: string;  // цена за все позиции без НДС
}

const tagsGood: ITagsGood = {
    tagCostByPc: "v8:Цена",    // цена за шт
    tagDeliveryDate: "v8:ДатаПоступления",  // дата доставки
    tagNomenclatureID: "v8:Номенклатура",  // ID номенклатуры
    tagNomenclatureIDAtr: "$text",
    tagQuantity: "v8:Количество",    // количество
    tagTotalCosts: "v8:СуммаСНДС", // цена за все позиции без НДС
};

interface ISupplayerOrder {
    orderDate: Date;
    orderNumber: string;
    status: string;
    totalCosts: number;
    shortURI: string;
    projectInfo: string;
    goods?: IGood[]; // товары
}

interface ITagsSupplayerOrder {
    main: string;
    tagOrderDate: string;
    tagOrderNumber: string;
    tagStatus: string;
    tagTotalCosts: string;
    tagShortURI: string;
    tagProjectInfo: string;
    tagGoods: string;
}

const tagsSupplayerOrder: ITagsSupplayerOrder = {
    main: "v8:DocumentObject.ЗаказПоставщику",
    tagGoods: "v8:Товары",
    tagOrderDate: "v8:Date",
    tagOrderNumber: "v8:Number",
    tagProjectInfo: "v8:ДополнительнаяИнформация",
    tagShortURI: "v8:ДополнительнаяИнформация",
    tagStatus: "v8:Статус",
    tagTotalCosts: "v8:СуммаДокумента",
};

interface INomenclature {
    ID?: string; // ID номенклатуры
                // tslint:disable-next-line:max-line-length
                // //<v8:Номенклатура xsi:type="v8:CatalogRef.Номенклатура">537f9676-b1f0-11e9-bd6d-005056a02d45
    Code: string;
    Description: string;
    Art: string;
    FullName: string;
}

interface ITagsNomenclature {
    main: string;
    tagIsFolder: string;
    tagCode: string;
    tagDescription: string;
    tagArt: string;
    tagFullName: string;
    tagRef: string;
    tagRefAtr: string;
}

const tagsNomenclature: ITagsNomenclature = {
    main: "v8:CatalogObject.Номенклатура",
    tagArt: "v8:Артикул",
    tagCode: "v8:Code",
    tagDescription: "v8:Description",
    tagFullName: "v8:НаименованиеПолное",
    tagIsFolder: "v8:IsFolder",
    tagRef: "v8:Ref",
    tagRefAtr: "$text",
};

const Nomenclature = new Array<INomenclature>();
const SupplayerOrder = new Array<ISupplayerOrder>();

function getNumber(item: any, key: string, def?: number): number {
    return Number(item[key]
        || def
        || 0);
}

function getString(item: any, key: string, def?: string): string {
    return item[key]
        || def
        || "";
}

function getDate(item: any, key: string, def?: Date): Date {
    return new Date(Date.parse(item[key]
                    || def.toISOString()
                    || new Date().toISOString())
                );
}

xml.collect(tagsSupplayerOrder.tagGoods);
xml.on(`endElement: ${tagsSupplayerOrder.main}`, (item: any) => {
    const goods = new Array<IGood>();
    item[tagsSupplayerOrder.tagGoods].forEach((element: any) => {
        goods.push({
            costByPc:       getNumber(element, tagsGood.tagCostByPc, 0),
            deliveryDate:   getDate(element, tagsGood.tagDeliveryDate, new Date()),
            nomenclatureID: getString(element[tagsGood.tagNomenclatureID], tagsGood.tagNomenclatureIDAtr, ""),
            quantity:       getNumber(element, tagsGood.tagQuantity, 0),
            totalCosts:     getNumber(element, tagsGood.tagTotalCosts, 0),
        });
    });
    SupplayerOrder.push({
        goods,
        orderDate:   getDate(item, tagsSupplayerOrder.tagOrderDate, new Date()),
        orderNumber: getString(item, tagsSupplayerOrder.tagOrderNumber, ""),
        projectInfo: getString(item, tagsSupplayerOrder.tagProjectInfo, ""),
        shortURI:    getString(item, tagsSupplayerOrder.tagShortURI, ""),
        status:      getString(item, tagsSupplayerOrder.tagStatus, ""),
        totalCosts:  getNumber(item, tagsSupplayerOrder.tagTotalCosts, 0),
    });
});

xml.on(`endElement: ${tagsNomenclature.main}`, (item: any) => {
    if (item[tagsNomenclature.tagIsFolder] === "false") {
        Nomenclature.push( {
            Art:         getString(item, tagsNomenclature.tagArt, ""),
            Code:        getString(item, tagsNomenclature.tagCode, ""),
            Description: getString(item, tagsNomenclature.tagDescription, ""),
            FullName:    getString(item, tagsNomenclature.tagFullName, ""),
            ID:          getString(item[tagsNomenclature.tagRef], tagsNomenclature.tagRefAtr, ""),
        });
    }
});

xml.on("end", () => {
    console.log("Done");
});
