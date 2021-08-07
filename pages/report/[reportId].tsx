//React
import { useEffect, useContext } from 'react'
import { useRouter } from 'next/router'

//Material UI
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'

//GraphQL
import { gql, useQuery } from '@apollo/client'

//Date
import { DateTime } from 'luxon'

//Context
import { UserContext } from '../../contexts/UserContext'

const GET_REPORT = gql`
    query Report($reportId: ID!){
        report(reportId: $reportId) {
                id  
                date
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
        width: '100%',
        marginLeft: 10,
        marginRight: 10,
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column'
    },
    title: {
        marginBottom: 15
    },
    date: {
        marginBottom: 15
    },
    subTitle: {
        marginTop: 10,
        marginBottom: 10
    },
    dataFormat: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
}))

function report() {
    const classes = useStyles()
    const router = useRouter()
    const { reportId } = router.query
    const { loggedIn } = useContext(UserContext)
    const { data, loading, error } = useQuery(GET_REPORT, {
        variables: { reportId: reportId },
        skip: !reportId
    })
    const {//Aliases for useQuery
        data: dataCategories,
        loading: loadingCategories,
        error: errorCategories
    } = useQuery(GET_CATEGORIES)

    useEffect(() => {
        if (!loggedIn) router.push('/')
    }, [loggedIn])

    if (loading || loadingCategories) return <p>Loading...</p>
    if (error || errorCategories) return <p>Error...</p>
    if (!data) return <p>No data...</p>
    const date = DateTime.fromISO(data.report.date)
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
                    </div>
                )
            }
        })
    }
    const renderedReport = () => {
        console.log('dataCategories', dataCategories)
        return dataCategories.categories.map((category: any) => {
            return <div key={category.id}>
                <Typography variant="h5">
                    {category.name}
                </Typography>
                {productsByCategory(category.id)}
                <hr />
            </div>
        })
    }

    return (
        <Container className={classes.root}>
            <Typography
                className={classes.title}
                variant='h3' align="center"
            >
                Report
            </Typography>
            <Typography className={classes.date}
                variant="h6" align="center"
            >
                {date.toFormat('dd MMMM, yyyy')}
            </Typography>
            {renderedReport()}
        </Container>
    )
}

export default report
