export interface MetaData {
    color: String,
    qty: number,
    size: String,
}

export interface Category {
    sub_cat: String[],
}

export interface IProduct {
    productName: String,
    metaData: MetaData[],
    unitSalePrice: number,
    description: String,
    category: Category,
}