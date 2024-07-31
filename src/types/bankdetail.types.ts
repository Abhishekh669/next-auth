export interface bankdetailtype{
    _id : string
    userId : string,
    bank_name : string,
    bank_branch : string
}

export interface transBankDetail{
    userId : string,
    bankDetailId : string
}