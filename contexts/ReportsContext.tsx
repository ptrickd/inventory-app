//React
import { createContext } from "react";

//GraphQL
import { gql, useQuery, useMutation } from "@apollo/client";

//Date
import { DateTime } from 'luxon'

//Queries
const GET_REPORTS = gql`
    query GetReports{
        reports{
            reports{
                id
            }
        }
    }
`

//Interface
interface IProps {
    children: React.ReactNode
}

interface IProduct {
    productId: string
    currentAmount: number
    lastAmount: number
    name: string
}

interface IReport {
    id: string
    userId: string
    date: DateTime
    products: IProduct[]
    hasBeenSubmitted: boolean
    dateCreated: DateTime
    dateSubmitted: DateTime
}

interface IContext {
    reports: IReport[]
}

const ReportsContext = createContext<Partial<IContext>>({})

const ReportsProvider = ({ children }: IProps) => {

    const { data, loading, error, refetch } = useQuery(GET_REPORTS)
    const reports = data.reports.reports

    if (loading) return <div><h2>Loading...</h2></div>
    if (error) return <div>`Error!hh ${error.message}` </div>
    return (
        <ReportsContext.Provider value={{
            reports
        }} >
            {children}
        </ReportsContext.Provider>
    )


}

export { ReportsProvider, ReportsContext }