//React
import { createContext } from "react";

//GraphQL
import { gql, useQuery, useMutation } from "@apollo/client";

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
        $date: Date, 
        $products: [InputReportProduct], 
        $createdDate: Date
        ){
            createReport(
                date: $date, 
                products: $products, 
                createdDate: $createdDate
                ){
                id
            }
        }
`

//Interface
interface IProps {
    children: React.ReactNode
}

interface IProductInReport {
    productId: string
    currentAmount: number
    lastAmount: number
    name: string
}

interface IReport {
    id: string
    userId: string
    date: DateTime
    products: IProductInReport[]
    hasBeenSubmitted: boolean
    dateCreated: DateTime
    dateSubmitted: DateTime
}
interface IContext {
    reports: IReport[]
    addNewReport: (
        selectedDate: DateTime,
        products: IProduct[],
        currentDate: DateTime
    ) => void
}

const ReportsContext = createContext<Partial<IContext>>({})

const ReportsProvider = ({ children }: IProps) => {
    const [createReport] = useMutation(CREATE_REPORT)
    const { data, loading, error, refetch } = useQuery(GET_REPORTS)
    const reports = data.reports.reports

    const addNewReport = async (
        date: DateTime,
        products: IProductInReport[],
        createdDate: DateTime
    ) => {
        await createReport(date, products, createdDate)
        refetch()
    }

    if (loading) return <div><h2>Loading...</h2></div>
    if (error) return <div>`Error!hh ${error.message}` </div>
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