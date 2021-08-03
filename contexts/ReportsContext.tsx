//React
import { createContext, useEffect, useState } from "react";

//GraphQL
import { gql, useLazyQuery, useMutation } from "@apollo/client";

//Date
import { DateTime } from 'luxon'

//Queries
const GET_REPORTS = gql`
    query Reports{
        reports{
            reports{
                id
            }
        }
        
    }
`

//Mutation
const CREATE_REPORT = gql`
    mutation CreateReport(
        $date: timestamptz,
        $products: [InputReportProduct], 
        $createdDate: timestamptz
        ){
            createReport(
                date: $date, 
                products: $products, 
                createdDate: $createdDate
                ){
                id
                error
            }
        }
`

//Interface
interface IProps {
    children: React.ReactNode
}

interface IProduct {
    id: string
    name: string
    currentAmount: number
    lastAmount: number
    categoryId: string
}

interface IProductInReport {
    productId: string
    amount: number
    name: string
    categoryId: string
}
interface IInputNewReport {
    selectedDate: DateTime
    products: IProduct[] | []
    currentDate: DateTime
}

interface IReport {
    id: string
    userId: string
    date: DateTime
    products: IProductInReport[] | []
    hasBeenSubmitted: boolean
    dateCreated: DateTime
    dateSubmitted: DateTime
}
interface IContext {
    reports: IReport[]
    addNewReport: (
        selectedDate: DateTime,
        products: IProductInReport[],
        currentDate: DateTime
    ) => void
}
//DateTime.fromISO(datetime, { zone: 'utc-6' }).toString() -7
const ReportsContext = createContext<Partial<IContext>>({})

const ReportsProvider = ({ children }: IProps) => {
    const [reports, setReports] = useState<IReport[] | undefined>(undefined)
    const [createReport] = useMutation(CREATE_REPORT)
    const [getReports, { data, loading }] = useLazyQuery(GET_REPORTS)

    useEffect(() => {
        if (data) setReports(data?.reports?.report)
    }, [data])
    useEffect(() => {
        getReports()
    }, [])
    const addNewReport = async (
        date: DateTime,
        products: IProductInReport[] | [],
        createdDate: DateTime
    ) => {
        // console.log('productsOnCreation', products)
        let resp = await createReport({ variables: { date: date.toJSDate(), products, createdDate: createdDate.toJSDate() } })
        // console.log('response from createReport:', resp)
        // console.log('datetime local:', typeof date.toJSDate())
        getReports()
    }

    if (loading) return <div><h2>Loading...</h2></div>

    return (
        <ReportsContext.Provider value={{
            reports,
            addNewReport
        }} >
            {children}
        </ReportsContext.Provider>
    )


}

export { ReportsProvider, ReportsContext }
