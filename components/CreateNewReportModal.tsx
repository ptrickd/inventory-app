//React
import { useState, useContext } from 'react'

//Component
import DatePicker from './DatePicker'

//Material UI
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

//Time
import { DateTime } from 'luxon'

//Context
import { ReportsContext } from '../contexts/ReportsContext'
import { ProductsContext } from '../contexts/ProductsContext'
interface IProps {
    open: boolean
    handleCloseModal: () => void
}

const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        margin: theme.spacing(4),
        padding: theme.spacing(4)
    },
    button: {
        marginTop: 10
    }
}))

function CreateNewReportModal({ open, handleCloseModal }: IProps) {
    const classes = useStyles()
    const { addNewReport } = useContext(ReportsContext)
    const { products } = useContext(ProductsContext)
    const [selectedDate, setSelectedDate] = useState<null | DateTime>(null)
    const [currentDate] = useState(DateTime.now())

    const handleSelectedDate = async (date: DateTime | null) => {
        // console.log('selectedDate', typeof date)
        setSelectedDate(date)
    }

    const handleClickCreate = () => {
        handleCloseModal()
        if (selectedDate !== null && products !== undefined && addNewReport !== undefined) {
            let productsForReport: any[] = []
            let newProduct = {
                productId: '',
                amount: 0,
                name: '',
                categoryId: ''
            }
            products.map(product => {
                newProduct.productId = product.id
                newProduct.amount = product.currentAmount
                newProduct.name = product.name
                newProduct.categoryId = product.categoryId
                productsForReport.push(newProduct)
            })

            ////////////make change to products

            addNewReport(selectedDate, productsForReport, currentDate)
        }

        //date, products, dateSubmitted
    }

    return (
        <Dialog
            open={open}
            aria-labelledby="Create A New Report"
            onClose={() => handleCloseModal()}
            className={classes.root}
        >
            <DialogContent>
                <Typography variant="h5">Choose the date for the next report</Typography>
                <DatePicker handleSelectedDate={handleSelectedDate} />
                <Button
                    className={classes.button}
                    variant="contained"
                    color='primary'
                    fullWidth
                    onClick={handleClickCreate}
                >Create</Button>
            </DialogContent>
        </Dialog>
    )
}

export default CreateNewReportModal
