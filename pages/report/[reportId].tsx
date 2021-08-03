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
                    name
                    amount
                    categoryId
                }
        }
    }
`

const GET_CATEGORIES = gql`
    query Categories{
        categories{
            id
            name
        }
    }
`

const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column'
    },
    dataFormat: {
        display: 'flex',
        flexDirection: 'row'
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
    const {
        data: dataCategories,
        loading: loadingCategories,
        error: errorCategories
    } = useQuery(GET_CATEGORIES)

    if (loading || loadingCategories) return <p>Loading...</p>
    if (error || errorCategories) return <p>Error...</p>
    if (!data) return <p>No data...</p>
    const productsByCategory = (categoryId: string) => {
        return data.report.products.map((product: any) => {

            if (categoryId === product.categoryId) {
                return (
                    <div key={product.productId} className={classes.dataFormat}>
                        <Typography variant="body2">
                            {product.name}
                        </Typography>
                        <Typography variant="body2">
                            {product.amount}
                        </Typography>
                        {/* <Typography variant="body2">
                                {product.categoryId}
                            </Typography> */}
                    </div>


                )
            }

        })
    }
    const renderedReport = () => {
        console.log('dataCategories', dataCategories)
        return dataCategories.categories.map((category: any) => {
            return <div>
                <Typography variant="h5">
                    {category.name}
                </Typography>
                {productsByCategory(category.id)}
            </div>

        })

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
