// "productName":"redmi",
//     "description":"redmi Mobile",
//     "price":"100",
//     "category":["mobiles","fashion"],
//     "instock":"5",
//     "image"

import * as Yup from 'yup'

export const CreateOrUpdateSchema = Yup.object({
    productName:Yup.string().min(5).max(25).required("Please Enter Product Name"),
    description:Yup.string().min(5).max(25).required("Please Enter product Description"),
    price:Yup.number().required("Please Enter product price"),
    category:Yup.string().min(5).max(25).required("Please Enter category"),
    instock:Yup.number().required("Please Enter instock"),
    image:Yup.string().required("Please select product image"),
})