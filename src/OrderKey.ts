export const OrderKey = {
    key:'v8:DocumentObject.ЗаказПоставщику',
    value: {
        Date: {
            key:'v8:Date',
            value:'2019-07-28T00:00:00'
        },
        Number: {
            key:'v8:Number',
            value:'0000-000694'
        },
        Status:{
            key:'v8:Статус',
            value:'Подтвержден'//а какие ещё бывают?
        },
        TotalCosts:{
            key:'v8:СуммаДокумента',
            value:'4988.55'//разделитель "."
        },
        Info:{
            key:'v8:ДополнительнаяИнформация',
            value:'https://trello.com/c/p7L9E6xU'+ //первая строка ShortURI на карту Trello
                  'авт.выключатель ВА101- Деревянко' //какая-то инфо о Проекте и Зказчике
        },
        GivenDeliveryDate:{
            key:'v8:ДатаПоДаннымПоставщика',
            value:'2019-07-29T00:00:00'
        },
        DeliveryDate:{//дата поступления всего Заказа
            key:'v8:ДатаПоступления',
            value:'2019-07-30T00:00:00'
        },
        Goods:{//ТОВАР! такиех объектов может быть несколько!
            key:'v8:Товары',
            Ref:{//ссылка на позицию в справочнике Номенклатуры
                //<v8:Номенклатура xsi:type="v8:CatalogRef.Номенклатура">537f9676-b1f0-11e9-bd6d-005056a02d45
                key:'v8:Номенклатура',
                attr:'xsi:type="v8:CatalogRef.Номенклатура"',
                value:'537f9676-b1f0-11e9-bd6d-005056a02d45'
            },
            Quantity:{
                key:'v8:Количество',
                value:'10'
            },
            DeliveryDate:{
                key:'v8:ДатаПоступления',
                value:'2019-07-30T00:00:00'
            },
            Cost:{//Цена БЕЗ НДС за Единицу товара
                key:'v8:Цена',
                value:'248.97'
            },
            AmountVAT:{
                key:'v8:СуммаНДС',
                value:'497.93'
            },
            TotalCosts:{
                key:'v8:СуммаСНДС',
                value:'2987.59'
            }
                       
        }
    }
}