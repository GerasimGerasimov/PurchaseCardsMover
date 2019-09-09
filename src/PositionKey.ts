// Номенклатура
export const PositionKey = {
    key:'v8:CatalogObject.Номенклатура',
    value: {
        isFolder:{ //по значению isFolder == true узнаю содержательную часть "Номенклатура"
            key: 'v8:IsFolder',
            value: false
        },
        Description:{//Описание товара
            key:'v8:Description',
            value:'авт.выключатель ВА101-3Р-002А-С (4/1)'
        },
        Art:{//Артикул товара
            key:'v8:Артикул',
            value:'11074DEK'
        },
        FullName:{//Полное наименование товара
            key:'v8:НаименованиеПолное',
            value:'авт.выключатель ВА101-3Р-002А-С (4/1)'
        },
        Ref:{
            //<v8:Ref xsi:type="v8:CatalogRef.Номенклатура">537f9676-b1f0-11e9-bd6d-005056a02d45</v8:Ref>
            key:'v8:Ref',
            attr:'xsi:type="v8:CatalogRef.Номенклатура"',
            value:'537f9676-b1f0-11e9-bd6d-005056a02d45'
        }
    }
}
