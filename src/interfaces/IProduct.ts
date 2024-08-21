export interface MetaData {
    color: string,
    qty: number,
    size: string,
}

export interface Category {
    sub_cat: string[],
}

export interface IProduct {
    fileName: string,
    productName: string,
    metaData: MetaData[],
    unitSalePrice: number,
    description: string,
    category: Category,
}