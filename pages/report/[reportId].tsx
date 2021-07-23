//React
import { useEffect } from 'react'
import { useRouter } from 'next/router'

//Material UI
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'

//GraphQL
import { gql, useQuery } from '@apollo/client'

//Date
import { DateTime } from 'luxon'

const GET_REPORT = gql`
    query Report($reportId: ID!){
        report(reportId: $reportId) {
                id  
                products{
                    productId
                    lastAmount
                }
        }
    }
`

const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        display: 'flex',
        justifyContent: 'center'
    }
}))

function report() {
    const classes = useStyles()
    const router = useRouter()
    const { reportId } = router.query

    const { data, loading, error } = useQuery(GET_REPORT, {
        variables: { reportId: reportId },
        skip: !reportId
    })

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error...</p>
    if (!data) return <p>No data...</p>

    const renderedReport = () => {
        data.report.products.map((product: any) => console.log(product))
    }

    return (
        <Container className={classes.root}>
            <Typography
                variant='h3'
            >
                Report

            </Typography>
            {renderedReport()}
        </Container>
    )
}

export default report
