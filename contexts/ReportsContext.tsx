//React
import { createContext, useEffect, useState } from "react";

//GraphQL
import { gql, useLazyQuery, useMutation } from "@apollo/client";

//Date
import { DateTime } from 'luxon'

//Types
import { IProduct } from '../types/types'

//Queries
const GET_REPORTS = gql`
    query Reports{
        reports{
            reports{
                id
                date
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
    date: string
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
    ) => Promise<number>
}

const ReportsContext = createContext<Partial<IContext>>({})

const ReportsProvider = ({ children }: IProps) => {
    const [reports, setReports] = useState<IReport[] | []>([])
    const [createReport] = useMutation(CREATE_REPORT)
    const [getReports, { data, loading }] = useLazyQuery(GET_REPORTS, {
        fetchPolicy: 'network-only',
        onCompleted: data => {
            // console.log('data reprots', data.reports.reports)
            setReports(data?.reports.reports); // multiple times
        }
    })

    // useEffect(() => {
    //     if (data) setReports(data?.reports?.reports)
    //     console.log('data reports change', data.reports)
    // }, [data])
    useEffect(() => {
        getReports()
    }, [])
    const addNewReport = async (
        date: DateTime,
        products: IProductInReport[] | [],
        createdDate: DateTime
    ) => {
        let valueToReturn = 0

        // console.log(reports)
        reports.map(report => {

            let dateReport = DateTime.fromISO(report.date)
            console.log(dateReport.toLocaleString())
            console.log(date.toLocaleString())
            if (dateReport.toLocaleString() === date.toLocaleString()) valueToReturn = -1
        })


        await createReport({ variables: { date: date.toJSDate(), products, createdDate: createdDate.toJSDate() } })
        getReports()
        return valueToReturn
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
