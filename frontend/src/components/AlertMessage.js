import Alert from 'react-bootstrap/Alert';

const AlertMessage = ({ message }) => {
    if (message === null) {
        return null
    } else {
        return (
            <>
                <Alert key={"success"} variant={"success"}>
                    {message}
                </Alert>
            </>
        )
    }
}

export default AlertMessage